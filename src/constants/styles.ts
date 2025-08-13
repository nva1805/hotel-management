import { PaymentStatus, RoomStatus } from "@/types";

/**
 * Room status style mapping
 */
export const ROOM_STATUS_STYLES: Record<RoomStatus, string> = {
  [RoomStatus.VACANT]: 'bg-green-100 text-green-800',
  [RoomStatus.BOOKED]: 'bg-blue-100 text-blue-800',
  [RoomStatus.OCCUPIED]: 'bg-purple-100 text-purple-800',
  [RoomStatus.MAINTENANCE]: 'bg-red-100 text-red-800',
  [RoomStatus.CLEANING]: 'bg-yellow-100 text-yellow-800',
};

/**
 * Room status text mapping
 */
export const ROOM_STATUS_TEXT: Record<RoomStatus, string> = {
  [RoomStatus.VACANT]: 'Trống',
  [RoomStatus.BOOKED]: 'Đã đặt',
  [RoomStatus.OCCUPIED]: 'Đang ở',
  [RoomStatus.MAINTENANCE]: 'Bảo trì',
  [RoomStatus.CLEANING]: 'Đang dọn',
};

/**
 * Payment status style mapping
 */
export const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  [PaymentStatus.PAID]: 'bg-green-100 text-green-800 border-green-200',
  [PaymentStatus.UNPAID]: 'bg-red-100 text-red-800 border-red-200',
  [PaymentStatus.DEPOSIT]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};
