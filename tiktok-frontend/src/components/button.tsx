import type { CSSProperties } from '@lynx-js/types';
import React from 'react';

export default function Button({ onTap, children, style }: { onTap: () => void, children: React.ReactNode; style?: CSSProperties }) {
    return (
        <view
            bindtap={onTap}
            style={{
                padding: '10px 20px',
                backgroundColor: '#ff2d55',
                borderRadius: '5px',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                ...style,
            }}
        >
            {children}
        </view>
    );
}
