import { createContext } from "@lynx-js/react";
import Popup from "./Popup.js";
import Button from "./Button.js";
import { useStore } from "../store.js";
import { badgeData } from "../constants.js";

type BadgesProps = {
  id: string;
};

type BadgeIconProps = {
  type: number;
  count: number;
};

// const PopupContext = createContext(null);

function BadgeIcon({ type, count }: BadgeIconProps) {
  // const iconMap: Record<number, string> = {
  //   1: "🏆",
  //   2: "🎖️",
  //   3: "🏅",
  //   4: "🥇",
  //   5: "🥈",
  //   6: "🥉",
  // };
  const icon = badgeData[type]['icon'] || "❓";

  return (
    <view
      style={{
        padding: "2px",
        color: "white",
        margin: "5px",
        borderRadius: "24px", // More pronounced rounding for individual badges
        flexDirection: "row",
        display: "flex", // Ensure content inside BadgeIcon is also a row
        alignItems: "center",
        // justifyContent: '',
        // minWidth: '100px', // Give a minimum width for consistent sizing
        // height: '50px', // Give a fixed height
        // fontSize: '20px', // Adjust font size for the icon
        fontWeight: "bold",
      }}
    >
      <view
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <text>{icon}</text>

        <text style={{ marginLeft: "2px", fontSize: "14px", color: "white" }}>
          x{count}
        </text>
      </view>
    </view>
  );
}

export default function BadgesMainPageUI({ id }: BadgesProps) {
  const { isOpen, toggle, badges, setCurrentId } = useStore();

  const awardedBadges: Record<number, number> = {};
  for (const [type, count] of Object.entries(badges[id])) {
    const countNum = Number(count);
    if (countNum > 0) {
      awardedBadges[Number(type)] = countNum;
    }
  }

  // const awardedBadges = Object.entries(badges ?? {}).filter(([_, count]) => count > 0);
  // console.log('awardedBadges', awardedBadges);

  // CASE 1: No awards -> single medal button
  if (Object.keys(awardedBadges).length === 0) {
    return (
      <view
        bindtap={() => {
          toggle();
          setCurrentId(id);
        }}
        style={{
          padding: "8px",
          color: "white",
          // margin: "4px",
          borderRadius: "24px", // More pronounced rounding for individual badges
          // flexDirection: "row",
          display: "flex", // Ensure content inside BadgeIcon is also a row
          // alignItems: "center",
          justifyContent: "center",
          // minWidth: '100px', // Give a minimum width for consistent sizing
          // minHeight: '80px', // Give a fixed height
          backgroundColor: "rgba(190, 190, 190, 0.35)",
        }}
      >
        <text style={{fontSize: "14px", color: "rgba(255, 255, 255, 0.6)"}}>🏅Gift a badge </text>
      </view>
    );
  }

  // CASE 2: Some awards -> show badges
  const maxVisible = 3;
  const visibleBadges = Object.entries(awardedBadges).slice(0, maxVisible);
  const remainingCount = Object.entries(awardedBadges).length - maxVisible;

  return (
    // TODO: Style width, should overlay video as well
    <view style={{ display: "flex", flexDirection: "row" }}>
      <Button
        onTap={() => {
          toggle();
          setCurrentId(id);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          padding: "4px",
          backgroundColor: "rgba(190, 190, 190, 0.35)",
          borderRadius: "25px",
          // minHeight: '100px',
          // width: 'min-content',
          // width: 'auto'
        }}
      >
        {isOpen && <Popup/>}
        {visibleBadges.map(([typeStr, count]) => (
          <BadgeIcon key={typeStr} type={Number(typeStr)} count={count} />
        ))}
        {remainingCount > 0 && (
          <view
            style={{
              // padding: "8px",
              color: "black",
              margin: "4px",
              borderRadius: "24px", // More pronounced rounding for individual badges
              flexDirection: "row",
              display: "flex", // Ensure content inside BadgeIcon is also a row
              alignItems: "center",
              justifyContent: "center",
              // minWidth: '100px', // Give a minimum width for consistent sizing
              // minHeight: '80px', // Give a fixed height
              fontWeight: "bold",
            }}
          >
            <text style={{ fontSize: "14px", fontWeight:'600', color: "white" }}>+{remainingCount}</text>
          </view>
        )}
      </Button>
    </view>
  );
}
