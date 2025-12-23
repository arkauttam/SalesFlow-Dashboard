import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge, getPaymentStatusVariant, getOrderStatusVariant } from '@/components/StatusBadge';
import { useStore } from '@/store/useStore';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown } from 'lucide-react';

type SortField = 'orderDate' | 'amount' | 'customerName';
type SortDirection = 'asc' | 'desc';

export function OrdersTable() {
  const { 
    orders, 
    searchQuery, 
    setSearchQuery, 
    categoryFilter, 
    orderStatusFilter, 
    paymentStatusFilter,
    dateRange,
    customDateStart,
    customDateEnd
  } = useStore();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('orderDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const itemsPerPage = 10;

  const getDateRange = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    switch (dateRange) {
      case 'today':
        const todayStart = new Date(today);
        todayStart.setHours(0, 0, 0, 0);
        return { start: todayStart, end: today };
      case 'last7days':
        const last7 = new Date(today);
        last7.setDate(last7.getDate() - 7);
        return { start: last7, end: today };
      case 'last30days':
        const last30 = new Date(today);
        last30.setDate(last30.getDate() - 30);
        return { start: last30, end: today };
      case 'custom':
        return {
          start: customDateStart ? new Date(customDateStart) : new Date(0),
          end: customDateEnd ? new Date(customDateEnd) : today,
        };
      default:
        return { start: new Date(0), end: today };
    }
  };

  const filteredOrders = useMemo(() => {
    const { start, end } = getDateRange();
    
    return orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const matchesDate = orderDate >= start && orderDate <= end;
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || order.category === categoryFilter;
      const matchesOrderStatus = orderStatusFilter === 'all' || order.orderStatus === orderStatusFilter;
      const matchesPaymentStatus = paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter;
      
      return matchesDate && matchesSearch && matchesCategory && matchesOrderStatus && matchesPaymentStatus;
    });
  }, [orders, searchQuery, categoryFilter, orderStatusFilter, paymentStatusFilter, dateRange, customDateStart, customDateEnd]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'orderDate':
          comparison = new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'customerName':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredOrders, sortField, sortDirection]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(start, start + itemsPerPage);
  }, [sortedOrders, currentPage]);

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="glass animate-slide-up" style={{ animationDelay: '600ms' }}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px]">Order ID</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 text-xs font-medium"
                    onClick={() => handleSort('customerName')}
                  >
                    Customer
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 text-xs font-medium"
                    onClick={() => handleSort('orderDate')}
                  >
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 text-xs font-medium"
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="hidden lg:table-cell">Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-mono text-xs">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground hidden sm:block">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {order.category}
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(order.orderDate)}</TableCell>
                    <TableCell className="text-right font-medium text-sm">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <StatusBadge variant={getPaymentStatusVariant(order.paymentStatus)}>
                        {order.paymentStatus}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge variant={getOrderStatusVariant(order.orderStatus)}>
                        {order.orderStatus}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4 pt-4 border-t">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <span className="text-xs sm:text-sm px-2 sm:px-3">
              {currentPage}/{totalPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
