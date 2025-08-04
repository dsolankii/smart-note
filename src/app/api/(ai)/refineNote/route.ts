import { NextRequest, NextResponse } from "next/server";
import { llm, refinePrompt } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    /* ── Parse body ───────────────────────────── */
    const { note } = await req.json();
    if (!note || typeof note !== "string" || note.trim() === "") {
      return NextResponse.json({ error: "Empty note" }, { status: 400 });
    }

    /* ── Build prompt & call LLM ──────────────── */
    const prompt = await refinePrompt.format({ input: note });
    const result = await llm.invoke(prompt);

    /* ── String-ify & strip code fences ───────── */
    let html = String(result.content ?? "").trim();
    html = html.replace(/^```(?:html)?\s*([\s\S]+?)\s*```$/i, "$1");

    /* ── Fallback: auto-wrap plain text ───────── */
    if (!/[<>]/.test(html)) {
      html = html
        .split(/\n{2,}/)                       
        .map(p => `<p>${p.trim()}</p>`)
        .join("\n");
    }

    return NextResponse.json({ refined: html });
  } catch (err) {
    console.error("refineNote error:", err);
    return NextResponse.json({ error: "refine-failed" }, { status: 500 });
  }
}
