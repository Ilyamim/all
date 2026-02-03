import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';

const eventSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  location: z.string().min(2, 'Location is required'),
  startAt: z.string().min(1, 'Start time required'),
  endAt: z.string().min(1, 'End time required'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
});

type EventValues = z.infer<typeof eventSchema>;

const OrganizerEventNew: React.FC = () => {
  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      location: '',
      startAt: '',
      endAt: '',
      capacity: 10,
    },
  });

  const onSubmit = async (values: EventValues) => {
    console.log('Create event', values);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Create event</h1>
        <p className="text-sm text-muted">Set up a volunteer opportunity with a QR check-in.</p>
      </div>
      <Card>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <Input label="Title" {...form.register('title')} error={form.formState.errors.title?.message} />
          <Input label="Location" {...form.register('location')} error={form.formState.errors.location?.message} />
          <Input
            label="Start time"
            type="datetime-local"
            {...form.register('startAt')}
            error={form.formState.errors.startAt?.message}
          />
          <Input
            label="End time"
            type="datetime-local"
            {...form.register('endAt')}
            error={form.formState.errors.endAt?.message}
          />
          <Input
            label="Capacity"
            type="number"
            {...form.register('capacity')}
            error={form.formState.errors.capacity?.message}
          />
          <div className="md:col-span-2">
            <Button type="submit">Create event</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OrganizerEventNew;
