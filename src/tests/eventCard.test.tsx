import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EventCard } from '../components/EventCard';
import { EventRecord } from '../types/firestore';

const event: EventRecord = {
  id: '1',
  title: 'Retro Garden Day',
  description: 'Planting and cleanup.',
  location: 'Meadow Park',
  startAt: new Date('2024-09-01').toISOString(),
  endAt: new Date('2024-09-01T15:00:00Z').toISOString(),
  hoursValue: 4,
  createdBy: 'org',
  capacity: 20,
  createdAt: new Date().toISOString(),
  checkInToken: 'token',
};

describe('EventCard', () => {
  it('renders event details', () => {
    render(<EventCard event={event} />);
    expect(screen.getByText('Retro Garden Day')).toBeInTheDocument();
    expect(screen.getByText('Meadow Park')).toBeInTheDocument();
    expect(screen.getByText('4 hrs')).toBeInTheDocument();
  });
});
