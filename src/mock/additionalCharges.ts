import { AdditionalCharge, AdditionalChargeType, PaymentStatus } from "../types";

export const additionalCharges: AdditionalCharge[] = [
  {
    id: '1',
    bookingId: '1',
    type: AdditionalChargeType.EARLY_CHECK_IN,
    description: 'Early check-in fee (3 hours)',
    amount: 150000,
    date: new Date('2025-08-01T11:30:00'),
    paymentStatus: PaymentStatus.PAID,
    staffId: '1',
    createdAt: new Date('2025-08-01T11:30:00'),
    updatedAt: new Date('2025-08-01T11:30:00')
  },
  {
    id: '2',
    bookingId: '2',
    type: AdditionalChargeType.LATE_CHECK_OUT,
    description: 'Late check-out fee (2 hours)',
    amount: 100000,
    date: new Date('2025-08-03T13:00:00'),
    paymentStatus: PaymentStatus.PAID,
    staffId: '2',
    createdAt: new Date('2025-08-03T13:00:00'),
    updatedAt: new Date('2025-08-03T13:00:00')
  },
  {
    id: '3',
    bookingId: '3',
    type: AdditionalChargeType.MINI_BAR,
    description: 'Mini bar consumption',
    amount: 250000,
    date: new Date('2025-08-05T19:45:00'),
    paymentStatus: PaymentStatus.UNPAID,
    staffId: '1',
    createdAt: new Date('2025-08-05T19:45:00'),
    updatedAt: new Date('2025-08-05T19:45:00')
  },
  {
    id: '4',
    bookingId: '5',
    type: AdditionalChargeType.ROOM_SERVICE,
    description: 'Room service - Dinner',
    amount: 350000,
    date: new Date('2025-08-07T20:15:00'),
    paymentStatus: PaymentStatus.UNPAID,
    staffId: '3',
    createdAt: new Date('2025-08-07T20:15:00'),
    updatedAt: new Date('2025-08-07T20:15:00')
  },
  {
    id: '5',
    bookingId: '6',
    type: AdditionalChargeType.DAMAGE,
    description: 'Broken lamp in living room',
    amount: 500000,
    date: new Date('2025-08-08T16:30:00'),
    paymentStatus: PaymentStatus.UNPAID,
    staffId: '2',
    createdAt: new Date('2025-08-08T16:30:00'),
    updatedAt: new Date('2025-08-08T16:30:00')
  },
  {
    id: '6',
    bookingId: '7',
    type: AdditionalChargeType.EXTRA_BED,
    description: 'Extra bed for child',
    amount: 200000,
    date: new Date('2025-08-09T14:20:00'),
    paymentStatus: PaymentStatus.PAID,
    staffId: '1',
    createdAt: new Date('2025-08-09T14:20:00'),
    updatedAt: new Date('2025-08-09T14:20:00')
  },
  {
    id: '7',
    bookingId: '9',
    type: AdditionalChargeType.LAUNDRY,
    description: 'Laundry service',
    amount: 180000,
    date: new Date('2025-08-12T10:00:00'),
    paymentStatus: PaymentStatus.UNPAID,
    staffId: '3',
    createdAt: new Date('2025-08-12T10:00:00'),
    updatedAt: new Date('2025-08-12T10:00:00')
  },
  {
    id: '8',
    bookingId: '10',
    type: AdditionalChargeType.EXTRA_SERVICE,
    description: 'Birthday cake arrangement',
    amount: 400000,
    date: new Date('2025-08-14T18:00:00'),
    paymentStatus: PaymentStatus.PAID,
    staffId: '2',
    createdAt: new Date('2025-08-14T18:00:00'),
    updatedAt: new Date('2025-08-14T18:00:00')
  }
];
