import React from 'react';
import { EventRecord } from '../types/firestore';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface EventCardProps {
  event: EventRecord;
  onClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => (
  <Card className="flex cursor-pointer flex-col gap-3" onClick={onClick}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-muted">{event.location}</p>
      </div>
      <Badge>{event.hoursValue} hrs</Badge>
    </div>
    <p className="text-sm text-muted">{event.description}</p>
    <div className="flex items-center justify-between text-xs text-muted">
      <span>{new Date(event.startAt).toLocaleDateString()}</span>
      <span>Capacity {event.capacity}</span>
    </div>
  </Card>
);
