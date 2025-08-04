import { ChatOpenAI } from "@langchain/openai";

export const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});
