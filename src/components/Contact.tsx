const Contact = () => {
    return (
        <div id="contact" className="py-20 w-full min-h-screen px-6 md:px-16 bg-gradient-to-b from-[#f5faf7] via-[#eef5f0] to-[#e5eee8] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/60" />
                        <span className="px-4 py-1.5 rounded-full border border-[#c47a4a]/20 bg-[#c47a4a]/5">
                            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
                                WATCH THE JOURNEY
                            </p>
                        </span>
                        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/60" />
                    </div>

                    <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
                        <span className="bg-gradient-to-r from-[#1f3a2e] via-[#2d5a3d] to-[#1f3a2e] bg-clip-text text-transparent">
                            Experience Nepal Through Film
                        </span>
                    </h2>
                    <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#c47a4a]/40 to-transparent mx-auto mt-4" />
                    <p className="font-jost text-base font-light text-[#5a7a6a] max-w-xl mx-auto mt-4">
                        Watch this cinematic journey through the mountains, temples, and culture of Nepal.
                    </p>
                </div>

                {/* Square Video Container */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/5 p-4 md:p-6 border border-white/30 hover:shadow-2xl transition-shadow duration-500">
                        <div className="relative w-full overflow-hidden rounded-xl bg-black/5">
                            {/* Square Aspect Ratio 1:1 */}
                            <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/ZsHctGGTQtE?autoplay=0&rel=0"
                                    title="The Silent Echo - Nepal Journey"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        
                        {/* Video Info */}
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="font-cormorant text-lg font-light italic text-[#2d5a3d]">
                                    "The Silent Echo"
                                </p>
                                <p className="font-jost text-xs font-light text-[#5a7a6a]">
                                    A visual journey through Nepal
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-[#c47a4a]/30" />
                                <span className="text-[#c47a4a] text-sm">🎬</span>
                            </div>
                        </div>
                    </div>

                    {/* YouTube Link */}
                    <div className="mt-6 text-center">
                        <a 
                            href="https://www.youtube.com/watch?v=ZsHctGGTQtE" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-all duration-300 group"
                        >
                            <svg className="w-6 h-6 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span className="font-jost text-sm font-medium text-[#FF0000] group-hover:text-[#cc0000] transition-colors">
                                Watch on YouTube
                            </span>
                            <span className="text-[#FF0000]/50 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>

                {/* Decorative Bottom Line */}
                <div className="mt-16 flex items-center justify-center gap-4">
                    <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/20" />
                    <span className="font-jost text-[10px] font-light uppercase tracking-[0.3em] text-[#5a7a6a]/40">
                        Nepal • Himalayas • Culture
                    </span>
                    <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/20" />
                </div>
            </div>
        </div>
    );
};

export default Contact;
