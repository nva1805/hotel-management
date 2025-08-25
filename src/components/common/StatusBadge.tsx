import React from 'react';
import Badge from '@/components/common/Badge';
import { STATUS_STYLES, STATUS_TEXT } from '@/constants/styles';
import { PaymentStatus } from '@/types';

/**
 * Usage examples:
 * 
 * 1. Room status badge:
 * <StatusBadge statusKey={RoomStatus.VACANT} statusType="room" />
 * 
 * 2. Payment status badge:
 * <StatusBadge statusKey={PaymentStatus.DEPOSIT} statusType="payment" depositAmount={500000} />
 * 
 * 3. Booking status badge:
 * <StatusBadge statusKey={BookingStatus.CHECKED_IN} statusType="booking" />
 * 
 * 4. Adding custom status types:
 * - First add mappings in STATUS_STYLES and STATUS_TEXT in constants/styles.ts
 * - Then use: <StatusBadge statusKey={YourEnum.VALUE} statusType="your-type" />
 */

interface StatusBadgeProps {
  statusKey: string;
  statusType: string;
  className?: string;
  depositAmount?: number; // Only used for payment status with deposit
  showBorder?: boolean; // Optional prop to show border (payment status has borders by default)
}

/**
 * Unified StatusBadge component for displaying any type of status
 * 
 * @param statusKey - The enum value of the status (e.g. RoomStatus.VACANT)
 * @param statusType - The type of status ('room', 'payment', 'booking', etc)
 * @param className - Additional CSS classes
 * @param depositAmount - Amount of deposit (only used when statusKey is PaymentStatus.DEPOSIT)
 * @param showBorder - Whether to show a border around the badge
 */
export default function StatusBadge({ 
  statusKey, 
  statusType, 
  className = '',
  depositAmount,
  showBorder = false
}: StatusBadgeProps) {
  // Get style and text from the mapping
  const statusStyles = STATUS_STYLES[statusType] || {};
  const statusTexts = STATUS_TEXT[statusType] || {};
  
  // Set default style and text if not found in mapping
  const style = statusStyles[statusKey] || 'bg-gray-100 text-gray-800';
  let text = statusTexts[statusKey] || 'Không xác định';
  
  // Special case for deposit status
  if (statusType === 'payment' && statusKey === PaymentStatus.DEPOSIT && depositAmount) {
    text = `${text} ${(depositAmount / 1000).toFixed(0)}k`;
  }

  // Add border to style if requested or if it's a payment status
  const finalStyle = showBorder || statusType === 'payment' 
    ? `${style} border` 
    : style;

  return (
    <Badge
      text={text}
      colorStyle={finalStyle}
      className={className}
    />
  );
}
