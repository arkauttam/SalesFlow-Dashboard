import { CategoryData } from '@/types';

export const categories: CategoryData[] = [
  { name: 'Electronics', orders: 1247, revenue: 289450, color: 'hsl(var(--chart-1))' },
  { name: 'Clothing', orders: 892, revenue: 156780, color: 'hsl(var(--chart-2))' },
  { name: 'Home & Garden', orders: 654, revenue: 98230, color: 'hsl(var(--chart-3))' },
  { name: 'Sports', orders: 423, revenue: 67890, color: 'hsl(var(--chart-4))' },
  { name: 'Books', orders: 312, revenue: 24560, color: 'hsl(var(--chart-5))' },
];

export const categoryNames = categories.map(c => c.name);
