import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import { FaFacebook, FaTripadvisor } from "react-icons/fa";

type FooterItem = {
    title: string;
    category: string[];
};

const footerNav: FooterItem[] = [
    {
        title: "Destinations",
        category: ["Kathmandu Valley", "Pokhara", "Chitwan", "Lumbini", "Everest Region"],
    },
    {
        title: "Experiences",
        category: ["Trekking", "Jungle Safari", "Cultural Tours", "Adventure Sports", "Spiritual Journeys"],
    },
    {
        title: "Plan Your Trip",
        category: ["Visa Information", "Best Time to Visit", "Trekking Permits", "Travel Insurance", "FAQs"],
    },
    {
        title: "About Us",
        category: ["Our Story", "Why Nepal", "Sustainability", "Blog", "Contact"],
    },
];

type FooterNavProps = {
    section: FooterItem;
};

const FooterNavRender = ({ section }: FooterNavProps) => {
    return (
        <div className="footer-section flex flex-col">
            <h3 className="font-cormorant text-lg font-light text-white/90 mb-4 tracking-wide">
                {section.title}
            </h3>
            <ul className="flex flex-col gap-2.5 text-white/50">
                {section.category.map((item) => (
                    <li
                        key={item}
                        className="font-jost text-xs font-light uppercase tracking-wider cursor-pointer hover:text-white/80 transition duration-300 hover:translate-x-1"
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function Footer() {
    return (
        <footer className="bg-[#1f3a2e] text-white px-6 md:px-16 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 flex-wrap pb-12 border-b border-white/5">
                    {/* Branding */}
                    <div className="max-w-sm w-full lg:w-auto">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c47a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                            </svg>
                            <div className="flex flex-col leading-none">
                                <span className="font-cormorant text-2xl font-medium tracking-wide text-white">
                                    संसार
                                </span>
                                <span className="font-jost text-[8px] font-light tracking-[0.2em] uppercase text-white/40">
                                    Explore Nepal
                                </span>
                            </div>
                        </div>
                        <p className="font-jost text-sm font-light text-white/40 mt-4 max-w-xs leading-relaxed">
                            Plan your Himalayan journey with local expertise and authentic experiences. 
                            Discover the beauty, culture, and adventure of Nepal.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-6">
                            <FaFacebook className="text-white/30 hover:text-[#c47a4a] cursor-pointer transition duration-300 text-lg" />
                            <FaInstagram className="text-white/30 hover:text-[#c47a4a] cursor-pointer transition duration-300 text-lg" />
                            <FaXTwitter className="text-white/30 hover:text-[#c47a4a] cursor-pointer transition duration-300 text-lg" />
                            <FaYoutube className="text-white/30 hover:text-[#c47a4a] cursor-pointer transition duration-300 text-lg" />
                            <FaTripadvisor className="text-white/30 hover:text-[#c47a4a] cursor-pointer transition duration-300 text-lg" />
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-auto">
                        {footerNav.map((section) => (
                            <FooterNavRender key={section.title} section={section} />
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
                    <p className="font-jost text-xs font-light text-white/20">
                        © 2026 संसार. All rights reserved. Made with ❤️ in Nepal
                    </p>
                    <div className="flex gap-6">
                        <span className="font-jost text-[10px] font-light text-white/20 uppercase tracking-wider cursor-pointer hover:text-white/40 transition">
                            Privacy Policy
                        </span>
                        <span className="font-jost text-[10px] font-light text-white/20 uppercase tracking-wider cursor-pointer hover:text-white/40 transition">
                            Terms of Service
                        </span>
                        <span className="font-jost text-[10px] font-light text-white/20 uppercase tracking-wider cursor-pointer hover:text-white/40 transition">
                            Cookie Policy
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}