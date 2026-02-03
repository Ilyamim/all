import React from 'react';

export const EmptyState: React.FC<{ title: string; description: string; action?: React.ReactNode }> = (
  { title, description, action },
) => (
  <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="max-w-md text-sm text-muted">{description}</p>
    {action}
  </div>
);
