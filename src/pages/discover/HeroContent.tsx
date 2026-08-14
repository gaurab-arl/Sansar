export default function HeroContent() {
    return (
        <div className="w-full lg:w-1/2 text-center lg:text-left">

            {/* EYEBROW */}
            <div className="flex flex-wrap items-center gap-3 mb-4 justify-center lg:justify-start">
                <span className="w-2 h-2 rounded-full bg-[#c47a4a]" />

                <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                    3 UNESCO DURBAR SQUARES · 1 VALLEY
                </span>
            </div>

            {/* TITLE */}
            <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light italic text-[#1f3a2e] leading-[1.05]">
                Nepal,
                <br />

                <span className="text-[#c47a4a] not-italic">
                    Unfiltered.
                </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="font-jost text-base md:text-lg font-light text-[#5a7a6a] max-w-xl mt-6 leading-relaxed mx-auto lg:mx-0">
                Three medieval courtyards, one Himalayan valley. Walk the
                brick lanes where kings once held court, then find every
                square on the map before you land in Kathmandu.
            </p>

            {/* BUTTONS */}
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
    );
}