import { Product, Client, Supply, Sale, User, Role } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Espresso', category: 'Coffee', price: 3.50, stock: 150, description: 'Rich and intense shot', image: 'https://picsum.photos/200/200?random=1' },
  { id: '2', name: 'Latte', category: 'Coffee', price: 4.50, stock: 80, description: 'Espresso with steamed milk', image: 'https://picsum.photos/200/200?random=2' },
  { id: '3', name: 'Cappuccino', category: 'Coffee', price: 4.50, stock: 90, description: 'Espresso with foam', image: 'https://picsum.photos/200/200?random=3' },
  { id: '4', name: 'Croissant', category: 'Pastry', price: 3.00, stock: 20, description: 'Buttery flaky pastry', image: 'https://picsum.photos/200/200?random=4' },
  { id: '5', name: 'Blueberry Muffin', category: 'Pastry', price: 3.25, stock: 15, description: 'Fresh baked daily', image: 'https://picsum.photos/200/200?random=5' },
  { id: '6', name: 'Iced Matcha', category: 'Tea', price: 5.00, stock: 40, description: 'Premium ceremonial grade', image: 'https://picsum.photos/200/200?random=6' },
  { id: '7', name: 'Cold Brew', category: 'Coffee', price: 4.75, stock: 60, description: 'Steeped for 12 hours', image: 'https://picsum.photos/200/200?random=7' },
  { id: '8', name: 'Avocado Toast', category: 'Food', price: 8.50, stock: 10, description: 'Sourdough with toppings', image: 'https://picsum.photos/200/200?random=8' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-0101', points: 450, totalSpent: 320.50, lastVisit: '2023-10-25' },
  { id: 'c2', name: 'Bob Smith', email: 'bob@example.com', phone: '555-0102', points: 120, totalSpent: 85.00, lastVisit: '2023-10-20' },
  { id: 'c3', name: 'Charlie Davis', email: 'charlie@example.com', phone: '555-0103', points: 890, totalSpent: 650.75, lastVisit: '2023-10-26' },
];

export const MOCK_SUPPLIES: Supply[] = [
  { id: 's1', name: 'Coffee Beans (Dark)', unit: 'kg', quantity: 12, threshold: 5, status: 'OK' },
  { id: 's2', name: 'Whole Milk', unit: 'L', quantity: 8, threshold: 10, status: 'LOW' },
  { id: 's3', name: 'Oat Milk', unit: 'L', quantity: 4, threshold: 5, status: 'LOW' },
  { id: 's4', name: 'Paper Cups', unit: 'pcs', quantity: 500, threshold: 100, status: 'OK' },
  { id: 's5', name: 'Sugar', unit: 'kg', quantity: 2, threshold: 2, status: 'CRITICAL' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jane Doe', email: 'jane@coffee.com', role: Role.ADMIN, avatar: 'https://picsum.photos/100/100?random=10' },
  { id: 'u2', name: 'John Barista', email: 'john@coffee.com', role: Role.STAFF, avatar: 'https://picsum.photos/100/100?random=11' },
];

export const MOCK_SALES: Sale[] = [
  { id: 't1', date: '2023-10-26', total: 15.50, paymentMethod: 'Card', items: 3, clientName: 'Alice Johnson' },
  { id: 't2', date: '2023-10-26', total: 4.50, paymentMethod: 'Cash', items: 1 },
  { id: 't3', date: '2023-10-25', total: 22.00, paymentMethod: 'Digital', items: 4, clientName: 'Bob Smith' },
  { id: 't4', date: '2023-10-25', total: 8.75, paymentMethod: 'Card', items: 2 },
  { id: 't5', date: '2023-10-24', total: 12.00, paymentMethod: 'Cash', items: 3 },
];