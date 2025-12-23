import { Order } from '@/types';

const customerNames = [
  'Emma Wilson', 'James Chen', 'Sofia Rodriguez', 'Marcus Johnson', 'Olivia Brown',
  'Liam Williams', 'Ava Martinez', 'Noah Davis', 'Isabella Garcia', 'Ethan Miller',
  'Mia Anderson', 'Lucas Taylor', 'Charlotte Thomas', 'Mason Jackson', 'Amelia White',
  'Oliver Harris', 'Harper Martin', 'Elijah Thompson', 'Evelyn Lee', 'William Clark'
];

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
const paymentStatuses: Order['paymentStatus'][] = ['Paid', 'Pending', 'Failed', 'Refunded'];
const orderStatuses: Order['orderStatus'][] = ['Delivered', 'Shipped', 'Processing', 'Cancelled'];

function generateOrderId(): string {
  return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

function generateEmail(name: string): string {
  return `${name.toLowerCase().replace(' ', '.')}@email.com`;
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function randomAmount(): number {
  return Math.round((Math.random() * 500 + 20) * 100) / 100;
}

export const orders: Order[] = Array.from({ length: 150 }, (_, i) => {
  const customerName = customerNames[i % customerNames.length];
  const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
  let orderStatus: Order['orderStatus'];
  
  if (paymentStatus === 'Paid') {
    orderStatus = ['Delivered', 'Shipped', 'Processing'][Math.floor(Math.random() * 3)] as Order['orderStatus'];
  } else if (paymentStatus === 'Failed' || paymentStatus === 'Refunded') {
    orderStatus = 'Cancelled';
  } else {
    orderStatus = 'Processing';
  }

  return {
    id: generateOrderId(),
    customerId: `CUS-${(i + 1).toString().padStart(4, '0')}`,
    customerName,
    customerEmail: generateEmail(customerName),
    category: categories[Math.floor(Math.random() * categories.length)],
    orderDate: randomDate(new Date('2024-10-01'), new Date()),
    amount: randomAmount(),
    paymentStatus,
    orderStatus,
  };
}).sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
