import { useState } from "react";

const CONTINENTS = ["Asia", "Europe", "Americas"];
const EXPERIENCES = ["Nature", "Culture", "Urban"];
const BUDGET_LEVELS = ["$", "$$", "$$$"];

function ContinentCheckbox({ label, checked, onToggle }) {
  return (
    <label className="flex items-center gap-3 group cursor-pointer">
      <div
        onClick={onToggle}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
          checked
            ? "bg-primary border-primary"
            : "border-outline-variant group-hover:border-primary"
        }`}
      >
        <span
          className={`material-symbols-outlined text-[12px] transition-opacity ${
            checked ? "opacity-100 text-on-primary" : "opacity-0 group-hover:opacity-100 text-primary"
          }`}
        >
          check
        </span>
      </div>
      <span
        onClick={onToggle}
        className={`font-body-md text-body-md transition-colors ${
          checked ? "text-on-surface" : "text-on-surface-variant group-hover:text-on-surface"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default function FilterSidebar({ mapImageSrc }) {
  const [continents, setContinents] = useState({ Europe: true });
  const [experience, setExperience] = useState("Culture");
  const [budget, setBudget] = useState("$$");

  const toggleContinent = (name) =>
    setContinents((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <aside className="w-full md:w-64 flex-shrink-0 flex-col gap-8 sticky top-32 self-start hidden md:flex">
      <div className="flex flex-col gap-6 bg-surface-container/50 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/10">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined">filter_list</span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface">
            Curate
          </span>
        </div>

        {/* Continent */}
        <div className="flex flex-col gap-3">
          <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider">
            Continent
          </span>
          {CONTINENTS.map((c) => (
            <ContinentCheckbox
              key={c}
              label={c}
              checked={!!continents[c]}
              onToggle={() => toggleContinent(c)}
            />
          ))}
        </div>

        {/* Experience */}
        <div className="flex flex-col gap-3 mt-4">
          <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider">
            Experience
          </span>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCES.map((exp) => {
              const isActive = experience === exp;
              return (
                <button
                  key={exp}
                  onClick={() => setExperience(exp)}
                  className={`px-3 py-1.5 rounded-full font-label-caps text-[10px] uppercase transition-all ${
                    isActive
                      ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(190,198,225,0.3)]"
                      : "bg-surface-variant text-on-surface-variant hover:bg-primary/20 hover:text-primary"
                  }`}
                >
                  {exp}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-3 mt-4">
          <span className="font-label-caps text-[10px] uppercase text-on-surface-variant tracking-wider">
            Budget Intensity
          </span>
          <div className="flex w-full rounded-lg overflow-hidden border border-outline-variant/30">
            {BUDGET_LEVELS.map((level, i) => {
              const isActive = budget === level;
              return (
                <button
                  key={level}
                  onClick={() => setBudget(level)}
                  className={`flex-1 py-2 text-sm font-bold transition-colors ${
                    i < BUDGET_LEVELS.length - 1 ? "border-r border-outline-variant/30" : ""
                  } ${
                    isActive
                      ? "bg-primary text-on-primary"
                      : "bg-surface text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map preview */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden group cursor-crosshair">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${mapImageSrc}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-headline-md text-body-lg text-on-surface">Explore Map</span>
            <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest">
              Interactive View
            </span>
          </div>
          <button className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">open_in_full</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
