import HomeIcon from '../assets/misc-icons/home.png';
import StoreIcon from '../assets/misc-icons/store.png';
import PlusIcon from '../assets/misc-icons/plus.png';
import InboxIcon from '../assets/misc-icons/inbox.png';
import AccountIcon from '../assets/misc-icons/account.png';


export function IconButton({imageSrc, label}: {
    imageSrc: string;
    label: string;
}) {
    return (
        <view style={{alignItems: 'center'}}>
            <image src={imageSrc} style={{
                width: '30px', height: '30px',
            }}></image>
            <text style={{textAlign: 'center'}}>{label}</text>
        </view>
    );
}

export default function BottomBar({height}: {
    height: '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset' | '-moz-max-content' | '-moz-min-content' | '-webkit-fit-content' | 'auto' | 'fit-content' | 'max-content' | 'min-content' | string | number | undefined
}) {
    return (
        <view
            style={{
                height: height,
                background: 'black',
                display: 'flex',
                padding: '10px',
                alignItems: 'center',
                justifyContent: 'space-around',
                fontSize: 'x-small',
            }}>

            <IconButton imageSrc={HomeIcon} label={'Home'}/>
            <IconButton imageSrc={StoreIcon} label={'Store'}/>

            <view style={{
                position:'relative',
                height: '40px', width: '58px',
                justifyContent:'center',
                alignItems:'center'
            }} >
                <view style={{
                    background: '#00fffbff',
                    height: '40px', width: '55px',
                    borderRadius: '10px',
                    marginTop: '-10px',
                    right:'6px',
                    zIndex:'99',
                    position:'absolute'
                }}></view>
                <view style={{
                    background: '#ff0000ff',
                    height: '40px', width: '55px',
                    borderRadius: '10px',
                    marginTop: '-10px',
                    left:'6px',
                    zIndex:'99',
                    position:'absolute'
                }}></view>
                <view style={{
                    background: 'white',
                    height: '40px', width: '55px',
                    justifyContent: 'center', alignItems: 'center',
                    borderRadius: '10px',
                    marginTop: '-10px',
                    zIndex:'100',
                    position:'absolute'
                }}>
                    <image src={PlusIcon} style="height:35px;width:35px;"></image>
                </view>
            </view>

            <IconButton imageSrc={InboxIcon} label={'Inbox'}/>
            <IconButton imageSrc={AccountIcon} label={'Profile'}/>
        </view>
    );
}   