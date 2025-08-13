import React from 'react';

interface BadgeProps {
  text: string;
  colorStyle: string;
  className?: string;
}

/**
 * Base Badge component for displaying status badges
 */
export default function Badge({ text, colorStyle, className = '' }: BadgeProps) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${colorStyle} ${className}`}
    >
      {text}
    </span>
  );
}
