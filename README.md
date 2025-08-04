
# Smart Note-Taking App 📝✨  

An AI-augmented notebook where you can **write free-form text, press a button to clean it up, generate a catchy title, and stash it safely in the cloud.**  
Built on Next.js 14, LangChain + OpenAI, and Firebase — served hot from Vercel.

---

## 🎁 What you get

| ✨ Feature | Description |
|-----------|-------------|
| **Rich-text editor** | Bold, lists, code, and more (React Quill). |
| **Refine** | OpenAI rewrites your note for clarity while preserving intent. |
| **Generate Title** | Instant headline (max 12 words). |
| **Accept / Decline** | Keep or discard AI drafts with one click. |
| **Dark-mode toggle** | A11y-friendly, remembers your choice. |
| **Per-note delete** | 🗑️ Icon in the corner, auto-renumbers list. |
| **Email/password auth** | Powered by Firebase; new users auto-register. |
| **Firestore persistence** | Notes saved to your private collection. |
| **Responsive glass UI** | Built entirely with Tailwind CSS. |


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

## 🙌 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/…`)
3. Commit your changes (`git commit -m 'feat: …'`)
4. Push (`git push origin feature/…`)
5. Open a Pull Request

```
