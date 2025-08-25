import { BookingStatus, PaymentStatus, RoomStatus } from "@/types";

/**
 * Unified status style mapping
 * Usage: STATUS_STYLES[statusType][statusKey]
 */
export const STATUS_STYLES: Record<string, Record<string, string>> = {
  'room': {
    [RoomStatus.VACANT]: 'bg-green-100 text-green-800',
    [RoomStatus.MAINTENANCE]: 'bg-red-100 text-red-800',
    [RoomStatus.CLEANING]: 'bg-yellow-100 text-yellow-800',
  },
  'booking': {
    [BookingStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
    [BookingStatus.CHECKED_IN]: 'bg-purple-100 text-purple-800',
    [BookingStatus.CHECKED_OUT]: 'bg-green-100 text-green-800',
    [BookingStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
  },
  'payment': {
    [PaymentStatus.PAID]: 'bg-green-100 text-green-800 border-green-200',
    [PaymentStatus.UNPAID]: 'bg-red-100 text-red-800 border-red-200',
    [PaymentStatus.DEPOSIT]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  }
};

/**
 * Unified status text mapping
 * Usage: STATUS_TEXT[statusType][statusKey]
 */
export const STATUS_TEXT: Record<string, Record<string, string>> = {
  'room': {
    [RoomStatus.VACANT]: 'Trống',
    [RoomStatus.MAINTENANCE]: 'Bảo trì',
    [RoomStatus.CLEANING]: 'Đang dọn',
  },
  'booking': {
    [BookingStatus.CONFIRMED]: 'Đã đặt',
    [BookingStatus.CHECKED_IN]: 'Đang ở',
    [BookingStatus.CHECKED_OUT]: 'Đã trả phòng',
    [BookingStatus.CANCELLED]: 'Đã hủy',
  },
  'payment': {
    [PaymentStatus.PAID]: 'Đã thanh toán',
    [PaymentStatus.UNPAID]: 'Chưa thanh toán',
    [PaymentStatus.DEPOSIT]: 'Đã cọc', // Note: deposit amount is added in component
  }
};

// For backward compatibility
export const ROOM_STATUS_STYLES = STATUS_STYLES['room'];
export const ROOM_STATUS_TEXT = STATUS_TEXT['room'];
export const BOOKING_STATUS_STYLES = STATUS_STYLES['booking'];
export const BOOKING_STATUS_TEXT = STATUS_TEXT['booking'];
export const PAYMENT_STATUS_STYLES = STATUS_STYLES['payment'];
