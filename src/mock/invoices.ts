import { Invoice } from '@/types';

// Mock data for invoices
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    bookingId: '4',
    customerId: '4',
    total: 500000,
    paid: 500000,
    status: 'paid',
    createdAt: new Date('2023-08-05T12:00:00'),
    items: [
      {
        id: '1',
        invoiceId: '1',
        description: 'Phòng 104 (Standard) - 1 đêm',
        quantity: 1,
        unitPrice: 500000,
        total: 500000,
      },
    ],
  },
  {
    id: '2',
    bookingId: '2',
    customerId: '2',
    total: 1050000,
    paid: 1000000,
    status: 'partially-paid',
    createdAt: new Date('2023-08-05T15:00:00'),
    dueDate: new Date('2023-08-07T12:00:00'),
    items: [
      {
        id: '2',
        invoiceId: '2',
        description: 'Phòng 103 (Standard) - 2 đêm',
        quantity: 2,
        unitPrice: 500000,
        total: 1000000,
      },
      {
        id: '3',
        invoiceId: '2',
        description: 'Nước uống',
        quantity: 1,
        unitPrice: 50000,
        total: 50000,
      },
    ],
  },
];
