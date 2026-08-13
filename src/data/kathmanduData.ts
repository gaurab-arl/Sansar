// ============================================
// EXCHANGE RATE
// ============================================
export const EXCHANGE_RATE = 135; // 1 USD = 135 NPR

// ============================================
// ATTRACTIONS & PLACES
// ============================================
export interface Attraction {
  id: string;
  name: string;
  category: string;
  entryFeeNPR: number;
  entryFeeUSD: number;
  hours: string;
  timeNeeded: string;
  notes: string;
}

export const attractions: Attraction[] = [
  {
    id: 'kathmandu-durbar-square',
    name: 'Kathmandu Durbar Square',
    category: 'UNESCO Heritage / Palace Square',
    entryFeeNPR: 1000,
    entryFeeUSD: 7.41,
    hours: '9:00 AM - 5:00 PM',
    timeNeeded: '1.5-2 hrs',
    notes: 'Includes Hanuman Dhoka Palace, Kumari Ghar (Living Goddess), Tribhuvan Museum'
  },
  {
    id: 'swayambhunath',
    name: 'Swayambhunath (Monkey Temple)',
    category: 'UNESCO Heritage / Buddhist Stupa',
    entryFeeNPR: 200,
    entryFeeUSD: 1.48,
    hours: '5:00 AM - 8:00 PM',
    timeNeeded: '1.5-2 hrs',
    notes: 'Hilltop stupa, panoramic city views, resident monkeys'
  },
  {
    id: 'boudhanath-stupa',
    name: 'Boudhanath Stupa',
    category: 'UNESCO Heritage / Buddhist Stupa',
    entryFeeNPR: 400,
    entryFeeUSD: 2.96,
    hours: '5:00 AM - 9:00 PM',
    timeNeeded: '1-1.5 hrs',
    notes: 'One of the largest stupas in the world, prayer wheels, peaceful atmosphere'
  },
  {
    id: 'patan-durbar-square',
    name: 'Patan Durbar Square',
    category: 'UNESCO Heritage / Palace Square',
    entryFeeNPR: 500,
    entryFeeUSD: 3.70,
    hours: '9:00 AM - 5:00 PM',
    timeNeeded: '1.5-2 hrs',
    notes: 'Krishnamandir Temple, fine architectural details, fewer crowds than Kathmandu'
  },
  {
    id: 'pashupatinath-temple',
    name: 'Pashupatinath Temple',
    category: 'UNESCO Heritage / Hindu Temple',
    entryFeeNPR: 1000,
    entryFeeUSD: 7.41,
    hours: '4:00 AM - 9:00 PM',
    timeNeeded: '1.5-2 hrs',
    notes: 'Most important Hindu temple in Nepal, cremation ghats on Bagmati River'
  },
  {
    id: 'bhaktapur-durbar-square',
    name: 'Bhaktapur Durbar Square',
    category: 'UNESCO Heritage / Palace Square',
    entryFeeNPR: 1500,
    entryFeeUSD: 11.11,
    hours: '9:00 AM - 5:00 PM',
    timeNeeded: '2-3 hrs',
    notes: 'Ancient city, traditional architecture, Nyatapola Temple, pottery square'
  },
  {
    id: 'garden-of-dreams',
    name: 'Garden of Dreams',
    category: 'Garden / Relaxation',
    entryFeeNPR: 200,
    entryFeeUSD: 1.48,
    hours: '6:00 AM - 10:00 PM',
    timeNeeded: '1-1.5 hrs',
    notes: 'Neo-classical garden, peaceful oasis, popular with photographers'
  },
  {
    id: 'narayanhiti-palace',
    name: 'Narayanhiti Palace Museum',
    category: 'Museum / Palace',
    entryFeeNPR: 1000,
    entryFeeUSD: 7.41,
    hours: '10:00 AM - 5:00 PM',
    timeNeeded: '1-1.5 hrs',
    notes: 'Former royal palace, now museum, guided tours only (in Nepali/English)'
  },
  {
    id: 'patan-museum',
    name: 'Patan Museum',
    category: 'Museum',
    entryFeeNPR: 1000,
    entryFeeUSD: 7.41,
    hours: '10:00 AM - 5:00 PM',
    timeNeeded: '1-1.5 hrs',
    notes: 'Bronze sculptures, religious artifacts, modern museum in ancient building'
  },
  {
    id: 'nagarkot-hiking',
    name: 'Nagarkot Hiking / Sunrise Trek',
    category: 'Hiking / Trekking',
    entryFeeNPR: 0,
    entryFeeUSD: 0,
    hours: '5:00 AM - 6:00 PM',
    timeNeeded: '3-4 hrs',
    notes: 'Panoramic Himalayas views, peaceful hiking trail, 32km from Kathmandu'
  },
  {
    id: 'changu-narayan',
    name: 'Changu Narayan Temple',
    category: 'Hindu Temple / Hiking',
    entryFeeNPR: 0,
    entryFeeUSD: 0,
    hours: 'Open',
    timeNeeded: '2-3 hrs',
    notes: 'Ancient temple, scenic hiking trail, less crowded alternative'
  }
];

// ============================================
// FOOD & DINING
// ============================================
export interface FoodItem {
  id: string;
  name: string;
  diningStyle: string;
  costNPR: number;
  costUSD: number;
  notes: string;
}

export const foodItems: FoodItem[] = [
  {
    id: 'dal-bhat',
    name: 'Dal Bhat (rice, lentils, veg, meat set)',
    diningStyle: 'Local / Budget',
    costNPR: 350,
    costUSD: 2.59,
    notes: "Nepal's staple meal; often all-you-can-eat refills"
  },
  {
    id: 'momos-local',
    name: 'Momos (dumplings) - Local eatery',
    diningStyle: 'Local / Budget',
    costNPR: 150,
    costUSD: 1.11,
    notes: 'Potato, meat, or veg filling; 6-12 pieces per order'
  },
  {
    id: 'samosa',
    name: 'Samosa (fried pastry)',
    diningStyle: 'Street / Budget',
    costNPR: 50,
    costUSD: 0.37,
    notes: 'Potato, veg, or meat filling; popular street food'
  },
  {
    id: 'thakali-khana',
    name: 'Thakali Khana (regional meal)',
    diningStyle: 'Local / Budget',
    costNPR: 400,
    costUSD: 2.96,
    notes: 'Rice, veg, meat, local specialty; all-you-can-eat refills'
  },
  {
    id: 'street-snacks',
    name: 'Street Snacks (chaat, pakora)',
    diningStyle: 'Street / Budget',
    costNPR: 100,
    costUSD: 0.74,
    notes: 'Various snacks at street stalls; very cheap'
  },
  {
    id: 'nepali-tea',
    name: 'Nepali Tea (Chai)',
    diningStyle: 'Cafe / Budget',
    costNPR: 50,
    costUSD: 0.37,
    notes: 'Sweet milk tea; ubiquitous in Nepal'
  },
  {
    id: 'coffee-local',
    name: 'Local Coffee',
    diningStyle: 'Cafe / Budget',
    costNPR: 100,
    costUSD: 0.74,
    notes: 'At local cafe'
  },
  {
    id: 'western-cafe',
    name: 'Western Breakfast (toast, eggs, coffee)',
    diningStyle: 'Cafe / Budget-Mid',
    costNPR: 600,
    costUSD: 4.44,
    notes: 'At tourist area cafes in Thamel'
  },
  {
    id: 'restaurant-dinner',
    name: 'Restaurant Dinner (local)',
    diningStyle: 'Restaurant / Mid-range',
    costNPR: 1000,
    costUSD: 7.41,
    notes: 'Sit-down restaurant, Nepali cuisine'
  },
  {
    id: 'fine-dining',
    name: 'Fine Dining (upscale restaurant)',
    diningStyle: 'Fine Dining',
    costNPR: 2500,
    costUSD: 18.52,
    notes: 'Upscale hotel restaurant, international cuisine'
  }
];

// ============================================
// ACTIVITIES
// ============================================
export interface Activity {
  id: string;
  name: string;
  category: string;
  costUSD: number;
  costNPR: number;
  duration: string;
  notes: string;
}

export const activities: Activity[] = [
  {
    id: 'durbar-swayambhu-tour',
    name: 'Kathmandu Durbar Square + Swayambhunath day tour',
    category: 'Cultural / Guided',
    costUSD: 80,
    costNPR: 10800,
    duration: 'Half-day',
    notes: 'Small group; guide + transport included'
  },
  {
    id: 'patan-bhaktapur-tour',
    name: 'Patan + Bhaktapur day tour',
    category: 'Cultural / Guided',
    costUSD: 75,
    costNPR: 10125,
    duration: 'Full-day',
    notes: 'Ancient cities, traditional architecture'
  },
  {
    id: 'pashupatinath-boudhanath',
    name: 'Pashupatinath + Boudhanath evening tour',
    category: 'Cultural / Guided',
    costUSD: 60,
    costNPR: 8100,
    duration: 'Evening',
    notes: 'Sunset views, spiritual experience'
  },
  {
    id: 'kathmandu-valley-tour',
    name: 'Kathmandu Valley UNESCO sites full-day tour',
    category: 'Cultural / Guided',
    costUSD: 120,
    costNPR: 16200,
    duration: 'Full-day',
    notes: 'All major heritage sites, private guide option'
  },
  {
    id: 'cooking-class',
    name: 'Nepali Cooking Class',
    category: 'Experience / Cultural',
    costUSD: 40,
    costNPR: 5400,
    duration: '3-4 hours',
    notes: 'Learn to make dal bhat, momos; includes meal'
  },
  {
    id: 'yoga-meditation',
    name: 'Yoga + Meditation Class',
    category: 'Wellness',
    costUSD: 15,
    costNPR: 2025,
    duration: '1.5 hours',
    notes: 'Morning or evening sessions'
  },
  {
    id: 'spa-treatment',
    name: 'Spa Treatment (massage)',
    category: 'Wellness',
    costUSD: 30,
    costNPR: 4050,
    duration: '1-2 hours',
    notes: 'Traditional Nepali or Thai massage'
  },
  {
    id: 'potters-wheel',
    name: 'Pottery Making Class (Bhaktapur)',
    category: 'Experience / Cultural',
    costUSD: 25,
    costNPR: 3375,
    duration: '2 hours',
    notes: 'Learn traditional pottery in Bhaktapur'
  },
  {
    id: 'paragliding',
    name: 'Paragliding (Nagarkot)',
    category: 'Adventure',
    costUSD: 150,
    costNPR: 20250,
    duration: '45 min - 1.5 hours',
    notes: 'Scenic aerial views over Kathmandu Valley'
  },
  {
    id: 'mountain-biking',
    name: 'Mountain Biking Tour',
    category: 'Adventure',
    costUSD: 80,
    costNPR: 10800,
    duration: 'Half-day',
    notes: 'Through villages and nature trails'
  }
];

// ============================================
// ACCOMMODATION
// ============================================
export interface AccommodationOption {
  id: string;
  type: string;
  tier: string;
  priceUSD: number;
  priceNPR: number;
  notes: string;
}

export const accommodationOptions: AccommodationOption[] = [
  {
    id: 'hostel-dorm',
    type: 'Hostel dorm bed',
    tier: 'Backpacker',
    priceUSD: 5,
    priceNPR: 675,
    notes: 'Shared dorm, e.g. Zostel Kathmandu, Elbrus Home'
  },
  {
    id: 'budget-hotel-single',
    type: 'Budget hotel (single room)',
    tier: 'Backpacker',
    priceUSD: 12,
    priceNPR: 1620,
    notes: 'Basic private room with shared bathroom, e.g. Hotel Ganesh Himal'
  },
  {
    id: 'budget-hotel-double',
    type: 'Budget hotel (double room)',
    tier: 'Backpacker',
    priceUSD: 15,
    priceNPR: 2025,
    notes: 'Basic private room with shared/private bathroom'
  },
  {
    id: 'midrange-hotel',
    type: 'Mid-range hotel (3-star)',
    tier: 'Mid-range',
    priceUSD: 40,
    priceNPR: 5400,
    notes: 'Private room, private bathroom, TV, wifi; includes breakfast'
  },
  {
    id: 'upscale-hotel',
    type: 'Upscale hotel (4-star)',
    tier: 'Mid-range to Luxury',
    priceUSD: 80,
    priceNPR: 10800,
    notes: 'Good amenities, restaurant, gym, multiple channels'
  },
  {
    id: 'luxury-hotel',
    type: 'Luxury hotel (5-star)',
    tier: 'Luxury',
    priceUSD: 150,
    priceNPR: 20250,
    notes: 'High-end amenities, spa, fine dining, valley views'
  },
  {
    id: 'boutique-hotel',
    type: 'Boutique hotel',
    tier: 'Mid-range to Luxury',
    priceUSD: 60,
    priceNPR: 8100,
    notes: 'Unique design, cultural touches, personalized service'
  }
];

// ============================================
// TRANSPORT & VISA
// ============================================
export interface TransportItem {
  id: string;
  name: string;
  category: string;
  costUSD: number;
  costNPR: number;
  notes: string;
}

export const transportItems: TransportItem[] = [
  {
    id: 'local-bus',
    name: 'Local bus (short trip in Kathmandu)',
    category: 'Transport',
    costUSD: 0.28,
    costNPR: 38,
    notes: 'Cheapest option; can be crowded'
  },
  {
    id: 'taxi-meter',
    name: 'Taxi (metered, short trip)',
    category: 'Transport',
    costUSD: 1.48,
    costNPR: 200,
    notes: '2-3 km ride; rates vary by taxi'
  },
  {
    id: 'taxi-longer',
    name: 'Taxi (longer trip, e.g., airport to city)',
    category: 'Transport',
    costUSD: 7.41,
    costNPR: 1000,
    notes: '10+ km'
  },
  {
    id: 'tuk-tuk',
    name: 'Tuk-tuk (auto-rickshaw)',
    category: 'Transport',
    costUSD: 1.11,
    costNPR: 150,
    notes: 'Fun three-wheeled ride; similar to taxi'
  },
  {
    id: 'ride-share-pathao',
    name: 'Ride-share app (Pathao)',
    category: 'Transport',
    costUSD: 1.85,
    costNPR: 250,
    notes: 'Like Uber; often cheaper than meter taxis'
  },
  {
    id: 'private-car',
    name: 'Private car rental (8 hrs)',
    category: 'Transport',
    costUSD: 50,
    costNPR: 6750,
    notes: 'With driver; best for day tours'
  },
  {
    id: 'visa-60-days',
    name: 'Tourist Visa (60 days)',
    category: 'Visa',
    costUSD: 50,
    costNPR: 6750,
    notes: 'Obtainable on arrival or at embassy'
  },
  {
    id: 'visa-extension',
    name: 'Visa Extension (15 additional days)',
    category: 'Visa',
    costUSD: 2,
    costNPR: 270,
    notes: 'At immigration office in Kathmandu'
  }
];

// ============================================
// BUDGET STYLES
// ============================================
export interface BudgetStyle {
  id: string;
  name: string;
  dailyBudgetUSD: number;
  dailyBudgetNPR: number;
  breakdown: {
    accommodation: number;
    food: number;
    transport: number;
    activities: number;
    miscellaneous: number;
  };
  description: string;
  characteristics: string[];
}

export const budgetStyles: BudgetStyle[] = [
  {
    id: 'backpacker',
    name: 'Backpacker Budget',
    dailyBudgetUSD: 27,
    dailyBudgetNPR: 3645,
    breakdown: {
      accommodation: 7,
      food: 12,
      transport: 3,
      activities: 3,
      miscellaneous: 2
    },
    description: 'Budget hostels, local street food, limited paid activities',
    characteristics: [
      'Hostel dorms or cheap guesthouses',
      'Local street food and dal bhat',
      'Public transport and walking',
      'Limited activity budget (free temples + occasional tour)',
      'Socializing in hostels'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Tourist',
    dailyBudgetUSD: 57,
    dailyBudgetNPR: 7695,
    breakdown: {
      accommodation: 20,
      food: 22,
      transport: 5,
      activities: 10,
      miscellaneous: 0
    },
    description: 'Mid-range hotels, restaurant meals, one guided tour',
    characteristics: [
      'Budget or mid-range hotels (private room)',
      'Mix of street food and restaurants',
      'Taxis and local transport',
      'One or two guided tours',
      'Occasional activities (yoga, massage)'
    ]
  },
  {
    id: 'mid-range',
    name: 'Mid-Range Comfort',
    dailyBudgetUSD: 102,
    dailyBudgetNPR: 13770,
    breakdown: {
      accommodation: 55,
      food: 32,
      transport: 8,
      activities: 5,
      miscellaneous: 2
    },
    description: 'Good 3-4 star hotels, varied dining, multiple activities',
    characteristics: [
      '3-4 star hotels with breakfast',
      'Good restaurants, some fine dining',
      'Private cars for tours, taxis',
      'Multiple activities and experiences',
      'Souvenirs and guided tours with private guides'
    ]
  },
  {
    id: 'luxury',
    name: 'Luxury Travel',
    dailyBudgetUSD: 250,
    dailyBudgetNPR: 33750,
    breakdown: {
      accommodation: 150,
      food: 60,
      transport: 20,
      activities: 15,
      miscellaneous: 5
    },
    description: '5-star hotels, fine dining, private experiences',
    characteristics: [
      '5-star hotels with premium suites',
      'Fine dining and gourmet experiences',
      'Private drivers and helicopters',
      'Exclusive tours and experiences',
      'Luxury spa and wellness treatments'
    ]
  }
];

// ============================================
// SAMPLE ITINERARY
// ============================================
export interface ItineraryDay {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
  estimatedCostUSD: number;
}

export const sampleItinerary: ItineraryDay[] = [
  {
    day: 1,
    morning: 'Arrive at airport; transfer to Thamel; check into hotel; rest & acclimate',
    afternoon: 'Walk around Thamel area, explore local shops, get oriented',
    evening: 'Dinner at local restaurant, light exploring, early night (jet lag)',
    estimatedCostUSD: 40
  },
  {
    day: 2,
    morning: 'Guided tour: Kathmandu Durbar Square + Swayambhunath (Monkey Temple)',
    afternoon: 'Rest at hotel, light shopping, cafe time',
    evening: 'Dinner, explore Thamel nightlife',
    estimatedCostUSD: 100
  },
  {
    day: 3,
    morning: 'Hike to Nagarkot; panoramic Himalayan views',
    afternoon: 'Rest and explore local village',
    evening: 'Dinner, sunset from Nagarkot',
    estimatedCostUSD: 85
  },
  {
    day: 4,
    morning: 'Guided tour: Pashupatinath Temple + Boudhanath Stupa (afternoon/evening)',
    afternoon: 'Rest, shopping, or cafe',
    evening: 'Visit temples, experience spiritual side of Kathmandu',
    estimatedCostUSD: 80
  },
  {
    day: 5,
    morning: 'Guided tour: Patan Durbar Square + Patan Museum',
    afternoon: 'Bhaktapur Durbar Square + pottery workshop',
    evening: 'Dinner, rest',
    estimatedCostUSD: 120
  }
];

// ============================================
// PRACTICAL TIPS
// ============================================
export interface PracticalTip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
}

export const practicalTips: PracticalTip[] = [
  {
    id: 'visa-info',
    category: 'Visa & Documents',
    title: 'Tourist Visa',
    description: 'Nepal offers 60-day tourist visas on arrival. Have 4 passport photos & USD/INR cash ready.',
    icon: '📜'
  },
  {
    id: 'currency',
    category: 'Money',
    title: 'Currency Exchange',
    description: 'Exchange money at banks or ATMs (no fees). 1 USD ≈ 135 NPR. Avoid street changers.',
    icon: '💱'
  },
  {
    id: 'altitude',
    category: 'Health',
    title: 'Altitude & Health',
    description: 'Kathmandu is at 1,300m. Stay hydrated. Bring altitude sickness medication if trekking higher.',
    icon: '⛰️'
  },
  {
    id: 'seasons',
    category: 'Best Time',
    title: 'Best Seasons',
    description: 'October-November (autumn) & February-March (spring). Avoid monsoon (June-Sept) & winter snow.',
    icon: '🌤️'
  },
  {
    id: 'language',
    category: 'Communication',
    title: 'Language & Communication',
    description: 'Nepali is the main language. English widely spoken in tourist areas. Learn basic Nepali phrases!',
    icon: '🗣️'
  },
  {
    id: 'transport-tips',
    category: 'Transport',
    title: 'Getting Around',
    description: 'Use taxis (ask for meter), Pathao app (like Uber), or local buses. Avoid driving yourself!',
    icon: '🚕'
  },
  {
    id: 'respect',
    category: 'Culture & Etiquette',
    title: 'Cultural Respect',
    description: 'Remove shoes before entering temples. Left hand considered unclean. Respect local customs.',
    icon: '🙏'
  },
  {
    id: 'food-safety',
    category: 'Health & Food',
    title: 'Food Safety',
    description: 'Drink bottled water only. Eat hot, freshly-cooked food. Street food is usually safe if busy.',
    icon: '🍽️'
  },
  {
    id: 'bargaining',
    category: 'Shopping',
    title: 'Bargaining Tips',
    description: 'Bargain at markets & street shops, but not at malls. Start at 50% of asking price.',
    icon: '🏪'
  },
  {
    id: 'wifi-mobile',
    category: 'Technology',
    title: 'WiFi & Mobile',
    description: 'Free WiFi everywhere in Thamel. Buy local SIM (NCL/Namaste) for cheap data. 4G available.',
    icon: '📱'
  }
];
