import { ReactNode } from 'react';
import Button from './Button';

interface FormInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder: string;
  label?: string;
  buttonLabel?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  icon?: ReactNode;
}

/**
 * Reusable form input component with optional button
 * Can be used for notes, service requests, and other forms
 */
export default function FormInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  label,
  buttonLabel = 'Thêm',
  disabled = false,
  rows = 1,
  className = '',
  icon,
}: FormInputProps) {
  const handleSubmit = () => {
    if (onSubmit && value.trim()) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && rows === 1) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          {rows > 1 ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={rows}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${
                icon ? 'pl-10' : ''
              }`}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${
                icon ? 'pl-10' : ''
              }`}
            />
          )}
        </div>
        {onSubmit && (
          <Button onClick={handleSubmit} disabled={disabled || !value.trim()}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
