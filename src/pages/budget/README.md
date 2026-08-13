# Sansar — Budget Planner (React)

Converted from `budget.html` into componentized React (JSX + Tailwind).

## File map

```
tailwind.config.js         same design tokens as the Destinations page — reuse
                            one config across pages if this lives in the same app
src/
  index.css                 @tailwind directives + base-layer/scrollbar CSS
  pages/
    BudgetPage.jsx            route target — drop into your router
  data/
    budget.js                 itinerary segments, budget categories, tiers,
                               recommendations — all the numbers live here
  components/
    Header.jsx / Footer.jsx    shared with the Destinations page (identical files —
                                dedupe if both pages live in one app)
    BudgetHero.jsx             title, subtitle, tier toggle, decorative blur
    TierToggle.jsx              Backpacker / Mid-range / Luxury pill switch (useState)
    ItineraryBuilder.jsx        segment list card + "Add Segment" row
    CuratedInsight.jsx          the tertiary-tinted tip callout
    BudgetSummary.jsx           total estimate + category progress bars + donut chart
    BudgetDonutChart.jsx        SVG ring chart — computes stroke-dashoffset/rotation
                                 from category percentages instead of hardcoded values
    RecommendationCard.jsx      single accommodation/transport suggestion card
    RecommendationsGrid.jsx     2-up grid of RecommendationCard
```

## What changed vs. the static HTML

- The three itinerary rows, three budget categories, and two recommendation
  cards are now arrays in `data/budget.js` instead of repeated markup.
- **Donut chart is now computed, not hardcoded.** The original SVG had
  hand-calculated `stroke-dashoffset` and `rotate(...deg)` values baked in per
  circle. `BudgetDonutChart` now derives both from each category's `percent`,
  so changing a number in `budget.js` updates the chart automatically.
- The tier switch (Backpacker / Mid-range / Luxury) holds real `useState` —
  note the original HTML had no logic tied to it (no `scripts/app.js` was in
  the upload), so selecting a tier doesn't yet recalculate totals. Hook
  `selectedTier` up to your pricing logic in `BudgetPage.jsx`.
- "Add Segment" calls an `onAddSegment` handler stubbed with a console.log —
  wire it to whatever flow creates a new itinerary block.
- Dropped one orphaned element from the source: a `<span>` before the "Expedition
  Budget" heading whose only content was the literal text
  `[writing-mode:vertical-rl]` — a Tailwind arbitrary-value class that leaked
  into the rendered text rather than being applied as a class, so there was no
  real content to preserve there.
- `data-alt` attributes on background-image divs became real `aria-label`s.

## Setup

Same as the Destinations page:

1. `tailwind.config.js` + Tailwind installed in your project.
2. Keep the Google Fonts + Material Symbols `<link>` tags in your `index.html`.
3. Import `src/index.css` once at your entry point.
4. Route to it:

   ```jsx
   import BudgetPage from "./pages/BudgetPage";

   <Route path="/budget-planner" element={<BudgetPage />} />
   ```

If your app already has a shared layout rendering `Header`/`Footer`, delete
those two lines from `BudgetPage.jsx` and keep just the `<main>` block.

## Notes / TODOs

- Drag-and-drop reordering isn't implemented — rows are styled `cursor-grab`
  but the original had no drag library wired up either. If you want real
  reordering, `@dnd-kit/sortable` or `react-beautiful-dnd` would drop in
  cleanly around the `segments` array/state.
- Images still point at the original `lh3.googleusercontent.com` placeholder
  URLs — swap for your own assets.
