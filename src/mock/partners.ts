import { Partner } from '@/types';

// Mock data for partners
export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Công ty taxi ABC',
    service: 'Vận chuyển',
    contactPerson: 'Nguyễn Văn X',
    phone: '0901234567',
    email: 'taxiabc@example.com',
    address: 'Hà Nội',
    notes: 'Giảm 10% cho khách của khách sạn',
  },
  {
    id: '2',
    name: 'Nhà hàng XYZ',
    service: 'Ẩm thực',
    contactPerson: 'Trần Thị Y',
    phone: '0912345678',
    email: 'nhahangxyz@example.com',
    address: 'Hà Nội',
    notes: 'Giao đồ ăn tận phòng',
  },
  {
    id: '3',
    name: 'Dịch vụ giặt ủi Sạch Sẽ',
    service: 'Giặt ủi',
    contactPerson: 'Lê Văn Z',
    phone: '0923456789',
    address: 'Hà Nội',
  },
];
