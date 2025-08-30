import {useState} from '@lynx-js/react';

import "./App.css";
import BottomBar from "./components/BottomBar.js";
import VideoComponent from "./components/VideoComponent.js";
import LivestreamComponent from './components/LivestreamComponent.js';
import { videos } from "./constants.js";

// import RechargePopup from "./components/RechargePopup.jsx"; // yet to implment
const BOTTOM_BAR_HEIGHT = "85px";

export function App(props: { onRender?: () => void }) {
    //const [currentPage, setCurrentPage] = useState('doomscroll');
  //for if we are implementing the shop page. Rn it will just be the doomscroll page + coin recharge popup

  return (
    <view style={{ display: "flex", flexDirection: "column" }}>
      <scroll-view
        scroll-orientation="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          height: `calc(100vh - ${BOTTOM_BAR_HEIGHT})`,
          zIndex: "1",
        }}
      >
        {/* MAIN SCROLLING PAGE */}
        {/* NOTE / TODO: will have to hardcode the 4-5 example videos as some of these videos will have the livestreamUI instead of the videoUI */}
        {videos.map((video) => {
          return (
            <view
              style={{
                width: "100%",
                height: `calc(100% - ${BOTTOM_BAR_HEIGHT})`,
                background: "pink",
              }}
            >
              {video.livestream ? 
                (<LivestreamComponent id={video.id} videoUrl={video.videoUrl} />) :
                (<VideoComponent id={video.id} videoUrl={video.videoUrl} />)
              }

              {/* <VideoComponent id={video.id} videoUrl={video.videoUrl} /> */}

            </view>
          );
        })}
      </scroll-view>

      <BottomBar height={BOTTOM_BAR_HEIGHT} />
    </view>
  );
}
