// LynxWebView.m
#import "LynxWebView.h"
#import <Lynx/LynxComponentRegistry.h>
#import <Lynx/LynxPropsProcessor.h>
@import WebKit;

@interface LynxWebView () <WKNavigationDelegate>
@property (nonatomic, strong) WKWebView *webView;
@property (nonatomic, copy) NSString *pendingURL;
@end

@implementation LynxWebView

// This registers the JSX tag <web-view>
LYNX_LAZY_REGISTER_UI("web-view")

- (WKWebView *)createView {
//    WKWebViewConfiguration *cfg = [WKWebViewConfiguration new];
////  cfg.preferences.javaScriptEnabled = YES;
//    cfg.defaultWebpagePreferences.allowsContentJavaScript = YES;
//    self.webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:cfg];
//    self.webView.navigationDelegate = self;
//    return self.webView;
  WKWebViewConfiguration *cfg = [WKWebViewConfiguration new];
  cfg.defaultWebpagePreferences.allowsContentJavaScript = YES;

  WKUserContentController *userContentController = [[WKUserContentController alloc] init];
  [userContentController addScriptMessageHandler:self name:@"onGameOver"];
  cfg.userContentController = userContentController;

  self.webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:cfg];
  self.webView.navigationDelegate = self;
  // Print created view
  NSLog(@"Created WKWebView: %@", self.webView);
  return self.webView;
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    if ([message.name isEqualToString:@"onGameOver"]) {
        // Handle the message from JavaScript
        BOOL isGameOver = [message.body boolValue];
//        NSLog(@"Game Over: %@", isGameOver ? @"YES" : @"NO");

        // Emit an event if needed
        [self emitEvent:@"gameover" detail:@{@"value": @(isGameOver)}];
    }
}

- (void)emitEvent:(NSString *)name detail:(NSDictionary *)detail {
  LynxCustomEvent *eventInfo = [[LynxDetailEvent alloc] initWithName:name
                                                          targetSign:[self sign]
                                                              detail:detail];
  [self.context.eventEmitter dispatchCustomEvent:eventInfo];
}

// React to url prop changes: <web-view url="https://example.com" />
LYNX_PROP_SETTER("url", setURL, NSString *) {
  self.pendingURL = value ?: @"";
  if (self.pendingURL.length == 0) return;
  NSURL *u = [NSURL URLWithString:self.pendingURL];
  if (!u) return;
  [self.webView loadRequest:[NSURLRequest requestWithURL:u]];
}

#pragma mark - WKNavigationDelegate (optional events)
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)nav {
  // emit a 'load' event if you later wire event emission
}
@end
