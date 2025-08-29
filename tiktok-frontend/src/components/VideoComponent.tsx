import AutoplayVideo from './native-elements/AutoplayVideo.js' // yet to be implemented
import BadgesMainPageUI from './BadgesMainPageUI.js'

import ProfileIcon from '../assets/misc-icons/profile.png'
import HeartIcon from '../assets/misc-icons/heart.png'
import MessageIcon from '../assets/misc-icons/message.png'
import SaveIcon from '../assets/misc-icons/save.png'
import ShareIcon from '../assets/misc-icons/share.png'

//this will have the SHORT VIDEO UI + autoplay video
export default function VideoComponent(){ //id: string, badgesInfo:Record<string, Record<number, number>>
    return (
        <view style={{
            position:"relative",
            // display:'block',
            // background:'red',
            height: "89vh",
            width: '100vw'
        }}>

            {/* UI OVERLAY */}
            <view style={{
                // background:'white',
                position:"absolute",
                zIndex:"2",
                height: "89vh",
                width: '100vh',
                display:'flex',
                justifyContent:'space-between'
                }}>
                {/* UI on the left - badges, creatorname, description */}
                <view style={{
                    display:'flex',
                    flexDirection:'column',
                    // background:'white',
                    // alignContent:'start',
                    justifyContent:'end'
                }}>
                    {/* <view style='width:100px;height:10px;background:white'></view> */}
                    <BadgesMainPageUI/>
                    <text>Creator Name</text>
                    <text>Video Description</text>

                </view>

                {/* UI on the right - profile, heart, message, save, share*/}
                <view style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'end',
                    alignContent:'end'
                }}>
                    <image src={ProfileIcon} style="width:60px;height:60px;"></image>

                    <image src={HeartIcon} style="width:60px;height:60px;"></image>

                    <image src={MessageIcon} style="width:60px;height:60px;"></image>
                    
                    <image src={SaveIcon} style="width:60px;height:60px;"></image>

                    <image src={ShareIcon} style="width:60px;height:60px;"></image>
                </view>

            </view>

            {/* Native Autoplay Video Component*/}
            <view style={{
                position:"absolute",
                height: "89vh",
                width: '100vh',
                zIndex:"1",
                // background:'red',
            }}>
                
                <AutoplayVideo/>
            </view>

        </view>
    )



}