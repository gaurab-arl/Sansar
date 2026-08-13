import TierToggle from "./TierToggle";
import { TIERS } from "./budget";

export default function BudgetHero({ selectedTier, onSelectTier }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-3">
          <h1 className="font-display-lg text-display-lg text-on-background tracking-tight">
            Expedition Budget
          </h1>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Precision planning for your upcoming journey. Drag itinerary blocks to recalculate
          real-time estimates across accommodation, transport, and dining tiers.
        </p>
      </div>

      <div className="flex items-center gap-4 z-10">
        <TierToggle tiers={TIERS} selected={selectedTier} onSelect={onSelectTier} />
      </div>

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
