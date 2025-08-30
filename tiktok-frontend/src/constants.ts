
export const videos = [
    { livestream:false, id: "video1", videoUrl: "http://0.0.0.0:8000/static/video1.html" },
    { livestream:false, id: "video2", videoUrl: "http://0.0.0.0:8000/static/video2.html" },
    { livestream:true, id: "livestream1", videoUrl: "http://0.0.0.0:8000/static/video3.html" }
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