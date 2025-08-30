import WebView from "./native-elements/WebView.js";
import {useState} from '@lynx-js/react';

export default function Captcha() {
    let [success, setSuccess] = useState(false);

    return (
        <view style={{
            width: '100%',
            height: '100%',
            background: success ? "#00ffff88" : "#ff000088",
        }}>
            <text>Solve the captcha</text>
            {/* @ts-ignore - web-view is a valid Lynx custom element*/}
            <web-view style={{
                width: '100%',
                height: '100%',
            }} url="http://localhost:9090/"
                bindgameover={setSuccess}
            >
            {/* @ts-ignore - web-view is a valid Lynx custom element*/}
            </web-view>
        </view>
    )
}