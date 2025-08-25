import { BookingStatus } from '@/types';
import { rooms } from '@/mock/rooms';
import { bookings } from '@/mock/bookings';

/**
 * Helper service to connect rooms with their current bookings
 * This provides a way to display room and booking information together
 * while keeping the data models separate
 */
export class RoomBookingService {
  /**
   * Get all rooms with their current booking information
   */
  static getRoomsWithBookings() {
    // Today's date for comparison
    const today = new Date();

    return rooms.map(room => {
      // Find active bookings for this room
      const activeBooking = bookings.find(booking => 
        booking.roomId === room.id && 
        (booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.CHECKED_IN) &&
        new Date(booking.checkOutDate) >= today
      );

      return {
        ...room,
        currentBooking: activeBooking ? {
          id: activeBooking.id,
          status: activeBooking.status,
          paymentStatus: activeBooking.paymentStatus,
          checkInDate: activeBooking.checkInDate,
          checkOutDate: activeBooking.checkOutDate,
          actualCheckIn: activeBooking.actualCheckIn,
          customerId: activeBooking.customerId,
          source: activeBooking.source,
          depositAmount: activeBooking.depositAmount
        } : null
      };
    });
  }

  /**
   * Get all active bookings (checked-in or confirmed)
   */
  static getActiveBookings() {
    const today = new Date();
    return bookings.filter(booking => 
      (booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.CHECKED_IN) &&
      new Date(booking.checkOutDate) >= today
    );
  }
}
