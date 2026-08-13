import { useEffect, useState } from "react";
import {
    Mountain,
    MapPin,
    ArrowUpRight,
    Search,
    Menu,
    X,
    Landmark,
    Compass,
    Clock,
    Users,
} from "lucide-react";

/**
 * ────────────────────────────────────────────────────────────────────────
 * DESIGN TOKENS — "Sansar / Nepal, Unfiltered"
 * A Zentry-style system: near-black ground, one acid-lime signature accent,
 * plus two subject-pulled accents lifted from the material world of the
 * Kathmandu Valley itself — temple brick (rust) and repoussé brass (gold).
 * Alternates dark "field" sections with a warm parchment "paper" section,
 * mirroring Zentry's own black/off-white rhythm.
 * ────────────────────────────────────────────────────────────────────────
 */
const z = {
    ink: "#0c0b09",
    inkRaise: "#161310",
    panel: "#1e1a14",
    panelLine: "#3a3327",
    paper: "#efe8d8",
    paperInk: "#171310",
    paperLine: "#d9cfb6",
    lime: "#ccff33",
    limeInk: "#12200a",
    violet: "#7c5cff",
    rust: "#d1502f",
    gold: "#d8a13a",
    mist: "#a89f8d",
    mistDark: "#6b6252",
};

const fontDisplay = { fontFamily: "'Anton', sans-serif" };
const fontBody = { fontFamily: "'Space Grotesk', sans-serif" };
const fontMono = { fontFamily: "'Space Mono', monospace" };

function useFonts() {
    useEffect(() => {
        const id = "sansar-nepal-fonts";
        if (document.getElementById(id)) return;
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap";
        document.head.appendChild(link);
    }, []);
}

const eyebrow = {
    ...fontMono,
    fontSize: "11px",
    letterSpacing: "0.22em",
    fontWeight: 700,
};
const h1 = { ...fontDisplay, fontSize: "clamp(52px, 10vw, 128px)", lineHeight: 0.92, letterSpacing: "-0.01em" };
const h2 = { ...fontDisplay, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: 1.02, letterSpacing: "-0.005em" };
const h3 = { ...fontDisplay, fontSize: "26px", lineHeight: 1.1 };
const body = { ...fontBody, fontSize: "16px", lineHeight: 1.7, fontWeight: 400 };
const bodyLg = { ...fontBody, fontSize: "19px", lineHeight: 1.6, fontWeight: 400 };

/** cut-corner "portal" clip path — the page's signature geometric motif */
const portalClip = "polygon(28px 0,100% 0,100% calc(100% - 28px),calc(100% - 28px) 100%,0 100%,0 28px)";
const portalClipSm = "polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px)";

const NAV_ITEMS = [
    // { key: "discover", label: "Discover" },
    // { key: "heritage", label: "Heritage Sites" },
    // { key: "trending", label: "Trending" },
    // { key: "planner", label: "Budget Planner" },
];

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

const HERITAGE = [
    {
        tag: "Kathmandu · Hanuman Dhoka",
        title: "Basantapur Durbar Square",
        img: IMG.heroBasantapur,
        body:
            "The old royal seat of the Malla and Shah kings, wedged between Freak Street and the Kasthamandap crossroads. Climb the tiered plinths of the Maju Dega for a rooftop view over the square, then find the carved wooden window of the Kumari Ghar, home to Kathmandu's living goddess. Much of the square was rebuilt after the 2015 earthquake, beam by beam, reusing the original carvings wherever they survived.",
        era: "12th – 18th century",
        known: "Kumari Ghar & Maju Dega",
        mapQuery: "Kathmandu+Durbar+Square,+Basantapur,+Nepal",
    },
    {
        tag: "Lalitpur · City of Fine Arts",
        title: "Patan Durbar Square",
        img: IMG.patan,
        body:
            "Across the Bagmati river, Patan's square is tighter and denser than Kathmandu's — one stone-paved courtyard ringed by temples instead of a sprawl of them. The Krishna Mandir, carved entirely in stone in a South Indian shikhara style, anchors the square. Step into the old Royal Palace, now the Patan Museum, for the valley's finest collection of Newar bronze and repoussé metalwork.",
        era: "16th – 17th century",
        known: "Krishna Mandir & metalwork",
        mapQuery: "Patan+Durbar+Square,+Lalitpur,+Nepal",
    },
    {
        tag: "Bhaktapur · City of Devotees",
        title: "Bhaktapur Durbar Square",
        img: IMG.bhaktapur,
        body:
            "The furthest of the three from central Kathmandu, and the best preserved — cars stop at the city gates. The 55-Window Palace faces the Golden Gate, and a short walk leads to Nyatapola, Nepal's tallest pagoda, guarded by five pairs of stone figures said to each be ten times stronger than the one below it. Potters' Square, just south of the palace, still turns clay on foot-powered wheels.",
        era: "12th – 15th century",
        known: "Nyatapola & Potters' Square",
        mapQuery: "Bhaktapur+Durbar+Square,+Nepal",
    },
];

const TRENDING = [
    {
        place: "Boudhanath Stupa",
        district: "Kathmandu",
        stat: "3.2k check-ins / mo",
        img: IMG.boudhanath,
    },
    {
        place: "Pashupatinath Temple",
        district: "Kathmandu",
        stat: "UNESCO listed, 1979",
        img: IMG.pashupatinath,
    },
    {
        place: "Phewa Lake, Pokhara",
        district: "Pokhara",
        stat: "Annapurna reflections",
        img: IMG.pokhara,
    },
];

function RotatingBadge() {
    const text = "EXPLORE THE VALLEY • SCROLL DOWN • ";
    const chars = text.split("");
    return (
        <div
            className="relative w-28 h-28 shrink-0"
            style={{ animation: "sansar-spin 14s linear infinite" }}
        >
            {chars.map((ch, i) => {
                const angle = (360 / chars.length) * i;
                return (
                    <span
                        key={i}
                        className="absolute left-1/2 top-1/2 origin-[0_0]"
                        style={{
                            ...fontMono,
                            fontSize: "9.5px",
                            fontWeight: 700,
                            color: z.limeInk,
                            transform: `rotate(${angle}deg) translate(0,-52px)`,
                            letterSpacing: "0.05em",
                        }}
                    >
                        {ch}
                    </span>
                );
            })}
            <div
                className="absolute inset-0 m-auto w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: z.ink }}
            >
                <Mountain size={16} color={z.lime} />
            </div>
            <div className="absolute inset-0 rounded-full" style={{ backgroundColor: z.lime }} />
            {/* text sits above the fill circle */}
            <div className="absolute inset-0">
                {chars.map((ch, i) => {
                    const angle = (360 / chars.length) * i;
                    return (
                        <span
                            key={i}
                            className="absolute left-1/2 top-1/2 origin-[0_0]"
                            style={{
                                ...fontMono,
                                fontSize: "9.5px",
                                fontWeight: 700,
                                color: z.limeInk,
                                transform: `rotate(${angle}deg) translate(0,-52px)`,
                                letterSpacing: "0.05em",
                            }}
                        >
                            {ch}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function NavLink({ item, active, onClick }) {
    return (
        <a
            href="#"
            aria-current={active ? "page" : undefined}
            onClick={(e) => {
                e.preventDefault();
                onClick(item.key);
            }}
            style={{ ...eyebrow, color: active ? z.lime : z.mist }}
            className="uppercase transition-colors hover:opacity-90"
        >
            {item.label}
        </a>
    );
}

function HeritageArticle({ site, index, reverse }) {
    const num = String(index + 1).padStart(2, "0");
    return (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-16 border-t" style={{ borderColor: z.panelLine }}>
            <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
                <div
                    className="relative w-full h-[360px] md:h-[440px] overflow-hidden"
                    style={{ clipPath: portalClip, backgroundColor: z.panel }}
                >
                    <img src={site.img} alt={site.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to top, ${z.ink}cc, transparent 55%)` }}
                    />
                    <div
                        className="absolute bottom-5 left-5 px-3 py-1.5 flex items-center gap-2"
                        style={{ backgroundColor: `${z.ink}cc`, clipPath: portalClipSm }}
                    >
                        <MapPin size={13} color={z.lime} />
                        <span style={{ ...fontMono, fontSize: "11px", color: z.paper }}>{site.tag}</span>
                    </div>
                </div>
            </div>

            <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""} flex flex-col gap-5`}>
                <div className="flex items-center gap-4">
                    <span style={{ ...fontDisplay, fontSize: "44px", color: z.panelLine, lineHeight: 1 }}>{num}</span>
                    <span style={{ ...eyebrow, color: z.gold }} className="uppercase">
                        {site.tag}
                    </span>
                </div>
                <h3 style={{ ...h3, color: z.paper }}>{site.title}</h3>
                <p style={{ ...body, color: z.mist }}>{site.body}</p>

                <div className="flex flex-wrap gap-6 pt-2 pb-1">
                    <div className="flex items-center gap-2">
                        <Clock size={15} color={z.rust} />
                        <span style={{ ...fontMono, fontSize: "11px", color: z.mist }}>{site.era}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Landmark size={15} color={z.rust} />
                        <span style={{ ...fontMono, fontSize: "11px", color: z.mist }}>{site.known}</span>
                    </div>
                </div>

                {/* Embedded location map */}
                <div className="relative w-full h-[220px] overflow-hidden border" style={{ clipPath: portalClipSm, borderColor: z.panelLine }}>
                    <iframe
                        title={`Map — ${site.title}`}
                        src={`https://www.google.com/maps?q=${site.mapQuery}&output=embed`}
                        className="w-full h-full grayscale-[35%] contrast-[1.05]"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${site.mapQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 self-start"
                    style={{ ...eyebrow, color: z.lime }}
                >
                    Open full map
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </article>
    );
}

function TrendingCard({ item }) {
    return (
        <div className="group relative h-[380px] overflow-hidden cursor-pointer" style={{ clipPath: portalClip }}>
            <img
                src={item.img}
                alt={item.place}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${z.ink}0d, ${z.ink}b3, ${z.ink}f2)` }} />
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
                <span style={{ ...eyebrow, color: z.gold }}>{item.district.toUpperCase()}</span>
                <h4 style={{ ...fontDisplay, fontSize: "22px", color: z.paper }}>{item.place}</h4>
                <div className="flex items-center justify-between mt-2 pt-3 border-t" style={{ borderColor: `${z.mist}33` }}>
                    <div className="flex items-center gap-2">
                        <Users size={13} color={z.lime} />
                        <span style={{ ...fontMono, fontSize: "10px", color: z.mist }}>{item.stat}</span>
                    </div>
                    <ArrowUpRight size={15} color={z.lime} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
            </div>
        </div>
    );
}

export default function Discover() {
    useFonts();
    const [activePath, setActivePath] = useState("discover");
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div style={{ backgroundColor: z.ink, color: z.paper, ...body }} className="min-h-screen w-full overflow-x-hidden">
            <style>{`
        @keyframes sansar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sansar-pulse { 0%,100% { opacity:1 } 50% { opacity:.35 } }
      `}</style>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 backdrop-blur-xl" style={{ backgroundColor: `${z.ink}dd`, borderBottom: `1px solid ${z.panelLine}` }}>
                <div className="h-20 w-full px-5 md:px-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: z.lime, clipPath: portalClipSm }}>
                            <Mountain size={18} color={z.limeInk} />
                        </div>
                        <span style={{ ...fontDisplay, fontSize: "20px", color: z.paper }} className="tracking-tight">
                            SANSAR
                        </span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <NavLink key={item.key} item={item} active={activePath === item.key} onClick={setActivePath} />
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center gap-5">
                        <Search size={18} className="cursor-pointer" style={{ color: z.mist }} />
                        <button
                            className="px-5 py-2.5 flex items-center gap-2"
                            style={{ backgroundColor: z.lime, color: z.limeInk, clipPath: portalClipSm, ...eyebrow }}
                        >
                            PLAN A TRIP
                        </button>
                    </div>
                    <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
                        {menuOpen ? <X color={z.paper} /> : <Menu color={z.paper} />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden flex flex-col gap-5 px-5 pb-6" style={{ borderTop: `1px solid ${z.panelLine}` }}>
                        {NAV_ITEMS.map((item) => (
                            <div key={item.key} className="pt-4">
                                <NavLink item={item} active={activePath === item.key} onClick={setActivePath} />
                            </div>
                        ))}
                    </div>
                )}
            </header>

            <main className="w-full pt-20">
                {/* HERO */}
                <section className="relative w-full min-h-[92vh] flex items-end overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src={IMG.heroBasantapur} alt="Basantapur Durbar Square, Kathmandu" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${z.ink} 8%, ${z.ink}99 45%, ${z.ink}55 75%)` }} />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${z.ink}b3, transparent 60%)` }} />
                    </div>

                    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-16 pb-16 pt-40">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: z.lime, animation: "sansar-pulse 2s ease-in-out infinite" }} />
                            <span style={{ ...eyebrow, color: z.lime }}>3 UNESCO DURBAR SQUARES · 1 VALLEY</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                            <h1 style={{ ...h1, color: z.paper }} className="max-w-4xl">
                                NEPAL,
                                <br />
                                <span style={{ color: z.lime }}>UNFILTERED.</span>
                            </h1>
                            <div className="flex items-center gap-6 md:mb-3">
                                <RotatingBadge />
                            </div>
                        </div>

                        <p style={{ ...bodyLg, color: z.mist }} className="max-w-xl mt-6">
                            Three medieval courtyards, one Himalayan valley. Walk the brick lanes where kings once
                            held court, then find every square on the map before you land in Kathmandu.
                        </p>

                        {/* Search bar */}
                        <div className="w-full max-w-xl relative group mt-8">
                            <div
                                className="flex items-center p-1.5 pl-5 pr-1.5"
                                style={{ backgroundColor: `${z.panel}e6`, border: `1px solid ${z.panelLine}`, clipPath: portalClipSm }}
                            >
                                <Compass size={18} style={{ color: z.mist }} className="mr-3 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search a temple, square, or trail…"
                                    style={{ ...body, color: z.paper }}
                                    className="bg-transparent w-full focus:outline-none placeholder:opacity-50 text-sm py-2"
                                />
                                <button
                                    style={{ backgroundColor: z.lime, color: z.limeInk, ...eyebrow, clipPath: portalClipSm }}
                                    className="px-5 py-2.5 flex items-center gap-2 shrink-0"
                                >
                                    GO
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STAT STRIP */}
                <section style={{ backgroundColor: z.inkRaise, borderTop: `1px solid ${z.panelLine}`, borderBottom: `1px solid ${z.panelLine}` }}>
                    <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            ["7", "UNESCO sites, Kathmandu Valley"],
                            ["3", "royal durbar squares"],
                            ["1979", "year the valley was listed"],
                            ["1350m", "average elevation"],
                        ].map(([n, l], i) => (
                            <div key={i}>
                                <div style={{ ...fontDisplay, fontSize: "32px", color: z.lime }}>{n}</div>
                                <div style={{ ...fontMono, fontSize: "10.5px", color: z.mist }} className="uppercase mt-1">
                                    {l}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* INTRO — paper section */}
                <section style={{ backgroundColor: z.paper, color: z.paperInk }} className="w-full py-24">
                    <div className="max-w-[1000px] mx-auto px-5 md:px-16">
                        <span style={{ ...eyebrow, color: z.rust }}>THE KATHMANDU VALLEY</span>
                        <h2 style={{ ...h2, color: z.paperInk }} className="mt-4 mb-8">
                            A valley built by
                            <br />
                            rival kings.
                        </h2>
                        <p style={{ ...bodyLg, color: "#3a3327" }} className="max-w-2xl">
                            Long before Kathmandu was a single city, it was three competing kingdoms — Kathmandu,
                            Patan, and Bhaktapur — each racing to build the tallest pagoda and the most ornate
                            palace courtyard. What's left is a cluster of UNESCO-listed durbar squares packed into
                            a valley you can cross in an afternoon: carved wooden struts, a living goddess, and
                            brick plazas that still run on temple bells instead of traffic lights.
                        </p>
                    </div>
                </section>

                {/* HERITAGE ARTICLES */}
                <section id="heritage" className="w-full max-w-[1440px] mx-auto px-5 md:px-16 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-10">
                        <div>
                            <span style={{ ...eyebrow, color: z.gold }}>FIELD NOTES</span>
                            <h2 style={{ ...h2, color: z.paper }} className="mt-3">
                                Three Courtyards,
                                <br />
                                One Valley.
                            </h2>
                        </div>
                        <p style={{ ...body, color: z.mist }} className="max-w-sm">
                            Basantapur, Patan, and Bhaktapur — the valley's three royal squares, each a short taxi
                            ride from the next. Every entry below carries its own map.
                        </p>
                    </div>

                    {HERITAGE.map((site, i) => (
                        <HeritageArticle key={site.title} site={site} index={i} reverse={i % 2 === 1} />
                    ))}
                </section>

                {/* TRENDING */}
                <section id="trending" style={{ backgroundColor: z.inkRaise, borderTop: `1px solid ${z.panelLine}` }} className="w-full py-24">
                    <div className="max-w-[1440px] mx-auto px-5 md:px-16">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div className="flex items-center gap-4">
                                <h2 style={{ ...h2, color: z.paper }}>Also Worth The Walk</h2>
                                <span style={{ ...eyebrow, backgroundColor: `${z.rust}22`, color: z.rust, border: `1px solid ${z.rust}55` }} className="px-3 py-1">
                                    Trending
                                </span>
                            </div>
                            <a href="#" className="group flex items-center gap-2" style={{ ...eyebrow, color: z.lime }}>
                                VIEW ALL DESTINATIONS
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {TRENDING.map((item) => (
                                <TrendingCard key={item.place} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA BAND */}
                <section style={{ backgroundColor: z.lime, color: z.limeInk }} className="w-full py-20">
                    <div className="max-w-[1440px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
                        <h2 style={{ ...h2, color: z.limeInk }} className="max-w-xl">
                            Plan the rest
                            <br />
                            of the valley.
                        </h2>
                        <button
                            className="px-8 py-4 flex items-center gap-3 shrink-0"
                            style={{ backgroundColor: z.limeInk, color: z.lime, clipPath: portalClipSm, ...eyebrow }}
                        >
                            OPEN BUDGET PLANNER
                            <ArrowUpRight size={15} />
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-16 px-5 md:px-16" style={{ backgroundColor: z.ink, borderTop: `1px solid ${z.panelLine}` }}>
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-4 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 flex items-center justify-center" style={{ backgroundColor: z.lime, clipPath: portalClipSm }}>
                                <Mountain size={14} color={z.limeInk} />
                            </div>
                            <span style={{ ...fontDisplay, fontSize: "18px", color: z.paper }}>SANSAR</span>
                        </div>
                        <p style={{ ...body, color: z.mist }} className="text-sm">
                            A field guide to Nepal's heritage valley — the squares, the stupas, and everything
                            between the temple bells.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                        <div className="flex flex-col gap-4">
                            <span style={{ ...eyebrow, color: z.paper }}>COMPANY</span>
                            {["About", "Press", "Careers"].map((label) => (
                                <a key={label} href="#" style={{ ...body, color: z.mist }} className="text-sm hover:opacity-80">
                                    {label}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <span style={{ ...eyebrow, color: z.paper }}>CONNECT</span>
                            {["Instagram", "Twitter", "TikTok"].map((label) => (
                                <a key={label} href="#" style={{ ...body, color: z.mist }} className="text-sm hover:opacity-80">
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    className="max-w-[1440px] mx-auto mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                    style={{ ...fontMono, fontSize: "10px", color: z.mistDark, borderTop: `1px solid ${z.panelLine}` }}
                >
                    <span>© 2026 SANSAR — BUILT FOR THE NEPAL TOURISM HACKATHON.</span>
                    <span>MAP DATA © GOOGLE · PHOTOS VIA WIKIMEDIA COMMONS (CC BY / CC BY-SA)</span>
                </div>
            </footer>
        </div>
    );
}