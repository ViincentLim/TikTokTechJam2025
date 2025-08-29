import {useState} from '@lynx-js/react';

import './App.css';
import BottomBar from './components/BottomBar.js';
import Badges from './components/BadgesMainPageUI.js';

// import RechargePopup from "./components/RechargePopup.jsx"; // yet to implment
const BOTTOM_BAR_HEIGHT = '48px';

export function App(props: { onRender?: () => void }) {
    const [alterLogo, setAlterLogo] = useState(false);

    //const [currentPage, setCurrentPage] = useState('doomscroll');
    //for if we are implementing the shop page. Rn it will just be the doomscroll page + coin recharge popup

    const [videoBadges, setVideoBadges] = useState({
        video1: {1: 5, 2: 3, 3: 0, 4: 1},
        video2: {1: 0, 2: 0, 3: 0, 4: 0},
        livestream1: {1: 1, 2: 1, 3: 1, 4: 1},
    });

    return (
        <view style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            {/* MAIN SCROLLING PAGE */}
            <scroll-view style={{background: 'red', height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`}}>
                {/*TODO: This should be video element, that can be scrolled later*/}
                <view style={{
                    width: '100vw',
                    height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`,
                    position: 'relative',
                    background: 'pink',
                }}>
                    <view style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                    }}>
                        <Badges videoBadges={videoBadges.video1}/>
                        <view></view>
                    </view>
                </view>
            </scroll-view>

            <BottomBar height={BOTTOM_BAR_HEIGHT}/>
        </view>
    );
}
