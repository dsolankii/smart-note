import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

/* ─────────── Shared LLM instance ─────────── */
export const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",          // or "gpt-3.5-turbo"
  temperature: 0.3,                  // lower = more deterministic edits
});

/* ─────────── Prompt: Refine Note ───────────
   • Executive tone, ≤ 180 words
   • Only <p>, <ul><li>, <h2> tags
   • Adds Risks/Concerns section when needed
   • Returns pure HTML (no code fences)
────────────────────────────────────────────── */
export const refinePrompt = new PromptTemplate({
  template: `You are a senior copy-editor for executive communications.
Polish the user's raw note so it is concise, professional, and ready to paste as HTML.

CONTENT
----
{input}
----

RULES
• Preserve original meaning and first-person voice.  
• Keep total length ≤ 180 words.  
• Break ideas into paragraphs; use bullet lists (<ul><li>) when helpful.  
• If the note mentions blockers or worries, insert:
  <h2>Risks / Concerns</h2>
  followed by a <ul><li> list of risks.  
• Use only <p>, <ul><li>, and <h2> tags. No inline CSS.  
• **Return ONLY valid HTML**. Do NOT wrap in markdown back-ticks or a <code> block.

EXAMPLE FORMAT
<p>Opening summary …</p>
<ul>
  <li>Action / task A</li>
  <li>Action / task B</li>
</ul>

<h2>Risks / Concerns</h2>
<ul>
  <li>Risk 1 …</li>
  <li>Risk 2 …</li>
</ul>`,
  inputVariables: ["input"],
});

/* ─────────── Prompt: Generate Title ─────────── */
export const titlePrompt = new PromptTemplate({
  template: `Generate a concise, catchy title (max 12 words) for the note below.
Return ONLY the title—no quotation marks or code fences.

----
{input}
----`,
  inputVariables: ["input"],
});
