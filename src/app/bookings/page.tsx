'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useHotelStore } from '@/store';
import { Tab } from '@headlessui/react';
import Button from '@/components/common/Button';
import { BookingType, Room, RoomStatus } from '@/types';

export default function Bookings() {
  const { rooms, fetchRooms, customers, fetchCustomers, addBooking } = useHotelStore();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [bookingPrice, setBookingPrice] = useState(0);
  const [bookingType, setBookingType] = useState<BookingType>(BookingType.NIGHTLY);
  const [bookingNotes, setBookingNotes] = useState('');

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchRooms(), fetchCustomers()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchRooms, fetchCustomers]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  // Filter rooms that are vacant
  const availableRooms = rooms.filter((room) => room.status === RoomStatus.VACANT);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
    
    // Set the default price based on the selected room
    const selectedRoom = rooms.find((room) => room.id === roomId);
    if (selectedRoom) {
      setBookingPrice(selectedRoom.defaultPrice);
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedRoomId || !selectedCustomerId || !checkInDate || !checkOutDate) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    await addBooking({
      roomId: selectedRoomId,
      customerId: selectedCustomerId,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      status: 'confirmed',
      bookingType,
      price: bookingPrice,
      notes: bookingNotes,
    });

    // Reset form
    setSelectedRoomId('');
    setSelectedCustomerId('');
    setCheckInDate('');
    setCheckOutDate('');
    setBookingPrice(0);
    setBookingType(BookingType.NIGHTLY);
    setBookingNotes('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Đặt Phòng</h1>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/10 p-1 mb-6">
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm font-medium leading-5 rounded-lg
                    ${
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600'
                    }
                    `
                  }
                >
                  Đặt thủ công
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm font-medium leading-5 rounded-lg
                    ${
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600'
                    }
                    `
                  }
                >
                  Gợi ý AI
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Customer Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Chọn Khách Hàng</h3>
                      
                      <div>
                        <input
                          type="text"
                          placeholder="Tìm khách hàng theo tên hoặc số điện thoại..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số điện thoại
                              </th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chọn
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCustomers.map((customer) => (
                              <tr key={customer.id} className={selectedCustomerId === customer.id ? 'bg-blue-50' : ''}>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  {customer.firstName} {customer.lastName}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">{customer.phone}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  <Button
                                    size="sm"
                                    variant={selectedCustomerId === customer.id ? 'primary' : 'outline'}
                                    onClick={() => setSelectedCustomerId(customer.id)}
                                  >
                                    {selectedCustomerId === customer.id ? 'Đã chọn' : 'Chọn'}
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                              <tr>
                                <td colSpan={3} className="px-4 py-4 text-center text-sm text-gray-500">
                                  Không tìm thấy khách hàng
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-right">
                        <Button variant="secondary">Thêm khách hàng mới</Button>
                      </div>
                    </div>

                    {/* Right Column: Booking Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Chi Tiết Đặt Phòng</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày check-in
                          </label>
                          <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày check-out
                          </label>
                          <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loại đặt phòng
                        </label>
                        <select
                          value={bookingType}
                          onChange={(e) => setBookingType(e.target.value as BookingType)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value={BookingType.NIGHTLY}>Theo đêm</option>
                          <option value={BookingType.HOURLY}>Theo giờ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chọn phòng ({availableRooms.length} phòng trống)
                        </label>
                        <select
                          value={selectedRoomId}
                          onChange={(e) => handleRoomSelect(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                          <option value="">Chọn phòng</option>
                          {availableRooms.map((room) => (
                            <option key={room.id} value={room.id}>
                              Phòng {room.name} - {room.type} - {room.defaultPrice.toLocaleString('vi-VN')} VND
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Giá (VND)
                        </label>
                        <input
                          type="number"
                          value={bookingPrice}
                          onChange={(e) => setBookingPrice(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ghi chú
                        </label>
                        <textarea
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          rows={3}
                        ></textarea>
                      </div>

                      <div className="pt-4">
                        <Button variant="success" fullWidth onClick={handleCreateBooking}>
                          Tạo đặt phòng
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>

                <Tab.Panel className="rounded-xl bg-gray-100 p-6">
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-4">Tính năng gợi ý AI</h3>
                    <p className="text-gray-500">Tính năng này đang được phát triển và sẽ có trong phiên bản sắp tới.</p>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
