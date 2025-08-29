import {useState} from '@lynx-js/react';

import './App.css';
import BottomBar from './components/BottomBar.js';
import VideoComponent from './components/VideoComponent.js';

// import RechargePopup from "./components/RechargePopup.jsx"; // yet to implment
const BOTTOM_BAR_HEIGHT = '56px';

export function App(props: { onRender?: () => void }) {
    const [alterLogo, setAlterLogo] = useState(false);

    //const [currentPage, setCurrentPage] = useState('doomscroll');
    //for if we are implementing the shop page. Rn it will just be the doomscroll page + coin recharge popup

    const [videoBadgesMap, setVideoBadgesMap] = useState({
        video1: {1: 5, 2: 3, 3: 0, 4: 1},
        video2: {1: 0, 2: 0, 3: 0, 4: 0},
        livestream1: {1: 1, 2: 1, 3: 1, 4: 1},
    });

    return (
        <view style={{display: 'flex', flexDirection: 'column'}}>
            <scroll-view
                scroll-orientation="vertical"
                style={{
                    display: 'flex', flexDirection: 'column', height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`,
                    zIndex: '1'
                }}>
                {/* MAIN SCROLLING PAGE */}
                {/*<scroll-view style={{background: 'red', height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`}}>*/}
                {/*    /!*TODO: This should be video element, that can be scrolled later*!/*/}
                {/*    <view style={{*/}
                {/*        width: '100vw',*/}
                {/*        height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`,*/}
                {/*        position: 'relative',*/}
                {/*        background: 'pink',*/}
                {/*    }}>*/}
                {/*        <view style={{*/}
                {/*            position: 'absolute',*/}
                {/*            bottom: 0,*/}
                {/*            left: 0,*/}
                {/*            right: 0,*/}
                {/*            display: 'flex',*/}
                {/*        }}>*/}
                {/*            <Badges videoBadges={videoBadges.video1}/>*/}
                {/*            <view></view>*/}
                {/*        </view>*/}
                {/*    </view>*/}
                {/*</scroll-view>*/}
                {/*TODO: This should be video element, that can be scrolled later*/}
                {[videoBadgesMap.video1, videoBadgesMap.video2, videoBadgesMap.livestream1].map(videoBadges => {
                    return (
                        <view style={{
                            width: '100vw',
                            height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`,
                            background: 'pink',
                        }}>
                            <VideoComponent videoBadges={videoBadges}/>
                        </view>
                    );
                })}
            </scroll-view>

            <BottomBar height={BOTTOM_BAR_HEIGHT}/>
        </view>
    );
}
