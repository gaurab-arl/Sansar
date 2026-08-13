import { useRef } from "react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

export default function Story() {
    const frameRef = useRef<HTMLImageElement | null>(null);

    const handleMouseLeave = () => {
        if (!frameRef.current) return;

        gsap.to(frameRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power3.out",
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        const { clientX, clientY } = e;

        const element = frameRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            rotateX,
            rotateY,
            transformPerspective: 500,
            duration: 0.2,
            ease: "power1.inOut",
        });
    };

    return (
        <section id="story" className="relative w-full text-blue-50 bg-black">
            <div className="flex flex-col items-center py-10 pb-24">
                <p className="text-sm uppercase">the multiversal ip world</p>

                <div className="relative flex justify-center max-w-[900px]">
                    <AnimatedTitle
                        title="the story of a hidden realm"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />
                </div>

                <div className="story-img-container">
                    <div className="story-img-mask max-w-[1000px] w-full flex items-center">
                        <div className="story-img-content">
                            <img
                                ref={frameRef}
                                src="/img/gallery-3.webp"
                                className="w-full h-full object-cover"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-60 right-20 w-80">
                    <p className="text-white mb-4">
                        Where realms converge, lies Zentry and the boundless pillar.
                        Discover its secrets and shape your fate.
                    </p>

                    <Button
                        title="discover prologue"
                        containerClass="uppercase text-sm"
                    />
                </div>
            </div>
        </section>
    );
}