const HomeIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/home.4ef6da56.png?token=GHSAT0AAAAAADIVE6YWTSWB3IPUKKQYAVN62FSWQYA';
const StoreIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/store.b9ef7a13.png?token=GHSAT0AAAAAADIVE6YWDFH4WBCVTTD5UHTY2FSWULQ';
const PlusIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/plus.bf988428.png?token=GHSAT0AAAAAADIVE6YWYXZUO36UIR7TRMOG2FSWR2Q';
const InboxIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/inbox.3d146908.png?token=GHSAT0AAAAAADIVE6YWKKJSA5456PXNA2LA2FSW2PQ';
const AccountIcon = 'https://raw.githubusercontent.com/Dharshan2004/photos-tiktok-hackathon/refs/heads/main/account.83d2979b.png?token=GHSAT0AAAAAADIVE6YX5PA6DGRNYWFA6XBW2FSW3RA';


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