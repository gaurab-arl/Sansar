

import { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasclicked, setHasClicked] = useState(false)
    const [isloading, setLoading] = useState(true)
    const [loadVideo, setLoadVideo] = useState(0)

    const totalvideo = 4;
    const nextVdieo = useRef(null)

    const bgVideoRef = useRef(null);
    const miniRef = useRef(null);


    const handelMiniVideoPlayer = () => {
        setHasClicked(true)
        setCurrentIndex(currentIndex => {
            if (currentIndex === 4) {
                return 1;
            }
            return currentIndex + 1;
        })
    }

    const getvideo = (index) => {
        return `videos/hero-${index}.mp4`;
    }

    useGSAP(() => {
        if (!hasclicked) return;

        gsap.set("#next-video", {
            visibility: "visible",
        });

        gsap.to("#next-video", {
            scale: 1,
            width: "100%",
            height: "100%",
            duration: 1,
            ease: "power1.inOut",
            onStart: () => nextVdieo.current?.play(),
        });

        gsap.from("#current-video", {
            scale: 0,
            duration: 1.5,
            ease: "power1.inOut",
        });
    }, {
        dependencies: [currentIndex, hasclicked],
        revertOnUpdate: true,
    });

    useGSAP(() =>{
        gsap.set( '#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%',
            borderRadius: '0 0 40% 10%'
        })

        gsap.from("#video-frame", {
            clipPath: 'polygon(14% 27%, 70% 65%, 94% 66%, 1% 34%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inout',
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: 1,
            }
        })
    })

    return (
        <div className="relative h-screen w-screen overflow-x-hidden">
            <div id="video-frame" className="relative z-10 h-full w-screen overflow-hidden rounded-lg bg-blue-75">
                <div className="mask-clip-path absolute-center absolute z-50 h-52 w-36 md:h-64 md:w-44 overflow-hidden rounded-2xl cursor-pointer hover:scale-100 scale-50transition-all duration-1000 opacity-0 hover:opacity-100 z-40">
                    <div
                        onClick={handelMiniVideoPlayer}
                        className="group relative h-full w-full overflow-hidden rounded-2xl"
                    >
                        <video
                            className="absolute-center absolute z-20 top-1/2 left-1/2 lg:top-2/3 -translate-x-1/2 -translate-y-1/2 size-64 object-cover object-center"
                            ref={nextVdieo}
                            autoPlay
                            loop
                            muted
                            id="current-video"
                            src={getvideo((currentIndex % totalvideo) + 1)}
                        />
                    </div>
                </div>
                <div >
                    <video
                        className="absolute left-0 top-0 size-full object-cover object-center z-20"
                        autoPlay
                        loop
                        muted
                        id="next-video"
                        src={getvideo(currentIndex)}
                    />
                </div>
                <div className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    <b>Gaming</b>
                </div>

                <div className="absolute left-0 top-0  z-40 size-full">
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

    );
}
