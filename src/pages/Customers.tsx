import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { customers } from '@/data/customers';
import { Search, Users, UserCheck, DollarSign, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const stats = {
    total: customers.length,
    returning: customers.filter((c) => c.isReturning).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrders: (customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length).toFixed(1),
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Customers</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your customer relationships.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card className="glass animate-slide-up">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Customers</p>
                  <p className="text-lg sm:text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-2 sm:p-3 shrink-0">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass animate-slide-up" style={{ animationDelay: '50ms' }}>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Returning</p>
                  <p className="text-lg sm:text-2xl font-bold">{stats.returning}</p>
                </div>
                <div className="rounded-xl bg-success/10 p-2 sm:p-3 shrink-0">
                  <UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Revenue</p>
                  <p className="text-lg sm:text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="rounded-xl bg-chart-3/10 p-2 sm:p-3 shrink-0">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass animate-slide-up" style={{ animationDelay: '150ms' }}>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Avg. Orders</p>
                  <p className="text-lg sm:text-2xl font-bold">{stats.avgOrders}</p>
                </div>
                <div className="rounded-xl bg-chart-2/10 p-2 sm:p-3 shrink-0">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers Table */}
        <Card className="glass animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base font-semibold">All Customers</CardTitle>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
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
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead className="hidden lg:table-cell">Joined</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {getInitials(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{customer.totalOrders}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">
                          {new Date(customer.joinedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.isReturning ? 'default' : 'secondary'}>
                            {customer.isReturning ? 'Returning' : 'New'}
                          </Badge>
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
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs sm:text-sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden xs:inline">Previous</span>
                </Button>
                <span className="text-xs sm:text-sm px-2">
                  {currentPage}/{totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs sm:text-sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden xs:inline">Next</span>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
