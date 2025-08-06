// Room status types
export enum RoomStatus {
  VACANT = 'vacant',
  BOOKED = 'booked',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
}

export enum BookingType {
  NIGHTLY = 'nightly',
  HOURLY = 'hourly',
}

// Room interface
export interface Room {
  id: string;
  name: string;
  type: string;
  status: RoomStatus;
  defaultPrice: number;
  capacity: number;
  notes?: string[];
  serviceRequests?: ServiceRequest[];
  floor?: number;
}

// Service request interface
export interface ServiceRequest {
  id: string;
  roomId: string;
  description: string;
  createdAt: Date;
  completedAt?: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

// Customer interface
export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  idNumber?: string;
  idType?: string;
  notes?: string;
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}

// Booking interface
export interface Booking {
  id: string;
  roomId: string;
  customerId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  bookingType: BookingType;
  price: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  earlyCheckIn?: boolean;
  lateCheckOut?: boolean;
  additionalCharges?: AdditionalCharge[];
}

// Additional charge interface
export interface AdditionalCharge {
  id: string;
  bookingId: string;
  description: string;
  amount: number;
  date: Date;
}

// Invoice interface
export interface Invoice {
  id: string;
  bookingId: string;
  customerId: string;
  total: number;
  paid: number;
  status: 'paid' | 'unpaid' | 'partially-paid';
  createdAt: Date;
  dueDate?: Date;
  items: InvoiceItem[];
}

// Invoice item interface
export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Partner interface
export interface Partner {
  id: string;
  name: string;
  service: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

// Expense interface
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  notes?: string;
  receipts?: string[];
}

// Settings interface
export interface HotelSettings {
  name: string;
  address: string;
  phone: string;
  email?: string;
  logo?: string;
  checkInTime: string; // format: "14:00"
  checkOutTime: string; // format: "12:00"
  earlyCheckInSurcharge: number; // percentage
  lateCheckOutSurcharge: number; // percentage
  earlyCheckInStart: string; // format: "10:00"
  lateCheckOutEnd: string; // format: "18:00"
  autoApplySurcharges: boolean;
  enableAiSuggestions: boolean;
  taxRate: number; // percentage
  roomTypes: RoomType[];
}

// Room Type interface
export interface RoomType {
  id: string;
  name: string;
  defaultPrice: number;
  capacity: number;
  description?: string;
  amenities?: string[];
}
