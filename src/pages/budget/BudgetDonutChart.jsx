const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~251.2

export default function BudgetDonutChart({ categories, centerValue, centerLabel }) {
  let cumulativePercent = 0;

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center relative">
      <svg
        className="w-full max-w-[280px] h-auto drop-shadow-2xl transform -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" fill="transparent" r={RADIUS} stroke="#101415" strokeWidth="12" />
        {categories.map((cat, i) => {
          const dashOffset = CIRCUMFERENCE - (cat.percent / 100) * CIRCUMFERENCE;
          const rotateDeg = cumulativePercent * 3.6;
          cumulativePercent += cat.percent;

          return (
            <circle
              key={cat.id}
              className="transition-all duration-1000 ease-out"
              style={{
                transitionDelay: `${i * 200}ms`,
                transform: i === 0 ? undefined : `rotate(${rotateDeg}deg)`,
                transformOrigin: "50px 50px",
              }}
              cx="50"
              cy="50"
              fill="transparent"
              r={RADIUS}
              stroke={cat.ringColor}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeWidth="12"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-headline-md text-headline-md text-on-surface">{centerValue}</span>
        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
          {centerLabel}
        </span>
      </div>
    </div>
  );
}
