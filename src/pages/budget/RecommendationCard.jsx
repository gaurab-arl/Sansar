export default function RecommendationCard({ recommendation }) {
  const r = recommendation;

  return (
    <div className="bg-surface-container-high rounded-xl p-6 shadow-md flex flex-col gap-4 relative overflow-hidden group hover:bg-surface-container-highest transition-colors cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${r.iconBg} flex items-center justify-center ${r.iconColor}`}>
            <span className="material-symbols-outlined">{r.icon}</span>
          </div>
          <div>
            <h4 className="font-headline-md text-body-lg text-on-surface">{r.title}</h4>
            <p className="font-body-md text-label-caps text-on-surface-variant">{r.subtitle}</p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-on-surface-variant transition-colors transform group-hover:translate-x-1 ${r.hoverArrow}`}
        >
          arrow_forward
        </span>
      </div>

      <div
        className="w-full h-32 rounded-lg bg-cover bg-center mt-2 relative"
        role="img"
        aria-label={r.alt}
        style={{ backgroundImage: `url('${r.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg" />

        {r.tag.type === "badge" ? (
          <span className="absolute bottom-2 left-2 font-label-caps text-[10px] text-tertiary bg-surface/80 backdrop-blur-md px-2 py-1 rounded-sm uppercase border border-tertiary/30">
            {r.tag.label}
          </span>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-surface/90 backdrop-blur px-2 py-1 rounded-md">
            <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
              savings
            </span>
            <span className="font-label-caps text-[10px] text-on-surface uppercase">
              {r.tag.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
