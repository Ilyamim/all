import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';

interface NavItem {
  label: string;
  to: string;
}

const navConfig: Record<string, NavItem[]> = {
  volunteer: [
    { label: 'Overview', to: '/dashboard/volunteer' },
    { label: 'Events', to: '/events' },
    { label: 'Certificates', to: '/certificates' },
  ],
  organizer: [
    { label: 'Overview', to: '/dashboard/organizer' },
    { label: 'Events', to: '/organizer/events' },
    { label: 'New Event', to: '/organizer/events/new' },
  ],
  admin: [
    { label: 'Admin Dashboard', to: '/admin' },
  ],
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const location = useLocation();
  const role = profile?.role ?? 'volunteer';
  const navItems = navConfig[role] ?? [];

  return (
    <div className="min-h-screen bg-bg">
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <Link to="/" className="text-xl font-semibold font-display">
          BrightPath Volunteer
        </Link>
        <div className="text-sm text-muted">{profile?.name ?? 'Member'}</div>
      </header>
      <div className="flex">
        <aside className="hidden w-64 border-r border-border bg-card p-6 md:block">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'block rounded-xl px-4 py-2 text-sm font-medium transition',
                    active ? 'bg-secondary text-ink' : 'text-muted hover:bg-secondary/60',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};
