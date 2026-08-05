

import { useRef } from "react"
import AnimatedTitle from "./AnimatedTitle"
import Button from "./Button"

type TitleProps = {
    title: string;
    category: string;
}

export default function Story() {
    const frameRef = useRef(null)

    return (
        <section id="story" className="relative w-full  text-blue-50 bg-black">
            <div className="flex size-full flex-col items-center py-10 pb-24 ">

                <p className="font-general text-sm uppercase md:text-[10px]">
                    the multiversal ip world
                </p>
                <div className="realtive size-full flex items-center justify-center flex-wrap max-w-[900px]">

                    <AnimatedTitle
                        title="the story of a hidden realm"
                        containerClass="mt-5 pointer-event-none mix-blend-difference relative z-10"
                    />
                </div>
                <div className="story-img-container ">
                    <div className="story-img-mask max-w-[900px] w-200 flex items-ceter">
                        <div className="story-img-cotent ">
                            <img
                                ref={frameRef}
                                src="/img/gallery-3.webp"
                                className="size-full object-cover " />

                        </div>

                    </div>

                </div>
                <div className="absolute bottom-50 right-20 w-80 ">
                    <div className="mb-4">
                        <p className="text-white ">
                            Where realms converge, lies Zentry and the
                            boundless pillar. Discover its secrets and shape your
                            fate amidst infinite opportunities.
                        </p>
                    </div>
                    <Button title="discover prlogue" containerClass="uppercase text-sm" />
                    
                </div>
            </div>
        </section>
    )
}