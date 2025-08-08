'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { useHotelStore } from '@/store';
import { Room, RoomStatus } from '@/types';
import RoomStatusBadge from '@/components/room/RoomStatusBadge';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import RoomCard from '@/components/common/RoomCard';
import FormInput from '@/components/common/FormInput';

export default function Dashboard() {
  const { 
    rooms, fetchRooms, updateRoomStatus, addRoomNote
  } = useHotelStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

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
                      <RoomCard 
                        key={room.id} 
                        room={room} 
                        onClick={handleRoomClick} 
                      />
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
                <FormInput
                  value={newNote}
                  onChange={setNewNote}
                  onSubmit={handleAddNote}
                  placeholder="Thêm ghi chú..."
                  buttonLabel="Thêm"
                />
              </div>
            </div>

          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
