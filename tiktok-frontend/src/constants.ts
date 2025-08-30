
export const videos = [
    { livestream:false, id: "video1", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { livestream:false, id: "video2", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { livestream:true, id: "livestream1", videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
]

import { V } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";
import Arrow from "./assets/arrow.png"; //TODO replace later

export const badgeData:Record<number, Record<string, any>> = {
    1:{icon:"🏆", desc:'Outstanding Badge', url:Arrow, cost:1600},
    2:{icon:"🎖️", desc:'Wholesome Badge', url:Arrow, cost:800},
    3:{icon:"🏅", desc:'Hilarious Badge', url:Arrow, cost:800},
    4:{icon:"🥇", desc:'Enjoyment Badge', url:Arrow, cost:1200},
    5:{icon:"🥈", desc:'Family-friendly Badge', url:Arrow, cost:1000},
    6:{icon:"🥉", desc:'Shocked Badge', url:Arrow, cost:1000},
}