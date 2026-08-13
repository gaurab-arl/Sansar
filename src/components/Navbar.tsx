
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import { useWindowScroll } from "react-use";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Navbar = {
    name: string;
    url: string;
};

const navbar: Navbar[] = [
    { name: "hero", url: "/" },
    { name: "discover", url: "/discover" },
    { name: "destination", url: "/destination" },
    { name: "budget", url: "/budget" },
]

export default function Navbar() {

    const navLinkRef = useRef<HTMLElement | null>(null);
    const audioplayRef = useRef<HTMLAudioElement | null>(null);

    const [audioplay, setAudioplay] = useState(false);

    const lastScrollY = useRef(0);
    const [isNavVisible, setnavvissble] = useState(true);

    useEffect(() => {
        if (audioplay) {
            audioplayRef.current?.play();
        } else {
            audioplayRef.current?.pause();
        }
    }, [audioplay]);

    const { y: currentScrollY } = useWindowScroll();
    useEffect(() => {

        if (currentScrollY === 0) {
            setnavvissble(true)
            navLinkRef.current?.classList.remove('floating-nav')
        }
        else if (currentScrollY > lastScrollY.current) {
            setnavvissble(false)
            navLinkRef.current?.classList?.add('floating-nav')
        } else {
            setnavvissble(true)
            navLinkRef.current?.classList.remove('floating-nav')
        }
        lastScrollY.current = currentScrollY
    }, [currentScrollY])

    useEffect(() => {
        gsap.to(navLinkRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            ease: "power1.inout",
            duration: 0.2
        })
    }, [isNavVisible])

    const audioplayer = () => {
        setAudioplay(prev => !prev);
    }



    return (
        <header
            className={` fixed rounded-md inset-x-0 top-4 z-50 h-16 flex flex-row items-center justify-between border-none transition-all duration-700 sm:inset-x-6`}
            ref={navLinkRef}>

            <div className="text-white flex-center h-15 special-font">
                <img src="/img/logo.png" alt="logo" className="h-full w-28" />
                <Button
                    id="product-button"
                    title="Blog"
                    rightIcon={<TiLocationArrow />}
                    containerClass="bg-[#F5F3FF] cursor-pointer items-center justify-center gap-1"
                />
            </div>

            <div className="flex-center gap-5 text-white hidden md:flex">
                {navbar.map((item, index) => (
                    <Link
                        key={item.name}
                        to={item.url}
                        className="nav-hover-btn text-white"
                    >
                        {item.name}
                    </Link>
                ))}


                <button
                    onClick={audioplayer}
                    className="bg-black w-10 h-10 flex-center rounded-full gap-1"
                >
                    <audio
                        ref={audioplayRef}
                        className="hidden"
                        src="/audio/loop.mp3"
                        loop
                    />

                    {[...Array(4)].map((_, index) => (
                        <span
                            key={index}
                            className={`w-1 h-3 bg-white rounded-full ${audioplay ? "animate-bar" : ""
                                }`}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        />
                    ))}
                </button>
            </div>
        </header>
    )
}
