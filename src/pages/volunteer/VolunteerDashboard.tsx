import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';

const VolunteerDashboard: React.FC = () => {
  const { profile } = useAuth();

  const metrics = [
    { label: 'Total hours', value: profile?.totalHours ?? 0 },
    { label: 'XP earned', value: profile?.xp ?? 0 },
    { label: 'Badges', value: profile?.badges.length ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Volunteer overview</h1>
        <p className="text-sm text-muted">Track your journey and upcoming commitments.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-sm text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Upcoming events</h2>
            <p className="text-sm text-muted">Stay ready for your next opportunity.</p>
          </div>
          <Badge>2 scheduled</Badge>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {['Neighborhood clean-up', 'Food pantry support'].map((event) => (
            <div key={event} className="rounded-xl border border-border bg-secondary/40 px-4 py-3">
              <p className="text-sm font-semibold">{event}</p>
              <p className="text-xs text-muted">Next week • 3 hours</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VolunteerDashboard;
