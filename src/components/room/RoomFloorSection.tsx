import React from 'react';
import RoomCard from '@/components/common/RoomCard';
import { Room } from '@/types';

interface RoomFloorSectionProps {
  floor: string;
  rooms: (Room & { currentBooking?: any })[];
  onRoomClick: (room: Room & { currentBooking?: any }) => void;
}

/**
 * Displays all rooms for a specific floor
 */
export default function RoomFloorSection({ floor, rooms, onRoomClick }: RoomFloorSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Tầng {floor}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onClick={onRoomClick}
            currentBooking={room.currentBooking}
          />
        ))}
      </div>
    </div>
  );
}
