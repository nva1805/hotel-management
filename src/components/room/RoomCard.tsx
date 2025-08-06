import { Room } from '@/types';
import RoomStatusBadge from './RoomStatusBadge';

interface RoomCardProps {
  room: Room;
  onClick?: () => void;
}

export default function RoomCard({ room, onClick }: RoomCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Phòng {room.name}</h3>
        <RoomStatusBadge status={room.status} />
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <p>{room.type} - {room.capacity} người</p>
        <p>{room.defaultPrice.toLocaleString('vi-VN')} VND/đêm</p>
      </div>
      {room.notes && room.notes.length > 0 && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <p className="font-medium">Ghi chú:</p>
          <ul className="list-disc pl-4">
            {room.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
