// import AutoplayVideo from "./native-elements/AutoplayVideo.js"; // yet to be implemented
import BadgesMainPageUI from "./BadgesMainPageUI.js";
import { useStore } from "../store.js";

type NativeVideoProps = {playThisVideo:boolean}


const ProfileIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/profile.53750314.png?token=GHSAT0AAAAAADIVE6YWZX5NIXSWFX52B6IA2FSXF5Q';
const ShareIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/share.82c0f18a.png?token=GHSAT0AAAAAADIVE6YWT2X6F5OIS7YDLVDW2FSXJZA';
const HeartIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/heart.697d5280.png?token=GHSAT0AAAAAADIVE6YXTC3I2AQ7RPRVWUEQ2FSXOFA';
const MessageIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/message.d2c37452.png?token=GHSAT0AAAAAADIVE6YWWUBDHK7LNOFLKVM22FSXOTA';
const SaveIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/save.080d7bdc.png?token=GHSAT0AAAAAADIVE6YXMIJCMRSB6PQREMFE2FSXPAA';

type OverlayProps = {
  id: string;
};

type VideoProps = {
  id: string;
  videoUrl: string;
};

function IconButtonColumn() {
  return (
    <view
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <image
        src={ProfileIcon}
        style="width:55px;height:55px;margin:5px;padding:1px"
      ></image>

      <image src={HeartIcon} style="width:40px;height:40px;margin:10px;padding:3px"></image>

      <image
        src={MessageIcon}
        style="width:40px;height:40px;margin:10px;padding:2px"
      ></image>

      <image src={SaveIcon} style="width:35px;height:35px;margin:10px;padding:2px"></image>

      <image src={ShareIcon} style="width:40px;height:40px;margin:10px;padding:4px"></image>
    </view>
  );
}

function Overlay({ id }: OverlayProps) {
  return (
    <view
      style={{
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* UI on the left - badges, creatorname, description */}
      <view
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <view style="margin-left:10px;">
          <BadgesMainPageUI id={id} />
        </view>

        {/* change font with fontsize and fonttype (bold) */}
        <text
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginLeft: "10px",
            marginBottom: "3px",
            marginTop: "5px",
          }}
        >
          Creator Name
        </text>
        <text
          style={{ fontSize: "16px", marginLeft: "10px", marginBottom: "10px" }}
        >
          Video Description
        </text>
      </view>

      {/* UI on the right - profile, heart, message, save, share*/}
      <IconButtonColumn></IconButtonColumn>
    </view>
  );
}

//this will have the SHORT VIDEO UI + autoplay video
export default function VideoComponent({ id, videoUrl }: VideoProps) {
  // const { playingVideo } = useStore();
  return (
    <view
      exposure-id={id}
      exposure-area='75%'
      style={{
        height: "100%",
        width: "100%",
        background: "#383838ff",
      }}
    >
      <view
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {/* UI OVERLAY */}
        <Overlay id={id}></Overlay>

        {/* Native Autoplay Video Component*/}
        <view
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: "100%",
            width: "100%",
            zIndex: "0",
          }}
        >
          {/* <AutoplayVideo playThisVideo={playingVideo==id}/> */}

          {/* @vincent */}
          {/* @ts-ignore - video is a valid Lynx custom element*/}
          {/* <video id={`video-${id}`} src={videoUrl}/> */}
          {/* @vincent */}
        </view>
      </view>
    </view>
  );
}
