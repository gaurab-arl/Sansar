
import { useRef, useState, useEffect } from "react";
import { Mountain, MapPin, ArrowUpRight, Landmark, Clock, Users, Play, X } from "lucide-react";
import Navbar from "../../components/Navbar";

/** Wikimedia Commons — freely licensed (CC BY / CC BY-SA), stable Special:FilePath links */
const WM = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const IMG = {
    heroBasantapur: WM + "Kathmandu%20Durbar%20Square,%20Maju%20Dega%202,%20Nepal.jpg",
    patan: WM + "Patan%20Durbar%20Square,%20Lalitpur,%20Nepal%205.jpg",
    patanNight: WM + "Patan%20Durbar%20Square%20at%20Night.jpg",
    bhaktapur: WM + "Bhaktapur%20Durbar%20Square%20Nepal%202024%2010.jpg",
    boudhanath: WM + "Boudhanath%20stupa,%20Kathmandu%2001.jpg",
    pashupatinath: WM + "Picturesque%20view%20of%20Pashupatinath%20Temple.jpg",
    pokhara: WM + "Phewa%20lake,%20Pokhara.jpg",
};

const Discover = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);

    // Handle navbar visibility on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heritageSites = [
        {
            name: "Kathmandu Durbar Square",
            location: "Kathmandu · Hanuman Dhoka",
            description: "The old royal seat of the Malla and Shah kings, wedged between Freak Street and the Kasthamandap crossroads. Climb the tiered plinths of the Maju Dega for a rooftop view over the square.",
            era: "12th – 18th century",
            known: "Kumari Ghar & Maju Dega",
            image: IMG.heroBasantapur,
            mapQuery: "Kathmandu+Durbar+Square,+Basantapur,+Nepal",
        },
        {
            name: "Patan Durbar Square",
            location: "Lalitpur · City of Fine Arts",
            description: "Across the Bagmati river, Patan's square is tighter and denser than Kathmandu's — one stone-paved courtyard ringed by temples. The Krishna Mandir, carved entirely in stone, anchors the square.",
            era: "16th – 17th century",
            known: "Krishna Mandir & metalwork",
            image: IMG.patan,
            mapQuery: "Patan+Durbar+Square,+Lalitpur,+Nepal",
        },
        {
            name: "Bhaktapur Durbar Square",
            location: "Bhaktapur · City of Devotees",
            description: "The furthest of the three from central Kathmandu, and the best preserved — cars stop at the city gates. The 55-Window Palace faces the Golden Gate, and a short walk leads to Nyatapola, Nepal's tallest pagoda.",
            era: "12th – 15th century",
            known: "Nyatapola & Potters' Square",
            image: IMG.bhaktapur,
            mapQuery: "Bhaktapur+Durbar+Square,+Nepal",
        },
    ];

    const trending = [
        {
            name: "Boudhanath Stupa",
            location: "Kathmandu",
            stat: "3.2k check-ins / mo",
            image: IMG.boudhanath,
        },
        {
            name: "Pashupatinath Temple",
            location: "Kathmandu",
            stat: "UNESCO listed, 1979",
            image: IMG.pashupatinath,
        },
        {
            name: "Phewa Lake, Pokhara",
            location: "Pokhara",
            stat: "Annapurna reflections",
            image: IMG.pokhara,
        },
    ];

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#f5faf7] via-[#eef5f0] to-[#e5eee8] overflow-x-hidden">
            {/* Navbar - Fixed and always on top */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
                isNavVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
                <Navbar />
            </div>

            <main className="w-full pt-20">
                {/* HERO with Full-Screen 9:16 Video */}
                <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f5faf7] via-[#eef5f0] to-[#e5eee8]">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `
                                radial-gradient(circle at 20% 50%, #c47a4a 1px, transparent 1px),
                                radial-gradient(circle at 80% 50%, #2d5a3d 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }} />
                    </div>
                    
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-12 lg:py-20">
                        {/* Video Section - Full Screen Feel */}
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                            {/* Left - Video (Full Size) */}
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <div className="relative w-full max-w-[480px] mx-auto">
                                    {/* 9:16 Aspect Ratio Container */}
                                    <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-black/5 border-2 border-white/20">
                                            {/* Video */}
                                            <video
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            >
                                                <source src="/videos/nepal.mp4" type="video/mp4" />
                                                <img 
                                                    src={IMG.heroBasantapur} 
                                                    alt="Nepal Heritage"
                                                    className="w-full h-full object-cover"
                                                />
                                            </video>
                                            
                                            {/* Play Button Overlay - Click to fullscreen */}
                                            <div 
                                                className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer hover:bg-black/30 transition-all duration-300"
                                                onClick={() => setIsVideoOpen(true)}
                                            >
                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#c47a4a]/90 flex items-center justify-center shadow-2xl shadow-[#c47a4a]/40 group-hover:scale-110 transition-transform duration-300">
                                                    <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1" />
                                                </div>
                                            </div>
                                            
                                            {/* Bottom Label */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                                <p className="font-cormorant text-base md:text-lg font-light italic text-white/95 text-center">
                                                    Nepal · A Visual Journey
                                                </p>
                                            </div>

                                            {/* Top Badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[8px] font-jost font-medium uppercase tracking-[0.2em] text-white/80 border border-white/20">
                                                    9:16
                                                </span>
                                            </div>

                                            {/* Click to expand hint */}
                                            <div className="absolute bottom-20 right-4 z-10 opacity-60">
                                                <span className="text-[8px] font-jost font-light text-white/50 uppercase tracking-[0.2em] bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                                                    Click to expand
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Content */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <div className="flex flex-wrap items-center gap-3 mb-4 justify-center lg:justify-start">
                                    <span className="w-2 h-2 rounded-full bg-[#c47a4a]" />
                                    <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                                        3 UNESCO DURBAR SQUARES · 1 VALLEY
                                    </span>
                                </div>

                                <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light italic text-[#1f3a2e] leading-[1.05]">
                                    Nepal,
                                    <br />
                                    <span className="text-[#c47a4a] not-italic">Unfiltered.</span>
                                </h1>

                                <p className="font-jost text-base md:text-lg font-light text-[#5a7a6a] max-w-xl mt-6 leading-relaxed mx-auto lg:mx-0">
                                    Three medieval courtyards, one Himalayan valley. Walk the brick lanes where kings once
                                    held court, then find every square on the map before you land in Kathmandu.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <a
                                        href="#heritage"
                                        className="px-6 py-3 bg-[#c47a4a] text-white font-jost text-sm font-medium rounded-full hover:bg-[#b06a3e] transition-all hover:shadow-lg"
                                    >
                                        Explore Heritage
                                    </a>
                                    <a
                                        href="#trending"
                                        className="px-6 py-3 border border-[#c47a4a] text-[#c47a4a] font-jost text-sm font-medium rounded-full hover:bg-[#c47a4a]/10 transition-all"
                                    >
                                        Trending Places
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Full Screen Video Modal */}
                {isVideoOpen && (
                    <div 
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fadeIn"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <button 
                            className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        <div 
                            className="relative w-full max-w-[90vh] max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                                <video
                                    className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                >
                                    <source src="/videos/nepal.mp4" type="video/mp4" />
                                </video>
                            </div>
                            <p className="text-center text-white/50 font-jost text-xs font-light mt-4 tracking-wider">
                                Nepal · A Visual Journey
                            </p>
                        </div>
                    </div>
                )}

                {/* STAT STRIP */}
                <section className="bg-white/60 backdrop-blur-sm border-y border-[#e8f0ec]">
                    <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            ["7", "UNESCO sites in the valley"],
                            ["3", "royal durbar squares"],
                            ["1979", "year the valley was listed"],
                            ["1350m", "average elevation"],
                        ].map(([n, l], i) => (
                            <div key={i}>
                                <div className="font-cormorant text-3xl font-light text-[#2b5a44]">{n}</div>
                                <div className="font-jost text-[10px] font-light text-[#5a7a6a] uppercase tracking-wider mt-1">{l}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* INTRO */}
                <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-b from-[#f5faf7] to-[#eef5f0]">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">THE KATHMANDU VALLEY</span>
                        <h2 className="font-cormorant text-4xl md:text-5xl font-light italic text-[#1f3a2e] mt-4 mb-6">
                            A valley built by rival kings.
                        </h2>
                        <p className="font-jost text-base font-light text-[#5a7a6a] max-w-2xl mx-auto leading-relaxed">
                            Long before Kathmandu was a single city, it was three competing kingdoms — Kathmandu,
                            Patan, and Bhaktapur — each racing to build the tallest pagoda and the most ornate
                            palace courtyard. What's left is a cluster of UNESCO-listed durbar squares packed into
                            a valley you can cross in an afternoon.
                        </p>
                    </div>
                </section>

                {/* HERITAGE ARTICLES */}
                <section id="heritage" className="w-full max-w-7xl mx-auto px-6 md:px-16 py-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-10">
                        <div>
                            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">FIELD NOTES</span>
                            <h2 className="font-cormorant text-4xl md:text-5xl font-light italic text-[#1f3a2e] mt-3">
                                Three Courtyards,<br />One Valley.
                            </h2>
                        </div>
                        <p className="font-jost text-sm font-light text-[#5a7a6a] max-w-sm">
                            Basantapur, Patan, and Bhaktapur — the valley's three royal squares, each a short taxi ride from the next.
                        </p>
                    </div>

                    {heritageSites.map((site, index) => (
                        <article key={site.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start py-12 border-t border-[#e8f0ec] ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                            <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg">
                                    <img src={site.image} alt={site.name} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2e]/60 to-transparent" />
                                    <div className="absolute bottom-5 left-5 px-3 py-1.5 bg-[#1f3a2e]/80 backdrop-blur-sm rounded-full flex items-center gap-2">
                                        <MapPin size={13} className="text-[#c47a4a]" />
                                        <span className="font-jost text-[10px] font-medium text-white">{site.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col gap-4`}>
                                <div className="flex items-center gap-4">
                                    <span className="font-cormorant text-4xl font-light text-[#c47a4a]/30">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">{site.location}</span>
                                </div>
                                <h3 className="font-cormorant text-2xl md:text-3xl font-light text-[#1f3a2e]">{site.name}</h3>
                                <p className="font-jost text-sm font-light text-[#5a7a6a] leading-relaxed">{site.description}</p>

                                <div className="flex flex-wrap gap-6 pt-2">
                                    <div className="flex items-center gap-2">
                                        <Clock size={15} className="text-[#c47a4a]" />
                                        <span className="font-jost text-xs font-light text-[#5a7a6a]">{site.era}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Landmark size={15} className="text-[#c47a4a]" />
                                        <span className="font-jost text-xs font-light text-[#5a7a6a]">{site.known}</span>
                                    </div>
                                </div>

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${site.mapQuery}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 font-jost text-xs font-medium text-[#c47a4a] hover:text-[#b06a3e] transition-colors group"
                                >
                                    Open full map
                                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </article>
                    ))}
                </section>

                {/* TRENDING */}
                <section id="trending" className="w-full py-20 px-6 md:px-16 bg-gradient-to-b from-[#eef5f0] to-[#e5eee8]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div className="flex items-center gap-4">
                                <h2 className="font-cormorant text-4xl md:text-5xl font-light italic text-[#1f3a2e]">Also Worth The Walk</h2>
                                <span className="px-3 py-1 bg-[#c47a4a]/10 text-[#c47a4a] font-jost text-[10px] font-semibold uppercase tracking-[0.3em] rounded-full border border-[#c47a4a]/20">
                                    Trending
                                </span>
                            </div>
                            <a href="#" className="inline-flex items-center gap-2 font-jost text-xs font-medium text-[#c47a4a] hover:text-[#b06a3e] transition-colors group">
                                VIEW ALL DESTINATIONS
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {trending.map((item) => (
                                <div key={item.name} className="group relative h-[380px] overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2e]/90 via-[#1f3a2e]/30 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                                        <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">{item.location}</span>
                                        <h4 className="font-cormorant text-2xl font-light text-white">{item.name}</h4>
                                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/10">
                                            <div className="flex items-center gap-2">
                                                <Users size={13} className="text-[#c47a4a]" />
                                                <span className="font-jost text-[10px] font-light text-white/60">{item.stat}</span>
                                            </div>
                                            <ArrowUpRight size={15} className="text-[#c47a4a] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA BAND */}
                <section className="w-full py-16 px-6 md:px-16 bg-[#c47a4a]">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        <h2 className="font-cormorant text-3xl md:text-4xl font-light italic text-white">
                            Plan the rest of the valley.
                        </h2>
                        <a
                            href="#budget"
                            className="px-8 py-3.5 bg-white text-[#1f3a2e] font-jost text-sm font-medium rounded-full hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                            OPEN BUDGET PLANNER →
                        </a>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-16 px-6 md:px-16 bg-[#1f3a2e]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-4 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center bg-[#c47a4a] rounded-lg">
                                <Mountain size={16} color="white" />
                            </div>
                            <span className="font-cormorant text-2xl font-light text-white">संसार</span>
                        </div>
                        <p className="font-jost text-sm font-light text-white/50 leading-relaxed">
                            A field guide to Nepal's heritage valley — the squares, the stupas, and everything
                            between the temple bells.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-3">
                            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Company</span>
                            {["About", "Press", "Careers"].map((label) => (
                                <a key={label} href="#" className="font-jost text-sm font-light text-white/40 hover:text-white/70 transition-colors">
                                    {label}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Connect</span>
                            {["Instagram", "YouTube", "TripAdvisor"].map((label) => (
                                <a key={label} href="#" className="font-jost text-sm font-light text-white/40 hover:text-white/70 transition-colors">
                                    {label}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Resources</span>
                            {["Blog", "Travel Guide", "FAQs"].map((label) => (
                                <a key={label} href="#" className="font-jost text-sm font-light text-white/40 hover:text-white/70 transition-colors">
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10">
                    <span className="font-jost text-[10px] font-light text-white/20">© 2026 संसार — Nepal Tourism</span>
                    <span className="font-jost text-[10px] font-light text-white/20">Built for the Nepal Tourism Hackathon</span>
                </div>
            </footer>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Discover;