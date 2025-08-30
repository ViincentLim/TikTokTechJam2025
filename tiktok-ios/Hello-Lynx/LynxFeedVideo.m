#import "LynxFeedVideo.h"
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
#import <Lynx/LynxUIMethodProcessor.h>

@interface LynxFeedVideo ()
@property(nonatomic, strong) AVPlayer *player;
@property(nonatomic, strong) AVPlayerItem *item;
@property(nonatomic, strong) id timeObserver;
@property(nonatomic, assign) BOOL autoplay;
@property(nonatomic, assign) BOOL loop;
@property(nonatomic, assign) BOOL muted;
@property(nonatomic, assign) BOOL paused;   // if true => force pause
@property(nonatomic, assign) float volume;
@property(nonatomic, assign) float rate;
@property(nonatomic, strong) NSURL *srcURL;
@end

@implementation LynxPlayerView
+ (Class)layerClass { return [AVPlayerLayer class]; }
- (AVPlayerLayer *)playerLayer { return (AVPlayerLayer *)self.layer; }
- (void)setPlayer:(AVPlayer *)player { [self playerLayer].player = player; }
@end

@implementation LynxFeedVideo

LYNX_LAZY_REGISTER_UI("feed-video") // tag name used in Lynx DSL

#pragma mark - Create view
- (LynxPlayerView *)createView {
  LynxPlayerView *view = [[LynxPlayerView alloc] initWithFrame:CGRectZero];
  view.backgroundColor = [UIColor blackColor];
  view.player = self.player = [[AVPlayer alloc] init];
  // TikTok-like fill
  view.playerLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;

  // defaults
  self.autoplay = NO;
  self.loop = YES;
  self.muted = YES;
  self.volume = 1.0f;
  self.rate = 1.0f;
  self.paused = NO;

  // periodic time update (0.25s)
  __weak typeof(self) wself = self;
  self.timeObserver = [self.player addPeriodicTimeObserverForInterval:CMTimeMakeWithSeconds(0.25, NSEC_PER_SEC)
                                                                queue:dispatch_get_main_queue()
                                                           usingBlock:^(CMTime t) {
    __strong typeof(wself) sself = wself;
    if (!sself) return;
    float seconds = CMTimeGetSeconds(t);
    if (isfinite(seconds)) {
      [sself emitEvent:@"timeupdate" detail:@{@"currentTime": @(seconds)}];
    }
  }];

  // ended handling
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(itemDidEnd:)
                                               name:AVPlayerItemDidPlayToEndTimeNotification
                                             object:nil];

  return view;
}

- (void)dealloc {
  if (self.timeObserver) {
    [self.player removeTimeObserver:self.timeObserver];
    self.timeObserver = nil;
  }
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - Layout
- (void)layoutDidFinished {
  // Lynx sets frame; ensure layer fits
  self.view.layer.frame = self.view.bounds;
}

#pragma mark - Prop setters (from front-end)
LYNX_PROP_SETTER("src", setSrc, NSString *) {
  if (!value || !value.length) return;
  NSURL *url = [NSURL URLWithString:value];
  if (!url) return;
  self.srcURL = url;
  [self loadItem:url];
}

LYNX_PROP_SETTER("autoplay", setAutoplay, BOOL) {
  self.autoplay = value;
  if (self.autoplay && self.item && !self.paused) [self playInternal];
}

LYNX_PROP_SETTER("loop", setLoop, BOOL) {
  self.loop = value;
}

LYNX_PROP_SETTER("muted", setMutedProp, BOOL) {
  self.muted = value;
  self.player.muted = value;
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

#pragma mark - Load & playback
- (void)loadItem:(NSURL *)url {
  // clean old item
  [self.item removeObserver:self forKeyPath:@"status" context:nil];
  self.item = [AVPlayerItem playerItemWithURL:url];

  // observe status
  [self.item addObserver:self forKeyPath:@"status" options:NSKeyValueObservingOptionInitial|NSKeyValueObservingOptionNew context:nil];

  [self.player replaceCurrentItemWithPlayerItem:self.item];
  self.player.muted = self.muted;
  self.player.volume = self.muted ? 0.0f : self.volume;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)obj change:(NSDictionary *)chg context:(void *)ctx {
  if (obj == self.item && [keyPath isEqualToString:@"status"]) {
    if (self.item.status == AVPlayerItemStatusReadyToPlay) {
      [self emitEvent:@"ready" detail:@{@"duration": @([self itemDuration])}];
      if (self.autoplay && !self.paused) [self playInternal];
    } else if (self.item.status == AVPlayerItemStatusFailed) {
      NSString *msg = self.item.error.localizedDescription ?: @"unknown";
      [self emitEvent:@"error" detail:@{@"message": msg}];
    }
  }
}

- (Float64)itemDuration {
  CMTime d = self.item.duration;
  return CMTIME_IS_NUMERIC(d) ? CMTimeGetSeconds(d) : 0.0;
}

- (void)playInternal {
  if (!self.item) return;
  [self.player play];
  self.player.rate = self.rate <= 0 ? 1.0f : self.rate;
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

#pragma mark - UI methods (imperative APIs)
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
  NSNumber *sec = self.context.methodParams[@"seconds"];
  if (!sec) { callback(kUIMethodIllegalParams, @"missing seconds"); return; }
  CMTime t = CMTimeMakeWithSeconds([sec doubleValue], NSEC_PER_SEC);
  [self.player seekToTime:t toleranceBefore:kCMTimeZero toleranceAfter:kCMTimeZero completionHandler:^(BOOL finished){
    callback(kUIMethodSuccess, nil);
  }];
}

LYNX_UI_METHOD(setRate) { // params: { "rate": number }
  NSNumber *r = self.context.methodParams[@"rate"];
  if (!r) { callback(kUIMethodIllegalParams, @"missing rate"); return; }
  self.rate = r.floatValue;
  if (self.player.rate > 0) self.player.rate = self.rate;
  callback(kUIMethodSuccess, nil);
}

LYNX_UI_METHOD(setVolume) { // params: { "volume": number 0..1 }
  NSNumber *v = self.context.methodParams[@"volume"];
  if (!v) { callback(kUIMethodIllegalParams, @"missing volume"); return; }
  self.volume = v.floatValue;
  if (!self.muted) self.player.volume = self.volume;
  callback(kUIMethodSuccess, nil);
}

LYNX_UI_METHOD(setMuted) { // params: { "muted": boolean }
  NSNumber *m = self.context.methodParams[@"muted"];
  if (!m) { callback(kUIMethodIllegalParams, @"missing muted"); return; }
  self.muted = m.boolValue;
  self.player.muted = self.muted;
  self.player.volume = self.muted ? 0.0f : self.volume;
  callback(kUIMethodSuccess, nil);
}

#pragma mark - Event dispatch
- (void)emitEvent:(NSString *)name detail:(NSDictionary *)detail {
  LynxCustomEvent *ev = [[LynxDetailEvent alloc] initWithName:name
                                                   targetSign:[self sign]
                                                       detail:detail ?: @{}];
  [self.context.eventEmitter dispatchCustomEvent:ev];
}

@end
