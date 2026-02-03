import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Toast } from '../../components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { processCheckIn } from '../../features/checkin';

const CheckIn: React.FC = () => {
  const [params] = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const eventId = params.get('eventId');
  const token = params.get('token');

  const handleCheckIn = async () => {
    if (!eventId || !token || !user) return;
    setStatus('loading');
    try {
      await processCheckIn({ eventId, userId: user.uid, token });
      setStatus('success');
      setMessage('Check-in successful. Your hours are pending approval.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to check in.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-display">Event check-in</h1>
        <p className="text-sm text-muted">Verify your attendance in seconds.</p>
      </div>
      <Card>
        <p className="text-sm text-muted">Event ID: {eventId ?? 'Missing'} </p>
        <p className="text-sm text-muted">Token: {token ?? 'Missing'}</p>
        <div className="mt-6">
          <Button onClick={handleCheckIn} disabled={status === 'loading' || !eventId || !token}>
            {status === 'loading' ? 'Checking in...' : 'Check in now'}
          </Button>
        </div>
        {status !== 'idle' && (
          <div className="mt-4">
            <Toast message={message} variant={status === 'error' ? 'warning' : 'success'} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default CheckIn;
