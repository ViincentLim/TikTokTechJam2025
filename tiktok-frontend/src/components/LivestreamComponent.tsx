// import AutoplayVideo from './native-elements/AutoplayVideo.js' // yet to be implemented
import BadgesMainPageUI from './BadgesMainPageUI.js'

import { useStore } from "../store.js";

type NativeVideoProps = {playThisVideo:boolean}


const ProfileIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/profile.53750314.png?token=GHSAT0AAAAAADIVE6YWZX5NIXSWFX52B6IA2FSXF5Q';
const SmileyIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/smiley.png?token=GHSAT0AAAAAADIVE6YXYW3KFLNCCFECK4X42FSXG3Q';
const FriendsIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/friends.png?token=GHSAT0AAAAAADIVE6YW3XNPDHO27GIWHNC22FSXHVA';
const RoseIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/rose.png?token=GHSAT0AAAAAADIVE6YX6WLIU4FOHYVX4ZYK2FSXIJQ';
const GiftIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/gift.png?token=GHSAT0AAAAAADIVE6YW3ICYIM5WJSRGBHF62FSXI3Q';
const ShareIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/share.82c0f18a.png?token=GHSAT0AAAAAADIVE6YWT2X6F5OIS7YDLVDW2FSXJZA';
const ShopIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/shop.png?token=GHSAT0AAAAAADIVE6YX7I2H4WBWCD7YCO4G2FSXLAA';

type VideoProps = {
  id: string;
  videoUrl: string;
};

//this will have the LIVESTREAM UI + autoplay video
export default function LivestreamComponent({ id, videoUrl }: VideoProps){
    // const { playingVideo } = useStore();
    return (
        <view
            exposure-id={id}
            exposure-area='75%'
            style={{
                position:"relative",
                height: "100%",
                width: '100%',
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
            {/* @ts-ignore - video is a valid Lynx custom element*/}
            <feed-video style={{
                position:"absolute",
                height: "100%",
                width: '100%',
                zIndex:"1",
                // background:'red',
            }}>
                {/* <AutoplayVideo playThisVideo={playingVideo==id}/> */}

                {/* @vincent */}
                {/* @ts-ignore - video is a valid Lynx custom element*/}
                {/* <video id={`video-${id}`} src={videoUrl}/> */}
                {/* @vincent */}
                {/* @ts-ignore - video is a valid Lynx custom element*/}
            </feed-video>

        </view>
    )
    
}