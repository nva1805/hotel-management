import { RoomStatus } from '@/types';
import Badge from '@/components/common/Badge';
import { ROOM_STATUS_STYLES, ROOM_STATUS_TEXT } from '@/constants/styles';

interface StatusBadgeProps {
  status: RoomStatus;
  className?: string;
}

export default function RoomStatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusStyle = ROOM_STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';
  const statusText = ROOM_STATUS_TEXT[status] || 'Không xác định';

  return (
    <Badge
      text={statusText}
      colorStyle={statusStyle}
      className={className}
    />
  );
}
