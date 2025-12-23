import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPIStatCardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  currentValue?: number;
  icon: LucideIcon;
  format?: 'currency' | 'percent' | 'number';
  delay?: number;
}

export function KPIStatCard({
  title,
  value,
  previousValue,
  currentValue,
  icon: Icon,
  format = 'number',
  delay = 0,
}: KPIStatCardProps) {
  const calculateGrowth = () => {
    if (!previousValue || !currentValue) return null;
    const growth = ((currentValue - previousValue) / previousValue) * 100;
    return growth;
  };

  const growth = calculateGrowth();
  const isPositive = growth !== null && growth >= 0;

  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val;
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percent':
        return `${val.toFixed(1)}%`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  return (
    <Card 
      className="card-hover animate-slide-up glass"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-xl sm:text-2xl font-bold tracking-tight">{formatValue(value)}</p>
            {growth !== null && (
              <div className={cn(
                'flex items-center gap-1 text-xs sm:text-sm font-medium flex-wrap',
                isPositive ? 'text-success' : 'text-destructive'
              )}>
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
                <span>{isPositive ? '+' : ''}{growth.toFixed(1)}%</span>
                <span className="text-muted-foreground font-normal hidden sm:inline">vs last period</span>
              </div>
            )}
          </div>
          <div className="rounded-xl bg-primary/10 p-2 sm:p-3 shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
