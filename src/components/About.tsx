import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=900 center',
                scrub: 1,
                pin: true,
                pinSpacing: true,
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            duration: 3,
            ease: 'power2.out',
        })

        // Animate text elements
        gsap.from('.about-text', {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none reverse',
            },
            ease: 'power3.out',
        })

        // Animate floating elements
        gsap.to('.floating-1', {
            y: -20,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })

        gsap.to('.floating-2', {
            y: 20,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1,
        })

        // Animate video cards on hover
        document.querySelectorAll('.video-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.04,
                    duration: 0.5,
                    ease: 'power2.out',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
                })
            })
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                })
            })
        })
    })

    return (
        <div id="about" className="min-h-screen w-full bg-gradient-to-br from-[#f5faf7] via-[#eef5f0] to-[#e5eee8] overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 50%, #c47a4a 1px, transparent 1px),
                        radial-gradient(circle at 80% 50%, #2d5a3d 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            <div className="relative z-10 mb-8 mt-28 flex flex-col items-center gap-4 px-6">
                {/* Elegant Badge - Updated Colors */}
                <div className="flex items-center gap-4 mb-2">
                    <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/70" />
                    <span className="px-4 py-1.5 rounded-full border border-[#c47a4a]/30 bg-gradient-to-r from-[#c47a4a]/10 to-[#c47a4a]/5">
                        <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                            Welcome to Nepal
                        </p>
                    </span>
                    <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/70" />
                </div>

                {/* Main Title - Updated Colors */}
                <div className="text-center">
                    <h2 className="font-cormorant text-5xl md:text-7xl font-light leading-[1.05] tracking-wide">
                        <span className="bg-gradient-to-r from-[#1f3a2e] via-[#2d5a3d] to-[#1f3a2e] bg-clip-text text-transparent">
                            Discover the Land
                        </span>
                        <span className="block text-4xl md:text-6xl font-light mt-1 bg-gradient-to-r from-[#3a6b4a] via-[#4a7a5a] to-[#3a6b4a] bg-clip-text text-transparent">
                            of the Himalayas
                        </span>
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#c47a4a]/50 to-transparent mx-auto mt-6" />
                </div>

                {/* Description - Updated Colors */}
                <div className="about-text max-w-2xl text-center mt-4">
                    <p className="font-cormorant text-xl md:text-2xl font-light italic leading-relaxed tracking-wide bg-gradient-to-r from-[#2d5a3d] to-[#4a7a5a] bg-clip-text text-transparent">
                        Where ancient traditions meet breathtaking landscapes
                    </p>
                    <div className="flex items-center justify-center gap-3 my-5">
                        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/30" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c47a4a]/50" />
                        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/30" />
                    </div>
                    <p className="font-jost text-base font-light leading-relaxed max-w-xl mx-auto text-[#4a6a5a]">
                        From the towering peaks of the Himalayas to the serene temples of the Kathmandu Valley, 
                        Nepal offers a journey like no other. Experience the warmth of its people, the richness 
                        of its culture, and the majesty of its nature.
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image relative h-full w-full overflow-hidden bg-gradient-to-br from-[#e8f0ec] via-[#f0f7f4] to-[#e8f0ec]">
                    
                    {/* Three Videos Side by Side */}
                    <div className="absolute inset-0 flex items-center justify-center gap-5 md:gap-8 px-4 md:px-12">
                        
                        {/* Video 1 - Kumari */}
                        <div className="video-card relative h-[70vh] w-1/3 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 transition-all duration-500 cursor-pointer group">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    filter: "contrast(1.05) saturate(1.1) brightness(1.02)",
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <source src="/videos/kumari.mp4" type="video/mp4" />
                                <img 
                                    src="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&h=700&fit=crop&crop=center" 
                                    alt="Kumari" 
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </video>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2e]/80 via-[#1f3a2e]/20 via-30% to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1f3a2e]/30" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-10 h-[2px] bg-[#c47a4a]" />
                                    <span className="text-[10px] font-jost font-medium uppercase tracking-[0.25em] text-[#c47a4a]">
                                        Sacred Tradition
                                    </span>
                                </div>
                                <p className="font-cormorant text-3xl font-light italic text-white">Kumari</p>
                                <p className="font-jost text-xs font-light text-white/60 mt-1 tracking-wide">The Living Goddess of Nepal</p>
                            </div>

                            <div className="absolute -inset-1 bg-gradient-to-t from-[#c47a4a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>

                        {/* Video 2 - Flag */}
                        <div className="video-card relative h-[70vh] w-1/3 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 transition-all duration-500 cursor-pointer group">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    filter: "contrast(1.08) saturate(1.15) brightness(1.02)",
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <source src="/videos/video2.mp4" type="video/mp4" />
                                <img 
                                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=700&fit=crop&crop=center" 
                                    alt="Nepali Flag" 
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </video>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2e]/85 via-[#1f3a2e]/20 via-30% to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1f3a2e]/40" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-10 h-[2px] bg-[#dc143c]" />
                                    <span className="text-[10px] font-jost font-medium uppercase tracking-[0.25em] text-[#dc143c]">
                                        National Pride
                                    </span>
                                </div>
                                <p className="font-cormorant text-3xl font-light italic text-white">Pride of the Himalayas</p>
                                <p className="font-jost text-xs font-light text-white/60 mt-1 tracking-wide">Nepal's flag touching the sky</p>
                            </div>

                            <div className="absolute top-6 left-6 z-10 flex gap-1.5 opacity-80">
                                <span className="w-1.5 h-8 bg-[#dc143c] rounded-sm" />
                                <span className="w-1.5 h-8 bg-[#0033a0] rounded-sm" />
                                <span className="w-1.5 h-8 bg-[#dc143c] rounded-sm" />
                            </div>
                        </div>

                        {/* Video 3 - Dance */}
                        <div className="video-card relative h-[70vh] w-1/3 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 transition-all duration-500 cursor-pointer group">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    filter: "contrast(1.05) saturate(1.12) brightness(1.02)",
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <source src="/videos/dance.mp4" type="video/mp4" />
                                <img 
                                    src="https://images.unsplash.com/photo-1516444986886-cc5a6c9df005?w=400&h=700&fit=crop&crop=center" 
                                    alt="Cultural Dance" 
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </video>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2e]/80 via-[#1f3a2e]/20 via-30% to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1f3a2e]/30" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-10 h-[2px] bg-[#c47a4a]" />
                                    <span className="text-[10px] font-jost font-medium uppercase tracking-[0.25em] text-[#c47a4a]">
                                        Cultural Heritage
                                    </span>
                                </div>
                                <p className="font-cormorant text-3xl font-light italic text-white">Traditional Dance</p>
                                <p className="font-jost text-xs font-light text-white/60 mt-1 tracking-wide">Rhythms of Nepal's soul</p>
                            </div>

                            <div className="absolute top-6 right-6 z-10 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                                <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
                                    <circle cx="12" cy="20" r="4" stroke="white" strokeWidth="1.5" />
                                    <circle cx="22" cy="18" r="4" stroke="white" strokeWidth="1.5" />
                                    <path d="M16 20V8L26 10V18" stroke="white" strokeWidth="1.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Floating Elements */}
                    <div className="floating-1 absolute top-12 right-12 z-10 opacity-8">
                        <svg width="70" height="70" viewBox="0 0 120 120" fill="none">
                            <circle cx="60" cy="60" r="50" stroke="#dc143c" strokeWidth="1" strokeDasharray="3 6" />
                            <circle cx="60" cy="60" r="35" stroke="#0033a0" strokeWidth="0.8" strokeDasharray="2 5" />
                        </svg>
                    </div>

                    <div className="floating-2 absolute bottom-32 left-12 z-10 opacity-6">
                        <svg width="55" height="55" viewBox="0 0 80 80" fill="none">
                            <rect x="5" y="5" width="70" height="70" rx="12" stroke="#dc143c" strokeWidth="1" strokeDasharray="3 6" />
                            <rect x="15" y="15" width="50" height="50" rx="8" stroke="#0033a0" strokeWidth="0.8" strokeDasharray="2 5" />
                        </svg>
                    </div>

                    {/* Elegant Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 z-10">
                        <div className="h-full w-full flex overflow-hidden">
                            <div className="h-full w-1/3 bg-gradient-to-r from-[#dc143c]/60 via-[#dc143c]/20 to-transparent" />
                            <div className="h-full w-1/3 bg-gradient-to-r from-[#0033a0]/60 via-[#0033a0]/20 to-transparent" />
                            <div className="h-full w-1/3 bg-gradient-to-r from-[#dc143c]/20 via-[#dc143c]/60 to-transparent" />
                        </div>
                    </div>

                    {/* Subtle Glow at Bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-[#c47a4a]/5 to-transparent pointer-events-none z-5" />
                </div>
            </div>
        </div>
    )
}