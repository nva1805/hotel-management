import { create } from 'zustand';
import { 
  Room, 
  Customer, 
  Booking, 
  RoomStatus,
  BookingStatus,
  Invoice, 
  Partner, 
  Expense, 
  HotelSettings
} from '@/types';
import { 
  getRooms, getCustomers, getBookings, getInvoices, getPartners, 
  getExpenses, getSettings
} from '@/services/api';

interface HotelState {
  // Room management
  rooms: Room[];
  fetchRooms: () => Promise<void>;
  updateRoomStatus: (roomId: string, status: RoomStatus) => void;
  addRoomNote: (roomId: string, note: string) => void;
  addServiceRequest: (roomId: string, description: string) => void;

  // Customer management
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
  searchCustomers: (query: string) => Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'visits' | 'createdAt' | 'updatedAt'>) => Promise<Customer>;
  
  // Booking management
  bookings: Booking[];
  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Booking>;
  checkIn: (bookingId: string) => Promise<void>;
  checkOut: (bookingId: string) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  
  // Invoice management
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
  
  // Partner management
  partners: Partner[];
  fetchPartners: () => Promise<void>;
  
  // Expense management
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  
  // Settings
  settings: HotelSettings | null;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: HotelSettings) => Promise<void>;
}

export const useHotelStore = create<HotelState>((set, get) => ({
  // Room management
  rooms: [],
  fetchRooms: async () => {
    const rooms = await getRooms();
    set({ rooms });
  },

  updateRoomStatus: (roomId: string, status: RoomStatus) => {
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId ? { ...room, status } : room
      ),
    }));
  },
  addRoomNote: (roomId: string, note: string) => {
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? { ...room, notes: [...(room.notes || []), note] }
          : room
      ),
    }));
  },
  addServiceRequest: (roomId: string, description: string) => {
    // Since serviceRequests are no longer part of the Room interface,
    // we should implement this with a separate serviceRequests state
    // For now, we'll keep the function signature but leave it as a stub
    console.log(`Adding service request to room ${roomId}: ${description}`);
    // Implementation would need a separate serviceRequests state
  },

  // Customer management
  customers: [],
  fetchCustomers: async () => {
    const customers = await getCustomers();
    set({ customers });
  },
  searchCustomers: (query: string) => {
    const { customers } = get();
    if (!query) return customers;
    
    const lowerQuery = query.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(lowerQuery) ||
        customer.lastName.toLowerCase().includes(lowerQuery) ||
        customer.phone.includes(query)
    );
  },
  addCustomer: async (customerData) => {
    // In a real application, this would call an API
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      visits: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      customers: [...state.customers, newCustomer],
    }));
    
    return newCustomer;
  },

  // Booking management
  bookings: [],
  fetchBookings: async () => {
    const bookings = await getBookings();
    set({ bookings });
  },
  addBooking: async (bookingData) => {
    // In a real application, this would call an API
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
    
    // Room status doesn't change automatically - we need to handle this separately
    
    return newBooking;
  },
  checkIn: async (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { 
              ...booking, 
              status: BookingStatus.CHECKED_IN, 
              actualCheckIn: new Date(),
              updatedAt: new Date() 
            }
          : booking
      ),
    }));
    
    // Room status doesn't change automatically since we separated room and booking concerns
  },
  checkOut: async (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { 
              ...booking, 
              status: BookingStatus.CHECKED_OUT, 
              actualCheckOut: new Date(),
              updatedAt: new Date() 
            }
          : booking
      ),
    }));
    
    // Get the room ID from the booking and update its status to cleaning
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (booking) {
      get().updateRoomStatus(booking.roomId, RoomStatus.CLEANING);
    }
  },
  cancelBooking: async (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: BookingStatus.CANCELLED, updatedAt: new Date() }
          : booking
      ),
    }));
    
    // Room status doesn't change automatically since we separated room and booking concerns
  },

  // Invoice management
  invoices: [],
  fetchInvoices: async () => {
    const invoices = await getInvoices();
    set({ invoices });
  },

  // Partner management
  partners: [],
  fetchPartners: async () => {
    const partners = await getPartners();
    set({ partners });
  },

  // Expense management
  expenses: [],
  fetchExpenses: async () => {
    const expenses = await getExpenses();
    set({ expenses });
  },

  // Settings management
  settings: null,
  fetchSettings: async () => {
    const settings = await getSettings();
    set({ settings });
  },
  updateSettings: async (settings: HotelSettings) => {
    // In a real application, this would call an API
    set({ settings });
  },
}));
