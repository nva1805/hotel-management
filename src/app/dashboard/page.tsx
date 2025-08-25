'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { useHotelStore } from '@/store';
import { Room, RoomStatus } from '@/types';
import { RoomBookingService } from '@/services/roomBookingService';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import RoomFloorSection from '@/components/room/RoomFloorSection';
import RoomDetailModal from '@/components/room/RoomDetailModal';

export default function Dashboard() {
  const { 
    fetchRooms, updateRoomStatus, addRoomNote
  } = useHotelStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room & { currentBooking?: any } | null>(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [roomsWithBookings, setRoomsWithBookings] = useState<(Room & { currentBooking?: any })[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await fetchRooms();
      // Get rooms with their current booking information
      setRoomsWithBookings(RoomBookingService.getRoomsWithBookings());
      setIsLoading(false);
    };
    loadData();
  }, [fetchRooms]);

  const handleRoomClick = (room: Room & { currentBooking?: any }) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
  };

  const handleStatusChange = (status: RoomStatus) => {
    if (selectedRoom) {
      updateRoomStatus(selectedRoom.id, status);
      setIsRoomModalOpen(false);
    }
  };

  const handleAddNote = (note: string) => {
    if (selectedRoom) {
      addRoomNote(selectedRoom.id, note);
    }
  };

  // Group rooms by floor
  const roomsByFloor = roomsWithBookings.reduce<Record<number, (Room & { currentBooking?: any })[]>>((acc, room) => {
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
          <LoadingSpinner message="Đang tải..." />
        ) : (
          <div className="space-y-8">
            {Object.entries(roomsByFloor)
              .sort(([floorA], [floorB]) => Number(floorA) - Number(floorB))
              .map(([floor, floorRooms]) => (
                <RoomFloorSection 
                  key={floor}
                  floor={floor}
                  rooms={floorRooms}
                  onRoomClick={handleRoomClick}
                />
              ))}
          </div>
        )}
      </div>

      <RoomDetailModal
        room={selectedRoom}
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        onStatusChange={handleStatusChange}
        onAddNote={handleAddNote}
      />
    </DashboardLayout>
  );
}
