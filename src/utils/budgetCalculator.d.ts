export interface BudgetResult {
  style: string;
  styleName: string;
  days: number;
  people: number;
  breakdown: Record<string, any>;
  perPerson: {
    daily: number;
    total: number;
    totalNPR: number;
  };
  group: {
    daily: number;
    total: number;
    totalNPR: number;
    perPerson: number;
  };
  description: string;
  characteristics: string[];
}

export function calculateBudget(input: any): BudgetResult;
export function getRecommendedActivities(budget: number, style: string, days: number): any[];
export function getAttractionRecommendations(days: number, style: string): any[];
export function getFoodRecommendations(style: string): any[];
export function getAccommodationOptions(style: string): any[];
export function formatCurrency(amount: number, currency?: string): string;
export function convertCurrency(amount: number, fromCurrency?: string, toCurrency?: string): number;

export const budgetStyles: any[];
export const activities: any[];
export const attractions: any[];
export const foodItems: any[];
export const accommodationOptions: any[];
export const kathmanduBudget: Record<string, any>;
export const activityTypes: Record<string, any>;
export const EXCHANGE_RATE: number;
