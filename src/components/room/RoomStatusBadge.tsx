import { RoomStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';

interface RoomStatusBadgeProps {
  status: RoomStatus;
  className?: string;
}

/**
 * RoomStatusBadge component for displaying room status
 * This is a wrapper around StatusBadge for backward compatibility
 */
export default function RoomStatusBadge({ status, className = '' }: RoomStatusBadgeProps) {
  return (
    <StatusBadge
      statusKey={status}
      statusType="room"
      className={className}
    />
  );
}
