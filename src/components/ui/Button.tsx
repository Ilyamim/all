import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  ...props
}) => {
  const styles = {
    primary: 'bg-primary text-bg hover:bg-[#45593e] shadow-glow',
    secondary: 'bg-secondary text-ink hover:bg-[#c8b390]',
    ghost: 'bg-transparent text-ink hover:bg-secondary',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition',
        styles[variant],
        className,
      )}
      {...props}
    />
  );
};
