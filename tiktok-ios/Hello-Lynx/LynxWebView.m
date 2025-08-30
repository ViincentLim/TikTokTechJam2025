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
  WKWebViewConfiguration *cfg = [WKWebViewConfiguration new];
  cfg.preferences.javaScriptEnabled = YES;
  self.webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:cfg];
  self.webView.navigationDelegate = self;
  return self.webView;
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
