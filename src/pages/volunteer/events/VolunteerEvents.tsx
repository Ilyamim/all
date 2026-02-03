import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventCard } from '../../../components/EventCard';
import { Input } from '../../../components/ui/Input';
import { EventRecord } from '../../../types/firestore';

const sampleEvents: EventRecord[] = [
  {
    id: 'event-1',
    title: 'Park Restoration Day',
    description: 'Help revitalize the city park with planting and cleanup.',
    location: 'East Meadow',
    startAt: new Date(Date.now() + 86400000).toISOString(),
    endAt: new Date(Date.now() + 90000000).toISOString(),
    hoursValue: 3,
    createdBy: 'organizer-1',
    capacity: 40,
    createdAt: new Date().toISOString(),
    checkInToken: 'alpha123',
  },
  {
    id: 'event-2',
    title: 'Community Pantry Support',
    description: 'Sort donations and distribute essentials to families.',
    location: 'Downtown Pantry',
    startAt: new Date(Date.now() - 86400000).toISOString(),
    endAt: new Date(Date.now() - 82800000).toISOString(),
    hoursValue: 2,
    createdBy: 'organizer-2',
    capacity: 25,
    createdAt: new Date().toISOString(),
    checkInToken: 'beta456',
  },
];

const VolunteerEvents: React.FC = () => {
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const now = Date.now();
    return sampleEvents
      .filter((event) =>
        filter === 'upcoming' ? new Date(event.startAt).getTime() >= now : new Date(event.startAt).getTime() < now,
      )
      .filter((event) => event.title.toLowerCase().includes(query.toLowerCase()));
  }, [filter, query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Explore events</h1>
        <p className="text-sm text-muted">Search upcoming opportunities and RSVP.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          className={`rounded-xl px-4 py-2 text-sm ${filter === 'upcoming' ? 'bg-secondary' : 'bg-card'}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`rounded-xl px-4 py-2 text-sm ${filter === 'past' ? 'bg-secondary' : 'bg-card'}`}
          onClick={() => setFilter('past')}
        >
          Past
        </button>
        <div className="min-w-[220px] flex-1">
          <Input label="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} onClick={() => navigate(`/events/${event.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default VolunteerEvents;
