import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useStore } from '@/store/useStore';
import { categoryNames } from '@/data/categories';
import { DateRange } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function DateRangeFilter() {
  const {
    dateRange,
    setDateRange,
    customDateStart,
    customDateEnd,
    setCustomDateRange,
    categoryFilter,
    setCategoryFilter,
    orderStatusFilter,
    setOrderStatusFilter,
    resetFilters,
  } = useStore();

  const [dateFrom, setDateFrom] = useState<Date | undefined>(
    customDateStart ? new Date(customDateStart) : undefined
  );
  const [dateTo, setDateTo] = useState<Date | undefined>(
    customDateEnd ? new Date(customDateEnd) : undefined
  );

  const handleDateRangeChange = (value: DateRange) => {
    setDateRange(value);
  };

  const handleCustomDateSelect = () => {
    if (dateFrom && dateTo) {
      setCustomDateRange(
        format(dateFrom, 'yyyy-MM-dd'),
        format(dateTo, 'yyyy-MM-dd')
      );
    }
  };

  const dateRangeLabel = () => {
    switch (dateRange) {
      case 'today':
        return 'Today';
      case 'last7days':
        return 'Last 7 days';
      case 'last30days':
        return 'Last 30 days';
      case 'custom':
        if (customDateStart && customDateEnd) {
          return `${format(new Date(customDateStart), 'MMM d')} - ${format(new Date(customDateEnd), 'MMM d')}`;
        }
        return 'Custom range';
      default:
        return 'Select range';
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* Date Range */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 sm:h-9 gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">{dateRangeLabel()}</span>
            <span className="xs:hidden">Date</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col">
            <div className="p-2 border-b">
              <div className="grid gap-1">
                {[
                  { value: 'today', label: 'Today' },
                  { value: 'last7days', label: 'Last 7 days' },
                  { value: 'last30days', label: 'Last 30 days' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={dateRange === option.value ? 'secondary' : 'ghost'}
                    size="sm"
                    className="justify-start h-8"
                    onClick={() => handleDateRangeChange(option.value as DateRange)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Custom Range</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-[120px] justify-start text-left font-normal h-8">
                      {dateFrom ? format(dateFrom, 'MMM d, yyyy') : 'From'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-[120px] justify-start text-left font-normal h-8">
                      {dateTo ? format(dateTo, 'MMM d, yyyy') : 'To'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                size="sm"
                className="w-full mt-2 h-8"
                onClick={handleCustomDateSelect}
                disabled={!dateFrom || !dateTo}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Category Filter */}
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-[100px] sm:w-[140px] h-8 sm:h-9 text-xs sm:text-sm">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categoryNames.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Order Status Filter */}
      <Select value={orderStatusFilter} onValueChange={(v) => setOrderStatusFilter(v as any)}>
        <SelectTrigger className="w-[90px] sm:w-[130px] h-8 sm:h-9 text-xs sm:text-sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Processing">Processing</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Reset Filters */}
      <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
}
