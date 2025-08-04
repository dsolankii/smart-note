import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/** minimal shape stored in Firestore */
export interface CloudNote extends DocumentData {
  id: string;
  heading?: string | null;
  createdAt: number;
}

export default function useUserNotes(uid: string | null) {
  const [notes, setNotes] = useState<CloudNote[]>([]);

  useEffect(() => {
    if (!uid) return; // not logged-in yet

    const q = query(
      collection(db, 'users', uid, 'notes'),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, snap => {
      setNotes(
        snap.docs.map(d => ({ id: d.id, ...d.data() } as CloudNote))
      );
    });

    return unsub; // cleanup
  }, [uid]);

  return notes;
}
