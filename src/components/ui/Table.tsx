import React from 'react';
import { cn } from '../../utils/cn';

export const Table: React.FC<{
  headers: string[];
  children: React.ReactNode;
  className?: string;
}> = ({ headers, children, className }) => (
  <div className={cn('overflow-hidden rounded-xl border border-border', className)}>
    <table className="w-full text-left text-sm">
      <thead className="bg-secondary text-muted">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-3 font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border bg-card">{children}</tbody>
    </table>
  </div>
);
