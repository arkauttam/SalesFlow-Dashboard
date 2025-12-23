import { DollarSign, ShoppingCart, TrendingUp, Users, RotateCcw } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPIStatCard } from '@/components/KPIStatCard';
import { SalesLineChart } from '@/components/charts/SalesLineChart';
import { OrdersBarChart } from '@/components/charts/OrdersBarChart';
import { RevenuePieChart } from '@/components/charts/RevenuePieChart';
import { ConversionFunnel } from '@/components/charts/ConversionFunnel';
import { OrdersTable } from '@/components/OrdersTable';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { analyticsData } from '@/data/analytics';
import { useStore } from '@/store/useStore';

export default function Dashboard() {
  const { user } = useStore();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Good morning, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Here's what's happening with your store today.
            </p>
          </div>
          <DateRangeFilter />
        </div>

        {/* KPI Cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <KPIStatCard
            title="Total Revenue"
            value={analyticsData.totalRevenue}
            currentValue={analyticsData.totalRevenue}
            previousValue={analyticsData.previousTotalRevenue}
            icon={DollarSign}
            format="currency"
            delay={0}
          />
          <KPIStatCard
            title="Total Orders"
            value={analyticsData.totalOrders}
            currentValue={analyticsData.totalOrders}
            previousValue={analyticsData.previousTotalOrders}
            icon={ShoppingCart}
            format="number"
            delay={50}
          />
          <KPIStatCard
            title="Avg. Order Value"
            value={analyticsData.averageOrderValue}
            currentValue={analyticsData.averageOrderValue}
            previousValue={analyticsData.previousAverageOrderValue}
            icon={TrendingUp}
            format="currency"
            delay={100}
          />
          <KPIStatCard
            title="Conversion Rate"
            value={analyticsData.conversionRate}
            currentValue={analyticsData.conversionRate}
            previousValue={analyticsData.previousConversionRate}
            icon={Users}
            format="percent"
            delay={150}
          />
          <KPIStatCard
            title="Returning Customers"
            value={analyticsData.returningCustomersPercent}
            currentValue={analyticsData.returningCustomersPercent}
            previousValue={analyticsData.previousReturningCustomersPercent}
            icon={RotateCcw}
            format="percent"
            delay={200}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <SalesLineChart />
          <OrdersBarChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <RevenuePieChart />
          <ConversionFunnel />
        </div>

        {/* Orders Table */}
        <OrdersTable />
      </div>
    </DashboardLayout>
  );
}
