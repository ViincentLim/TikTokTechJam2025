import { createContext, useCallback, useState } from '@lynx-js/react';
import AutoplayVideo from './native-elements/AutoplayVideo.js';
import Popup from './Popup.js';
import Button from './button.js';
import { useStore } from '../store.js';

type BadgesProps = {
    videoBadges?: Record<number, number>;
};

type BadgeIconProps = {
    type: number;
    count: number;
};

const PopupContext = createContext(null);

function BadgeIcon({ type, count }: BadgeIconProps) {
    const iconMap: Record<number, string> = {
        1: '💎',
        2: '🏆',
        3: '💎',
        4: '🏆',
    };
    const icon = iconMap[type] || '❓';

    return (
        <view style={{
            padding: '2px',
            color: 'white',
            margin: '5px',
            borderRadius: '24px', // More pronounced rounding for individual badges
            flexDirection: 'row',
            display: 'flex', // Ensure content inside BadgeIcon is also a row
            alignItems: 'center',
            // justifyContent: '',
            // minWidth: '100px', // Give a minimum width for consistent sizing
            // height: '50px', // Give a fixed height
            // fontSize: '20px', // Adjust font size for the icon
            fontWeight: 'bold',
        }}>
            <view style={{ display:'flex', flexDirection: 'row', alignItems: 'center' }}>
                <text>{icon}</text>

                <text style={{ marginLeft: '2px', fontSize: '15px', color: 'white' }}>
                    x{count}
                </text>

            </view>
        </view>
    );

}

export default function Badges({ videoBadges }: BadgesProps) {
    const { isOpen, toggle } = useStore();
    const onTap = useCallback(() => {toggle()}, []);

    const awardedBadges = Object.entries(videoBadges ?? {}).filter(([_, count]) => count > 0);
    console.log('awardedBadges', awardedBadges);

    // CASE 1: No awards -> single medal button
    if (awardedBadges.length === 0) {
        return (
                <view
                bindtap={onTap}
                style={{
                    padding: '8px',
                    color: 'white',
                    margin: '4px',
                    borderRadius: '24px', // More pronounced rounding for individual badges
                    flexDirection: 'row',
                    display: 'flex', // Ensure content inside BadgeIcon is also a row
                    alignItems: 'center',
                    justifyContent: 'center',
                    // minWidth: '100px', // Give a minimum width for consistent sizing
                    // minHeight: '80px', // Give a fixed height
                    fontSize: '10px', // Adjust font size for the icon
                    fontWeight: 'bold',
                }}
            >
                <text style={{ fontSize: '40px' }}>🎖️</text> {/* Wrap the icon in a <text> component for proper sizing */}
            </view>
        );
    }


    // CASE 2: Some awards -> show badges
    const maxVisible = 3;
    const visibleBadges = awardedBadges.slice(0, maxVisible);
    const remainingCount = awardedBadges.length - maxVisible;

    return (
        // TODO: Style width, should overlay video as well
            <view style={{display: 'flex', flexDirection: 'row'}}>
        <Button onTap={onTap}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                display: 'flex',
                padding: '4px',
                backgroundColor: 'rgba(243, 204, 9, 0.5)',
                borderRadius: '25px',
                // minHeight: '100px',
                // width: 'min-content',
                // width: 'auto'
            }}>
            {isOpen && (
                <Popup />)}
            {visibleBadges.map(([typeStr, count]) => (
                <BadgeIcon key={typeStr} type={Number(typeStr)} count={count} />
            ))}
            {remainingCount > 0 && (
                <view style={{
                    padding: '8px',
                    color: 'black',
                    margin: '4px',
                    borderRadius: '24px', // More pronounced rounding for individual badges
                    flexDirection: 'row',
                    display: 'flex', // Ensure content inside BadgeIcon is also a row
                    alignItems: 'center',
                    justifyContent: 'center',
                    // minWidth: '100px', // Give a minimum width for consistent sizing
                    // minHeight: '80px', // Give a fixed height
                    fontWeight: 'bold',
                }}>
                    <text style={{ fontSize: '50px', color: 'white' }}>
                        +{remainingCount}
                    </text>
                </view>
            )}
        </Button>
        </view>
    );
}
