// WebView.tsx
import * as React from "@lynx-js/react";

type LynxEvent<T = unknown> = { detail: T };

// Note: Lynx custom elements like web-view are handled with @ts-ignore until type system is properly configured

type WebViewProps = {
  url?: string;
  html?: string;
  allowsBackForwardNavigationGestures?: boolean;
  onLoad?: () => void;
  onError?: (e: LynxEvent<{ code?: number; message?: string }>) => void;
  onProgress?: (value: number) => void;
  id?: string;
  style?: any;
};

export const WebView: React.FC<WebViewProps> = ({
  url,
  html,
  allowsBackForwardNavigationGestures,
  onLoad,
  onError,
  onProgress,
  id,
  style,
}) => {
  return (
    // @ts-ignore - web-view is a valid Lynx custom element
    <web-view
      id={id}
      url={url}
      html={html}
      allowsBackForwardNavigationGestures={allowsBackForwardNavigationGestures}
      bindload={onLoad}
      binderror={onError}
      bindprogress={(e: LynxEvent<{ value: number }>) => onProgress?.(e.detail.value)}
      style={style}
    />
  );
};

export default WebView;