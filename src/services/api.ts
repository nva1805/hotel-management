import axios from 'axios';
import { Room, Customer, Booking, Invoice, Partner, Expense, HotelSettings } from '@/types';
import { mockRooms } from '@/mock/rooms';
import { mockCustomers } from '@/mock/customers';
import { mockBookings } from '@/mock/bookings';
import { mockInvoices } from '@/mock/invoices';
import { mockPartners } from '@/mock/partners';
import { mockExpenses } from '@/mock/expenses';
import { mockSettings } from '@/mock/settings';

// Create an axios instance with interceptors
export const api = axios.create({
  baseURL: '/api', // This would be the real API base URL
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally here
    return Promise.reject(error);
  }
);

// Mock API functions
export const getRooms = async (): Promise<Room[]> => {
  // In a real application, this would use the API
  // return api.get('/rooms').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockRooms);
};

export const getCustomers = async (): Promise<Customer[]> => {
  // In a real application, this would use the API
  // return api.get('/customers').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockCustomers);
};

export const getBookings = async (): Promise<Booking[]> => {
  // In a real application, this would use the API
  // return api.get('/bookings').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockBookings);
};

export const getInvoices = async (): Promise<Invoice[]> => {
  // In a real application, this would use the API
  // return api.get('/invoices').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockInvoices);
};

export const getPartners = async (): Promise<Partner[]> => {
  // In a real application, this would use the API
  // return api.get('/partners').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockPartners);
};

export const getExpenses = async (): Promise<Expense[]> => {
  // In a real application, this would use the API
  // return api.get('/expenses').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockExpenses);
};

export const getSettings = async (): Promise<HotelSettings> => {
  // In a real application, this would use the API
  // return api.get('/settings').then(response => response.data);
  
  // For now, return mock data
  return Promise.resolve(mockSettings);
};
