import HeroContent from "./HeroContent";
import HeroVideo from "./HeroVideo";

export default function Hero({ onVideoOpen }) {
    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f5faf7] via-[#eef5f0] to-[#e5eee8]">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            radial-gradient(
                                circle at 20% 50%,
                                #c47a4a 1px,
                                transparent 1px
                            ),
                            radial-gradient(
                                circle at 80% 50%,
                                #2d5a3d 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-12 lg:py-20">

                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

                    {/* VIDEO */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <HeroVideo onClick={onVideoOpen} />
                    </div>

                    {/* CONTENT */}
                    <HeroContent />

                </div>
            </div>
        </section>
    );
}
