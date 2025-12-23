import { AnalyticsData, FunnelData } from '@/types';
import { orders } from './orders';
import { customers, returningCustomersCount, totalCustomersCount } from './customers';

export function calculateAnalytics(): AnalyticsData {
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalRevenue / totalOrders;
  
  // Simulated values for demo
  const conversionRate = 3.42;
  const returningCustomersPercent = (returningCustomersCount / totalCustomersCount) * 100;
  
  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalOrders,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    conversionRate,
    returningCustomersPercent: Math.round(returningCustomersPercent * 10) / 10,
    // Previous period (simulated ~15% lower)
    previousTotalRevenue: Math.round(totalRevenue * 0.87 * 100) / 100,
    previousTotalOrders: Math.floor(totalOrders * 0.89),
    previousAverageOrderValue: Math.round(averageOrderValue * 0.95 * 100) / 100,
    previousConversionRate: 2.98,
    previousReturningCustomersPercent: Math.round(returningCustomersPercent * 0.92 * 10) / 10,
  };
}

export const funnelData: FunnelData[] = [
  { stage: 'Visits', value: 45000, fill: 'hsl(var(--chart-1))' },
  { stage: 'Add to Cart', value: 12500, fill: 'hsl(var(--chart-2))' },
  { stage: 'Checkout', value: 4200, fill: 'hsl(var(--chart-3))' },
  { stage: 'Purchase', value: 1540, fill: 'hsl(var(--chart-4))' },
];

export const analyticsData = calculateAnalytics();
