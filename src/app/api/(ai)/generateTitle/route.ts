import { NextRequest, NextResponse } from 'next/server';
import { llm, titlePrompt } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { note } = await req.json();
    const prompt = await titlePrompt.format({ input: note });
    const result  = await llm.invoke(prompt);

    return NextResponse.json({ title: String(result.content).trim() });
  } catch (err) {
    console.error('generateTitle error:', err);
    return NextResponse.json({ error: 'title-failed' }, { status: 500 });
  }
}
