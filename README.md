# Smart Note-Taking App 📝✨  

An AI-augmented notebook where you can **write free-form text, press a button to clean it up, generate a catchy title, and stash it safely in the cloud.**  
Built on Next.js 14, LangChain + OpenAI, and Firebase — served hot from Vercel.

---

## 🎁 What you get

| ✨  | Feature |
|----|---------|
| **Rich-text editor** – bold, lists, code, and more (React Quill). |
| **Refine** – OpenAI rewrites your note for clarity while preserving intent. |
| **Generate Title** – instant headline (max 12 words). |
| **Accept / Decline** – keep or discard AI drafts with one click. |
| **Dark-mode toggle** – a11y-friendly, remembers your choice. |
| **Per-note delete** – 🗑️ icon in the corner, auto-renumbers list. |
| **Email/password auth** – powered by Firebase; new users auto-register. |
| **Firestore persistence** – notes saved to your private collection. |
| Responsive glass UI – built entirely with Tailwind CSS. |

---

## 🏗️ Tech stack

- **Next.js 14** – App Router, React Server Components, TypeScript  
- **LangChain JS** – chain orchestration & prompt templates  
- **OpenAI** – `gpt-4o-mini` (swap to `gpt-3.5-turbo` if needed)  
- **Firebase v10** – Auth + Firestore  
- **Tailwind CSS v3** – utility-first styling  
- **React Quill** – battle-tested rich-text editor  
- **Vercel** – zero-config CI/CD  

---

## 🖥️ Local setup

```bash
git clone https://github.com/dsolankii/smart-note.git
cd smart-note
npm install

# copy env template & insert your own keys
cp .env.local.example .env.local
npm run dev
````

### Required environment variables

All keys are listed in **`.env.local.example`**. Populate these in your private `.env.local`:

```
OPENAI_API_KEY              # your OpenAI key
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_APP_ID
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

---

## 🌐 1-click deploy on Vercel

1. **Import** this GitHub repo in Vercel.
2. Paste each env var into **Project → Settings → Environment Variables**.
3. Click **Deploy** — your app is live in seconds.

---

## 🤔 Why I built this

I love jotting down messy ideas and letting an LLM polish them.
This starter kit gives you a full-featured, AI-powered notebook you can brand & extend.

---

## 🛣 Roadmap

* Tags & full-text search (Algolia / Firestore composite).
* Offline-first PWA mode.
* RAG: embed past notes for richer AI context when refining.

---

## 🙌 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/…`)
3. Commit your changes (`git commit -m 'feat: …'`)
4. Push (`git push origin feature/…`)
5. Open a Pull Request

---

## 📄 License

MIT © 2025 Devesh Solanki

```
```
