import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OrdersTable } from '@/components/OrdersTable';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { ShoppingCart, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';

export default function Orders() {
  const { orders } = useStore();

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.orderStatus === 'Delivered').length,
    shipped: orders.filter(o => o.orderStatus === 'Shipped').length,
    processing: orders.filter(o => o.orderStatus === 'Processing').length,
    cancelled: orders.filter(o => o.orderStatus === 'Cancelled').length,
  };

  const statCards = [
    { title: 'Total Orders', value: stats.total, icon: ShoppingCart, color: 'text-primary' },
    { title: 'Delivered', value: stats.delivered, icon: CheckCircle, color: 'text-success' },
    { title: 'Shipped', value: stats.shipped, icon: Truck, color: 'text-chart-5' },
    { title: 'Processing', value: stats.processing, icon: Clock, color: 'text-chart-2' },
    { title: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-destructive' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Orders</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage and track all your customer orders.
            </p>
          </div>
          <DateRangeFilter />
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="glass animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} opacity-80 shrink-0`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <OrdersTable />
      </div>
    </DashboardLayout>
  );
}
