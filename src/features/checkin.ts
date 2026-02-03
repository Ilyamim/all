import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AttendanceRecord, EventRecord } from '../types/firestore';

export const processCheckIn = async ({
  eventId,
  userId,
  token,
}: {
  eventId: string;
  userId: string;
  token: string;
}) => {
  const eventSnap = await getDoc(doc(db, 'events', eventId));
  if (!eventSnap.exists()) {
    throw new Error('Event not found');
  }
  const event = eventSnap.data() as EventRecord;
  if (event.checkInToken !== token) {
    throw new Error('Invalid check-in token');
  }

  const attendanceId = `${eventId}_${userId}`;
  const attendanceRef = doc(db, 'attendance', attendanceId);
  const attendanceSnap = await getDoc(attendanceRef);
  const now = new Date().toISOString();

  if (attendanceSnap.exists()) {
    await updateDoc(attendanceRef, { status: 'checked_in', checkInAt: now });
  } else {
    const record: AttendanceRecord = {
      id: attendanceId,
      eventId,
      userId,
      status: 'checked_in',
      joinedAt: now,
      checkInAt: now,
    };
    await setDoc(attendanceRef, record);
  }

  return { event };
};
