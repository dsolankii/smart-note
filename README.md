# Smart Note-Taking App ✨

AI-powered web notebook that lets you **write, refine, title, and save** notes with one click.

[**Live demo →**](LIVE_DEMO_URL)  
[**Video walkthrough →**](VIDEO_DEMO_URL)

---

## Features

| Capability | Tech |
|------------|------|
| **Long-form editor** with rich text | React Quill |
| **Refine** note & **generate title** | OpenAI (LangChain) |
| Accept / Decline AI drafts | React state |
| **Dark ↔ Light** toggle | Tailwind + custom hook |
| **Save / load** notes | Firebase Auth + Firestore |
| Delete notes & auto-renumber | Vanilla React |
| Responsive glass UI | Tailwind CSS |

---

## Tech stack

* **Next.js 14** (App Router, RSC)
* **LangChain JS** – orchestrates OpenAI calls
* **Firebase v10** – Auth (email/password) & Firestore
* **Tailwind CSS v3**
* **React Quill** rich-text editor
* Deployed on **Vercel**

---

## Screenshots

| Login | Editor | Notes |
|-------|--------|-------|
| ![login](docs/login.png) | ![editor](docs/editor.png) | ![notes](docs/notes.png) |

---

## Local setup

```bash
git clone https://github.com/dsolankii/smart-note.git
cd smart-note
npm install
cp .env.local.example .env.local      # put your own keys
npm run dev
