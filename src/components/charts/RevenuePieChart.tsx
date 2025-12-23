import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/data/categories';

export function RevenuePieChart() {
  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalRevenue = categories.reduce((sum, cat) => sum + cat.revenue, 0);

  return (
    <Card className="glass animate-slide-up" style={{ animationDelay: '400ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Revenue Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="revenue"
                nameKey="name"
                strokeWidth={0}
              >
                {categories.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              />
              <Legend 
                verticalAlign="bottom"
                formatter={(value: string, entry: any) => (
                  <span className="text-xs text-muted-foreground">
                    {value} ({((entry.payload.revenue / totalRevenue) * 100).toFixed(1)}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
