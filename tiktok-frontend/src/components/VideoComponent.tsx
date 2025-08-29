import AutoplayVideo from './native-elements/AutoplayVideo.js'; // yet to be implemented
import BadgesMainPageUI from './BadgesMainPageUI.js';

import ProfileIcon from '../assets/misc-icons/profile.png';
import HeartIcon from '../assets/misc-icons/heart.png';
import MessageIcon from '../assets/misc-icons/message.png';
import SaveIcon from '../assets/misc-icons/save.png';
import ShareIcon from '../assets/misc-icons/share.png';

type BadgesProps = {
    videoBadges: Record<number, number>;
};

function IconButtonColumn() {
    return (
        <view style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            alignItems: 'center'
        }}>
            <image src={ProfileIcon} style="width:60px;height:60px;margin:5px;"></image>

            <image src={HeartIcon} style="width:55px;height:55px;margin:5px;"></image>

            <image src={MessageIcon} style="width:60px;height:60px;margin:5px;"></image>

            <image src={SaveIcon} style="width:50px;height:45px;margin:5px;"></image>

            <image src={ShareIcon} style="width:55px;height:55px;margin:5px;"></image>
        </view>
    );
}

function Overlay({videoBadges}: { videoBadges: Record<number, number> }) {
    return <view style={{
        // background:'white',
        position: 'absolute',
        zIndex: '1',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        // background:'red'
    }}>
        {/* UI on the left - badges, creatorname, description */}
        <view style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end'
        }}>
            {/* LIMIT SIZE */}
            <BadgesMainPageUI videoBadges={videoBadges}/>

            {/* change font with fontsize and fonttype (bold) */}
            <text>Creator Name</text>
            <text>Video Description</text>

        </view>

        {/* UI on the right - profile, heart, message, save, share*/}
        <IconButtonColumn></IconButtonColumn>
    </view>;
}

//this will have the SHORT VIDEO UI + autoplay video
export default function VideoComponent({videoBadges}: BadgesProps) { //id: string, badgesInfo:Record<string, Record<number, number>>
    return (
        <view style={{
            height: '100%',
            width: '100%',
            background: 'red',
        }}>
            <view style={{
                position: 'relative',
                // display:'block',
                // background:'red',
                height: '100%',
                width: '100%'
            }}>

                {/* UI OVERLAY */}
                <Overlay videoBadges={videoBadges}></Overlay>

                {/* Native Autoplay Video Component*/}
                <view style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: '0',
                    // background:'red',
                }}>

                    <AutoplayVideo/>
                </view>

            </view>
        </view>
    );


}