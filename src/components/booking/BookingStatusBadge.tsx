import { BookingStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

/**
 * BookingStatusBadge component for displaying booking status
 * This is a wrapper around the unified StatusBadge component
 */
export default function BookingStatusBadge({ status, className = '' }: BookingStatusBadgeProps) {
  return (
    <StatusBadge
      statusKey={status}
      statusType="booking"
      className={className}
    />
  );
}
