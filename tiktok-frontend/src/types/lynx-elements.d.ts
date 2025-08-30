// src/types/lynx-elements.d.ts
import type * as React from "@lynx-js/react";

type LynxEvent<T = unknown> = { detail: T };

interface WebViewProps {
  id?: string;
  url?: string;
  html?: string;
  allowsBackForwardNavigationGestures?: boolean;
  style?: React.CSSProperties | any;

  // Lynx uses bindxxx for events
  bindload?: () => void;
  binderror?: (e: LynxEvent<{ code?: number; message?: string }>) => void;
  bindprogress?: (e: LynxEvent<{ value: number }>) => void;

  // allow passthrough
  [key: string]: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "web-view": WebViewProps;
    }
  }
}
export {};
