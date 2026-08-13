import BudgetDonutChart from "./BudgetDonutChart";

function CategoryBar({ category }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="font-label-caps text-label-caps text-on-surface uppercase">
          {category.label}
        </span>
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          ${category.amount} ({category.percent}%)
        </span>
      </div>
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${category.barColor} ${category.barGlow}`}
          style={{ width: `${category.percent}%` }}
        />
      </div>
    </div>
  );
}

export default function BudgetSummary({ total, totalDays, categories }) {
  return (
    <div className="bg-surface-container rounded-xl p-8 shadow-xl flex flex-col md:flex-row gap-12 relative overflow-hidden">
      <div className="flex-1 flex flex-col justify-center relative">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-secondary-fixed/5 rounded-full blur-3xl" />

        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Total Estimate</h3>
        <div className="flex items-baseline gap-2 mb-8">
          <span className="font-display-lg text-[64px] leading-none font-bold text-primary tracking-tighter">
            ${total.toLocaleString()}
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant">USD</span>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => (
            <CategoryBar key={cat.id} category={cat} />
          ))}
        </div>
      </div>

      <BudgetDonutChart categories={categories} centerValue={totalDays} centerLabel="Days Total" />
    </div>
  );
}
