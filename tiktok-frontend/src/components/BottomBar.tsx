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
                background: 'grey',
                display: 'flex',
                // flexDirection:'row',
                padding: '10px',
                alignItems: 'center',
                // alignContent: "center",
                // justifySelf: 'center',
                justifyContent: 'space-around',
                // justifyItems:'center',
                fontSize: 'x-small', //test this
                // textAlign: 'center'
            }}>

            <IconButton imageSrc={HomeIcon} label={'Home'}/>
            <IconButton imageSrc={StoreIcon} label={'Store'}/>

            <view style={{
                background: 'white',
                height: '40px', width: '58px',
                justifyContent: 'center', alignItems: 'center',
                borderRadius: '10px',
                marginTop: '-10px'
            }}>
                <image src={PlusIcon} style="height:35px;width:35px;"></image>
            </view>

            <IconButton imageSrc={InboxIcon} label={'Icon'}/>
            <IconButton imageSrc={AccountIcon} label={'Profile'}></IconButton>
        </view>
    );
}   