// Room status types - Chỉ giữ lại trạng thái vật lý của phòng
export enum RoomStatus {
  VACANT = 'vacant',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
}

// Booking type enum
export enum BookingType {
  NIGHTLY = 'nightly',
  HOURLY = 'hourly',
}

// Booking status enum
export enum BookingStatus {
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked-in',
  CHECKED_OUT = 'checked-out',
  CANCELLED = 'cancelled',
}

// Booking source enum
export enum BookingSource {
  WALK_IN = 'walk-in',
  AGODA = 'agoda',
  BOOKING_COM = 'booking.com',
  TRAVELOKA = 'traveloka',
  AIRBNB = 'airbnb',
  OTHER = 'other',
}

// Payment status types
export enum PaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  DEPOSIT = 'deposit',
}

// Room interface - Chỉ chứa thông tin tĩnh của phòng
export interface Room {
  id: string;
  name: string;
  type: string;
  status: RoomStatus;
  defaultPrice: number;
  capacity: number;
  notes?: string[];
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
  notes?: string[];
  visits: number;
  createdAt: Date;
  updatedAt: Date;
}

// Booking interface - Chứa thông tin đã chốt tại thời điểm đặt phòng
export interface Booking {
  id: string;
  roomId: string;
  customerId: string;
  checkInDate: Date;
  checkOutDate: Date;
  actualCheckIn?: Date;
  actualCheckOut?: Date;
  status: BookingStatus;
  source: BookingSource;
  bookingType: BookingType;
  price: number;
  notes?: string[];
  createdAt: Date;
  updatedAt: Date;
  paymentStatus: PaymentStatus;
  depositAmount?: number;
  additionalCharges?: AdditionalCharge[];
}

// Additional charge types
export enum AdditionalChargeType {
  EARLY_CHECK_IN = 'early-check-in',
  LATE_CHECK_OUT = 'late-check-out',
  ROOM_SERVICE = 'room-service',
  MINI_BAR = 'mini-bar',
  DAMAGE = 'damage',
  LAUNDRY = 'laundry',
  EXTRA_BED = 'extra-bed',
  EXTRA_SERVICE = 'extra-service',
  OTHER = 'other'
}

// Additional charge interface - Chứa thông tin phụ thu hoặc dịch vụ phát sinh
export interface AdditionalCharge {
  id: string;
  bookingId: string;
  type: AdditionalChargeType;
  description: string;
  amount: number;
  date: Date;
  staffId: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
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
