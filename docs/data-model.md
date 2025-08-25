# Hotel Management System - Data Model Documentation

## Overview

This document describes the data model design for the Hotel Management System, including the interfaces, enums, and their relationships.

## Core Interfaces

### Room

The `Room` interface contains only static information about physical rooms:

```typescript
interface Room {
  id: string;
  name: string;
  type: string;
  status: RoomStatus; // Physical status (vacant, maintenance, cleaning)
  defaultPrice: number;
  capacity: number;
  notes?: string[];
  floor?: number;
}
```

### Booking

The `Booking` interface contains information fixed at the time of booking and additional details added during the stay:

```typescript
interface Booking {
  id: string;
  roomId: string;
  customerId: string;
  checkInDate: Date;      // Scheduled check-in
  checkOutDate: Date;     // Scheduled check-out
  actualCheckIn?: Date;   // Actual check-in time
  actualCheckOut?: Date;  // Actual check-out time
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
```

### AdditionalCharge

The `AdditionalCharge` interface represents any extra charges applied to a booking:

```typescript
interface AdditionalCharge {
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
```

## Enums

### RoomStatus

Physical status of a room:

```typescript
enum RoomStatus {
  VACANT = 'vacant',
  MAINTENANCE = 'maintenance',
  CLEANING = 'cleaning',
}
```

### BookingStatus

Status of a booking:

```typescript
enum BookingStatus {
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked-in',
  CHECKED_OUT = 'checked-out',
  CANCELLED = 'cancelled',
}
```

### BookingSource

Source of a booking:

```typescript
enum BookingSource {
  WALK_IN = 'walk-in',
  AGODA = 'agoda',
  BOOKING_COM = 'booking.com',
  TRAVELOKA = 'traveloka',
  AIRBNB = 'airbnb',
  OTHER = 'other',
}
```

### BookingType

Type of booking:

```typescript
enum BookingType {
  NIGHTLY = 'nightly',
  HOURLY = 'hourly',
}
```

### PaymentStatus

Status of payment:

```typescript
enum PaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  DEPOSIT = 'deposit',
}
```

### AdditionalChargeType

Type of additional charge:

```typescript
enum AdditionalChargeType {
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
```

## Relationships

1. A `Room` can have many `Booking`s over time (one-to-many)
2. A `Booking` belongs to one `Room` (many-to-one)
3. A `Booking` can have multiple `AdditionalCharge`s (one-to-many)
4. An `AdditionalCharge` belongs to one `Booking` (many-to-one)

## Data Flow

1. A `Room` exists in the system with its static properties
2. When a reservation is made, a new `Booking` is created linking to a specific `Room`
3. During the stay, `AdditionalCharge`s can be added to a `Booking` as needed
4. When a guest checks out, the `Booking.status` is updated to `CHECKED_OUT`

## Mock Data

Mock data is provided for development and testing:
- `rooms.ts`: Contains sample room data
- `bookings.ts`: Contains sample booking data
- `additionalCharges.ts`: Contains sample additional charge data

All mock data follows the interfaces defined in `types/index.ts`.
