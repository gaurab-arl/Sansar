import BudgetSummary from "./BudgetSummary";
import CuratedInsight from "./CuratedInsight";
import ItineraryBuilder from "./ItineraryBuilder";
import RecommendationsGrid from "./RecommendationsGrid";

export default function BudgetDashboard({
  segments,
  totalDays,
  curatedInsight,
  totalEstimate,
  budgetCategories,
  recommendations,
  onAddSegment,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
      <div className="lg:col-span-4 flex flex-col gap-6">
        <ItineraryBuilder
          segments={segments}
          totalDays={totalDays}
          onAddSegment={onAddSegment}
        />
        <CuratedInsight title={curatedInsight.title} body={curatedInsight.body} />
      </div>

      <div className="lg:col-span-8 flex flex-col gap-6">
        <BudgetSummary
          total={totalEstimate}
          totalDays={totalDays}
          categories={budgetCategories}
        />
        <RecommendationsGrid recommendations={recommendations} />
      </div>
    </div>
  );
}
