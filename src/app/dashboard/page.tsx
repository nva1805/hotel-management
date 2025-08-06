'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { useHotelStore } from '@/store';
import { Room, RoomStatus } from '@/types';
import RoomStatusBadge from '@/components/room/RoomStatusBadge';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

export default function Dashboard() {
  const { rooms, fetchRooms, updateRoomStatus, addRoomNote, addServiceRequest } = useHotelStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newServiceRequest, setNewServiceRequest] = useState('');

  useEffect(() => {
    const loadData = async () => {
      await fetchRooms();
      setIsLoading(false);
    };
    loadData();
  }, [fetchRooms]);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
  };

  const handleStatusChange = (status: RoomStatus) => {
    if (selectedRoom) {
      updateRoomStatus(selectedRoom.id, status);
      setIsRoomModalOpen(false);
    }
  };

  const handleAddNote = () => {
    if (selectedRoom && newNote.trim()) {
      addRoomNote(selectedRoom.id, newNote.trim());
      setNewNote('');
    }
  };

  const handleAddServiceRequest = () => {
    if (selectedRoom && newServiceRequest.trim()) {
      addServiceRequest(selectedRoom.id, newServiceRequest.trim());
      setNewServiceRequest('');
    }
  };

  // Group rooms by floor
  const roomsByFloor = rooms.reduce<Record<number, Room[]>>((acc, room) => {
    const floor = room.floor || 0;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(room);
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(roomsByFloor)
              .sort(([floorA], [floorB]) => Number(floorA) - Number(floorB))
              .map(([floor, floorRooms]) => (
                <div key={floor} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Tầng {floor}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {floorRooms.map((room) => (
                      <div 
                        key={room.id} 
                        className={`
                          p-4 rounded-lg cursor-pointer transition-all duration-200
                          ${room.status === RoomStatus.VACANT ? 'bg-green-50 border border-green-200' : ''}
                          ${room.status === RoomStatus.BOOKED ? 'bg-blue-50 border border-blue-200' : ''}
                          ${room.status === RoomStatus.OCCUPIED ? 'bg-purple-50 border border-purple-200' : ''}
                          ${room.status === RoomStatus.MAINTENANCE ? 'bg-red-50 border border-red-200' : ''}
                          ${room.status === RoomStatus.CLEANING ? 'bg-yellow-50 border border-yellow-200' : ''}
                          hover:shadow-md
                        `}
                        onClick={() => handleRoomClick(room)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Phòng {room.name}</h3>
                          <RoomStatusBadge status={room.status} />
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>{room.type} - {room.capacity} người</p>
                        </div>
                        {(room.notes && room.notes.length > 0) && (
                          <div className="mt-2">
                            <span className="text-xs font-medium text-gray-500">
                              {room.notes.length} ghi chú
                            </span>
                          </div>
                        )}
                        {(room.serviceRequests && room.serviceRequests.length > 0) && (
                          <div className="mt-1">
                            <span className="text-xs font-medium text-amber-600">
                              {room.serviceRequests.filter(req => req.status !== 'completed').length} yêu cầu dịch vụ
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <Modal 
          isOpen={isRoomModalOpen} 
          onClose={() => setIsRoomModalOpen(false)}
          title={`Phòng ${selectedRoom.name} - ${selectedRoom.type}`}
          size="lg"
        >
          <div className="space-y-6">
            {/* Room Info */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Trạng thái hiện tại:</p>
                  <div className="mt-1">
                    <RoomStatusBadge status={selectedRoom.status} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Giá mặc định:</p>
                  <p className="font-medium">{selectedRoom.defaultPrice.toLocaleString('vi-VN')} VND/đêm</p>
                </div>
              </div>
            </div>
            
            {/* Change Status */}
            <div>
              <h4 className="font-medium mb-2">Đổi trạng thái</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={selectedRoom.status === RoomStatus.VACANT ? 'primary' : 'outline'} 
                  onClick={() => handleStatusChange(RoomStatus.VACANT)}
                >
                  Trống
                </Button>
                <Button 
                  variant={selectedRoom.status === RoomStatus.BOOKED ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange(RoomStatus.BOOKED)}
                >
                  Đã đặt
                </Button>
                <Button 
                  variant={selectedRoom.status === RoomStatus.OCCUPIED ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange(RoomStatus.OCCUPIED)}
                >
                  Đang ở
                </Button>
                <Button 
                  variant={selectedRoom.status === RoomStatus.CLEANING ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange(RoomStatus.CLEANING)}
                >
                  Đang dọn
                </Button>
                <Button 
                  variant={selectedRoom.status === RoomStatus.MAINTENANCE ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange(RoomStatus.MAINTENANCE)}
                >
                  Bảo trì
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium mb-2">Thao tác nhanh</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="success">Đặt phòng nhanh</Button>
                <Button variant="success">Check-in nhanh</Button>
                <Button variant="secondary">Giữ phòng</Button>
                <Button variant="secondary">Mở khóa phòng</Button>
              </div>
            </div>
            
            {/* Notes */}
            <div>
              <h4 className="font-medium mb-2">Ghi chú</h4>
              <div>
                {selectedRoom.notes && selectedRoom.notes.length > 0 ? (
                  <div className="mb-3 space-y-1">
                    {selectedRoom.notes.map((note, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                        {note}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-3">Chưa có ghi chú</p>
                )}
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Thêm ghi chú..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>Thêm</Button>
                </div>
              </div>
            </div>
            
            {/* Service Requests */}
            <div>
              <h4 className="font-medium mb-2">Yêu cầu dịch vụ</h4>
              <div>
                {selectedRoom.serviceRequests && selectedRoom.serviceRequests.length > 0 ? (
                  <div className="mb-3 space-y-2">
                    {selectedRoom.serviceRequests.map((request) => (
                      <div key={request.id} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                        <span>{request.description}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.status === 'pending' ? 'Chờ xử lý' : 
                           request.status === 'in-progress' ? 'Đang xử lý' : 
                           'Hoàn thành'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-3">Chưa có yêu cầu dịch vụ</p>
                )}
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newServiceRequest}
                    onChange={(e) => setNewServiceRequest(e.target.value)}
                    placeholder="Thêm yêu cầu dịch vụ..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <Button onClick={handleAddServiceRequest} disabled={!newServiceRequest.trim()}>Thêm</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
