import React from 'react';
import { cn } from '../../utils/cn';

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={cn('rounded-xl border border-border bg-card p-6 shadow-soft', className)}>
    {children}
  </div>
);
