import { Expense } from '@/types';

// Mock data for expenses
export const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'Sửa chữa máy điều hòa phòng 105',
    amount: 1500000,
    date: new Date('2023-08-02'),
    category: 'Bảo trì',
    notes: 'Thay board mạch chủ',
  },
  {
    id: '2',
    description: 'Mua vật tư vệ sinh',
    amount: 2000000,
    date: new Date('2023-08-01'),
    category: 'Vật tư',
  },
  {
    id: '3',
    description: 'Tiền điện tháng 7/2023',
    amount: 5000000,
    date: new Date('2023-07-30'),
    category: 'Điện nước',
  },
  {
    id: '4',
    description: 'Hoàn tiền khách hàng Hoàng Văn E',
    amount: 3500000,
    date: new Date('2023-08-02'),
    category: 'Hoàn tiền',
    notes: 'Do hủy đặt phòng vì phòng cần sửa chữa',
  },
];
