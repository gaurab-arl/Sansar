import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

interface ButtonProps {
    title: string;
    id?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerClass?: string;
}

export default function Button({
    title,
    id,
    leftIcon,
    rightIcon,
    containerClass,
}: ButtonProps) {
    const oldTextRef = useRef<HTMLSpanElement>(null);
    const newTextRef = useRef<HTMLSpanElement>(null);

    // Runs ONCE when the component mounts
    useGSAP(() => {
        gsap.set(newTextRef.current, {
            y: 20,
            opacity: 0,
        });
    }, []);

    const handleMouseEnter = () => {
        gsap.to(oldTextRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(newTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(oldTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(newTextRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <button
            id={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center gap-2 overflow-hidden rounded-full bg-white text-black px-6 py-3 ${containerClass}`}
        >
            {leftIcon}

            <div className="relative h-6 overflow-hidden">
                {/* Original text */}
                <span
                    ref={oldTextRef}
                    className="block"
                >
                    {title}
                </span>

                {/* Sliding text */}
                <span
                    ref={newTextRef}
                    className="absolute left-0 top-0 block"
                >
                    {title}
                </span>
            </div>

            {rightIcon}
        </button>
    );
}