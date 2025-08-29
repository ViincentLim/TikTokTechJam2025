import { useCallback, useState } from '@lynx-js/react';
import AutoplayVideo from './native-elements/AutoplayVideo.js';

type BadgesProps = {
  videoBadges: Record<number, number>;
};

type BadgeIconProps = {
  type: number;
  count: number;
};

function BadgeIcon({ type, count }: BadgeIconProps) {
  const iconMap: Record<number, string> = {
    1: '💎',
    2: 'test2',
    3: '💎',
    4: '🏆',
  };
  const icon = iconMap[type] || '❓';

  return (
     <view style={{ 
        padding: 8, 
        color: 'white', 
        margin: 4,
        borderRadius: 24, // More pronounced rounding for individual badges
        flexDirection: 'row',
        display: 'flex', // Ensure content inside BadgeIcon is also a row
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100, // Give a minimum width for consistent sizing
        height: 50, // Give a fixed height
        fontSize: 20, // Adjust font size for the icon
        fontWeight: 'bold',
        }}>
        <view style={{ flexDirection: 'row', alignItems: 'center' }}>
        <text>{icon}</text>
        
          <text style={{ marginLeft: 2, fontSize: 24, color: 'white' }}>
            x{count}
          </text>
        
      </view>
    </view>
);

}

export default function Badges({ videoBadges }: BadgesProps) {
  
  const onTap = useCallback(() => {},[] );

  const awardedBadges = Object.entries(videoBadges).filter(([_, count]) => count > 0);
  console.log('awardedBadges', awardedBadges);

  // CASE 1: No awards -> single medal button
  if (awardedBadges.length === 0) {
    return (
      <view
        bindtap={onTap}
        style={{
          padding: 8, 
        color: 'white', 
        margin: 4,
        borderRadius: 24, // More pronounced rounding for individual badges
        flexDirection: 'row',
        display: 'flex', // Ensure content inside BadgeIcon is also a row
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100, // Give a minimum width for consistent sizing
        minHeight: 80, // Give a fixed height
        fontSize: 10, // Adjust font size for the icon
        fontWeight: 'bold',
        }}
      >
        <text style={{ fontSize: 40 }}>🎖️</text> {/* Wrap the icon in a <text> component for proper sizing */}
      </view>
    );
  }


  // CASE 2: Some awards -> show badges
  const maxVisible = 3;
  const visibleBadges = awardedBadges.slice(0, maxVisible);
  const remainingCount = awardedBadges.length - maxVisible;

  return (
    <view bindtap ={onTap} 
    style={{ 
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent:'flex-start',
        display:'flex',
        padding: 4,
        backgroundColor: 'rgba(243, 204, 9, 0.5)',
        borderRadius: 25,
        minHeight: 100,
        maxWidth: 'auto',
    }}>
      {visibleBadges.map(([typeStr, count]) => (
        <BadgeIcon key={typeStr} type={Number(typeStr)} count={count} />
      ))}
    {remainingCount > 0 && (
        <view style={{
         padding: 8, 
        color: 'black',
        margin: 4,
        borderRadius: 24, // More pronounced rounding for individual badges
        flexDirection: 'row',
        display: 'flex', // Ensure content inside BadgeIcon is also a row
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100, // Give a minimum width for consistent sizing
        minHeight: 80, // Give a fixed height
        fontWeight: 'bold',
        }}>
          <text style={{ fontSize: 50, color: 'white' }}>
            +{remainingCount}
        </text>
        </view>
      )}
    </view>
  );
}
