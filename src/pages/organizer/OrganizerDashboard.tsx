import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const OrganizerDashboard: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold font-display">Organizer overview</h1>
      <p className="text-sm text-muted">Manage events, attendance, and volunteer impact.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { label: 'Active events', value: 4 },
        { label: 'Pending approvals', value: 18 },
        { label: 'Volunteer hours', value: 124 },
      ].map((metric) => (
        <Card key={metric.label}>
          <p className="text-sm text-muted">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
        </Card>
      ))}
    </div>
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Today’s check-ins</h2>
          <p className="text-sm text-muted">Monitor QR check-ins in real time.</p>
        </div>
        <Badge>12 live</Badge>
      </div>
    </Card>
  </div>
);

export default OrganizerDashboard;
