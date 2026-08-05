import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";


type FooterItem = {
    title: string;
    category: string[];
};


const footerNav: FooterItem[] = [
    {
        title: "Explore",
        category: ["Articles", "Categories", "About", "Newsletter"],
    },
    {
        title: "Resources",
        category: ["API reference", "Documentation", "SDKs", "Changelog"],
    },
    {
        title: "Legal",
        category: ["About us", "Careers", "Press kit", "Contact"],
    },
];


type FooterNavProps = {
    section: FooterItem;
};

const FooterNavRender = ({ section }: FooterNavProps) => {
    return (
        <div className="footer-section w-full flex flex-col items-center">
            <h3 className="font-bold capitalize mb-4 text-center">
                {section.title}
            </h3>

            <ul className="flex flex-col gap-3 text-white/70">
                {section.category.map((item) => (
                    <li
                        key={item}
                        className="text-xs uppercase cursor-pointer hover:text-white transition"
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
        <footer className="bg-black text-white px-10 py-12">
            {/* Top Section */}
            <div className="flex flex-row justify-between items-start gap-10 flex-wrap">

                {/* Branding */}
                <div className="max-w-sm">
                    <h2 className="text-xl font-bold mb-3">Redefine Gaming</h2>
                    <p className="text-sm text-gray-400">
                        Exploring the future of gaming through insights, stories, and creativity.
                    </p>

                    {/* Icons */}
                    <div className="flex gap-4 mt-4 text-xl">
                        <FaXTwitter className="cursor-pointer hover:text-gray-300" />
                        <FaInstagram className="cursor-pointer hover:text-gray-300" />
                        <FaYoutube className="cursor-pointer hover:text-gray-300" />
                    </div>
                </div>

                {/* Navigation Sections */}
                <div className="flex gap-20">
                    {footerNav.map((section) => (
                        <FooterNavRender key={section.title} section={section} />
                    ))}
                </div>

                {/* Image */}
                <div className="px-3">
                    <div className="h-40 max-w-[320px] w-full rounded-md overflow-hidden">
                        <img
                            src="img/swordman.webp"
                            alt="footer"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 pt-4 mt-8 text-sm text-gray-400 text-center">
                © 2025 Redefine Gaming. All rights reserved.
            </div>
        </footer>
    );
}