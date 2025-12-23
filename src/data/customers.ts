import { Customer } from '@/types';

const firstNames = ['Emma', 'James', 'Sofia', 'Marcus', 'Olivia', 'Liam', 'Ava', 'Noah', 'Isabella', 'Ethan'];
const lastNames = ['Wilson', 'Chen', 'Rodriguez', 'Johnson', 'Brown', 'Williams', 'Martinez', 'Davis', 'Garcia', 'Miller'];

export const customers: Customer[] = Array.from({ length: 50 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const totalOrders = Math.floor(Math.random() * 15) + 1;
  const isReturning = totalOrders > 1;
  
  return {
    id: `CUS-${(i + 1).toString().padStart(4, '0')}`,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    totalOrders,
    totalSpent: Math.round((Math.random() * 2000 + 50) * totalOrders * 100) / 100,
    isReturning,
    joinedDate: new Date(2023, Math.floor(Math.random() * 24), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  };
});

export const returningCustomersCount = customers.filter(c => c.isReturning).length;
export const totalCustomersCount = customers.length;
