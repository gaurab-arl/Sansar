import { ArrowUpRight, Users } from "lucide-react";
import trending from "../../data/Features";

export default function Trending() {
    return (
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
    )
}