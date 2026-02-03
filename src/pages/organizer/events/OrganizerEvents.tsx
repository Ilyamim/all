import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Table } from '../../../components/ui/Table';

const OrganizerEvents: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold font-display">Your events</h1>
        <p className="text-sm text-muted">Manage schedules and check-in flows.</p>
      </div>
      <Link to="/organizer/events/new">
        <Button>Create event</Button>
      </Link>
    </div>
    <Card>
      <Table headers={['Event', 'Date', 'Capacity', 'Status']}>
        {[1, 2].map((item) => (
          <tr key={item} className="text-sm">
            <td className="px-4 py-3">
              <Link className="font-semibold" to={`/organizer/events/event-${item}`}>
                Community Drive {item}
              </Link>
            </td>
            <td className="px-4 py-3">Sep {10 + item}, 2024</td>
            <td className="px-4 py-3">30</td>
            <td className="px-4 py-3 text-muted">Scheduled</td>
          </tr>
        ))}
      </Table>
    </Card>
  </div>
);

export default OrganizerEvents;
