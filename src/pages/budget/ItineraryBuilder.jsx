function SegmentRow({ segment }) {
  return (
    <div className="bg-surface p-4 rounded-lg flex items-center gap-4 cursor-grab hover:bg-surface-variant transition-colors shadow-sm group relative overflow-hidden">
      {segment.highlight && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed" />
      )}
      <span className="material-symbols-outlined text-on-surface-variant cursor-grab">
        drag_indicator
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-body-md text-body-md text-on-surface font-bold truncate">
          {segment.title}
        </p>
        <p className="font-label-caps text-label-caps text-on-surface-variant">
          {segment.location}
        </p>
      </div>
      <div className="text-right">
        <span className={`font-label-caps text-label-caps block ${segment.costColor}`}>
          ${segment.cost}
        </span>
      </div>
    </div>
  );
}

export default function ItineraryBuilder({ segments, totalDays, onAddSegment }) {
  return (
    <div className="bg-surface-container/50 backdrop-blur-md rounded-xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-6xl text-primary">calendar_month</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline-md text-headline-md text-on-surface">Itinerary Builder</h2>
        <span className="font-label-caps text-label-caps text-primary px-3 py-1 bg-primary-container rounded-full">
          {totalDays} Days
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {segments.map((segment) => (
          <SegmentRow key={segment.id} segment={segment} />
        ))}

        <button
          onClick={onAddSegment}
          className="bg-surface p-4 rounded-lg flex items-center gap-2 cursor-grab hover:bg-surface-variant transition-colors shadow-sm group border border-dashed border-outline-variant/30 text-center justify-center"
        >
          <span className="material-symbols-outlined text-on-surface-variant">add</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            Add Segment
          </span>
        </button>
      </div>
    </div>
  );
}
