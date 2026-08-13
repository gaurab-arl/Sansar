import DestinationCard from "./DestinationCard";

const SORT_OPTIONS = [
  { value: "trending", label: "Trending Now" },
  { value: "new", label: "Newly Added" },
  { value: "match", label: "Best Match" },
];

export default function DestinationGrid({ destinations, sort, onSortChange, onLoadMore }) {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <div className="flex justify-between items-end mb-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tighter">
            Uncharted <span className="text-primary italic font-light">Horizons</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Discover destinations meticulously curated for the discerning explorer. Traverse
            landscapes that defy expectation.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
            Sort by
          </span>
          <select
            value={sort}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="bg-transparent text-primary font-body-md border-b border-primary/30 pb-1 focus:outline-none focus:border-primary cursor-pointer appearance-none pr-6 relative"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {destinations.map((d) => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>

      <div className="w-full flex justify-center py-8">
        <button
          onClick={onLoadMore}
          className="flex items-center gap-3 text-primary hover:text-primary-fixed-dim transition-colors group"
        >
          <span className="font-label-caps text-label-caps uppercase tracking-widest">
            Load More Destinations
          </span>
          <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">
            south
          </span>
        </button>
      </div>
    </div>
  );
}
