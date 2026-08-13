import { useState } from "react";

const ACCENT_STYLES = {
  primary: {
    label: "text-primary",
    priceOn: "text-primary",
    priceOff: "text-primary/50",
    button: "bg-primary text-on-primary hover:bg-primary-fixed-dim shadow-[0_0_20px_rgba(190,198,225,0.2)]",
  },
  secondary: {
    label: "text-secondary",
    priceOn: "text-secondary",
    priceOff: "text-secondary/50",
    button: "border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary",
  },
};

export default function DestinationCard({ destination }) {
  const [favorited, setFavorited] = useState(destination.favorited);
  const accent = ACCENT_STYLES[destination.accent] ?? ACCENT_STYLES.primary;
  const isWide = destination.span === "wide";

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end bg-surface-container ${
        isWide ? "h-[400px] lg:col-span-2 p-8" : "h-[450px] p-6"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        role="img"
        aria-label={destination.alt}
        style={{ backgroundImage: `url('${destination.image}')` }}
      />
      <div
        className={`absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500 ${
          isWide
            ? "bg-gradient-to-r from-background/90 via-background/40 to-transparent"
            : "bg-gradient-to-t from-background via-background/40 to-transparent"
        }`}
      />

      {/* Top row: badge + favorite */}
      <div
        className={`absolute flex justify-between items-start z-10 ${
          isWide ? "top-8 left-8 right-8" : "top-6 left-6 right-6"
        }`}
      >
        {destination.badge ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-outline-variant/30 text-on-surface">
            <span className="material-symbols-outlined text-[14px] text-tertiary">diamond</span>
            <span className="font-label-caps text-[10px] uppercase tracking-widest text-tertiary">
              {destination.badge}
            </span>
          </div>
        ) : (
          <div />
        )}
        <button
          onClick={() => setFavorited((f) => !f)}
          aria-pressed={favorited}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className="w-10 h-10 rounded-full bg-background/40 backdrop-blur hover:bg-primary hover:text-on-primary flex items-center justify-center text-on-surface border border-outline-variant/20 transition-all shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">
            {favorited ? "favorite" : "favorite_border"}
          </span>
        </button>
      </div>

      {/* Content */}
      {isWide ? (
        <div className="relative z-10 w-full max-w-lg flex flex-col gap-6">
          <div className="flex flex-col">
            <span className={`font-label-caps text-label-caps uppercase tracking-widest mb-2 ${accent.label}`}>
              {destination.country}
            </span>
            <h3 className="font-display-lg text-display-lg text-on-surface leading-none mb-4">
              {destination.name}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {destination.description}
            </p>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <button className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors font-label-caps text-label-caps uppercase w-fit ${accent.button}`}>
              <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              Enter 3D Preview
            </button>
            <div className="flex flex-col">
              <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                Intensity
              </span>
              <div className="flex items-center gap-1 text-on-surface font-bold text-sm">
                {destination.price.split("").map((_, i) => (
                  <span key={i} className={i < destination.priceFilled ? accent.priceOn : accent.priceOff}>
                    $
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className={`font-label-caps text-label-caps uppercase tracking-widest mb-1 ${accent.label}`}>
                {destination.country}
              </span>
              <h3 className="font-display-lg text-display-lg-mobile text-on-surface leading-none">
                {destination.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-bold text-sm bg-surface-container/80 backdrop-blur px-3 py-1 rounded-lg">
              {destination.price.split("").map((_, i) => (
                <span key={i} className={i < destination.priceFilled ? accent.priceOn : ""}>
                  $
                </span>
              ))}
            </div>
          </div>
          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
              {destination.description}
            </p>
            <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors font-label-caps text-label-caps uppercase w-fit ${accent.button}`}>
              <span className="material-symbols-outlined text-[18px]">view_in_ar</span>
              3D Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
