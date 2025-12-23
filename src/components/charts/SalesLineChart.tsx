import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { salesDataDaily, salesDataWeekly, salesDataMonthly } from '@/data/sales';

type TimeRange = 'daily' | 'weekly' | 'monthly';

export function SalesLineChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  const getData = () => {
    switch (timeRange) {
      case 'daily':
        return salesDataDaily.slice(-14);
      case 'weekly':
        return salesDataWeekly;
      case 'monthly':
        return salesDataMonthly;
    }
  };

  const formatXAxis = (value: string) => {
    if (timeRange === 'daily') {
      return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return value;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="glass animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <CardTitle className="text-base font-semibold">Sales Trend</CardTitle>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)}>
          <TabsList className="h-7 sm:h-8">
            <TabsTrigger value="daily" className="text-[10px] sm:text-xs px-2 sm:px-3 h-5 sm:h-6">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-[10px] sm:text-xs px-2 sm:px-3 h-5 sm:h-6">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-[10px] sm:text-xs px-2 sm:px-3 h-5 sm:h-6">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                formatter={(value: number, name: string) => [formatCurrency(value), name === 'revenue' ? 'Current' : 'Previous']}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="previousRevenue"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorPrevious)"
                name="Previous Period"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorRevenue)"
                name="Current Period"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
