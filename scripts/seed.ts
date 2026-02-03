import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createOrLogin = async (email: string, password: string) => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (error) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  }
};

const seed = async () => {
  const organizerEmail = process.env.E2E_ORGANIZER_EMAIL || 'organizer@example.com';
  const volunteerEmail = process.env.E2E_VOLUNTEER_EMAIL || 'volunteer@example.com';
  const password = process.env.E2E_DEFAULT_PASSWORD || 'password123';

  const organizer = await createOrLogin(organizerEmail, password);
  const volunteer = await createOrLogin(volunteerEmail, password);

  await setDoc(doc(db, 'users', organizer.uid), {
    uid: organizer.uid,
    name: 'Organizer One',
    email: organizer.email,
    role: 'organizer',
    createdAt: new Date().toISOString(),
    totalHours: 0,
    xp: 0,
    badges: [],
  });

  await setDoc(doc(db, 'users', volunteer.uid), {
    uid: volunteer.uid,
    name: 'Volunteer One',
    email: volunteer.email,
    role: 'volunteer',
    createdAt: new Date().toISOString(),
    totalHours: 0,
    xp: 0,
    badges: [],
  });

  await setDoc(doc(db, 'events', 'event-1'), {
    id: 'event-1',
    title: 'Seed Community Event',
    description: 'An event created by seed script.',
    location: 'Main Plaza',
    startAt: new Date(Date.now() + 86400000).toISOString(),
    endAt: new Date(Date.now() + 90000000).toISOString(),
    hoursValue: 3,
    createdBy: organizer.uid,
    capacity: 25,
    createdAt: new Date().toISOString(),
    checkInToken: 'alpha123',
  });

  console.log('Seed completed');
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
