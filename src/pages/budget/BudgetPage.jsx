import { useState } from "react";
import BudgetHero from "./BudgetHero";
import ItineraryBuilder from "./ItineraryBuilder";
import CuratedInsight from "./CuratedInsight";
import BudgetSummary from "./BudgetSummary";
import RecommendationsGrid from "./RecommendationsGrid";
import {
  itinerarySegments,
  budgetCategories,
  recommendations,
  curatedInsight,
  totalEstimate,
  totalDays,
} from "./budget";

export default function Budget() {
  const [selectedTier, setSelectedTier] = useState("Backpacker");
  const [segments, setSegments] = useState(itinerarySegments);

  const handleAddSegment = () => {
    console.log("Add segment clicked");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <BudgetHero selectedTier={selectedTier} onSelectTier={setSelectedTier} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <ItineraryBuilder
            segments={segments}
            totalDays={totalDays}
            onAddSegment={handleAddSegment}
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
    </div>
  );
}
