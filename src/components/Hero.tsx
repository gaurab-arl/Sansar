import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom"

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useGSAP(() => {
        // Hero content fade animation on scroll - LESS aggressive
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        tl.to(".hero-content", {
            opacity: 0.5,
            y: -40,
            duration: 1,
            ease: "power2.out",
        });

        // Video frame reveal animation
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0%",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "top top",
                end: "bottom center",
                scrub: 1,
            }
        });
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('loadeddata', () => {
                setIsLoading(false);
            });
            
            // Force hardware acceleration for smooth playback
            videoRef.current.style.transform = 'translateZ(0)';
            videoRef.current.style.backfaceVisibility = 'hidden';
        }
    }, []);

    return (
        <section id="hero" ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-[#050806]">
            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050806]">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 animate-bounce rounded-full bg-[#c47a4a] [animation-delay:-0.3s]" />
                        <div className="h-3 w-3 animate-bounce rounded-full bg-[#c47a4a] [animation-delay:-0.15s]" />
                        <div className="h-3 w-3 animate-bounce rounded-full bg-[#c47a4a]" />
                    </div>
                </div>
            )}

            <div id="video-frame" className="relative h-screen w-full overflow-hidden">
                {/* Video Background - Enhanced Vibrancy */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                        filter: "contrast(1.1) saturate(1.2) brightness(1.05)",
                        transform: "translateZ(0)",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <source src="/videos/video.mp4" type="video/mp4" />
                    <img 
                        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&h=900&fit=crop&crop=center" 
                        alt="Nepal Himalayas" 
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </video>

                {/* Minimal Overlay - Lighter for video visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050806]/30 via-[#050806]/10 to-[#050806]/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050806]/30 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/50 via-transparent to-transparent z-10" />

                {/* HDR Glow Effect */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#c47a4a]/8 via-transparent to-[#ffd700]/5 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-[#2b5a44]/5 via-transparent to-[#c47a4a]/5 mix-blend-overlay" />
                </div>

                {/* Floating Particles - Reduced count for cleaner look */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    {[...Array(15)].map((_, i) => {
                        const size = 3 + Math.random() * 12;
                        const left = Math.random() * 100;
                        const delay = Math.random() * 10;
                        const duration = 20 + Math.random() * 15;
                        const colors = [
                            'rgba(255,230,200,0.15)',
                            'rgba(200,220,255,0.1)',
                            'rgba(255,200,160,0.15)',
                        ];
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        const isRound = Math.random() > 0.4;
                        
                        return (
                            <div
                                key={i}
                                className="particle absolute"
                                style={{
                                    left: `${left}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: `${size}px`,
                                    height: `${isRound ? size : size * 1.5}px`,
                                    background: color,
                                    borderRadius: isRound ? '50%' : '30% 70% 50% 50%',
                                    opacity: 0.08 + Math.random() * 0.15,
                                    filter: `blur(${0.5 + Math.random() * 1.5}px)`,
                                    animation: `floatPetal ${duration}s ${delay}s infinite cubic-bezier(0.45, 0, 0.55, 1)`,
                                    boxShadow: `0 0 20px ${color}`,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Hero Content - More transparent and positioned better */}
                <div className="hero-content relative z-20 flex h-full flex-col justify-center px-6 md:px-16 lg:px-24">
                    <div className="max-w-2xl">
                        <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 animate-fadeIn">
                            DISCOVER NEPAL
                        </p>
                        <h1 className="font-cormorant text-[clamp(2.8rem,7vw,5rem)] font-light italic leading-[1.05] text-white hero-title animate-fadeInUp">
                            Where the Himalayas<br/>
                            <span className="not-italic font-light text-[0.85em] tracking-wide text-white/80">
                                touch the sacred sky.
                            </span>
                        </h1>
                        <p className="mt-4 max-w-lg font-jost text-sm font-light leading-relaxed text-white/70 md:text-base animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                            Immerse in timeless ancient alleys, misty alpine valleys, and the breathtaking roof of the world.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                            <Link
                                to="/destination"
                                className="rounded-none bg-[#c47a4a] px-8 py-3.5 font-jost text-sm font-medium text-white transition-all duration-300 hover:bg-[#b06a3e] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#c47a4a]/25"
                            >
                                Explore Destinations
                            </Link>
                            <Link
                                to="/discover"
                                className="rounded-none border border-white/20 bg-white/5 px-7 py-3.5 font-jost text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
                            >
                                View Gallery
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - More subtle */}
                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/20 animate-bounce">
                    <span className="font-jost text-[8px] font-light uppercase tracking-[0.2em]">Scroll</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                </div>
            </div>

            <style>{`
                @keyframes floatPetal {
                    0% { 
                        transform: translateY(0) rotate(0deg) scale(0.6); 
                        opacity: 0; 
                    }
                    20% { opacity: 0.5; }
                    80% { opacity: 0.3; }
                    100% { 
                        transform: translateY(110vh) rotate(${360 + Math.random() * 540}deg) scale(1.2); 
                        opacity: 0; 
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(5px); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                
                .animate-fadeInUp {
                    opacity: 0;
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                
                .animate-bounce {
                    animation: bounce 2.5s ease-in-out infinite;
                }
                
                .hero-title {
                    text-shadow: 0 2px 30px rgba(0,0,0,0.4);
                }
            `}</style>
        </section>
    );
}
