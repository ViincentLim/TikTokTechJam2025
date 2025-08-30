import { useState } from "react";
import { useStore } from "../store.js";
import "../css/popupSlide.css";
import "../css/gridLayout.css";
import Captcha from "./Captcha.js";
import { badgeData } from "../constants.js";
const Arrow = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/arrow.aee54ba7.png?token=GHSAT0AAAAAADIVE6YXTQEVNTMPZUK7KGN22FSW7VA';
const Coin = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/coin.png?token=GHSAT0AAAAAADIVE6YWR7OSBZ6CCOPATSL42FSXE6A';

type PopupProps = {
  id:string;
};

const BadgeWrapper = ({ url }: any) => {
  return (
    <view className="Logo" style={{ display: "flex", justifyContent: "center" }}>
      <image
        src={url}
        style={{ width: "90px", height: "90px", objectFit: "contain" }}
      />
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
export const BottomBadge = ({ url, desc, cost, mediaName, id, increment }: any) => {
  return (
    <view className="BottomBadge" bindtap={() => increment(mediaName, id)} style={{
      width: "120px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <BadgeWrapper url={url} />

      <text
        style={{
          flexShrink: 0,        // prevent shrinking into row below
          flexWrap: "nowrap",
          color: "#444",
          fontSize: "14px",
          textAlign: "center"
        }}
      >
        {desc}
      </text>

      <view
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <image src={Coin} style={{ height: 15, width: 15 }} />
        <text
          style={{
            flexShrink: 0,
            flexWrap: "nowrap",
            color: "#444",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {cost}
        </text>
      </view>
    </view>
  );
};





// const topBadgeList = [
//   { quantity: 1, url: Arrow, id: 1 },
//   { quantity: 1, url: Arrow, id: 2 },
//   { quantity: 5, url: Arrow, id: 3 },
//   { quantity: 1, url: Arrow, id: 4 },
//   { quantity: 1, url: Arrow, id: 5 },
//   { quantity: 1, url: Arrow, id: 6 },
// ];

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
    const badgeEntries = Object.entries(badges[currentId]);
  
  // bindtap to toggle for the entire popup element to fix bug where popup closes when anywhere on popup is clicked
  return (
    <view
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
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
        {showCaptcha ? (
          <view style={{
            // display: "flex",
            width: "100%",
            height: "100%",
            // justifyContent: "stretch",
            background: "#fff",
          }}>
            <Captcha></Captcha>
          </view>
        ) : (
        <view
        style={{
          background: "#fff",
          borderTopRightRadius: '12px',
          borderTopLeftRadius: '12px',
          padding: "0 0 32px 0",
          width: "100%",
          height: "100%",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          position: "relative",
          display: "flex",
          // display: showCaptcha ? "none" : "flex",
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
              width: "100%",
            }}
          >
            <text style={{ color: "#444", fontSize: "16px" }}>
              Creator Awards
            </text>
            <scroll-view
              style={{
                display: "flex",
                paddingTop: "12px",
                paddingLeft: "12px",       // ← offsets first element
                paddingRight: "12px",      // optional, for last element
                height: "150px",
                flexDirection: "row",
                justifyContent: "flex-start", // align items to left
                width: "100%",
                marginBottom: "12px",
              }}
              scroll-x={true} // enable horizontal scrolling
              show-scrollbar={false} // optional: hide scrollbar
            >
             {badgeEntries.every(([key, quantity]) => quantity === 0) ?

              <TopBadge
                url="/path/to/first-award.png" // placeholder image
                quantity={0}
                placeholderText="No badges awarded yet...be the first!"
              />

              :

              badgeEntries.map(([badgeID, quantity]) =>
              quantity > 0 ?
              (
                <TopBadge
                  key={badgeID}
                  url={badgeData[parseInt(badgeID)].url}
                  quantity={badges[currentId][parseInt(badgeID)]}
                  style={{ marginRight: 8 }}

                />
              ) : (<></>)
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
            <view style={{ marginTop: "12px", height: "400px" }}>
              <scroll-view scroll-y style={{ height: "100%" }}>
                <view className="container" style={{ flexDirection: "row", flexWrap: "wrap", gap: "10px" }}>
                  {Object.entries(badgeData).map(([key, value]) => (
                    <view className="item" key={key}
                      style={{
                        width: "100%",         // same as your grid cell width
                        alignItems: "center", // center contents horizontally
                      }}
                    >
                      <BottomBadge style={{
                        width: "100px",         // same as your grid cell width
                        alignItems: "center", // center contents horizontally
                      }}
                        url={value.url}
                        desc={value.desc}
                        cost={value.cost}
                        mediaName={currentId}
                        id={key}
                        increment={incrBadge}
                      />
                    </view>
                  ))}
                </view>
              </scroll-view>
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
                  maxWidth: "250px",              // limit how wide the pill can grow
                  width: "auto",
                  maxHeight: "60px",
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
                  setShowCaptcha(true);
                }}
              >
              
                <text
                  style={{
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  Recharge
                </text>
              </view>
            </view>
          </view>
        </view>
        )}
      {/* {captcha page} */}

      <view style={{ display: showCaptcha ? "block" : "none" }}>
        <Captcha></Captcha>
      </view>
    </view>
    </view>
  );
}
