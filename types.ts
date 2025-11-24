export enum Role {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  STAFF = 'Staff'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  totalSpent: number;
  lastVisit: string;
}

export interface Supply {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  threshold: number;
  status: 'OK' | 'LOW' | 'CRITICAL';
}

export interface Sale {
  id: string;
  date: string;
  total: number;
  paymentMethod: 'Cash' | 'Card' | 'Digital';
  items: number; // count of items
  clientName?: string;
}

export interface ReportData {
  sales: Sale[];
  inventory: Product[];
  clients: Client[];
}