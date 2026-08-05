
import { useRef } from "react"
import { TiLocationArrow } from "react-icons/ti"

interface BentoCardProps {
    src: string;
    title: React.ReactNode;
    description?: string;
    link?: string;
    containerClass?: string;
}

const BentoCard = ({
    src,
    title,
    description,
    link,
    containerClass = "",
}: BentoCardProps) => {
    const hoverButtonRef = useRef(null);

    return (
        <div className={`relative size-full border border-gray-900 overflow-hidden rounded-md ${containerClass}`}>
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute inset-0 size-full object-cover object-center"
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-5 text-blue-50">
                <div className="text-white">
                    <h1 className="bento-title special-font">{title}</h1>

                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">
                            {description}
                        </p>
                    )}
                </div>

                <div
                    ref={hoverButtonRef}
                    className="border-hsla relative flex w-fit items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                >
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300" />
                    <TiLocationArrow className="relative z-20" />
                    <p className="relative z-20">Coming Soon</p>
                </div>
            </div>
        </div>
    );
};
export default function Feature() {
    return (
        <section className="relative w-full bg-black px-20 pb-52">
            <div className="container mx-auto">

                <div className="px-5 py-32">
                    <span className="mb-2 font-circular-web text-lg font-semibold text-white">
                        Into the Metagame Layer
                    </span>

                    <p className="max-w-md font-circular-web text-lg text-white/50">
                        Immerse yourself in a rich and ever-expanding universe where
                        a vibrant array of products converge into an interconnected
                        overlay experience.
                    </p>
                </div>

                {/* ---------------- First Card ---------------- */}

                <div className="mb-7 h-96 overflow-hidden rounded-xl md:h-[65vh]">
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={<>Radi<b>n</b>t</>}
                        description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
                    />
                </div>

                {/* ---------------- Second Section ---------------- */}

                <div className="mb-7 grid h-[70vh]  md:grid-cols-2 gap-7">

                    {/* Left */}
                    <BentoCard
                        src="videos/feature-2.mp4"
                        title={<>Radi<b>n</b>t</>}
                        description="A cross-platform metagame app."
                        containerClass="row-span-2"
                    />

                    {/* Right */}
                    <div className="grid gap-7">

                        <BentoCard
                            src="videos/feature-3.mp4"
                            title={<>N<b>e</b>xus</>}
                            description="Explore new adventures."
                        />

                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={<>A<b>r</b>ena</>}
                            description="Battle with your friends."
                        />

                    </div>

                </div>

                {/* ---------------- Third Section ---------------- */}

                <div className="grid h-[35vh] md:grid-cols-2 gap-7">

                    <BentoCard
                        src="videos/feature-5.mp4"
                        title={<>M<b>e</b>ta</>}
                        description="Discover a connected universe."
                    />

                    <BentoCard
                        src="videos/feature-4.mp4"
                        title={<>S<b>t</b>udio</>}
                        description="Create and share experiences."
                    />

                </div>

            </div>
        </section>
    );
}