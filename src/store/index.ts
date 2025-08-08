import { create } from 'zustand';
import { 
  Room, 
  Customer, 
  Booking, 
  RoomStatus, 
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
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              serviceRequests: [
                ...(room.serviceRequests || []),
                {
                  id: Date.now().toString(),
                  roomId,
                  description,
                  createdAt: new Date(),
                  status: 'pending',
                },
              ],
            }
          : room
      ),
    }));
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
    
    // Update the room status
    get().updateRoomStatus(bookingData.roomId, RoomStatus.BOOKED);
    
    return newBooking;
  },
  checkIn: async (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'checked-in', updatedAt: new Date() }
          : booking
      ),
    }));
    
    // Get the room ID from the booking and update its status
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (booking) {
      get().updateRoomStatus(booking.roomId, RoomStatus.OCCUPIED);
    }
  },
  checkOut: async (bookingId: string) => {
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'checked-out', updatedAt: new Date() }
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
          ? { ...booking, status: 'cancelled', updatedAt: new Date() }
          : booking
      ),
    }));
    
    // Get the room ID from the booking and update its status
    const booking = get().bookings.find((b) => b.id === bookingId);
    if (booking) {
      get().updateRoomStatus(booking.roomId, RoomStatus.VACANT);
    }
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
