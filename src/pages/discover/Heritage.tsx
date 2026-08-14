import { MapPin, ArrowUpRight, Landmark, Clock } from "lucide-react";
import { heritageSites } from "../../data/Features";

export default function Heritage() {
    return (
        <section
            id="heritage"
            className="w-full max-w-7xl mx-auto px-6 md:px-16 py-16"
        >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-10">
                <div>
                    <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                        FIELD NOTES
                    </span>

                    <h2 className="font-cormorant text-4xl md:text-5xl font-light italic text-[#1f3a2e] mt-3">
                        Three Courtyards,
                        <br />
                        One Valley.
                    </h2>
                </div>

                <p className="font-jost text-sm font-light text-[#5a7a6a] max-w-sm">
                    Basantapur, Patan, and Bhaktapur — the valley's three royal
                    squares, each a short taxi ride from the next.
                </p>
            </div>

            {/* HERITAGE SITES */}
            {heritageSites.map((site, index) => {
                const reverse = index % 2 !== 0;
                const num = String(index + 1).padStart(2, "0");

                return (
                    <article
                        key={site.name}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-16 border-t border-[#d9d1c3]"
                    >
                        {/* IMAGE */}
                        <div
                            className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""
                                }`}
                        >
                            <div className="relative w-full h-[360px] md:h-[440px] overflow-hidden">
                                <img
                                    src={site.image}
                                    alt={site.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Image gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a2ecc] via-transparent to-transparent" />

                                {/* Location */}
                                <div className="absolute bottom-5 left-5 px-3 py-1.5 flex items-center gap-2 bg-[#1f3a2ecc]">
                                    <MapPin
                                        size={13}
                                        className="text-[#c8a96b]"
                                    />

                                    <span className="font-mono text-[11px] text-[#f5efe3]">
                                        {site.location}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div
                            className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""
                                } flex flex-col gap-5`}
                        >
                            {/* NUMBER + LOCATION */}
                            <div className="flex items-center gap-4">
                                <span className="font-cormorant text-[44px] text-[#d9d1c3] leading-none">
                                    {num}
                                </span>

                                <span className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                                    {site.location}
                                </span>
                            </div>

                            {/* TITLE */}
                            <h3 className="font-cormorant text-4xl md:text-5xl font-light text-[#1f3a2e]">
                                {site.name}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="font-jost text-sm leading-7 font-light text-[#5a7a6a]">
                                {site.description}
                            </p>

                            {/* DETAILS */}
                            <div className="flex flex-wrap gap-6 pt-2 pb-1">
                                <div className="flex items-center gap-2">
                                    <Clock
                                        size={15}
                                        className="text-[#c47a4a]"
                                    />

                                    <span className="font-mono text-[11px] text-[#5a7a6a]">
                                        {site.era}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Landmark
                                        size={15}
                                        className="text-[#c47a4a]"
                                    />

                                    <span className="font-mono text-[11px] text-[#5a7a6a]">
                                        {site.known}
                                    </span>
                                </div>
                            </div>

                            {/* MAP */}
                            <div className="relative w-full h-[220px] overflow-hidden border border-[#d9d1c3]">
                                <iframe
                                    title={`Map — ${site.name}`}
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                                        site.mapQuery
                                    )}&output=embed`}
                                    className="w-full h-full grayscale-[35%] contrast-[1.05]"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                            {/* FULL MAP */}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    site.mapQuery
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex items-center gap-2 self-start font-jost text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c47a4a]"
                            >
                                Open full map

                                <ArrowUpRight
                                    size={13}
                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />
                            </a>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}