import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        // Payment Status
        paid: 'bg-success/15 text-success',
        pending: 'bg-warning/15 text-warning',
        failed: 'bg-destructive/15 text-destructive',
        refunded: 'bg-muted text-muted-foreground',
        // Order Status
        delivered: 'bg-success/15 text-success',
        shipped: 'bg-primary/15 text-primary',
        processing: 'bg-chart-2/15 text-chart-2',
        cancelled: 'bg-destructive/15 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'pending',
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}

export function getPaymentStatusVariant(status: string): StatusBadgeProps['variant'] {
  const map: Record<string, StatusBadgeProps['variant']> = {
    Paid: 'paid',
    Pending: 'pending',
    Failed: 'failed',
    Refunded: 'refunded',
  };
  return map[status] || 'pending';
}

export function getOrderStatusVariant(status: string): StatusBadgeProps['variant'] {
  const map: Record<string, StatusBadgeProps['variant']> = {
    Delivered: 'delivered',
    Shipped: 'shipped',
    Processing: 'processing',
    Cancelled: 'cancelled',
  };
  return map[status] || 'processing';
}
