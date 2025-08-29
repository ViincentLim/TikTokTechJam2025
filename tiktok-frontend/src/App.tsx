import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";

import VideoComponent from "./components/VideoComponent.js";
import LivestreamComponent from "./components/LivestreamComponent.js";
import BottomBar from "./components/BottomBar.js";
import Popup from "./components/Popup.jsx";

// import RechargePopup from "./components/RechargePopup.jsx"; // yet to implment

export function App(props: { onRender?: () => void }) {
  const [alterLogo, setAlterLogo] = useState(false);

  //const [currentPage, setCurrentPage] = useState('doomscroll');
  //for if we are implementing the shop page. Rn it will just be the doomscroll page + coin recharge popup

  const [videoBadges, setVideoBadges] = useState({
    video1: [3, 2, 1, 1, 2],
    video2: [1, 2, 3, 2, 3],
    livestream1: [1, 1, 1, 1],
  });

  return (
    <view style={{ display: "flex", flexDirection: "column", }}>
      {/* MAIN SCROLLING PAGE */}
      {/* <scroll-view style={{ background: "red", height: "89vh" }}></scroll-view> */}

      {/* FOR TESTING */}
      <view style={{ height: "89vh" }}>
        {/* <VideoComponent/> */}
        <LivestreamComponent/>
      </view>
      

      <BottomBar />
    </view>
  );
}
