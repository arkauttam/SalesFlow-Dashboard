import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { funnelData } from '@/data/analytics';

export function ConversionFunnel() {
  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
  ];

  const dataWithConversion = funnelData.map((item, index) => ({
    ...item,
    conversionRate: index > 0 
      ? ((item.value / funnelData[index - 1].value) * 100).toFixed(1) + '%'
      : '100%',
  }));

  return (
    <Card className="glass animate-slide-up" style={{ animationDelay: '500ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataWithConversion} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="stage"
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
                formatter={(value: number, _, props) => [
                  `${value.toLocaleString()} (${props.payload.conversionRate})`,
                  'Visitors'
                ]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {dataWithConversion.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
                ))}
                <LabelList
                  dataKey="conversionRate"
                  position="top"
                  fill="hsl(var(--muted-foreground))"
                  fontSize={11}
                  fontWeight={500}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
