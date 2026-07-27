

import { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasclicked, setHasClicked] = useState(false)
    const [isloading, setLoading] = useState(true)
    const [loadVideo, setLoadVideo] = useState(0)

    const totalvideo = 4;
    const nextVdieo = useRef(null)


    const handelMiniVideoPlayer = () => {
        setHasClicked(true)
        setCurrentIndex(currentIndex => {
            return (currentIndex % 4) + 1;
        })
    }

    const getvideo = (index) => {
        return `videos/hero-${index}.mp4`;
    }

    return (
        <div className="relative h-screen w-screen overflow-x-hidden">
            <div id="video-frame" className="relative z-10 h-full w-screen overflow-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handelMiniVideoPlayer} className="bg-black/10 origin-center opacity-0 scale-100 transition-all ease-in duration-500 hover:opacity-100 hover:sacle-500">
                            <video ref={nextVdieo} autoPlay loop id="current-video" src={getvideo(currentIndex + 1)}></video>
                        </div>
                    </div>
                    <div >
                        <video autoPlay loop id="video-play-btn" src={getvideo(currentIndex)}></video>
                    </div>
                    <div className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                        <b>Gaming</b>
                    </div>

                    <div className="absolute left-0 top-0  z-index-40 size-full">
                        <div className="mt-24 px-5 sm:px-10">
                            <div className="special-font text-blue-100">
                                <b className="hero-heading text-blue-100">Welcome Home</b>
                                <p className="mb-5 max-w-104 font-robert-regular text-blue-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore autem vel odit voluptatem officia voluptas doloremque eaque. Dolorem amet voluptates ullam veritatis! Est, molestias ullam. Libero tenetur nesciunt officiis dolorem.</p>
                            </div>
                            <Button id="watch-trailer" title="watch-traiiler" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1"> </Button>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
}
