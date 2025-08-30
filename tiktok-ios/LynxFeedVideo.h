#import <Lynx/LynxUI.h>
#import <AVFoundation/AVFoundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LynxPlayerView : UIView
@property(nonatomic, strong, nullable) AVPlayer *player;
@end

@interface LynxFeedVideo : LynxUI<LynxPlayerView *>
@end

NS_ASSUME_NONNULL_END
