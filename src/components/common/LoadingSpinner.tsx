import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * Reusable loading spinner component
 */
export default function LoadingSpinner({ message = 'Đang tải...' }: LoadingSpinnerProps) {
  return (
    <div className="text-center py-10">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
}
