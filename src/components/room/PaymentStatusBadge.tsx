import { PaymentStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
  depositAmount?: number;
}

/**
 * Component to display the payment status badge
 * This is a wrapper around StatusBadge for backward compatibility
 */
export default function PaymentStatusBadge({ 
  status, 
  className = '',
  depositAmount = 500000 
}: PaymentStatusBadgeProps) {
  return (
    <StatusBadge
      statusKey={status}
      statusType="payment"
      depositAmount={status === PaymentStatus.DEPOSIT ? depositAmount : undefined}
      className={className}
    />
  );
}
