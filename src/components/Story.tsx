import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const NEPAL_IMAGES = [
    {
        src: "/img/a.jpg",
        caption: ""
    },
    {
        src: "/img/b.jpg",
        caption: ""
    },
    {
        src: "/img/c.jpg",
        caption: ""
    },
    {
        src: "/img/d.jpg",
        caption: ""
    },
    {
        src: "/img/e.jpg",
        caption: ""
    },
    {
        src: "/img/f.jpg",
        caption: ""
    },
    {
        src: "/img/g.jpg",
        caption: ""
    }
];

export default function Story() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(NEPAL_IMAGES.length).fill(false));
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Title animation
        gsap.from('.story-title', {
            opacity: 0,
            y: 60,
            duration: 1.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            ease: "power3.out"
        });

        // Text content animation
        gsap.from('.story-text-content', {
            opacity: 0,
            x: -40,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
            ease: "power2.out"
        });

        // Image animation
        gsap.from('.story-image-wrapper', {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            scrollTrigger: {
                trigger: '.story-image-wrapper',
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            ease: "power2.out"
        });

        // Stats animation
        gsap.from('.stat-item', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.stats-container',
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            ease: "power2.out"
        });

        // Quote animation
        gsap.from('.story-quote', {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: '.story-quote',
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            ease: "power2.out"
        });
    }, []);

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % NEPAL_IMAGES.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + NEPAL_IMAGES.length) % NEPAL_IMAGES.length);
    };

    return (
        <section 
            ref={containerRef} 
            className="relative w-full min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-16 overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #c47a4a 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }} />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-[#c47a4a]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#2d5a3d]/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="story-title text-center mb-16">
                    <div className="inline-block mb-6">
                        <span className="font-mono text-xs tracking-[0.3em] text-[#c47a4a] bg-[#c47a4a]/10 px-6 py-2 rounded-full border border-[#c47a4a]/20">
                            EXPLORE NEPAL
                        </span>
                    </div>
                    <h2 className="font-serif text-6xl md:text-7xl font-light text-white leading-[1.1]">
                        Why Nepal?
                    </h2>
                    <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#c47a4a] to-transparent mx-auto mt-6" />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Left Content - Takes 3 columns */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="story-text-content">
                            <p className="font-serif text-3xl md:text-4xl font-light italic text-[#c47a4a] leading-[1.3]">
                                "A journey to Nepal is not just a trip — it's a transformation."
                            </p>
                        </div>

                        <div className="story-text-content space-y-4">
                            <p className="font-sans text-base font-light text-gray-300 leading-relaxed max-w-2xl">
                                Nepal is a land of contrasts — where ancient temples stand beside modern cities, 
                                and where the world's highest peaks cast their shadows over lush jungles. 
                                It's a place that challenges you, inspires you, and leaves you forever changed.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="stats-container story-text-content grid grid-cols-3 gap-4 pt-4">
                            <div className="stat-item bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#c47a4a]/30 transition-all duration-300 group">
                                <p className="font-serif text-4xl font-light text-[#c47a4a] group-hover:scale-110 transition-transform duration-300">8</p>
                                <p className="font-sans text-[11px] font-light text-gray-400 uppercase tracking-wider mt-1">UNESCO Sites</p>
                            </div>
                            <div className="stat-item bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#c47a4a]/30 transition-all duration-300 group">
                                <p className="font-serif text-4xl font-light text-[#c47a4a] group-hover:scale-110 transition-transform duration-300">14</p>
                                <p className="font-sans text-[11px] font-light text-gray-400 uppercase tracking-wider mt-1">Peaks Over 8000m</p>
                            </div>
                            <div className="stat-item bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#c47a4a]/30 transition-all duration-300 group">
                                <p className="font-serif text-4xl font-light text-[#c47a4a] group-hover:scale-110 transition-transform duration-300">100+</p>
                                <p className="font-sans text-[11px] font-light text-gray-400 uppercase tracking-wider mt-1">Ethnic Groups</p>
                            </div>
                        </div>

                        <div className="story-text-content">
                            <a
                                href="#destinations"
                                className="inline-flex items-center gap-3 font-sans text-sm font-medium text-white bg-[#c47a4a] px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#b06a3a] hover:gap-4 group"
                            >
                                Discover Nepal
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right - Image Slider - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="story-image-wrapper relative">
                            <div 
                                ref={imageContainerRef}
                                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 bg-gradient-to-b from-gray-800/50 to-gray-900/50 group"
                            >
                                {NEPAL_IMAGES.map((img, idx) => (
                                    <div 
                                        key={idx}
                                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                            idx === activeIndex 
                                                ? "opacity-100 scale-100" 
                                                : "opacity-0 scale-110"
                                        }`}
                                    >
                                        {/* Skeleton loader while image loads */}
                                        {!loadedImages[idx] && (
                                            <div className="absolute inset-0 bg-gradient-to-b from-gray-700/30 to-gray-900/30 animate-pulse" />
                                        )}
                                        
                                        <img
                                            src={img.src}
                                            alt={`Nepal image ${idx + 1}`}
                                            className={`w-full h-full object-cover transition-opacity duration-700 ${
                                                loadedImages[idx] ? "opacity-100" : "opacity-0"
                                            }`}
                                            loading="eager"
                                            onLoad={() => handleImageLoad(idx)}
                                            onError={() => {
                                                console.error(`Failed to load image: ${img.src}`);
                                                // Mark as loaded to hide skeleton even if image fails
                                                handleImageLoad(idx);
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>
                                ))}

                                {/* Navigation Arrows */}
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#c47a4a] hover:border-[#c47a4a] transition-all duration-300 z-20"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#c47a4a] hover:border-[#c47a4a] transition-all duration-300 z-20"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Dots */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                                    {NEPAL_IMAGES.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`transition-all duration-300 rounded-full ${
                                                idx === activeIndex 
                                                    ? "w-10 h-1 bg-[#c47a4a]" 
                                                    : "w-1 h-1 bg-white/40 hover:bg-white/60"
                                            }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Image Counter */}
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <span className="font-mono text-xs text-white">
                                        {String(activeIndex + 1).padStart(2, '0')} / {String(NEPAL_IMAGES.length).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Quote */}
                <div className="story-quote mt-20 text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/30" />
                            <span className="font-serif text-2xl font-light italic text-gray-300">
                                "The journey of a thousand miles begins with a single step"
                            </span>
                            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/30" />
                        </div>
                        <p className="font-sans text-sm font-light text-gray-500">
                            — Ancient Nepali proverb
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
