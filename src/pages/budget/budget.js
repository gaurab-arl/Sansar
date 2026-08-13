export const TIERS = ["Backpacker", "Mid-range", "Luxury"];

export const itinerarySegments = [
  {
    id: "seg-1",
    title: "Days 1-3: Arrival & Acclimation",
    location: "Tokyo, Japan",
    cost: 450,
    costColor: "text-tertiary",
  },
  {
    id: "seg-2",
    title: "Days 4-7: Mountain Retreat",
    location: "Kyoto Rural",
    cost: 620,
    costColor: "text-tertiary",
  },
  {
    id: "seg-3",
    title: "Days 8-12: Coastal Exploration",
    location: "Osaka / Kobe",
    cost: 850,
    costColor: "text-secondary-fixed",
    highlight: true,
  },
];

// percentages must sum to 100 — BudgetDonutChart derives stroke offsets from these
export const budgetCategories = [
  {
    id: "accommodation",
    label: "Accommodation",
    amount: 850,
    percent: 44,
    barColor: "bg-primary",
    barGlow: "shadow-[0_0_10px_rgba(190,198,225,0.5)]",
    ringColor: "#bec6e1",
  },
  {
    id: "transport",
    label: "Transport",
    amount: 420,
    percent: 22,
    barColor: "bg-secondary-fixed",
    barGlow: "shadow-[0_0_10px_rgba(147,242,242,0.5)]",
    ringColor: "#93f2f2",
  },
  {
    id: "dining",
    label: "Dining & Activities",
    amount: 650,
    percent: 34,
    barColor: "bg-tertiary",
    barGlow: "shadow-[0_0_10px_rgba(233,196,0,0.5)]",
    ringColor: "#e9c400",
  },
];

export const totalEstimate = 1920;
export const totalDays = 14;

export const curatedInsight = {
  title: "Curated Insights",
  body:
    "Switching your Day 4 transport to local rail saves approx. $120 without adding significant travel time. Tap to view alternatives.",
};

export const recommendations = [
  {
    id: "boutique-stays",
    icon: "hotel",
    title: "Boutique Stays",
    subtitle: "Avg. $85/night",
    iconBg: "bg-primary-container",
    iconColor: "text-primary",
    hoverArrow: "group-hover:text-primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDx_rR3MNMvsxwcZo2C3B4GPwNxpvEMlIZtOl8d6IaU-LlR7TuyfdV00qHr2esX-ANA3BpI7VNICMnyh4YqfdkuIg4oF_pc3mOl1yDHKqhxPupcMxdFAHdgAmBHR5FAfEoAgXcn4JO_EGJKmf8proY0JVbY_MENejicjNctZMKGu6cYCYmetAJKIPRNuMsVkj1WmOwbVA4DmWaTqhvT9nhH2KxCKhsQWFxBTXXB7CU0pm_ZOmsB6G20kw",
    alt: "Interior of a modern, minimalist Japanese boutique hotel room with warm wood paneling, a low futon bed, and a large window looking out onto a serene bamboo garden. Cinematic lighting, deep shadows contrasting with soft natural light. Teal and gold accents in the decor. High-end architectural photography.",
    tag: { type: "badge", label: "Hidden Gem" },
  },
  {
    id: "rail-pass",
    icon: "train",
    title: "Regional Rail Pass",
    subtitle: "Recommended Option",
    iconBg: "bg-secondary-container",
    iconColor: "text-secondary-fixed",
    hoverArrow: "group-hover:text-secondary-fixed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsSSDxt4yON15cntoZZsM0vvKIL7qeQIJXKudepuLl8qBnQoFQOj0awRBKpCbIzUqnPev17t7ShCwXMxlwIxg8MAMVMAh9wYtMSKT5vRop5YvcuzpRh0BRFHl17ZVbFz-0ut4Uy9NWSftgVtpZcdgYQBAToUwSsRZ7eots2W5dtI0pyjLi72jCnbe2vBLv1Epsd5XIrTxR7p-_daFfvX8Vbnx4bMDpaOtXFeei0YjHor21cEfFyAuuGw",
    alt: "A sleek, futuristic high-speed train speeding through a misty, mountainous Japanese landscape at dawn. The scene has a cool, cinematic indigo and teal color grade with golden sunlight catching the side of the train. Motion blur on the foreground, sharp focus on the train.",
    tag: { type: "savings", label: "Save $120" },
  },
];
