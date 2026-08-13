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

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtrLF1pVSAdehfs3yTU4MzEtjdm-cuUKe-wxYMIV_ekYHZrjTtcB2vQRv7wy3GvsEdzkJ6kdvY-irPukErP2qNIXEb_5LIuTFTnqFC2zTgHOooUfq2Coh2SbZ8-JOXIZv7lZwF8ZbY8E3ZoXw6pel1ECTt_F5yx7IdM7o8_TXpDoSNLqkncUinizPJ0qSUZ_migTwVsO0iyCfwHJg1AX-I9CmI277Ry3_tim_zfreSZQQtgK94fAcxdA";

export default function Budget() {
  const [selectedTier, setSelectedTier] = useState("Backpacker");
  const [segments, setSegments] = useState(itinerarySegments);

  const handleAddSegment = () => {
    // Wire this up to whatever flow adds a new itinerary block —
    // e.g. open a modal, then setSegments([...segments, newSegment])
    console.log("Add segment clicked");
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen">
      <Header activePath="budget-planner" logoSrc={LOGO_SRC} />

      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full px-margin-desktop py-12 gap-12 max-w-container-max-width mx-auto">
          <BudgetHero selectedTier={selectedTier} onSelectTier={setSelectedTier} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
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
      </main>

      <Footer logoSrc={LOGO_SRC} />
    </div>
  );
}
