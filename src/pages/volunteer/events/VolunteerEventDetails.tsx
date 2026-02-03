import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Toast } from '../../../components/ui/Toast';

const VolunteerEventDetails: React.FC = () => {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Event details</h1>
        <p className="text-sm text-muted">Review the mission and confirm your spot.</p>
      </div>
      <Card>
        <h2 className="text-xl font-semibold">Community event {id}</h2>
        <p className="mt-2 text-sm text-muted">
          This event focuses on local impact with hands-on volunteer opportunities.
        </p>
        <div className="mt-4 grid gap-2 text-sm text-muted">
          <span>Location: Central Hub</span>
          <span>Time: Saturday 10:00 AM - 1:00 PM</span>
          <span>Capacity: 24 volunteers</span>
        </div>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setJoined(true)}>{joined ? 'Joined' : 'Join event'}</Button>
          <Button variant="secondary">Add to calendar</Button>
        </div>
        {joined && <div className="mt-4"><Toast message="You are confirmed. Check-in QR will be available soon." variant="success" /></div>}
      </Card>
    </div>
  );
};

export default VolunteerEventDetails;
