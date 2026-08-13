import RecommendationCard from "./RecommendationCard";

export default function RecommendationsGrid({ recommendations }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recommendations.map((r) => (
        <RecommendationCard key={r.id} recommendation={r} />
      ))}
    </div>
  );
}
