import React from 'react';
import { cn } from '../../utils/cn';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('animate-pulse rounded-xl bg-secondary/70', className)} />
);
