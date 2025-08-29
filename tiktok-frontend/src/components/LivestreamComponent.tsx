import AutoplayVideo from './native-elements/AutoplayVideo.jsx'
import Badges from './BadgesMainPageUI.js'

//this will have the LIVESTREAM UI + autoplay video
export default function LivestreamComponent(){


    return (
        <view style={{
            position:"relative",
        }}>

            {/* UI OVERLAY */}
            <view style={{
                position:"absolute",
                zIndex:"2",
                display:"flex",
                flexDirection:"column",
                alignItems:"end", //push downwards
            }}>
                {/* Circle */}
                {/* Heart */}
                {/* Comment */}
                {/* Share */}
                
                <view style={{
                    display:'flex',
                    justifyContent:"space-between"
                }}>
                    <view style={{
                        display:'flex',
                        flexDirection:'column',
                    }}>
                        <text>Creator Name</text>
                        <view style={{display:'flex'}}>
                            <text>Video Description</text>
                            <Badges/>
                        </view>
                        

                    </view>

                    {/* Circle */}

                </view>

            </view>

            {/* Native Autoplay Video */}
            <view style={{
                position:"absolute",
                zIndex:"1",
            }}>
                <AutoplayVideo/>
            </view>

        </view>
    )
}