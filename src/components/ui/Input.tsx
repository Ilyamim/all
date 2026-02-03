import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <label className="flex w-full flex-col gap-2 text-sm font-medium">
      {label && <span className="text-muted">{label}</span>}
      <input
        ref={ref}
        className={cn(
          'rounded-xl border border-border bg-card px-4 py-2 text-sm text-ink shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/40',
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-warning">{error}</span>}
    </label>
  ),
);

Input.displayName = 'Input';
