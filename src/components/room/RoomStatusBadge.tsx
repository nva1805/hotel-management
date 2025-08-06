import { RoomStatus } from '@/types';

interface StatusBadgeProps {
  status: RoomStatus;
}

export default function RoomStatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case RoomStatus.VACANT:
        return 'bg-green-100 text-green-800';
      case RoomStatus.BOOKED:
        return 'bg-blue-100 text-blue-800';
      case RoomStatus.OCCUPIED:
        return 'bg-purple-100 text-purple-800';
      case RoomStatus.MAINTENANCE:
        return 'bg-red-100 text-red-800';
      case RoomStatus.CLEANING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case RoomStatus.VACANT:
        return 'Trống';
      case RoomStatus.BOOKED:
        return 'Đã đặt';
      case RoomStatus.OCCUPIED:
        return 'Đang ở';
      case RoomStatus.MAINTENANCE:
        return 'Bảo trì';
      case RoomStatus.CLEANING:
        return 'Đang dọn';
      default:
        return 'Không xác định';
    }
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusStyles()}`}
    >
      {getStatusText()}
    </span>
  );
}
