import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import { useWindowScroll } from "react-use";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type NavItem = {
    name: string;
    url: string;
};

const navItems: NavItem[] = [
    { name: "hero", url: "/" },
    { name: "discover", url: "/discover" },
    { name: "destination", url: "/destination" },
    { name: "budget", url: "/budget" },
]


export default function Navbar() {
    const navRef = useRef<HTMLElement | null>(null);
    const [isNavVisible, setNavVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0) {
            setNavVisible(true);
            setIsScrolled(false);
            navRef.current?.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY.current) {
            setNavVisible(false);
            setIsScrolled(true);
            navRef.current?.classList.add('floating-nav');
        } else {
            setNavVisible(true);
            setIsScrolled(true);
            navRef.current?.classList.remove('floating-nav');
        }
        lastScrollY.current = currentScrollY;
    }, [currentScrollY]);

    useEffect(() => {
        gsap.to(navRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            ease: "power1.inOut",
            duration: 0.4
        });
    }, [isNavVisible]);

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header
            ref={navRef}
            className={`fixed inset-x-0 top-6 z-50 mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-8 transition-all duration-700 sm:inset-x-8 ${isScrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/20"
                : "bg-white/10 backdrop-blur-sm border border-white/10"
                }`}
        >
            {/* Logo - Updated with संसार */}
            <div className="flex items-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isScrolled ? "#2b5a44" : "#ffffff"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-500"
                >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
                <div className="flex flex-col leading-none">
                    <span
                        className={`font-cormorant text-lg font-medium tracking-wide transition-colors duration-500 ${isScrolled ? "text-[#1f3a2e]" : "text-white/95"
                            }`}
                    >
                        संसार
                    </span>
                    <span
                        className={`font-jost text-[8px] font-light tracking-[0.2em] uppercase transition-colors duration-500 ${isScrolled ? "text-[#1f3a2e]/60" : "text-white/50"
                            }`}
                    >
                        Explore Nepal
                    </span>
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.url}
                        className={`font-jost text-sm font-light transition-colors duration-300 relative group py-1 ${isScrolled ? "text-[#1f3a2e]/70 hover:text-[#1f3a2e]" : "text-white/70 hover:text-white"
                            }`}
                    >
                        {item.name}
                        <span className={`absolute bottom-0 left-0 h-[1.5px] w-0 transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-[#2b5a44]" : "bg-white/60"
                            }`} />
                    </a>
                ))}
               
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-[#1f3a2e]" : "text-white/80 hover:text-white"
                    }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className={`absolute left-4 right-4 top-[72px] rounded-2xl px-6 py-8 shadow-2xl backdrop-blur-xl md:hidden ${isScrolled
                    ? "bg-white/98 border border-white/20"
                    : "bg-[#1f3a2e]/95 border border-white/10"
                    }`}>
                    <nav className="flex flex-col gap-3">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.url}
                                className={`font-jost text-base font-light transition-colors duration-300 ${isScrolled
                                    ? "text-[#1f3a2e] hover:text-[#c47a4a]"
                                    : "text-white/80 hover:text-white"
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}

                    </nav>
                </div>
            )}

        </header>
    );
}
