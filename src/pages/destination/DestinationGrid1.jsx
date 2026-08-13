import DestinationCard from "./DestinationCard";

export default function DestinationGrid({
  destinations,
  onEnterModel,
}) {
  return (
    <section className="w-full">

      {/* HEADER */}
      <header className="mb-16 max-w-2xl">

        <p
          className="
            mb-5
            text-[9px]
            uppercase
            tracking-[0.4em]
            text-black/40
          "
        >
          Digital Heritage
        </p>

        <h1
          className="
            text-5xl
            md:text-7xl
            lg:text-[6.5rem]
            font-light
            leading-[0.85]
            tracking-[-0.07em]
            text-black
          "
        >
          Enter the
          <br />

          <span className="italic">
            place.
          </span>
        </h1>

        <p
          className="
            mt-8
            max-w-lg
            text-sm
            leading-7
            text-black/45
          "
        >
          Choose a place and step inside its reconstructed
          space. Move through the architecture, discover
          significant locations, and experience the place
          beyond a photograph.
        </p>
      </header>

      {/* DESTINATIONS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onEnterModel={onEnterModel}
          />
        ))}
      </div>

    </section>
  );
}