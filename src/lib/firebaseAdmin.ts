import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const admin =
  getApps()[0] ||
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process
        .env
        .FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });

export const adminDb = getFirestore(admin);
export const adminAuth = getAuth(admin);
