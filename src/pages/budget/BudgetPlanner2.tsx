import { useEffect, useState, type ChangeEvent } from 'react';
import {
  EXCHANGE_RATE,
  accommodationOptions,
  activities,
  attractions,
  budgetStyles,
  foodItems,
  sampleItinerary,
  type Activity,
  type Attraction,
  type FoodItem,
  type BudgetStyle,
} from '../data/kathmanduData';

type BudgetStyleId = 'backpacker' | 'standard' | 'mid-range' | 'luxury';
type Currency = 'USD' | 'NPR';

type BudgetInput = {
  days: number;
  people: number;
  style: BudgetStyleId;
  includeAttractions: boolean;
  includeVisa: boolean;
  selectedActivities: string[];
  currency: Currency;
};

type BreakdownItem = {
  amount: number;
  percentage: number;
};

type BudgetResult = {
  dailyBreakdown: {
    food: number;
    accommodation: number;
    transport: number;
    activities: number;
  };
  perPerson: {
    daily: number;
    total: number;
  };
  group: {
    total: number;
    perDay: number;
    perPerson: number;
  };
  breakdown: Record<string, BreakdownItem>;
  recommendations: {
    attractions: Attraction[];
    activities: Activity[];
    accommodation: typeof accommodationOptions;
    food: FoodItem[];
    itinerary: typeof sampleItinerary;
  };
  summary: {
    style: string;
    totalEstimated: string;
    perPersonDaily: string;
    currency: Currency;
    suggestions: string[];
  };
  tripPlanning: {
    maxPossibleDays: number;
    recommendedDays: number;
    canExtendTrip: boolean;
    savingsSuggestions: string[];
  };
};

const styleLabels: Record<BudgetStyleId, string> = {
  backpacker: 'Backpacker',
  standard: 'Standard',
  'mid-range': 'Mid-range',
  luxury: 'Luxury',
};

const getVisaCost = (days: number): number => (days <= 15 ? 33 : 55);

const getBudgetStyle = (id: BudgetStyleId): BudgetStyle =>
  budgetStyles.find((style) => style.id === id) ?? budgetStyles[1];

const getTotalAttractionFees = (): number =>
  attractions.reduce((sum, attraction) => sum + attraction.entryFeeUSD, 0);

const formatCurrency = (amount: number, currency: Currency = 'USD'): string => {
  if (currency === 'NPR') {
    const converted = amount * EXCHANGE_RATE;
    return `Rs. ${Math.round(converted).toLocaleString('en-US')}`;
  }

  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// A price of 0/undefined/NaN means the data source has no real price for
// this item (not that it's actually free), so never render a bare "$0.00".
const formatPriceOrUnavailable = (amount: number | null | undefined, currency: Currency = 'USD'): string => {
  if (amount === null || amount === undefined || Number.isNaN(amount) || amount <= 0) {
    return 'Price unavailable';
  }
  return formatCurrency(amount, currency);
};

// Builds an itinerary that always has exactly `days` entries, numbered
// Day 1..N with no gaps or duplicates. If there are fewer sample days than
// requested, the sample content cycles; if there are more, it's trimmed.
const buildItinerary = (days: number): typeof sampleItinerary => {
  if (!Number.isFinite(days) || days <= 0 || sampleItinerary.length === 0) {
    return [];
  }

  return Array.from({ length: Math.round(days) }, (_, index) => ({
    ...sampleItinerary[index % sampleItinerary.length],
    day: index + 1,
  }));
};

// The visa fee is paid in cash USD at the border/airport, so it's not a
// meaningful NPR line item — hide it from the breakdown when NPR is selected.
const getVisibleBreakdownEntries = (
  breakdown: Record<string, BreakdownItem>,
  currency: Currency,
): [string, BreakdownItem][] =>
  Object.entries(breakdown).filter(([category]) => !(category === 'visa' && currency === 'NPR'));

// Standard accommodation categories we want represented for every travel
// style. Matching is keyword-based (case-insensitive substring) rather than
// strict equality so it stays robust to minor differences in how the data
// source labels each tier (e.g. "3 Star" vs "3-Star" vs "3★").
const ACCOMMODATION_STYLE_KEYWORDS: Record<BudgetStyleId, string[]> = {
  backpacker: ['hostel', 'budget', 'guesthouse', 'homestay'],
  standard: ['guesthouse', 'homestay', '2 star', '2-star', '2★', 'budget'],
  'mid-range': ['3 star', '3-star', '3★', '4 star', '4-star', '4★', 'boutique'],
  luxury: ['4 star', '4-star', '4★', '5 star', '5-star', '5★', 'luxury', 'resort', 'boutique'],
};

const matchesAccommodationStyle = (tier: string, style: BudgetStyleId): boolean => {
  const normalized = tier.toLowerCase();
  return ACCOMMODATION_STYLE_KEYWORDS[style].some((keyword) => normalized.includes(keyword));
};

// Filters accommodationOptions to those relevant for a style, falling back
// to the full (price-sorted) list if the keyword match comes up empty so the
// Accommodation tab is never blank.
const getAccommodationRecommendations = (style: BudgetStyleId): typeof accommodationOptions => {
  const matched = accommodationOptions.filter((option) => matchesAccommodationStyle(option.tier, style));
  if (matched.length > 0) {
    return matched;
  }
  return [...accommodationOptions].sort((a, b) => a.priceUSD - b.priceUSD);
};

const calculateBudget = (input: BudgetInput): BudgetResult => {
  const { days, people, style, includeAttractions, includeVisa, selectedActivities, currency } = input;
  const styleData = getBudgetStyle(style);

  const dailyFood = (styleData.dailyBudgetUSD * styleData.breakdown.food) / 100;
  const dailyAccommodation = (styleData.dailyBudgetUSD * styleData.breakdown.accommodation) / 100;
  const dailyTransport = (styleData.dailyBudgetUSD * styleData.breakdown.transport) / 100;
  const dailyActivities = (styleData.dailyBudgetUSD * styleData.breakdown.activities) / 100;

  const attractionFees = includeAttractions ? getTotalAttractionFees() : 0;
  const visaCost = includeVisa ? getVisaCost(days) : 0;

  const selectedActivityCost = selectedActivities.reduce((total, activityId) => {
    const matched = activities.find((activity) => activity.id === activityId);
    return total + (matched ? matched.costUSD : 0);
  }, 0);

  const perPersonDaily = dailyFood + dailyAccommodation + dailyTransport + dailyActivities;
  const perPersonTotal = perPersonDaily * days + attractionFees + visaCost + selectedActivityCost;
  const groupTotal = perPersonTotal * people;

  const breakdown: Record<string, BreakdownItem> = {
    food: { amount: dailyFood * days, percentage: 0 },
    accommodation: { amount: dailyAccommodation * days, percentage: 0 },
    transport: { amount: dailyTransport * days, percentage: 0 },
    activities: { amount: dailyActivities * days + selectedActivityCost, percentage: 0 },
  };

  if (includeAttractions) {
    breakdown.attractions = { amount: attractionFees, percentage: 0 };
  }

  if (includeVisa) {
    breakdown.visa = { amount: visaCost, percentage: 0 };
  }

  const totalAmount = Object.values(breakdown).reduce((sum, item) => sum + item.amount, 0);

  for (const key of Object.keys(breakdown)) {
    breakdown[key].percentage = totalAmount > 0 ? (breakdown[key].amount / totalAmount) * 100 : 0;
  }

  const styleMatchingActivities = activities.filter((activity) => {
    if (style === 'backpacker') return activity.costUSD <= 50;
    if (style === 'standard') return activity.costUSD <= 120;
    if (style === 'mid-range') return activity.costUSD <= 180;
    return true;
  });

  const styleMatchingAttractions = [...attractions].sort((a, b) => a.entryFeeUSD - b.entryFeeUSD);
  const styleFood = foodItems.filter((item) => {
    if (style === 'backpacker') return item.diningStyle.toLowerCase().includes('budget') || item.diningStyle.toLowerCase().includes('street');
    if (style === 'standard') return !item.diningStyle.toLowerCase().includes('fine');
    if (style === 'mid-range') return !item.diningStyle.toLowerCase().includes('fine');
    return true;
  });

  const maxPossibleDays = Math.max(1, Math.floor((groupTotal / people) / perPersonDaily));
  const suggestions = styleData.characteristics.map((item) => item);

  return {
    dailyBreakdown: {
      food: dailyFood,
      accommodation: dailyAccommodation,
      transport: dailyTransport,
      activities: dailyActivities,
    },
    perPerson: {
      daily: perPersonDaily,
      total: perPersonTotal,
    },
    group: {
      total: groupTotal,
      perDay: groupTotal / days,
      perPerson: groupTotal / people,
    },
    breakdown,
    recommendations: {
      attractions: styleMatchingAttractions.slice(0, 5),
      activities: styleMatchingActivities.slice(0, 5),
      accommodation: getAccommodationRecommendations(style),
      food: styleFood.slice(0, 5),
      itinerary: buildItinerary(days),
    },
    summary: {
      style: styleData.name,
      totalEstimated: formatCurrency(groupTotal, currency),
      perPersonDaily: formatCurrency(perPersonDaily, currency),
      currency,
      suggestions,
    },
    tripPlanning: {
      maxPossibleDays,
      recommendedDays: days,
      canExtendTrip: maxPossibleDays > days,
      savingsSuggestions: [
        'Travel on weekdays to get lower room rates.',
        'Use local buses or walk between nearby attractions.',
        'Eat dal bhat or local momos to save on food costs.',
        'Book your stay in Thamel or Patan early for better deals.',
      ],
    },
  };
};

type ReverseBudgetInput = {
  totalBudget: number;
  people: number;
  style: BudgetStyleId;
  currency: Currency;
  // null = let the calculator auto-suggest a trip length; a number = user override
  preferredDays: number | null;
};

type ReverseBudgetResult = {
  maxDays: number;
  suggestedDays: number;
  costPerDay: number;
  costPerPersonDaily: number;
  itinerary: typeof sampleItinerary;
  breakdown: Record<string, BreakdownItem>;
  recommendations: {
    attractions: Attraction[];
    activities: Activity[];
    accommodation: typeof accommodationOptions;
    food: FoodItem[];
  };
};

const calculateReverseBudget = (input: ReverseBudgetInput): ReverseBudgetResult | null => {
  const { totalBudget, people, style, currency, preferredDays } = input;
  const styleData = getBudgetStyle(style);

  if (totalBudget <= 0 || people <= 0 || Number.isNaN(totalBudget) || Number.isNaN(people)) {
    return null;
  }

  // The budget is entered in whatever currency is selected, but every cost in
  // the app (dailyBudgetUSD, attraction fees, visa cost) is defined in USD.
  // Convert the entered amount to USD before doing any math with it.
  const totalBudgetUSD = currency === 'NPR' ? totalBudget / EXCHANGE_RATE : totalBudget;

  const attractionFees = getTotalAttractionFees();
  const dailyCostPerPerson = styleData.dailyBudgetUSD;
  const dailyCostGroup = dailyCostPerPerson * people;

  // Visa cost depends on trip length (>15 days costs more), so estimate with
  // the short-stay rate first, then re-check once we know roughly how long a
  // trip this budget affords instead of hardcoding a single flat value.
  let visaCost = getVisaCost(15);
  let budgetAfterFixed = totalBudgetUSD - visaCost - attractionFees;
  if (budgetAfterFixed <= 0) {
    return null;
  }

  let maxDays = Math.floor(budgetAfterFixed / dailyCostGroup);
  if (maxDays < 1) {
    return null;
  }

  const refinedVisaCost = getVisaCost(maxDays);
  if (refinedVisaCost !== visaCost) {
    visaCost = refinedVisaCost;
    budgetAfterFixed = totalBudgetUSD - visaCost - attractionFees;
    if (budgetAfterFixed <= 0) {
      return null;
    }
    maxDays = Math.floor(budgetAfterFixed / dailyCostGroup);
    if (maxDays < 1) {
      return null;
    }
  }

  const autoSuggestedDays = Math.max(1, Math.min(maxDays, 7)); // default suggestion, capped at a week
  // Respect the user's chosen day count as long as it's affordable; otherwise fall back to the suggestion.
  const suggestedDays =
    preferredDays && preferredDays >= 1 && preferredDays <= maxDays ? preferredDays : autoSuggestedDays;

  const finalVisaCost = getVisaCost(suggestedDays);
  const costPerDay = (dailyCostPerPerson * people);
  const costPerPersonDaily = dailyCostPerPerson;

  // Create breakdown
  const breakdown: Record<string, BreakdownItem> = {
    accommodation: {
      amount: (styleData.dailyBudgetUSD * styleData.breakdown.accommodation / 100) * suggestedDays,
      percentage: styleData.breakdown.accommodation,
    },
    food: {
      amount: (styleData.dailyBudgetUSD * styleData.breakdown.food / 100) * suggestedDays,
      percentage: styleData.breakdown.food,
    },
    transport: {
      amount: (styleData.dailyBudgetUSD * styleData.breakdown.transport / 100) * suggestedDays,
      percentage: styleData.breakdown.transport,
    },
    activities: {
      amount: (styleData.dailyBudgetUSD * styleData.breakdown.activities / 100) * suggestedDays,
      percentage: styleData.breakdown.activities,
    },
    attractions: {
      amount: attractionFees,
      percentage: 0,
    },
    visa: {
      amount: finalVisaCost,
      percentage: 0,
    },
  };

  const styleMatchingActivities = activities.filter((activity) => {
    if (style === 'backpacker') return activity.costUSD <= 50;
    if (style === 'standard') return activity.costUSD <= 120;
    if (style === 'mid-range') return activity.costUSD <= 180;
    return true;
  });

  const styleMatchingAttractions = [...attractions].sort((a, b) => a.entryFeeUSD - b.entryFeeUSD);
  const styleFood = foodItems.filter((item) => {
    if (style === 'backpacker') return item.diningStyle.toLowerCase().includes('budget') || item.diningStyle.toLowerCase().includes('street');
    if (style === 'standard') return !item.diningStyle.toLowerCase().includes('fine');
    if (style === 'mid-range') return !item.diningStyle.toLowerCase().includes('fine');
    return true;
  });

  return {
    maxDays,
    suggestedDays,
    costPerDay,
    costPerPersonDaily,
    itinerary: buildItinerary(suggestedDays),
    breakdown,
    recommendations: {
      attractions: styleMatchingAttractions.slice(0, 5),
      activities: styleMatchingActivities.slice(0, 5),
      accommodation: getAccommodationRecommendations(style),
      food: styleFood.slice(0, 5),
    },
  };
};

export default function BudgetPlanner() {
  const [formData, setFormData] = useState<BudgetInput>({
    days: 5,
    people: 2,
    style: 'standard',
    includeAttractions: true,
    includeVisa: true,
    selectedActivities: [],
    currency: 'USD',
  });

  const [result, setResult] = useState<BudgetResult | null>(null);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'attractions' | 'activities' | 'accommodation' | 'itinerary'>('breakdown');

  // Reverse budget planner state
  const [reverseBudgetData, setReverseBudgetData] = useState<ReverseBudgetInput>({
    totalBudget: 1000,
    people: 2,
    style: 'standard',
    currency: 'USD',
    preferredDays: null,
  });

  const [reverseResult, setReverseResult] = useState<ReverseBudgetResult | null>(null);
  const [activeMode, setActiveMode] = useState<'forward' | 'reverse'>('forward');

  // The Total Budget input is tracked as raw text, separate from the numeric
  // value used for calculations. Binding the input directly to a number
  // means React can't tell "0" typed after "0" apart from no change at all,
  // which leaves stray/leading zeros stuck in the field while typing. Text
  // state also lets the field go genuinely empty instead of snapping to "0".
  const [totalBudgetText, setTotalBudgetText] = useState<string>(String(reverseBudgetData.totalBudget));

  useEffect(() => {
    setResult(calculateBudget(formData));
  }, [formData]);

  useEffect(() => {
    setReverseResult(calculateReverseBudget(reverseBudgetData));
  }, [reverseBudgetData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const input = event.target as HTMLInputElement;
      setFormData((previous) => ({
        ...previous,
        [name]: input.checked,
      }));
      return;
    }

    if (name === 'selectedActivities') {
      const select = event.target as HTMLSelectElement;
      const selectedValues = Array.from(select.selectedOptions, (option) => option.value);
      setFormData((previous) => ({
        ...previous,
        selectedActivities: selectedValues,
      }));
      return;
    }

    if (name === 'style') {
      setFormData((previous) => ({
        ...previous,
        style: value as BudgetStyleId,
      }));
      return;
    }

    if (name === 'currency') {
      setFormData((previous) => ({
        ...previous,
        currency: value as Currency,
      }));
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };

  const handleReverseBudgetChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'style') {
      setReverseBudgetData((previous) => ({
        ...previous,
        style: value as BudgetStyleId,
      }));
      return;
    }

    if (name === 'currency') {
      const nextCurrency = value as Currency;
      setReverseBudgetData((previous) => {
        if (nextCurrency === previous.currency) return previous;
        // Re-express the same purchasing power in the new currency instead of
        // leaving the raw number unchanged (e.g. "1000" meaning $1000 one
        // moment and Rs. 1000 the next).
        const convertedBudget =
          nextCurrency === 'NPR' ? previous.totalBudget * EXCHANGE_RATE : previous.totalBudget / EXCHANGE_RATE;
        const roundedBudget = Math.round(convertedBudget);
        setTotalBudgetText(String(roundedBudget));
        return {
          ...previous,
          currency: nextCurrency,
          totalBudget: roundedBudget,
        };
      });
      return;
    }

    if (name === 'totalBudget') {
      // Strip stray/leading zeros from the raw typed text (e.g. "05" -> "5",
      // "00" -> "0") before it ever reaches state, and allow a genuinely
      // empty string instead of forcing the field back to "0".
      let raw = value.replace(/[^\d.]/g, '');
      if (raw.includes('.')) {
        const [whole, decimal] = raw.split('.');
        raw = `${whole.replace(/^0+(?=\d)/, '') || '0'}.${decimal ?? ''}`;
      } else {
        raw = raw.replace(/^0+(?=\d)/, '');
      }

      setTotalBudgetText(raw);

      const numericValue = raw === '' || raw === '.' ? 0 : Number(raw);
      setReverseBudgetData((previous) => ({
        ...previous,
        totalBudget: Number.isNaN(numericValue) ? 0 : Math.max(0, numericValue),
      }));
      return;
    }

    if (name === 'preferredDays') {
      const numericValue = Number(value);
      setReverseBudgetData((previous) => ({
        ...previous,
        preferredDays: Number.isNaN(numericValue) ? null : numericValue,
      }));
      return;
    }

    setReverseBudgetData((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };

  const resetPreferredDays = () => {
    setReverseBudgetData((previous) => ({ ...previous, preferredDays: null }));
  };

  const selectedStyle = getBudgetStyle(formData.style);
  const tabs = [
    { id: 'breakdown', label: 'Breakdown' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'activities', label: 'Activities' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'itinerary', label: 'Itinerary' },
  ] as const;

  return (
    <main className="min-h-screen bg-[#dfdff0] px-4 pb-16 pt-24 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Travel planner</p>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">Kathmandu Budget Planner</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-700">
            Estimate your trip cost based on your trip length, group size, and travel style.
          </p>

          {/* Mode Toggle */}
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveMode('forward')}
              className={`rounded-lg px-6 py-2 font-bold transition ${activeMode === 'forward'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              💰 Trip by Days
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('reverse')}
              className={`rounded-lg px-6 py-2 font-bold transition ${activeMode === 'reverse'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              🎯 Trip by Budget
            </button>
          </div>
        </header>

        {activeMode === 'forward' ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                <h2 className="mb-5 text-2xl font-black">Trip Details</h2>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Travel Style</label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                      {(budgetStyles as typeof budgetStyles).map((styleOption) => (
                        <button
                          key={styleOption.id}
                          type="button"
                          onClick={() => setFormData((previous) => ({ ...previous, style: styleOption.id as BudgetStyleId }))}
                          className={`rounded-xl px-3 py-2 text-sm font-bold transition ${formData.style === styleOption.id
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                          {styleLabels[styleOption.id as BudgetStyleId] ?? styleOption.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Trip Duration</label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      name="days"
                      value={formData.days}
                      onChange={handleInputChange}
                      className="w-full accent-slate-900"
                    />
                    <div className="mt-2 text-right text-lg font-black">{formData.days} days</div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Number of People</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      name="people"
                      value={formData.people}
                      onChange={handleInputChange}
                      className="w-full accent-slate-900"
                    />
                    <div className="mt-2 text-right text-lg font-black">{formData.people} people</div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        name="includeAttractions"
                        checked={formData.includeAttractions}
                        onChange={handleInputChange}
                      />
                      Include attraction entry fees
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        name="includeVisa"
                        checked={formData.includeVisa}
                        onChange={handleInputChange}
                      />
                      Include visa cost
                    </label>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Currency</label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none focus:border-slate-900"
                    >
                      <option value="USD">USD</option>
                      <option value="NPR">NPR</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Pick optional activities</label>
                    <select
                      multiple
                      name="selectedActivities"
                      value={formData.selectedActivities}
                      onChange={handleInputChange}
                      size={6}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-sm text-slate-800 outline-none focus:border-slate-900"
                    >
                      {activities.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.name} ({formatPriceOrUnavailable(activity.costUSD)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8">
              {result ? (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <div className="text-sm uppercase tracking-[0.12em] text-slate-500">Total Budget</div>
                        <div className="mt-2 text-3xl font-black md:text-4xl">{result.summary.totalEstimated}</div>
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.12em] text-slate-500">Per Person</div>
                        <div className="mt-2 text-3xl font-black md:text-4xl">{formatCurrency(result.perPerson.total, result.summary.currency)}</div>
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.12em] text-slate-500">Daily Cost</div>
                        <div className="mt-2 text-3xl font-black md:text-4xl">{result.summary.perPersonDaily}</div>
                      </div>
                    </div>
                    <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                      <span className="font-bold text-slate-900">{selectedStyle.name}</span> · {selectedStyle.description}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={`rounded-lg px-4 py-2 text-sm font-bold transition ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {activeTab === 'breakdown' && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-black">Cost breakdown</h3>
                        {getVisibleBreakdownEntries(result.breakdown, result.summary.currency).map(([category, data]) => (
                          <div key={category}>
                            <div className="mb-1 flex items-center justify-between gap-4 text-sm text-slate-700">
                              <span className="capitalize">{category}</span>
                              <span className="font-semibold">
                                {formatCurrency(data.amount, result.summary.currency)} · {data.percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-slate-900"
                                style={{ width: `${Math.min(data.percentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}

                        <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                          <div className="font-bold text-slate-900">Travel insights</div>
                          <ul className="mt-2 space-y-2">
                            {result.tripPlanning.savingsSuggestions.map((tip) => (
                              <li key={tip}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === 'attractions' && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-black">Top attractions</h3>
                        {result.recommendations.attractions.map((attraction) => (
                          <div key={attraction.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-bold text-slate-900">{attraction.name}</div>
                                <div className="mt-1 text-sm text-slate-600">{attraction.category}</div>
                              </div>
                              <div className="text-right text-sm font-semibold text-slate-900">
                                {formatPriceOrUnavailable(attraction.entryFeeUSD, result.summary.currency)}
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{attraction.notes}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'activities' && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-black">Recommended activities</h3>
                        {result.recommendations.activities.map((activity) => (
                          <div key={activity.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-bold text-slate-900">{activity.name}</div>
                                <div className="mt-1 text-sm text-slate-600">{activity.category}</div>
                              </div>
                              <div className="text-right text-sm font-semibold text-slate-900">
                                {formatPriceOrUnavailable(activity.costUSD, result.summary.currency)}
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{activity.notes}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'accommodation' && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-black">Accommodation options</h3>
                        {result.recommendations.accommodation.map((stay) => (
                          <div key={stay.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-bold text-slate-900">{stay.type}</div>
                                <div className="mt-1 text-sm text-slate-600">{stay.tier}</div>
                              </div>
                              <div className="text-right text-sm font-semibold text-slate-900">
                                {formatPriceOrUnavailable(stay.priceUSD, result.summary.currency)}
                                {stay.priceUSD > 0 && '/night'}
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{stay.notes}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'itinerary' && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-black">Sample itinerary</h3>
                        {result.recommendations.itinerary.map((day) => (
                          <div key={day.day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="font-bold text-slate-900">Day {day.day}</div>
                            <div className="mt-3 grid gap-3 md:grid-cols-3">
                              <div>
                                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Morning</div>
                                <p className="mt-1 text-sm text-slate-700">{day.morning}</p>
                              </div>
                              <div>
                                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Afternoon</div>
                                <p className="mt-1 text-sm text-slate-700">{day.afternoon}</p>
                              </div>
                              <div>
                                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Evening</div>
                                <p className="mt-1 text-sm text-slate-700">{day.evening}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg shadow-slate-200/60">
                  <div className="text-5xl">🏔️</div>
                  <h2 className="mt-4 text-2xl font-black">Plan your Kathmandu trip</h2>
                  <p className="mt-2 text-slate-600">Adjust your trip details on the left to calculate a live budget.</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                <h2 className="mb-5 text-2xl font-black">Your Budget</h2>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Total Budget</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {reverseBudgetData.currency === 'USD' ? '$' : 'Rs.'}
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="totalBudget"
                        value={totalBudgetText}
                        onChange={handleReverseBudgetChange}
                        placeholder="0"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Number of People</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      name="people"
                      value={reverseBudgetData.people}
                      onChange={handleReverseBudgetChange}
                      className="w-full accent-slate-900"
                    />
                    <div className="mt-2 text-right text-lg font-black">{reverseBudgetData.people} people</div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-semibold text-slate-700">Trip Length</label>
                      {reverseBudgetData.preferredDays !== null && (
                        <button
                          type="button"
                          onClick={resetPreferredDays}
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          Reset to suggested
                        </button>
                      )}
                    </div>
                    {reverseResult ? (
                      <>
                        <input
                          type="range"
                          min="1"
                          max={Math.max(1, reverseResult.maxDays)}
                          name="preferredDays"
                          value={reverseResult.suggestedDays}
                          onChange={handleReverseBudgetChange}
                          className="w-full accent-slate-900"
                        />
                        <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                          <span>1 day</span>
                          <span className="text-lg font-black text-slate-900">
                            {reverseResult.suggestedDays} {reverseResult.suggestedDays === 1 ? 'day' : 'days'}
                          </span>
                          <span>{reverseResult.maxDays} days max</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-slate-500">Enter a budget above to unlock day selection.</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Travel Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(budgetStyles as typeof budgetStyles).map((styleOption) => (
                        <button
                          key={styleOption.id}
                          type="button"
                          onClick={() => setReverseBudgetData((previous) => ({ ...previous, style: styleOption.id as BudgetStyleId }))}
                          className={`rounded-xl px-3 py-2 text-sm font-bold transition ${reverseBudgetData.style === styleOption.id
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                          {styleLabels[styleOption.id as BudgetStyleId] ?? styleOption.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Currency</label>
                    <select
                      name="currency"
                      value={reverseBudgetData.currency}
                      onChange={handleReverseBudgetChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800 outline-none focus:border-slate-900"
                    >
                      <option value="USD">USD</option>
                      <option value="NPR">NPR</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8">
              {reverseResult ? (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <div className="text-sm uppercase tracking-[0.12em] text-slate-500">Suggested Days</div>
                        <div className="mt-2 text-5xl font-black text-blue-600">{reverseResult.suggestedDays}</div>
                        <div className="mt-1 text-xs text-slate-600">Max possible: {reverseResult.maxDays} days</div>
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.12em] text-slate-500">Cost per Day</div>
                        <div className="mt-2 text-3xl font-black">
                          {formatCurrency(reverseResult.costPerDay, reverseBudgetData.currency)}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          {formatCurrency(reverseResult.costPerPersonDaily, reverseBudgetData.currency)}/person
                        </div>
                      </div>
                      <div>
                        <div className="text-sm uppercase tracking-[0.12em] text-slate-500">Your Budget</div>
                        <div className="mt-2 text-3xl font-black text-green-600">
                          {formatCurrency(reverseBudgetData.totalBudget, reverseBudgetData.currency)}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          {reverseBudgetData.people} {reverseBudgetData.people === 1 ? 'person' : 'people'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                    <h3 className="text-2xl font-black">Recommended Itinerary</h3>
                    <div className="space-y-3">
                      {reverseResult.itinerary.map((day) => (
                        <div key={day.day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="mb-3 font-bold text-slate-900">Day {day.day}</div>
                          <div className="grid gap-3 md:grid-cols-3">
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Morning</div>
                              <p className="mt-1 text-sm text-slate-700">{day.morning}</p>
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Afternoon</div>
                              <p className="mt-1 text-sm text-slate-700">{day.afternoon}</p>
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Evening</div>
                              <p className="mt-1 text-sm text-slate-700">{day.evening}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                    <h3 className="text-2xl font-black">Budget Breakdown</h3>
                    <div className="space-y-3">
                      {getVisibleBreakdownEntries(reverseResult.breakdown, reverseBudgetData.currency).map(([category, data]) => (
                        <div key={category}>
                          <div className="mb-1 flex items-center justify-between gap-4 text-sm text-slate-700">
                            <span className="capitalize">{category}</span>
                            <span className="font-semibold">
                              {formatCurrency(data.amount, reverseBudgetData.currency)}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-slate-900"
                              style={{ width: `${data.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                    <h3 className="text-2xl font-black">Recommended Attractions</h3>
                    <div className="space-y-3">
                      {reverseResult.recommendations.attractions.map((attraction) => (
                        <div key={attraction.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-bold text-slate-900">{attraction.name}</div>
                              <div className="mt-1 text-sm text-slate-600">{attraction.category}</div>
                            </div>
                            <div className="text-right text-sm font-semibold text-slate-900">
                              {formatPriceOrUnavailable(attraction.entryFeeUSD, reverseBudgetData.currency)}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">{attraction.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                    <h3 className="text-2xl font-black">Accommodation Options</h3>
                    <div className="space-y-3">
                      {reverseResult.recommendations.accommodation.map((stay) => (
                        <div key={stay.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-bold text-slate-900">{stay.type}</div>
                              <div className="mt-1 text-sm text-slate-600">{stay.tier}</div>
                            </div>
                            <div className="text-right text-sm font-semibold text-slate-900">
                              {formatPriceOrUnavailable(stay.priceUSD, reverseBudgetData.currency)}
                              {stay.priceUSD > 0 && '/night'}
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">{stay.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg shadow-slate-200/60">
                  <div className="text-5xl">💰</div>
                  <h2 className="mt-4 text-2xl font-black">Enter your budget</h2>
                  <p className="mt-2 text-slate-600">Set your total budget and see how many days you can explore Kathmandu!</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}