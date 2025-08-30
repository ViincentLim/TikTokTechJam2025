//  LynxFeedVideo.m
//  TikTok-style feed video element for Lynx (iOS)
//  Tag name: <feed-video>

#import "LynxFeedVideo.h"

#import <AVFoundation/AVFoundation.h>
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
#import <Lynx/LynxUIMethodProcessor.h>

#pragma mark - Private state

@interface LynxFeedVideo ()
@property(nonatomic, strong) AVPlayer *player;
@property(nonatomic, strong) AVPlayerItem *item;
@property(nonatomic, strong) id timeObserver;

@property(nonatomic, assign) BOOL autoplay;
@property(nonatomic, assign) BOOL loop;
@property(nonatomic, assign) BOOL muted;
@property(nonatomic, assign) BOOL paused;   // when true, force pause
@property(nonatomic, assign) float volume;  // 0..1
@property(nonatomic, assign) float rate;    // playback rate
@property(nonatomic, strong, nullable) NSURL *srcURL;
@end

#pragma mark - Player view layer

@implementation LynxPlayerView
+ (Class)layerClass { return [AVPlayerLayer class]; }
- (AVPlayerLayer *)playerLayer { return (AVPlayerLayer *)self.layer; }
- (void)setPlayer:(AVPlayer *)player { [self playerLayer].player = player; }
@end

#pragma mark - LynxFeedVideo

@implementation LynxFeedVideo

// Register the element: <feed-video>
LYNX_LAZY_REGISTER_UI("feed-video")

#pragma mark - Lifecycle / View creation

- (LynxPlayerView *)createView {
  LynxPlayerView *view = [[LynxPlayerView alloc] initWithFrame:CGRectZero];
  view.backgroundColor = [UIColor blackColor];

  // AVPlayer + layer config
  self.player = [[AVPlayer alloc] init];
  view.player = self.player;
  view.playerLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;

  // Defaults
  self.autoplay = NO;
  self.loop = YES;
  self.muted = YES;
  self.volume = 1.0f;
  self.rate   = 1.0f;
  self.paused = NO;

  // Time updates (quarter-second)
  __weak typeof(self) wself = self;
  self.timeObserver =
      [self.player addPeriodicTimeObserverForInterval:CMTimeMakeWithSeconds(0.25, NSEC_PER_SEC)
                                                queue:dispatch_get_main_queue()
                                           usingBlock:^(CMTime t) {
    __strong typeof(wself) sself = wself;
    if (!sself) return;
    Float64 s = CMTimeGetSeconds(t);
    if (isfinite(s)) {
      [sself emitEvent:@"timeupdate" detail:@{@"currentTime": @(s)}];
    }
  }];

  // Ended notification
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(itemDidEnd:)
                                               name:AVPlayerItemDidPlayToEndTimeNotification
                                             object:nil];

  return view;
}

- (void)dealloc {
  if (self.timeObserver) {
    @try { [self.player removeTimeObserver:self.timeObserver]; }
    @catch (__unused NSException *e) {}
    self.timeObserver = nil;
  }
  if (self.item) {
    @try { [self.item removeObserver:self forKeyPath:@"status"]; }
    @catch (__unused NSException *e) {}
  }
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - Layout

- (void)layoutDidFinished {
  // Ensure layer fills when Lynx sets final bounds
  self.view.layer.frame = self.view.bounds;
}

#pragma mark - Prop setters (from JS/DSL)

LYNX_PROP_SETTER("src", setSrc, NSString *) {
  if (!value || !value.length) return;
  NSURL *url = [NSURL URLWithString:value];
  if (!url) return;
  self.srcURL = url;
  [self loadItem:url];
}

LYNX_PROP_SETTER("autoplay", setAutoplay, BOOL) {
  self.autoplay = value;
  if (self.autoplay && self.item && !self.paused) {
    [self playInternal];
  }
}

LYNX_PROP_SETTER("loop", setLoop, BOOL) {
  self.loop = value;
}

LYNX_PROP_SETTER("muted", setMutedProp, BOOL) {
  self.muted = value;
  self.player.muted = value;
  self.player.volume = self.muted ? 0.0f : self.volume;
}

LYNX_PROP_SETTER("volume", setVolumeProp, CGFloat) {
  self.volume = (float)value;
  if (!self.muted) self.player.volume = self.volume;
}

LYNX_PROP_SETTER("rate", setRateProp, CGFloat) {
  self.rate = (float)value;
  if (self.player.rate > 0) self.player.rate = self.rate;
}

LYNX_PROP_SETTER("paused", setPausedProp, BOOL) {
  self.paused = value;
  if (self.paused) {
    [self.player pause];
    [self emitEvent:@"pause" detail:@{}];
  } else {
    [self playInternal];
  }
}

#pragma mark - Item loading / KVO

- (void)loadItem:(NSURL *)url {
  // Remove old KVO safely
  if (self.item) {
    @try { [self.item removeObserver:self forKeyPath:@"status"]; }
    @catch (__unused NSException *e) {}
  }

  // Create & observe new item
  self.item = [AVPlayerItem playerItemWithURL:url];
  [self.item addObserver:self
              forKeyPath:@"status"
                 options:(NSKeyValueObservingOptionInitial | NSKeyValueObservingOptionNew)
                 context:nil];

  [self.player replaceCurrentItemWithPlayerItem:self.item];

  // Apply current audio state
  self.player.muted = self.muted;
  self.player.volume = self.muted ? 0.0f : self.volume;
}

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)obj
                        change:(NSDictionary<NSKeyValueChangeKey,id> *)change
                       context:(void *)ctx {
  if (obj == self.item && [keyPath isEqualToString:@"status"]) {
    if (self.item.status == AVPlayerItemStatusReadyToPlay) {
      [self emitEvent:@"ready" detail:@{@"duration": @([self itemDuration])}];
      if (self.autoplay && !self.paused) [self playInternal];
    } else if (self.item.status == AVPlayerItemStatusFailed) {
      NSString *msg = self.item.error.localizedDescription ?: @"unknown";
      [self emitEvent:@"error" detail:@{@"message": msg}];
    }
  } else {
    [super observeValueForKeyPath:keyPath ofObject:obj change:change context:ctx];
  }
}

- (Float64)itemDuration {
  CMTime d = self.item.duration;
  return CMTIME_IS_NUMERIC(d) ? CMTimeGetSeconds(d) : 0.0;
}

#pragma mark - Playback helpers

- (void)playInternal {
  if (!self.item) return;
  [self.player play];
  self.player.rate = (self.rate <= 0.f) ? 1.0f : self.rate;
  [self emitEvent:@"play" detail:@{}];
}

- (void)itemDidEnd:(NSNotification *)n {
  if (n.object != self.item) return;
  [self emitEvent:@"ended" detail:@{}];
  if (self.loop) {
    [self.player seekToTime:kCMTimeZero toleranceBefore:kCMTimeZero toleranceAfter:kCMTimeZero];
    [self playInternal];
  }
}

#pragma mark - UI methods (imperative API)

// All LYNX_UI_METHOD blocks get `NSDictionary *params` and `LynxUIMethodCallback callback`

LYNX_UI_METHOD(play) {
  self.paused = NO;
  [self playInternal];
  callback(kUIMethodSuccess, nil);
}

LYNX_UI_METHOD(pause) {
  self.paused = YES;
  [self.player pause];
  [self emitEvent:@"pause" detail:@{}];
  callback(kUIMethodSuccess, nil);
}

LYNX_UI_METHOD(seekTo) { // params: { "seconds": number }
  NSNumber *sec = params[@"seconds"];
  if (!sec) { callback(kUIMethodParamInvalid, @"missing seconds"); return; }
  CMTime t = CMTimeMakeWithSeconds(sec.doubleValue, NSEC_PER_SEC);
  [self.player seekToTime:t
         toleranceBefore:kCMTimeZero
          toleranceAfter:kCMTimeZero
       completionHandler:^(__unused BOOL finished) {
         callback(kUIMethodSuccess, nil);
       }];
}

LYNX_UI_METHOD(setRate) { // params: { "rate": number }
  NSNumber *r = params[@"rate"];
  if (!r) { callback(kUIMethodParamInvalid, @"missing rate"); return; }
  self.rate = r.floatValue;
  if (self.player.rate > 0) self.player.rate = self.rate;
  callback(kUIMethodSuccess, nil);
}

LYNX_UI_METHOD(setVolume) { // params: { "volume": number 0..1 }
  NSNumber *v = params[@"volume"];
  if (!v) { callback(kUIMethodParamInvalid, @"missing volume"); return; }
  self.volume = v.floatValue;
  if (!self.muted) self.player.volume = self.volume;
  callback(kUIMethodSuccess, nil);
}

LYNX_UI_METHOD(setMuted) { // params: { "muted": boolean }
  NSNumber *m = params[@"muted"];
  if (!m) { callback(kUIMethodParamInvalid, @"missing muted"); return; }
  self.muted = m.boolValue;
  self.player.muted = self.muted;
  self.player.volume = self.muted ? 0.0f : self.volume;
  callback(kUIMethodSuccess, nil);
}

#pragma mark - Event dispatch

- (void)emitEvent:(NSString *)name detail:(NSDictionary *)detail {
  // Uses the detail-capable custom event variant; adjust if your Lynx SDK differs.
  LynxCustomEvent *ev = [[LynxDetailEvent alloc] initWithName:name
                                                   targetSign:[self sign]
                                                       detail:detail ?: @{}];
  [self.context.eventEmitter dispatchCustomEvent:ev];
}

@end
