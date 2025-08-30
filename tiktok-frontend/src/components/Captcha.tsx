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
            }} url="http://localhost:9090/"
                bindgameover={(v:boolean)=>{setSuccess(v);toggle();}}
            >
                {/* @ts-ignore - web-view is a valid Lynx custom element*/}
            </web-view>
        </view>
    );
}