import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Image filenames — MATCHING YOUR ACTUAL FILES in public/img/
const imageMap: Record<string, string> = {
    "Kathmandu Durbar Square": "/img/kathmandu.jpeg",
    "Patan Durbar Square": "/img/patan.jpg",
    "Bhaktapur Durbar Square": "/img/bhaktapur.jpg",
    "Pashupatinath Temple": "/img/pashupatinath.jpg",
    "Changu Narayan Temple": "/img/chagunarayan.jpg",
    "Swayambhunath Stupa": "/img/swayambhunath.jpg",
    "Sywambhunath Stupa": "/img/swayambhunath.jpg",
    "Swayambhunath": "/img/swayambhunath.jpg",
    "Boudhanath Stupa": "/img/boudhanath.jpg",
    "Lumbini": "/img/lumbini.jpg",
    "Chitwan National Park": "/img/chitwan.jpg",
    "Sagarmatha National Park": "/img/sagarmatha.jpg"
};

// Wikimedia fallback (only used if local image fails to load)
const wiki = (file: string) =>
    `https://commons.wikimedia.org/wiki/Special:FilePath/File:${file}`;

const siteData = [
    {
        id: 1,
        name: "Kathmandu Durbar Square",
        category: "Cultural",
        description: "Ancient royal palace complex with exquisite Newari architecture, built in the 15th century.",
        fee: "NPR 1,000",
        icon: "🏛️",
        image: imageMap["Kathmandu Durbar Square"],
        fallbackImage: wiki("Kathmandu_Durbar_Square_2022.jpg")
    },
    {
        id: 2,
        name: "Patan Durbar Square",
        category: "Cultural",
        description: "One of the oldest Buddhist cities with 130 Bahals and 55 major temples.",
        fee: "NPR 1,000",
        icon: "🕉️",
        image: imageMap["Patan Durbar Square"],
        fallbackImage: wiki("Patan_durbar_square.jpg")
    },
    {
        id: 3,
        name: "Bhaktapur Durbar Square",
        category: "Cultural",
        description: "Home to the famous 55-window palace and untouched Western influences.",
        fee: "NPR 1,500",
        icon: "🏯",
        image: imageMap["Bhaktapur Durbar Square"],
        fallbackImage: wiki("Bhaktapur_Durbar_Square_2022.jpg")
    },
    {
        id: 4,
        name: "Pashupatinath Temple",
        category: "Cultural",
        description: "The holiest Hindu temple dedicated to Lord Shiva on the Bagmati river.",
        fee: "NPR 1,000",
        icon: "🔱",
        image: imageMap["Pashupatinath Temple"],
        fallbackImage: wiki("Pashupatinath_Temple_2022.jpg")
    },
    {
        id: 5,
        name: "Changu Narayan Temple",
        category: "Cultural",
        description: "The oldest temple in Nepal with inscriptions dating back to 365 A.D.",
        fee: "NPR 300",
        icon: "⛩️",
        image: imageMap["Changu Narayan Temple"],
        fallbackImage: wiki("Changunarayan_Temple,_Bhaktapur.JPG")
    },
    {
        id: 6,
        name: "Swayambhunath Stupa",
        category: "Cultural",
        description: "The ancient 'Monkey Temple' offering panoramic views of Kathmandu Valley.",
        fee: "NPR 200",
        icon: "🕊️",
        image: imageMap["Swayambhunath Stupa"],
        fallbackImage: wiki("Swayambhunath_Stupa_2022.jpg")
    },
    {
        id: 7,
        name: "Boudhanath Stupa",
        category: "Cultural",
        description: "One of the largest stupas in the world, built in the 5th century.",
        fee: "NPR 400",
        icon: "🙏",
        image: imageMap["Boudhanath Stupa"],
        fallbackImage: wiki("Boudhanath_Stupa_2022.jpg")
    },
    {
        id: 8,
        name: "Lumbini",
        category: "Cultural",
        description: "The sacred birthplace of Lord Gautam Buddha, a pilgrimage destination.",
        fee: "NPR 300",
        icon: "🪷",
        image: imageMap["Lumbini"],
        fallbackImage: wiki("Mayadevi_Temple_Lumbini_front_view.jpg")
    },
    {
        id: 9,
        name: "Chitwan National Park",
        category: "Natural",
        description: "Home to the One-Horned Rhinoceros and Bengal Tigers with 700+ wildlife species.",
        fee: "NPR 1,500",
        icon: "🐘",
        image: imageMap["Chitwan National Park"],
        fallbackImage: wiki("Indian_Rhinoceros_at_Chitwan_National_Park.jpg")
    },
    {
        id: 10,
        name: "Sagarmatha National Park",
        category: "Natural",
        description: "Home to Mount Everest and endangered species like Snow Leopard and Red Panda.",
        fee: "NPR 3,000",
        icon: "🏔️",
        image: imageMap["Sagarmatha National Park"],
        fallbackImage: wiki("Everest_kalapatthar.jpg")
    }
];

// Bento Card Component
interface BentoCardProps {
    title: string;
    description: string;
    fee?: string;
    icon?: string;
    image?: string;
    fallbackImage?: string;
    category?: string;
    containerClass?: string;
    isMain?: boolean;
}

const BentoCard = ({
    title,
    description,
    fee,
    icon = "🏛️",
    image,
    fallbackImage,
    category,
    containerClass = "",
    isMain = false,
}: BentoCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // 0 = trying primary, 1 = trying fallback, 2 = give up, show icon
    const [stage, setStage] = useState(0);

    useGSAP(() => {
        gsap.set(containerRef.current, { scale: 1, opacity: 1 });
    }, []);

    const handleMouseMove = () => {
        gsap.to(containerRef.current, { scale: .95, duration: .2 });
    };

    const handleLeave = () => {
        gsap.to(containerRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const currentSrc =
        stage === 0 ? image :
        stage === 1 ? fallbackImage :
        null;

    const showImage = Boolean(currentSrc);

    const handleImageError = () => {
        console.log(`⚠️ Image failed for "${title}" at stage ${stage}: ${currentSrc}`);
        setStage((s) => s + 1); // move to fallback, then finally to icon-only
    };

    return (
        <div
            className={`relative size-full min-h-[220px] overflow-hidden rounded-xl bg-gradient-to-br from-[#2d5a3d]/15 to-[#c47a4a]/15 group transition-all duration-500 hover:shadow-2xl ${containerClass}`}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
        >
            {showImage && (
                <div className="absolute inset-0">
                    <img
                        key={currentSrc /* force re-mount so onError fires cleanly per stage */}
                        src={currentSrc as string}
                        alt={title}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2e]/90 via-[#1f3a2e]/50 to-transparent" />
                </div>
            )}

            {!showImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-6xl mb-2 opacity-40">{icon}</div>
                        <p className="text-[10px] font-jost font-light text-[#5a7a6a]/60">{title}</p>
                    </div>
                </div>
            )}

            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                <div>
                    {category && (
                        <span className={`inline-block px-2 py-0.5 mb-2 text-[8px] font-jost font-semibold uppercase tracking-[0.2em] rounded-full ${
                            category === 'Natural'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-[#c47a4a]/20 text-[#c47a4a]'
                        }`}>
                            {category}
                        </span>
                    )}
                    <h3 className={`font-cormorant ${isMain ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-light leading-tight ${!showImage ? 'text-[#1f3a2e]' : ''}`}>
                        {title}
                    </h3>
                    <p className={`mt-2 max-w-xs text-xs md:text-sm font-jost font-light line-clamp-3 ${!showImage ? 'text-[#1f3a2e]/70' : 'text-white/70'}`}>
                        {description}
                    </p>
                    {fee && (
                        <p className="mt-1 text-xs font-jost font-light text-[#c47a4a]">
                            Entry: {fee}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main Feature Component
export default function Feature() {
    const finalSites = siteData;

    const mainSite = finalSites[0];
    const culturalSites = finalSites.filter(s => s.category === "Cultural").slice(1, 5);
    const naturalSites = finalSites.filter(s => s.category === "Natural");

    return (
        <section className="relative w-full bg-gradient-to-b from-[#f5faf7] via-[#eef5f0] to-[#e5eee8] py-20 px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 50%, #c47a4a 1px, transparent 1px),
                        radial-gradient(circle at 80% 50%, #2d5a3d 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/60" />
                        <span className="px-4 py-1.5 rounded-full border border-[#c47a4a]/20 bg-[#c47a4a]/5">
                            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                                UNESCO HERITAGE
                            </p>
                        </span>
                        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/60" />
                    </div>

                    <h2 className="font-cormorant text-5xl md:text-6xl font-light leading-[1.05]">
                        <span className="bg-gradient-to-r from-[#1f3a2e] via-[#2d5a3d] to-[#1f3a2e] bg-clip-text text-transparent">
                            {finalSites.length} UNESCO Sites of Nepal
                        </span>
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#c47a4a]/40 to-transparent mx-auto mt-4" />
                    <p className="font-jost text-base font-light text-[#5a7a6a] max-w-xl mx-auto mt-4">
                        {finalSites.filter(s => s.category === "Cultural").length} Cultural sites and {finalSites.filter(s => s.category === "Natural").length} Natural sites recognized for their outstanding universal value.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* First Row: Main Featured Site + Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-[300px] md:h-[380px]">
                            <BentoCard
                                title={mainSite.name}
                                description={mainSite.description}
                                fee={mainSite.fee}
                                icon={mainSite.icon}
                                image={mainSite.image}
                                fallbackImage={mainSite.fallbackImage}
                                category={mainSite.category}
                                isMain={true}
                            />
                        </div>
                        <div className="lg:col-span-1 h-[300px] md:h-[380px]">
                            <div className="h-full bg-white/40 rounded-xl backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center border border-white/20">
                                <div className="text-6xl mb-4">🇳🇵</div>
                                <h3 className="font-cormorant text-3xl font-light text-[#2d5a3d]">{finalSites.length}</h3>
                                <p className="font-jost text-sm font-light text-[#5a7a6a]">UNESCO World Heritage Sites</p>
                                <div className="w-12 h-[1px] bg-[#c47a4a]/30 my-4" />
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div>
                                        <p className="font-cormorant text-2xl font-light text-[#2d5a3d]">
                                            {finalSites.filter(s => s.category === "Cultural").length}
                                        </p>
                                        <p className="font-jost text-[10px] font-light text-[#5a7a6a] uppercase">Cultural</p>
                                    </div>
                                    <div>
                                        <p className="font-cormorant text-2xl font-light text-[#2d5a3d]">
                                            {finalSites.filter(s => s.category === "Natural").length}
                                        </p>
                                        <p className="font-jost text-[10px] font-light text-[#5a7a6a] uppercase">Natural</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row: Cultural Sites */}
                    {culturalSites.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {culturalSites.map((site) => (
                                <div key={site.id} className="h-[250px]">
                                    <BentoCard
                                        title={site.name}
                                        description={site.description}
                                        fee={site.fee}
                                        icon={site.icon}
                                        image={site.image}
                                        fallbackImage={site.fallbackImage}
                                        category={site.category}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Third Row: Natural Sites */}
                    {naturalSites.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {naturalSites.map((site) => (
                                <div key={site.id} className="h-[250px] md:h-[300px]">
                                    <BentoCard
                                        title={site.name}
                                        description={site.description}
                                        fee={site.fee}
                                        icon={site.icon}
                                        image={site.image}
                                        fallbackImage={site.fallbackImage}
                                        category={site.category}
                                        isMain={true}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center pt-6">
                        <p className="font-jost text-xs text-[#5a7a6a]">
                            {finalSites.length} UNESCO World Heritage Sites in Nepal • Preserving culture and nature for future generations
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}