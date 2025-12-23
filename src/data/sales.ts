import { SalesData } from '@/types';

function generateSalesData(days: number): SalesData[] {
  const data: SalesData[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseRevenue = 8000 + Math.random() * 4000;
    const baseOrders = 40 + Math.floor(Math.random() * 30);
    
    // Add some weekly patterns (weekends slightly lower)
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.8 : 1;
    
    // Previous period data (30 days ago)
    const previousRevenue = (baseRevenue * 0.85 + Math.random() * 1000) * weekendFactor;
    const previousOrders = Math.floor((baseOrders * 0.85 + Math.random() * 10) * weekendFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.round(baseRevenue * weekendFactor),
      orders: Math.floor(baseOrders * weekendFactor),
      previousRevenue: Math.round(previousRevenue),
      previousOrders: previousOrders,
    });
  }
  
  return data;
}

export const salesDataDaily = generateSalesData(30);
export const salesDataWeekly = generateWeeklyData();
export const salesDataMonthly = generateMonthlyData();

function generateWeeklyData(): SalesData[] {
  const weeks: SalesData[] = [];
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (i * 7));
    
    const revenue = 50000 + Math.random() * 20000;
    const orders = 280 + Math.floor(Math.random() * 100);
    
    weeks.push({
      date: `Week ${12 - i}`,
      revenue: Math.round(revenue),
      orders,
      previousRevenue: Math.round(revenue * 0.88),
      previousOrders: Math.floor(orders * 0.88),
    });
  }
  
  return weeks;
}

function generateMonthlyData(): SalesData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, i) => {
    const revenue = 180000 + Math.random() * 80000 + (i * 5000);
    const orders = 1000 + Math.floor(Math.random() * 400) + (i * 50);
    
    return {
      date: month,
      revenue: Math.round(revenue),
      orders,
      previousRevenue: Math.round(revenue * 0.82),
      previousOrders: Math.floor(orders * 0.82),
    };
  });
}
