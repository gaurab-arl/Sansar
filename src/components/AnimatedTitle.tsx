import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TitleProps {
    title: string;
    containerClass?: string;
}

function AnimatedTitle({ title, containerClass }: TitleProps) {
    const containerRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                },
            });

            tl.to(".animated-word", {
                opacity: 1,
                stagger: 0.02,
                transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`animated-title ${containerClass}`}
        >
            {title.split("<br />").map((line, index) => (
                <div
                    key={index}
                    className="flex-center special-font max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split(" ").map((word, i) => (
                        <b key={i} className="animated-word">
                            {word}
                        </b>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default AnimatedTitle;