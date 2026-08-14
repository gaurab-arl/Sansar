import { X } from "lucide-react";

type videoModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }:videoModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-fadeIn"
            onClick={onClose}
        >
            {/* CLOSE */}
            <button
                type="button"
                className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors"
                onClick={onClose}
            >
                <X size={32} />
            </button>

            {/* VIDEO */}
            <div
                className="relative w-full max-w-[90vh] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative w-full"
                    style={{ paddingBottom: "177.78%" }}
                >
                    <video
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                    >
                        <source
                            src="/videos/nepal.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                <p className="text-center text-white/50 font-jost text-xs font-light mt-4 tracking-wider">
                    Nepal · A Visual Journey
                </p>
            </div>
        </div>
    );
}