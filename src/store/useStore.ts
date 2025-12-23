import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order, DateRange, OrderStatusFilter, PaymentStatusFilter } from '@/types';
import { orders as mockOrders } from '@/data/orders';

interface StoreState {
  // Auth
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Orders
  orders: Order[];
  
  // Filters
  dateRange: DateRange;
  customDateStart: string | null;
  customDateEnd: string | null;
  categoryFilter: string;
  orderStatusFilter: OrderStatusFilter;
  paymentStatusFilter: PaymentStatusFilter;
  searchQuery: string;
  
  // Filter actions
  setDateRange: (range: DateRange) => void;
  setCustomDateRange: (start: string, end: string) => void;
  setCategoryFilter: (category: string) => void;
  setOrderStatusFilter: (status: OrderStatusFilter) => void;
  setPaymentStatusFilter: (status: PaymentStatusFilter) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Auth
      isLoggedIn: false,
      user: null,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      
      // Theme
      theme: 'dark',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
      }),
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
      
      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      // Orders
      orders: mockOrders,
      
      // Filters
      dateRange: 'last30days',
      customDateStart: null,
      customDateEnd: null,
      categoryFilter: 'all',
      orderStatusFilter: 'all',
      paymentStatusFilter: 'all',
      searchQuery: '',
      
      // Filter actions
      setDateRange: (range) => set({ dateRange: range }),
      setCustomDateRange: (start, end) => set({ customDateStart: start, customDateEnd: end, dateRange: 'custom' }),
      setCategoryFilter: (category) => set({ categoryFilter: category }),
      setOrderStatusFilter: (status) => set({ orderStatusFilter: status }),
      setPaymentStatusFilter: (status) => set({ paymentStatusFilter: status }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      resetFilters: () => set({
        dateRange: 'last30days',
        customDateStart: null,
        customDateEnd: null,
        categoryFilter: 'all',
        orderStatusFilter: 'all',
        paymentStatusFilter: 'all',
        searchQuery: '',
      }),
    }),
    {
      name: 'dashboard-store',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
