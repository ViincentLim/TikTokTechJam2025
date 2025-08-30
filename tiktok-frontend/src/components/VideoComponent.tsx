import AutoplayVideo from "./native-elements/AutoplayVideo.js"; // yet to be implemented
import BadgesMainPageUI from "./BadgesMainPageUI.js";

import ProfileIcon from "../assets/misc-icons/profile.png";
import HeartIcon from "../assets/misc-icons/heart.png";
import MessageIcon from "../assets/misc-icons/message.png";
import SaveIcon from "../assets/misc-icons/save.png";
import ShareIcon from "../assets/misc-icons/share.png";

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
        style="width:60px;height:60px;margin:5px;padding:1px"
      ></image>

      <image src={HeartIcon} style="width:55px;height:55px;margin:5px;padding:3px"></image>

      <image
        src={MessageIcon}
        style="width:60px;height:60px;margin:5px;padding:2px"
      ></image>

      <image src={SaveIcon} style="width:50px;height:45px;margin:5px;padding:2px"></image>

      <image src={ShareIcon} style="width:55px;height:55px;margin:5px;padding:4px"></image>
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
  return (
    <view
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
          {/* add videoUrl prop to AutoplayVideo */}
          <AutoplayVideo />
        </view>
      </view>
    </view>
  );
}
