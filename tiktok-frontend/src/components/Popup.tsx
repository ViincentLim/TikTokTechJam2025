import { useState } from "react";
import Arrow from "../assets/arrow.png";
import Coin from "../assets/misc-icons/coin.png";
import { useStore } from "../store.js";
import "../css/popupSlide.css";
import Captcha from "./Captcha.js";
import { badgeData } from "../constants.js";

type PopupProps = {
  awardedBadges: Record<number, number>;
};

const BadgeWrapper = ({ url }: any) => {
  return (
    <view className="Logo">
      <image auto-size style="width:90px" src={url} className="Logo" />
    </view>
  );
};

// TODO: add href/function that is clickable
const TopBadge = ({ url, quantity, placeholderText }: any) => {
  return (
    <view
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BadgeWrapper url={url} />
      <text style={{ color: "#444", fontSize: "16px", marginTop: "4px" }}>
        {quantity > 0 ? `x${quantity}` : placeholderText}
      </text>
    </view>
  );
};

// TODO: add href/function that is clickable
const BottomBadge = ({ url, desc, cost, mediaName, id, increment }: any) => {
  return (
    <view className="BottomBadge" bindtap={() => increment(mediaName, id)}>
      <BadgeWrapper url={url} />
      <text style={{ color: "#444", fontSize: "16px" }}>{desc}</text>
      <view
        style={{ alignSelf: "center", display: "flex", alignItems: "center" }}
      >
        <image src={Coin} style="height:15px;width:15px;margin:5px;"></image>
        <text style={{ color: "#444", fontSize: "12px" }}>{cost}</text>
      </view>
    </view>
  );
};

const topBadgeList = [
  { quantity: 1, url: Arrow, id: 1 },
  { quantity: 1, url: Arrow, id: 2 },
  { quantity: 5, url: Arrow, id: 3 },
  { quantity: 1, url: Arrow, id: 4 },
  { quantity: 1, url: Arrow, id: 5 },
  { quantity: 1, url: Arrow, id: 6 },
];

//const bottomBadgeList = [
//  {desc: 'Bottom Badge 1', url: Arrow, id: 1},
//  {desc: 'Bottom Badge 2', url: Arrow, id: 2},
//  {desc: 'Bottom Badge 3', url: Arrow, id: 3},
//  {desc: 'Bottom Badge 4', url: Arrow, id: 4},
//  {desc: 'Bottom Badge 2', url: Arrow, id: 5},
//  {desc: 'Bottom Badge 3', url: Arrow, id: 6},
//  {desc: 'Bottom Badge 4', url: Arrow, id: 7},
//  {desc: 'Bottom Badge 2', url: Arrow, id: 8},
//  {desc: 'Bottom Badge 3', url: Arrow, id: 9},
//  {desc: 'Bottom Badge 4', url: Arrow, id: 10},
// ];;

function Header() {
  return;
}

export default function Popup() {
  const { currentId, toggle, badges, incrBadge } = useStore();
  const [showCaptcha, setShowCaptcha] = useState(false);
  // setTimeout(() => {
  //     toggle();
  // }, 1000);
  // bindtap to toggle for the entire popup element to fix bug where popup closes when anywhere on popup is clicked
  return (
    <view
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      bindtap={toggle}
    >
      <view
        // bindtap={(e) => e.stopPropagation()}
        className="slide-up"
        style={{
          width: "100%",
          // minWidth: '300px',
          height: "80%",
        }}
      >
        <view
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "0 0 32px 0",
            width: "100%",
            height: "100%",
            boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
            position: "relative",
            display: showCaptcha ? "none" : "flex",
            flexDirection: "column",
            // overflow: "hidden",
          }}
        >
          <view
            style={{
              width: "100%",
              height: "80px",
              background: "#20252aff",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "24px",
              marginBottom: "24px",
            }}
          >
            <text
              style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            >
              Send an Award
            </text>
            <view
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#f0f0f0",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#333",
                zIndex: 2,
              }}
              aria-label="Close"
              bindtap={toggle}
            >
              <text
                style={{
                  color: "#222",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                ×
              </text>
            </view>
          </view>

          <view
            style={{
              padding: "0px 24px",
              display: "flex",
              flexDirection: "column",
              width: "100vw",
            }}
          >
            <text style={{ color: "#444", fontSize: "16px" }}>
              Creator Awards
            </text>
            <scroll-view
              style={{
                display: "flex",
                padding: "8px 0",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                scrollPaddingLeft: "12px", // ← adds left scroll padding
              }}
              scroll-x={true} // enable horizontal scrolling
              show-scrollbar={false} // optional: hide scrollbar
            >
              {topBadgeList.filter((badge) => badges[currentId][badge.id] > 0)
                .length > 0 ? (
                topBadgeList
                  .filter((badge) => badges[currentId][badge.id] > 0)
                  .map((badge, index) => (
                    <TopBadge
                      key={index}
                      url={badge.url}
                      quantity={badges[currentId][badge.id]}
                      style={{ marginRight: "8px" }}
                    />
                  ))
              ) : (
                <TopBadge
                  url="/path/to/first-award.png" // placeholder image
                  quantity={0}
                  placeholderText="Be the first!"
                />
              )}
            </scroll-view>
            {/* Divider line */}
            <view
              style={{
                width: "100%", // full width of the container
                height: "1px", // 1px line
                backgroundColor: "#ddd", // light gray line
                margin: "12px 0", // space above and below
              }}
            />
            <view style={{ marginTop: "12px" }}>
              <view style={{ display: "flex", flexWrap: "wrap" }}>
                {/* {bottomBadgeList.map((badge, idx) => (
                                    <BottomBadge
                                        key={idx}
                                        url={badge.url}
                                        desc={badge.desc}
                                        mediaName={currentId}
                                        id={badge.id}
                                        increment={incrBadge}/>
              ))} */}

                {Object.entries(badgeData).map(([key, value]) => (
                  <BottomBadge
                    key={key}
                    url={value.url}
                    desc={value.desc}
                    cost={value.cost}
                    mediaName={currentId}
                    id={key}
                    increment={incrBadge}
                  />
                ))}
              </view>
            </view>
          </view>

          <view
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              padding: "12px 24px",
            }}
          >
            <view
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                padding: "12px 24px",
              }}
            >
              <view
                style={{
                  padding: "12px 32px",
                  background:
                    "linear-gradient(90deg, #ff3b5c 0%, #ff2a68 100%)", // TikTok red-pink
                  borderRadius: "9999px", // pill shape
                  boxShadow: "0 4px 12px rgba(255, 59, 92, 0.3)", // glow
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                }}
                bindtap={() => {
                  console.log("Recharge tapped");
                }}
              >
                <text
                  style={{
                    color: "#fff",
                    fontSize: "36px",
                    fontWeight: "bold",
                  }}
                >
                  Recharge
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>

      {/* {captcha page} */}

      <view style={{ display: showCaptcha ? "block" : "none" }}>
        <Captcha></Captcha>
      </view>
    </view>
  );
}
