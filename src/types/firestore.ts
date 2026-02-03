export type UserRole = 'volunteer' | 'organizer' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  totalHours: number;
  xp: number;
  badges: string[];
}

export interface EventRecord {
  id: string;
  title: string;
  description: string;
  location: string;
  startAt: string;
  endAt: string;
  hoursValue: number;
  createdBy: string;
  capacity: number;
  createdAt: string;
  checkInToken: string;
}

export type AttendanceStatus = 'joined' | 'checked_in' | 'approved';

export interface AttendanceRecord {
  id: string;
  eventId: string;
  userId: string;
  status: AttendanceStatus;
  joinedAt: string;
  checkInAt?: string;
  approvedAt?: string;
}

export interface CertificateRecord {
  id: string;
  userId: string;
  eventId: string;
  hours: number;
  issuedAt: string;
  pdfUrl?: string;
}

export const collections = {
  users: 'users',
  events: 'events',
  attendance: 'attendance',
  certificates: 'certificates',
};
