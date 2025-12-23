export interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Manager';
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  category: string;
  orderDate: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  orderStatus: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  isReturning: boolean;
  joinedDate: string;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  previousRevenue?: number;
  previousOrders?: number;
}

export interface CategoryData {
  name: string;
  orders: number;
  revenue: number;
  color: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  returningCustomersPercent: number;
  previousTotalRevenue: number;
  previousTotalOrders: number;
  previousAverageOrderValue: number;
  previousConversionRate: number;
  previousReturningCustomersPercent: number;
}

export interface FunnelData {
  stage: string;
  value: number;
  fill: string;
}

export type DateRange = 'today' | 'last7days' | 'last30days' | 'custom';
export type OrderStatusFilter = 'all' | 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
export type PaymentStatusFilter = 'all' | 'Paid' | 'Pending' | 'Failed' | 'Refunded';
