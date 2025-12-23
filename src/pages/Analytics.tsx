import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SalesLineChart } from '@/components/charts/SalesLineChart';
import { OrdersBarChart } from '@/components/charts/OrdersBarChart';
import { RevenuePieChart } from '@/components/charts/RevenuePieChart';
import { ConversionFunnel } from '@/components/charts/ConversionFunnel';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/data/analytics';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    {
      title: 'Revenue Growth',
      value: '+14.8%',
      comparison: 'vs last month',
      icon: TrendingUp,
      positive: true,
    },
    {
      title: 'Order Growth',
      value: '+12.3%',
      comparison: 'vs last month',
      icon: ShoppingCart,
      positive: true,
    },
    {
      title: 'AOV Change',
      value: '+5.2%',
      comparison: 'vs last month',
      icon: DollarSign,
      positive: true,
    },
    {
      title: 'New Customers',
      value: '+234',
      comparison: 'this month',
      icon: Users,
      positive: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Analytics</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Deep dive into your business performance.
            </p>
          </div>
          <DateRangeFilter />
        </div>

        {/* Quick Metrics */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="glass animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{metric.title}</p>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-lg sm:text-2xl font-bold">{metric.value}</span>
                        {metric.positive ? (
                          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{metric.comparison}</p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-2 sm:p-3 shrink-0">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Charts */}
        <SalesLineChart />

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <OrdersBarChart />
          <RevenuePieChart />
        </div>

        <ConversionFunnel />
      </div>
    </DashboardLayout>
  );
}
