import { HotelSettings } from '@/types';

// Mock settings
export const mockSettings: HotelSettings = {
  name: 'Khách sạn Mẫu',
  address: '123 Đường ABC, Quận XYZ, Hà Nội',
  phone: '024 1234 5678',
  email: 'info@khachsanmau.com',
  logo: '/logo.png',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  earlyCheckInSurcharge: 30, // 30%
  lateCheckOutSurcharge: 30, // 30%
  earlyCheckInStart: '10:00',
  lateCheckOutEnd: '18:00',
  autoApplySurcharges: true,
  enableAiSuggestions: false,
  taxRate: 10, // 10%
  roomTypes: [
    {
      id: '1',
      name: 'Standard',
      defaultPrice: 500000,
      capacity: 2,
      amenities: ['Máy lạnh', 'TV', 'Wifi', 'Tủ lạnh mini'],
    },
    {
      id: '2',
      name: 'Deluxe',
      defaultPrice: 700000,
      capacity: 2,
      amenities: ['Máy lạnh', 'TV', 'Wifi', 'Tủ lạnh mini', 'Ban công'],
    },
    {
      id: '3',
      name: 'Suite',
      defaultPrice: 1000000,
      capacity: 4,
      amenities: ['Máy lạnh', 'TV', 'Wifi', 'Tủ lạnh', 'Phòng khách riêng', 'Bồn tắm'],
    },
    {
      id: '4',
      name: 'Family',
      defaultPrice: 1200000,
      capacity: 5,
      amenities: ['Máy lạnh', 'TV', 'Wifi', 'Tủ lạnh', '2 phòng ngủ', 'Bồn tắm'],
    },
  ],
};
