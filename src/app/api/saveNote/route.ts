// src/app/api/saveNote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const token = (req.headers.get('authorization') ?? '').split('Bearer ')[1];
    if (!token) return NextResponse.json({ error: 'no-token' }, { status: 401 });

    const { uid } = await adminAuth.verifyIdToken(token);
    const { note, heading = null, createdAt } = await req.json();
    if (!note || typeof note !== 'string')
      return NextResponse.json({ error: 'invalid-note' }, { status: 400 });

    const ref = await adminDb
      .collection('users')
      .doc(uid)
      .collection('notes')
      .add({
        content: note,
        heading,
        createdAt: createdAt ?? Date.now(),
      });

    return NextResponse.json({ status: 'saved', id: ref.id });
  } catch (err) {
    console.error('saveNote error', err);
    return NextResponse.json({ error: 'save-failed' }, { status: 500 });
  }
}
