import {
  accommodationOptions,
  activities,
  attractions,
  budgetStyles,
  EXCHANGE_RATE,
  foodItems,
} from '../data/kathmanduData';

export const kathmanduBudget = budgetStyles.reduce((acc, style) => {
  acc[style.id] = {
    name: style.name,
    dailyBudgetUSD: style.dailyBudgetUSD,
    dailyBudgetNPR: style.dailyBudgetNPR,
    breakdown: style.breakdown,
    description: style.description,
    characteristics: style.characteristics,
  };
  return acc;
}, {});

export const activityTypes = activities.reduce((acc, activity) => {
  acc[activity.id] = {
    name: activity.name,
    category: activity.category,
    price: activity.costUSD,
    priceNPR: activity.costNPR,
    duration: activity.duration,
    notes: activity.notes,
  };
  return acc;
}, {});

export { accommodationOptions, activities, attractions, budgetStyles, EXCHANGE_RATE, foodItems };

export function getRecommendedActivities(style = 'standard', days = 5) {
  const filtered = activities.filter((activity) => {
    if (style === 'backpacker') return activity.costUSD <= 50;
    if (style === 'standard') return activity.costUSD <= 120;
    if (style === 'mid-range') return activity.costUSD <= 180;
    return true;
  });

  return filtered.sort((a, b) => a.costUSD - b.costUSD).slice(0, Math.min(5, Math.max(3, days)));
}

export function getAttractionRecommendations(days = 5, style = 'standard') {
  const sorted = [...attractions].sort((a, b) => a.entryFeeUSD - b.entryFeeUSD);

  if (style === 'luxury') {
    return [...attractions].slice(0, Math.min(10, Math.max(5, days)));
  }

  return sorted.slice(0, Math.min(10, Math.max(5, days)));
}

export function getFoodRecommendations(style = 'standard') {
  if (style === 'backpacker') {
    return foodItems.filter((item) => item.costUSD <= 3);
  }

  if (style === 'luxury') {
    return foodItems.filter((item) => item.costUSD >= 5);
  }

  return foodItems.filter((item) => item.costUSD <= 8);
}

export function getAccommodationOptions(style = 'standard') {
  if (style === 'backpacker') {
    return accommodationOptions.filter((option) => option.tier === 'Backpacker');
  }

  if (style === 'luxury') {
    return accommodationOptions.filter((option) => option.tier === 'Luxury');
  }

  if (style === 'mid-range') {
    return accommodationOptions.filter((option) => option.tier === 'Mid-range' || option.tier === 'Mid-range/Upscale');
  }

  return accommodationOptions.filter((option) => option.tier === 'Budget' || option.tier === 'Mid-range');
}

export function formatCurrency(amount, currency = 'USD') {
  if (currency === 'NPR') {
    return `Rs. ${Math.round(amount * EXCHANGE_RATE).toLocaleString('en-US')}`;
  }

  return `$${Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function convertCurrency(amount, fromCurrency = 'USD', toCurrency = 'USD') {
  if (fromCurrency === toCurrency) return amount;

  if (fromCurrency === 'USD' && toCurrency === 'NPR') {
    return amount * EXCHANGE_RATE;
  }

  if (fromCurrency === 'NPR' && toCurrency === 'USD') {
    return amount / EXCHANGE_RATE;
  }

  return amount;
}

export function calculateBudget(input) {
  const { days, people, style = 'standard' } = input;
  const styleData = budgetStyles.find((item) => item.id === style) ?? budgetStyles[1];

  const breakdown = {};
  const dailyBudgetPerPerson = styleData.dailyBudgetUSD;

  const accommodation = (styleData.dailyBudgetUSD * styleData.breakdown.accommodation) / 100;
  const food = (styleData.dailyBudgetUSD * styleData.breakdown.food) / 100;
  const transport = (styleData.dailyBudgetUSD * styleData.breakdown.transport) / 100;
  const activitiesCost = (styleData.dailyBudgetUSD * styleData.breakdown.activities) / 100;

  breakdown.accommodation = {
    dailyPerPerson: accommodation,
    totalPerPerson: accommodation * days,
    totalForGroup: accommodation * days * people,
    percentage: styleData.breakdown.accommodation,
  };
  breakdown.food = {
    dailyPerPerson: food,
    totalPerPerson: food * days,
    totalForGroup: food * days * people,
    percentage: styleData.breakdown.food,
  };
  breakdown.transport = {
    dailyPerPerson: transport,
    totalPerPerson: transport * days,
    totalForGroup: transport * days * people,
    percentage: styleData.breakdown.transport,
  };
  breakdown.activities = {
    dailyPerPerson: activitiesCost,
    totalPerPerson: activitiesCost * days,
    totalForGroup: activitiesCost * days * people,
    percentage: styleData.breakdown.activities,
  };

  const totalPerPerson = dailyBudgetPerPerson * days;
  const totalForGroup = totalPerPerson * people;

  return {
    style: styleData.id,
    styleName: styleData.name,
    days,
    people,
    breakdown,
    perPerson: {
      daily: dailyBudgetPerPerson,
      total: totalPerPerson,
      totalNPR: styleData.dailyBudgetNPR * days,
    },
    group: {
      daily: dailyBudgetPerPerson * people,
      total: totalForGroup,
      totalNPR: styleData.dailyBudgetNPR * days * people,
      perPerson: totalForGroup / people,
    },
    description: styleData.description,
    characteristics: styleData.characteristics,
  };
}
