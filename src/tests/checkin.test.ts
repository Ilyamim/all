import { describe, expect, it, vi } from 'vitest';
import { processCheckIn } from '../features/checkin';

const getDoc = vi.fn();
const setDoc = vi.fn();
const updateDoc = vi.fn();

vi.mock('firebase/firestore', () => ({
  doc: () => ({}),
  getDoc: (...args: unknown[]) => getDoc(...args),
  setDoc: (...args: unknown[]) => setDoc(...args),
  updateDoc: (...args: unknown[]) => updateDoc(...args),
}));

vi.mock('../lib/firebase', () => ({
  db: {},
}));

describe('processCheckIn', () => {
  it('throws when token mismatch', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ checkInToken: 'abc' }),
    });

    await expect(
      processCheckIn({ eventId: '1', userId: 'user', token: 'wrong' }),
    ).rejects.toThrow('Invalid check-in token');
  });

  it('creates attendance when missing', async () => {
    getDoc
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ checkInToken: 'token' }),
      })
      .mockResolvedValueOnce({ exists: () => false });

    await processCheckIn({ eventId: '1', userId: 'user', token: 'token' });
    expect(setDoc).toHaveBeenCalled();
  });
});
