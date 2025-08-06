'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHotelStore } from '@/store';
import Button from '@/components/common/Button';
import { Booking } from '@/types';

export default function CheckIn() {
  const { bookings, fetchBookings, checkIn } = useHotelStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchBookings();
      setIsLoading(false);
    };
    loadData();
  }, [fetchBookings]);

  // Filter bookings that are confirmed and ready for check-in
  const checkInBookings = bookings.filter(
    (booking) => 
      booking.status === 'confirmed' && 
      new Date(booking.checkInDate).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
  );

  const handleCheckIn = async (bookingId: string) => {
    await checkIn(bookingId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Check-in</h1>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <>
            {/* Bookings ready for check-in */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Đặt phòng chờ check-in hôm nay</h2>
              
              {checkInBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phòng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Khách hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-in
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Check-out
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Giá
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {checkInBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            Phòng {booking.roomId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.customerId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(booking.checkInDate).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.price.toLocaleString('vi-VN')} VND
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleCheckIn(booking.id)}
                            >
                              Check-in
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Không có đặt phòng nào chờ check-in hôm nay
                </p>
              )}
            </div>
            
            {/* Manual Check-in */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium mb-4">Check-in thủ công (Khách vãng lai)</h2>
              <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
                <p className="mb-4 text-gray-500">
                  Dành cho khách không có đặt phòng trước
                </p>
                <Button variant="primary">Tạo check-in mới</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
