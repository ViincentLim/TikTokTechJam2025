import {useState} from '@lynx-js/react';
import { useStore } from "../store.js";


export default function Captcha() {
    let [success, setSuccess] = useState<boolean | null>(null);
    const { toggle} = useStore();


    return (
        <view style={{
            width: '100%',
            height: '100%',
            background: success ? '#00ffff88' : '#ff000088',
        }}>
            <text>Solve the captcha</text>
            {/* @ts-ignore - web-view is a valid Lynx custom element*/}
            <web-view style={{
                width: '100%',
                height: '100%',
            }} url="https://whale-of-a-time-279628822139.asia-southeast1.run.app/captcha"
                bindgameover={(success: boolean)=>{
                    setSuccess(success);
                    toggle();
                }}
            >
                {/* @ts-ignore - web-view is a valid Lynx custom element*/}
            </web-view>
        </view>
    );
}