import React from 'react';
import { cn } from '../../utils/cn';

export const Badge: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-ink',
      className,
    )}
  >
    {children}
  </span>
);
