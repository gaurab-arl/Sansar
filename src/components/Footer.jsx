import { FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

// 1. Cleaned up data structure into individual array strings
const Footernav = [
    { title: "Explore", catagorey: ["Articles", "Categories", "About", "Newsletter"] },
    { title: "Resources", catagorey: ["API reference", "Documentation", "SDKs", "Changelog"] },
    { title: "Legal", catagorey: ["About us", "Careers", "Press kit", "Contact"] },
];

// 2. Fixed case matching & component props definition
const FooternavRender = ({ title }) => {
    const section = Footernav.find(item => item.title.toLowerCase() === title.toLowerCase());

    if (!section) return null;

    return (
        <div className="footer-section">
            <h3 className="text-lg font-bold capitalize">{section.title}</h3>
            <ul>
                {section.catagorey.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white p-8 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8">
                <div>
                    <div className="flex flex-col gap-1">
                        <span className="special-font">redefine gaming</span>
                        <p className="max-w-md">exploring the future of gaming through insights, stories, and creativity.</p>
                        <div className='flex justify-between max-w-[120px] mt-2'>
                            <FaXTwitter />
                            <FaInstagram />
                            <FaYoutube />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-8">
                    {/* Rendered cleanly as valid React Components */}
                    <FooternavRender title="explore" />
                    <FooternavRender title="resources" />
                    <FooternavRender title="legal" />
                </div>

                <div>
                    <div className='h-20 w-20 rounded-md overflow-hidden'>
                        <img
                            src="img/gallery-1.webp"
                            alt="footer image"
                            className='h-20 w-20 object-cover'
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mt-4 text-sm text-gray-400">
                <p>
                    © 2025 Redefine Gaming. All rights reserved. | Privacy Policy | Terms of Service
                </p>
            </div>
        </footer>
    );
}