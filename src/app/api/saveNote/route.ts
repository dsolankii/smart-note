import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.split('Bearer ')[1];

    if (!token) return NextResponse.json({ error: 'no-token' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const { note } = await req.json();

    await adminDb.collection('notes').add({
      uid: decoded.uid,
      content: note,
      createdAt: Date.now(),
    });

    return NextResponse.json({ status: 'saved' });
  } catch (err) {
    console.error('saveNote error', err);
    return NextResponse.json({ error: 'save-failed' }, { status: 500 });
  }
}
