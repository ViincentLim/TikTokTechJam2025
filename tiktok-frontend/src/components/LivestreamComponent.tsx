import AutoplayVideo from './native-elements/AutoplayVideo.js' // yet to be implemented
import BadgesMainPageUI from './BadgesMainPageUI.js'

import ProfileIcon from '../assets/misc-icons/profile.png'
import ShopIcon from '../assets/misc-icons/shop.png'
import SmileyIcon from '../assets/misc-icons/smiley.png'
import FriendsIcon from '../assets/misc-icons/friends.png'
import RoseIcon from '../assets/misc-icons/rose.png'
import GiftIcon from '../assets/misc-icons/gift.png'
import ShareIcon from '../assets/misc-icons/share.png'

type VideoProps = {
  id: string;
  videoUrl: string;
};

//this will have the LIVESTREAM UI + autoplay video
export default function LivestreamComponent({ id, videoUrl }: VideoProps){
    return (
        <view style={{
            position:"relative",
            height: "100%",
            width: '100vw',
            background: "#383838ff",
        }}>

            {/* UI OVERLAY */}
            <view style={{
                // background:'white',
                padding:'10px',
                position:"absolute",
                zIndex:"2",
                height: "100%",
                width: '100vw',
                display:'flex',
                flexDirection:'column',
                // alignItems:'start',
                justifyContent:'space-between'
                
                }}>


                {/* UI on the top - (profile, name, follow), (description), (badges) */}
                <view style={{
                    display:'flex',
                    flexDirection:'column',
                    // background:'white',
                    alignSelf:'start',
                    paddingTop:'40px'
                }}>
                    <view style={{
                        display:'flex',
                        alignItems:'center',
                    }}>
                        <image src={ProfileIcon} style="width:60px;height:60px;margin-right:10px"></image>
                        <text style={{
                            fontWeight: "500",
                        }}>Creator Name</text>

                        {/* FOLLOW BUTTON */}
                        <view style={{
                            marginLeft:'15px',
                            display:'flex',
                            borderRadius:'20px',
                            width:'80px',
                            height:'40px',
                            justifyContent:'center',
                            alignItems:'center',
                            background:'#fD3C5F'
                        }}>
                            <text>+ Follow </text></view>
                    </view>
                    <text style='margin-left:5px;margin-top:3px;'>Livestream Description</text>

                    <view style='margin-left:3px;margin-top:10px;'>
                    <BadgesMainPageUI id={id}/>
                    </view>

                </view>

                {/* UI on the bottom - shop, pill w/ smiley face, friends, rose, gift, share*/}
                <view style={{
                    display:'flex',
                    width:'100vw',
                    justifyContent:'space-evenly',
                    alignSelf:'center',
                    alignItems:'center'
                }}>
                    <image src={ShopIcon} style="height:35px;width:35px;"></image>

                    {/* Message Box */}
                    <view style={{
                        padding: '8px',
                        display:'flex',
                        backgroundColor: "rgba(190, 190, 190, 0.35)",
                        width:'150px',
                        height:'40px',
                        borderRadius:'20px',
                        justifyContent:'space-between',
                        alignItems:'center',
                        }}>
                        <text style={{color: "rgba(255, 255, 255, 0.6)"}}> Type...</text>
                        <image src={SmileyIcon} style="height:30px;width:30px;"></image>
                    </view>

                    <image src={FriendsIcon} style="height:35px;width:35px;margin-top:5px"></image>
                    <image src={RoseIcon} style="height:35px;width:35px;margin-left:5px"></image>
                    <image src={GiftIcon} style="height:40px;width:40px;"></image>
                    <image src={ShareIcon} style="height:35px;width:35px;"></image>
                </view>

            </view>

            {/* Native Autoplay Video Component*/}
            <view style={{
                position:"absolute",
                height: "100%",
                width: '100vw',
                zIndex:"1",
                // background:'red',
            }}>
                <AutoplayVideo/>
            </view>

        </view>
    )
    
}