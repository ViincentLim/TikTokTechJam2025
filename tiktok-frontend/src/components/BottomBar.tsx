export default function BottomBar(){
    return (
        <view
            style={{
                height:'11vh',
                background: "grey",
                display: 'flex',
                // flexDirection:'row',
                padding: "10px",
                // alignItems: "center",
                // alignContent: "center",
                // justifySelf: 'center',
                justifyContent: 'space-between',
                // justifyItems:'center',
                fontSize: 'x-small',
                // textAlign: 'center'
            }}>
            
            <view style={{display: 'flex', flexDirection: 'column'}}>
                {/* home icon */}
                <text>Home</text>
            </view>

            <view style={{display: 'flex', flexDirection: 'column'}}>
                {/* search icon */}
                <text>Search</text>
            </view>

            <view style={{display: 'flex', flexDirection: 'column'}}>
                {/* plus icon */}
                <text>---</text>
            </view>

            <view style={{display: 'flex', flexDirection: 'column'}}>
                {/* inbox icon */}
                <text>Inbox</text>
            </view>

            <view style={{display: 'flex', flexDirection: 'column'}}>
                {/* account icon */}
                <text>Me</text>
            </view>

        </view>
    );
}   