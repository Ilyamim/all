import React from 'react';
import { cn } from '../../utils/cn';

interface ToastProps {
  message: string;
  variant?: 'success' | 'warning' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, variant = 'info' }) => {
  const styles = {
    success: 'bg-success text-bg',
    warning: 'bg-warning text-bg',
    info: 'bg-secondary text-ink',
  };

  return (
    <div className={cn('rounded-xl px-4 py-2 text-sm shadow-soft', styles[variant])}>
      {message}
    </div>
  );
};
