export default function TierToggle({ tiers, selected, onSelect }) {
  return (
    <div className="flex items-center bg-surface-container rounded-full p-1 relative shadow-sm">
      {tiers.map((tier) => {
        const isActive = tier === selected;
        return (
          <button
            key={tier}
            onClick={() => onSelect(tier)}
            className={`px-6 py-2 rounded-full font-label-caps text-label-caps transition-all ${
              isActive
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface hover:bg-surface-variant"
            }`}
          >
            {tier}
          </button>
        );
      })}
    </div>
  );
}
