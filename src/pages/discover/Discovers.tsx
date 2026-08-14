import { useRef, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Trending from "./Trending";
import Heritage from "./Heritage";
import { Intro, Stats } from "./DiscoverIntro";
import Hero from "./Hero";
import VideoModal from "./VideoModal";

const Discover = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const lastScrollY = useRef(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (
                currentScrollY > lastScrollY.current &&
                currentScrollY > 100
            ) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#f5faf7] via-[#eef5f0] to-[#e5eee8] overflow-x-hidden">

            {/* NAVBAR */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isNavVisible
                    ? "translate-y-0"
                    : "-translate-y-full"
                    }`}
            >
                <Navbar />
            </div>

            <main className="w-full pt-20">

                {/* HERO */}
                <Hero onVideoOpen={() => setIsVideoOpen(true)} />

                {/* VIDEO MODAL */}
                <VideoModal
                    isOpen={isVideoOpen}
                    onClose={() => setIsVideoOpen(false)}
                />

                {/* STATS */}
                <Stats />

                {/* INTRO */}
                <Intro />

                {/* HERITAGE */}
                <Heritage />

                {/* TRENDING */}
                <Trending />

            </main>
        </div>
    );
};

export default Discover;