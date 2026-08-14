import { Play } from "lucide-react";
import { IMG } from "../../data/Features";

export default function HeroVideo({ onClick }) {
    return (
        <div className="relative w-full max-w-[480px] mx-auto">

            {/* 9:16 */}
            <div
                className="relative w-full"
                style={{ paddingBottom: "177.78%" }}
            >
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/30 bg-black/5 border-2 border-white/20">

                    {/* VIDEO */}
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source
                            src="/videos/nepal.mp4"
                            type="video/mp4"
                        />

                        <img
                            src={IMG.heroBasantapur}
                            alt="Nepal Heritage"
                            className="w-full h-full object-cover"
                        />
                    </video>

                    {/* PLAY BUTTON */}
                    <button
                        type="button"
                        onClick={onClick}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-all duration-300"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#c47a4a]/90 flex items-center justify-center shadow-2xl shadow-[#c47a4a]/40 group-hover:scale-110 transition-transform duration-300">
                            <Play className="text-white w-8 h-8 md:w-10 md:h-10 ml-1" />
                        </div>
                    </button>

                    {/* BOTTOM LABEL */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <p className="font-cormorant text-base md:text-lg font-light italic text-white/95 text-center">
                            Nepal · A Visual Journey
                        </p>
                    </div>

                    {/* TOP BADGE */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[8px] font-jost font-medium uppercase tracking-[0.2em] text-white/80 border border-white/20">
                            9:16
                        </span>
                    </div>

                    {/* HINT */}
                    <div className="absolute bottom-20 right-4 z-10 opacity-60">
                        <span className="text-[8px] font-jost font-light text-white/50 uppercase tracking-[0.2em] bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                            Click to expand
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}
