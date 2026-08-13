import DestinationCard from "./DestinationCard";
import { Mountain, Compass, MapPin } from "lucide-react";

export default function DestinationGrid({
  destinations,
  onEnterModel,
}) {
  return (
    <section className="w-full py-16 px-6 md:px-16 bg-gradient-to-b from-[#f5faf7] via-[#eef5f0] to-[#e5eee8] relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #c47a4a 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, #2d5a3d 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-20 right-10 opacity-5 hidden lg:block">
        <Mountain size={80} className="text-[#2d5a3d]" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 hidden lg:block">
        <Compass size={60} className="text-[#c47a4a]" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 mb-16 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/60" />
          <span className="px-4 py-1.5 rounded-full border border-[#c47a4a]/20 bg-[#c47a4a]/5 backdrop-blur-sm">
            <p className="font-jost text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c47a4a]">
              Digital Heritage
            </p>
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/60" />
        </div>

        {/* Title */}
        <h1 className="font-cormorant text-5xl md:text-7xl lg:text-[6.5rem] font-light leading-[0.95] tracking-[-0.03em]">
          <span className="text-[#1f3a2e]">Enter the Place</span>

        </h1>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#c47a4a]/30" />
          <span className="w-2 h-2 rotate-45 border border-[#c47a4a]/30" />
          <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#c47a4a]/30" />
        </div>

        {/* Description */}
        <p className="mt-6 max-w-lg mx-auto font-jost text-sm font-light leading-relaxed text-[#5a7a6a]">
          Choose a place and step inside its reconstructed
          space. Move through the architecture, discover
          significant locations, and experience the place
          beyond a photograph.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#c47a4a]" />
            <span className="font-jost text-xs font-light text-[#5a7a6a]">
              {destinations.length} Destinations
            </span>
          </div>
          <div className="w-px h-6 bg-[#c47a4a]/20" />
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-[#c47a4a]" />
            <span className="font-jost text-xs font-light text-[#5a7a6a]">
              3D Experience
            </span>
          </div>
        </div>
      </header>

      {/* DESTINATIONS GRID */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DestinationCard
                destination={destination}
                onEnterModel={onEnterModel}
              />
            </div>
          ))}
        </div>

        {/* Bottom Decorative Text */}
        <div className="mt-16 text-center">
          <p className="font-jost text-[10px] font-light uppercase tracking-[0.3em] text-[#5a7a6a]/30">
            <span className="inline-block mx-2">✦</span>
            Explore the heritage of Nepal
            <span className="inline-block mx-2">✦</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}