'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHotelStore } from '@/store';
import Button from '@/components/common/Button';
import { Booking } from '@/types';

export default function CheckOut() {
  const { bookings, fetchBookings, checkOut } = useHotelStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchBookings();
      setIsLoading(false);
    };
    loadData();
  }, [fetchBookings]);

  // Filter bookings that are checked-in
  const checkedInBookings = bookings.filter((booking) => booking.status === 'checked-in');

  const handleCheckOut = async (bookingId: string) => {
    await checkOut(bookingId);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Check-out</h1>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4">Khách đang lưu trú</h2>
            
            {checkedInBookings.length > 0 ? (
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
                        Check-out dự kiến
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
                    {checkedInBookings.map((booking) => {
                      const isLateCheckOut = new Date() > new Date(booking.checkOutDate);
                      
                      return (
                        <tr key={booking.id} className={isLateCheckOut ? "bg-amber-50" : ""}>
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
                            {isLateCheckOut && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                Trễ
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.price.toLocaleString('vi-VN')} VND
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleCheckOut(booking.id)}
                            >
                              Check-out
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Không có khách nào đang lưu trú
              </p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
