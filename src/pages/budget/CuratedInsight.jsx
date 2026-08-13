export default function CuratedInsight({ title, body }) {
  return (
    <div className="bg-tertiary-container/20 rounded-xl p-6 shadow-md relative overflow-hidden group hover:bg-tertiary-container/30 transition-colors cursor-pointer">
      <div className="absolute -right-4 -bottom-4 opacity-20">
        <span className="material-symbols-outlined text-8xl text-tertiary">lightbulb</span>
      </div>
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-tertiary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <h3 className="font-headline-md text-body-lg text-on-surface">{title}</h3>
        </div>
        <p className="font-body-md text-label-caps text-on-surface-variant mt-2">{body}</p>
      </div>
    </div>
  );
}
