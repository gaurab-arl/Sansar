

export const Intro = () => (
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
);

export const Stats = () => (
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
);

