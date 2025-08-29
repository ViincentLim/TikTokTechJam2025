import Arrow from "../assets/arrow.png";

const BadgeWrapper = ({ url }: any) => {
  return (
    <view className="Logo">
      <image auto-size style="width:90px" src={url} className="Logo" />
    </view>
  );
};

// TODO: add href/function that is clickable
const TopBadge = ({ url, quantity }: any) => {
  return (
    <view className="TopBadge">
      <BadgeWrapper url={url} />
      <text style={{ color: "#444", fontSize: 16 }}>{quantity}</text>
    </view>
  );
};

// TODO: add href/function that is clickable
const BottomBadge = ({ url, desc }: any) => {
  return (
    <view className="BottomBadge">
      <BadgeWrapper url={url} />
      <text style={{ color: "#444", fontSize: 16 }}>{desc}</text>
    </view>
  );
};

const topBadgeList = [
  { quantity: 1, url: Arrow },
  { quantity: 1, url: Arrow },
  { quantity: 5, url: Arrow },
  { quantity: 1, url: Arrow },
];

const bottomBadgeList = [
  { desc: "Bottom Badge 1", url: Arrow },
  { desc: "Bottom Badge 2", url: Arrow },
  { desc: "Bottom Badge 3", url: Arrow },
  { desc: "Bottom Badge 4", url: Arrow },
  { desc: "Bottom Badge 2", url: Arrow },
  { desc: "Bottom Badge 3", url: Arrow },
  { desc: "Bottom Badge 4", url: Arrow },
  { desc: "Bottom Badge 2", url: Arrow },
  { desc: "Bottom Badge 3", url: Arrow },
  { desc: "Bottom Badge 4", url: Arrow },
];

export default function Popup() {
  return (
    <view
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <view
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "0 0 32px 0",
          minWidth: "300px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <view
          style={{
            width: "100%",
            height: 48,
            background: "#1976d2",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 24,
            marginBottom: 24,
          }}
        >
          <text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Header
          </text>
        </view>
        <view
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "#f0f0f0",
            borderRadius: "50%",
            width: 36,
            height: 36,
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
        >
          <text
            style={{
              color: "#222",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            ×
          </text>
        </view>

        <view style={{ padding: "0px 24px" }}>
          <text
            style={{
              color: "#222",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 12,
            }}
          >
            Popup Card
          </text>
          <text style={{ color: "#444", fontSize: 16 }}>
            This is a simple popup card. Add your content here.
          </text>
          <view style={{ display: "flex" }}>
            {topBadgeList.map((badge, index) => (
              <TopBadge key={index} url={badge.url} quantity={badge.quantity} />
            ))}
          </view>
          <view style={{ marginTop: 12 }}>
            <view style={{ display: "flex", flexWrap: "wrap" }}>
              {bottomBadgeList.map((badge, idx) => (
                <BottomBadge key={idx} url={badge.url} desc={badge.desc} />
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
              padding: "12px 24px",
              background: "#9a1919",
            }}
            // TODO: does it work?
            bindtap={() => {
              console.log("Recharge tapped");
            }}
          >
            <text
              style={{
                color: "#444",
                fontSize: 16,
              }}
            >
              Recharge
            </text>
          </view>
        </view>
      </view>
    </view>
  );
}
