import { PaymentStatus } from '@/types';
import Badge from '@/components/common/Badge';
import { PAYMENT_STATUS_STYLES } from '@/constants/styles';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
  depositAmount?: number;
}

/**
 * Component to display the payment status badge
 */
export default function PaymentStatusBadge({ 
  status, 
  className = '',
  depositAmount = 500000 
}: PaymentStatusBadgeProps) {
  const colorStyle = PAYMENT_STATUS_STYLES[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  
  const getStatusText = () => {
    switch (status) {
      case PaymentStatus.PAID:
        return 'Đã thanh toán';
      case PaymentStatus.UNPAID:
        return 'Chưa thanh toán';
      case PaymentStatus.DEPOSIT:
        return `Đã cọc ${(depositAmount / 1000).toFixed(0)}k`;
      default:
        return 'Không xác định';
    }
  };

  return (
    <Badge
      text={getStatusText()}
      colorStyle={colorStyle + ' border'}
      className={className}
    />
  );
}
