import { Room, RoomStatus } from '@/types';
import RoomStatusBadge from '@/components/room/RoomStatusBadge';

interface RoomCardProps {
  room: Room;
  onClick?: (room: Room) => void;
  className?: string;
}

/**
 * Reusable RoomCard component to display room information
 * Can be used in dashboard and other places
 */
export default function RoomCard({ room, onClick, className = '' }: RoomCardProps) {
  // Get background color based on room status
  const getStatusBackground = () => {
    switch (room.status) {
      case RoomStatus.VACANT:
        return 'bg-green-50 border border-green-200';
      case RoomStatus.BOOKED:
        return 'bg-blue-50 border border-blue-200';
      case RoomStatus.OCCUPIED:
        return 'bg-purple-50 border border-purple-200';
      case RoomStatus.MAINTENANCE:
        return 'bg-red-50 border border-red-200';
      case RoomStatus.CLEANING:
        return 'bg-yellow-50 border border-yellow-200';
      default:
        return 'bg-gray-50 border border-gray-200';
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(room);
    }
  };

  return (
    <div 
      className={`
        p-4 rounded-lg cursor-pointer transition-all duration-200
        ${getStatusBackground()}
        hover:shadow-md
        ${className}
      `}
      onClick={handleClick}
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
  );
}
