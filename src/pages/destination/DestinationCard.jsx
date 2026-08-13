export default function DestinationCard({
  destination,
  onEnterModel,
}) {
  const isAvailable = destination.available;

  return (
    <article
      className={`
        group relative overflow-hidden
        rounded-[28px]
        bg-white
        border border-black/[0.08]
        transition-all duration-500
        ${isAvailable
          ? "hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)]"
          : "opacity-80"
        }
      `}
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EDEDE8]">
        <img
          src={destination.image}
          alt={destination.name}
          className={`
            absolute inset-0
            h-full w-full
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            ${isAvailable
              ? "group-hover:scale-[1.04]"
              : "grayscale"
            }
          `}
        />

        {/* Subtle image overlay */}
        <div className="absolute inset-0 bg-black/[0.04]" />

        {/* Coming Soon */}
        {!isAvailable && (
          <div className="absolute left-6 top-6">
            <span
              className="
                rounded-full
                border border-white/40
                bg-black/60
                px-4 py-2
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white
                backdrop-blur-md
              "
            >
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-7 md:p-8">
        <p
          className="
            mb-3
            text-[9px]
            uppercase
            tracking-[0.32em]
            text-black/40
          "
        >
          {destination.location}
        </p>

        <h2
          className="
            text-3xl
            md:text-[2.6rem]
            font-light
            leading-none
            tracking-[-0.05em]
            text-black
          "
        >
          {destination.name}
        </h2>

        <p
          className="
            mt-5
            max-w-md
            text-sm
            leading-7
            text-black/50
          "
        >
          {destination.description}
        </p>

        {/* ACTION */}
        {isAvailable ? (
          <button
            onClick={() => onEnterModel(destination)}
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-black
              px-6
              py-3.5
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white
              transition-all
              duration-300
              hover:bg-black/80
              hover:px-7
            "
          >
            Enter Place

            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </button>
        ) : (
          <div
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-black/10
              px-6
              py-3.5
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-black/35
            "
          >
            Experience in progress
          </div>
        )}
      </div>
    </article>
  );
}