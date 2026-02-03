import React from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';

const AdminDashboard: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold font-display">Admin command center</h1>
      <p className="text-sm text-muted">Oversee users, events, and platform health.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { label: 'Total users', value: 312 },
        { label: 'Active events', value: 18 },
        { label: 'Hours verified', value: 1420 },
      ].map((metric) => (
        <Card key={metric.label}>
          <p className="text-sm text-muted">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
        </Card>
      ))}
    </div>
    <Card>
      <h2 className="text-lg font-semibold">Users</h2>
      <Table headers={['Name', 'Role', 'Hours']}>
        {['Taylor', 'Jordan'].map((name) => (
          <tr key={name} className="text-sm">
            <td className="px-4 py-3 font-semibold">{name}</td>
            <td className="px-4 py-3 text-muted">Volunteer</td>
            <td className="px-4 py-3">24</td>
          </tr>
        ))}
      </Table>
    </Card>
    <Card>
      <h2 className="text-lg font-semibold">Events</h2>
      <Table headers={['Event', 'Organizer', 'Status']}>
        {['Neighborhood Revival', 'Food Drive'].map((name) => (
          <tr key={name} className="text-sm">
            <td className="px-4 py-3 font-semibold">{name}</td>
            <td className="px-4 py-3 text-muted">BrightPath Org</td>
            <td className="px-4 py-3">Live</td>
          </tr>
        ))}
      </Table>
    </Card>
  </div>
);

export default AdminDashboard;
