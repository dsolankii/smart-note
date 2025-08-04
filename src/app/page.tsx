'use client';

import { useState, KeyboardEvent } from 'react';
import useDarkMode from '@/hooks/useDarkMode';
import { useAuth } from '@/hooks/useAuth';
import NoteEditor from '@/components/NoteEditor';
import useUserNotes from '@/hooks/useUserNotes';


type Note = {
  id: string;
  content: string;          
  refined?: string;         
  title?: string;           
  heading?: string;         
};

export default function Home() {
  /* ---------- auth & theme ---------- */
  const { user, loading: authLoading, login, signup, logout } = useAuth();
  const cloudNotes = useUserNotes(user ? user.uid : null);
  const [dark, setDark] = useDarkMode();

  /* ---------- notebook state ---------- */
  const [editorText, setEditorText] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [busyIdx, setBusyIdx] = useState<string | null>(null); 

  /* ───── helper: add new note ───── */
  function addNote() {
    if (!editorText.trim()) return;
    const id = Date.now().toString();
    setNotes((n) => [...n, { id, content: editorText.trim() }]);
    setEditorText('');
    setSelectedCloud(null);
  }

  function acceptRefined(idx: number) {
  setNotes((n) =>
    n.map((note, i) =>
      i === idx
        ? { ...note, content: note.refined!, refined: undefined }
        : note,
    ),
  );
}

function declineRefined(idx: number) {
  setNotes((n) =>
    n.map((note, i) => (i === idx ? { ...note, refined: undefined } : note)),
  );
}

function acceptTitle(idx: number) {
  setNotes((n) =>
    n.map((note, i) =>
      i === idx ? { ...note, heading: note.title, title: undefined } : note,
    ),
  );
}

const [selectedCloud, setSelectedCloud] = useState<string | null>(null);

  /* ───── per-note helpers ───── */
  async function refineNote(idx: number) {
    setBusyIdx(notes[idx].id);
    const res = await fetch('/api/refineNote', {
      method: 'POST',
      body: JSON.stringify({ note: notes[idx].content,
  heading: notes[idx].heading ?? null,
  createdAt: Date.now(), }),
    });
    const { refined } = await res.json();
    setNotes((n) =>
      n.map((note, i) => (i === idx ? { ...note, refined } : note)),
    );
    setBusyIdx(null);
  }

  async function titleNote(idx: number) {
    setBusyIdx(notes[idx].id);
    const res = await fetch('/api/generateTitle', {
      method: 'POST',
      body: JSON.stringify({ note: notes[idx].content,
  heading: notes[idx].heading ?? null,
  createdAt: Date.now(), }),
    });
    const { title } = await res.json();
    setNotes((n) =>
      n.map((note, i) => (i === idx ? { ...note, title } : note)),
    );
    setBusyIdx(null);
  }

async function saveNote(idx: number) {
  if (!user) return alert('Please log in first.');
  setBusyIdx(notes[idx].id);

  const token = await user.getIdToken();

  await fetch('/api/saveNote', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      note: notes[idx].content,
      heading: notes[idx].heading ?? null,
      createdAt: Date.now(),      
    }),
  });

  alert('Note saved ✔️');
  setBusyIdx(null);
}


  async function deleteNote(idx: number) {
  setNotes((n) => n.filter((_, i) => i !== idx));
  }


  /* ───── auth gates ───── */
  if (authLoading) return <p className="p-8 text-center">Loading…</p>;

/* ───── public sign-in screen ───── */
if (!user) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      {/* glass card */}
      <div
        className="w-full max-w-sm space-y-6 rounded-3xl bg-white/60
                   dark:bg-white/10 backdrop-blur p-8 shadow-xl
                   ring-1 ring-black/5 dark:ring-white/10"
      >
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue
          </p>
        </header>

        {/* prettier form below */}
        <AuthForm
          login={async (e, p) => { await login(e, p); }}
          signup={async (e, p) => { await signup(e, p); }}
        />

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400">
          New here? Enter any email &amp; password and an account is created automatically.
        </footer>
      </div>
    </main>
  );
}

/* ───── UI (logged-in) ───── */
return (
  <div className="flex min-h-screen">
    {/* ── left sidebar with saved notes ── */}
    <aside className="w-64 shrink-0 border-r border-white/10 p-6
                      bg-white/5 backdrop-blur-md overflow-y-auto">
      <h3 className="mb-4 text-lg font-semibold">Saved notes</h3>

      {cloudNotes.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">None yet.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {cloudNotes.map((n, i) => (
            <li
  key={n.id}
  className={`truncate cursor-pointer px-2 py-1 rounded
              ${selectedCloud === n.id ? 'bg-blue-600 text-white' : 'hover:bg-white/10'}`}
  onClick={() => {
    setSelectedCloud(n.id);      // highlight it
    setEditorText(n.content);    // load into editor
  }}
>
  {n.heading ?? `Note ${cloudNotes.length - i}`}
</li>

          ))}
        </ul>
      )}
    </aside>

    {/* ── main workspace ── */}
    <main className="flex flex-1 flex-col">
      {/* top navbar */}

      {/* center editor + local notes */}
      <section className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-6">
          {/* ───────── editor card ───────── */}
          <section
            className="rounded-3xl bg-gradient-to-br from-white/70 to-white/40
                       dark:from-white/10 dark:to-white/5
                       p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/10
                       backdrop-blur"
          >
            <div
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  e.preventDefault();
                  addNote();
                }
              }}
            >
              <NoteEditor value={editorText} onChange={setEditorText} />
            </div>

            <div className="mt-6 flex justify-end">
              <Button color="blue" onClick={addNote}>
                Add&nbsp;Note&nbsp;
              </Button>
            </div>
          </section>

          {/* ───────── numbered list ───────── */}
          {notes.length > 0 && (
            <ol className="space-y-6">
              {notes.map((note, idx) => (
                <li
                  key={note.id}
                  className="relative rounded-2xl bg-black/5 dark:bg-white/10
                             backdrop-blur ring-1 ring-black/5 dark:ring-white/10
                             p-6 shadow-lg"
                >
                  {/* delete icon */}
                  <button
                    onClick={() => deleteNote(idx)}
                    className="absolute top-2 right-2 text-lg leading-none
                               rounded-full px-2 py-1 hover:bg-rose-600 hover:text-white
                               transition"
                    title="Delete note"
                  >
                    X
                  </button>

                  {/* headline */}
                  <h2 className="mb-4 text-lg font-semibold">
                    {note.heading ?? `Note ${idx + 1}`}
                  </h2>

                  {/* main content */}
                  <div
                    className="prose dark:prose-invert leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />

                  {/* refined draft */}
                  {note.refined && (
                    <div className="mt-6 space-y-3">
                      <div
                        className="prose dark:prose-invert rounded-lg bg-white/40 p-4
                                   dark:bg-white/10"
                        dangerouslySetInnerHTML={{ __html: note.refined }}
                      />
                      <div className="flex gap-3">
                        <ActionBtn color="emerald" onClick={() => acceptRefined(idx)}>
                          Accept
                        </ActionBtn>
                        <ActionBtn color="rose" onClick={() => declineRefined(idx)}>
                          Decline
                        </ActionBtn>
                      </div>
                    </div>
                  )}

                  {/* title draft */}
                  {note.title && (
                    <div className="mt-4 flex items-center gap-3">
                      <p className="flex-1 rounded-lg bg-slate-200 px-3 py-2 dark:bg-slate-700">
                        <strong>Title:</strong> {note.title}
                      </p>
                      <ActionBtn color="emerald" onClick={() => acceptTitle(idx)}>
                        Accept
                      </ActionBtn>
                    </div>
                  )}

                  {/* footer actions */}
                  <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <ActionBtn
                      color="emerald"
                      busy={busyIdx === note.id}
                      onClick={() => refineNote(idx)}
                    >
                      Refine
                    </ActionBtn>
                    <ActionBtn
                      color="purple"
                      busy={busyIdx === note.id}
                      onClick={() => titleNote(idx)}
                    >
                      Title
                    </ActionBtn>
                    <ActionBtn
                      color="blue"
                      busy={busyIdx === note.id}
                      onClick={() => saveNote(idx)}
                    >
                      Save
                    </ActionBtn>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </main>
  </div>
);
}

/* ---------- tiny components ---------- */

function Header({
  dark,
  toggleDark,
  logout,
}: {
  dark: boolean;
  toggleDark: () => void;
  logout: () => void;
}) {

}

function Button({
  children,
  color,
  onClick,
  busy,
}: {
  children: React.ReactNode;
  color: 'blue' | 'emerald' | 'purple' | 'rose' | 'gray';
  onClick: () => void;
  busy?: boolean;
}) {
  const base =
    'rounded-full px-4 py-1.5 text-sm font-medium transition disabled:opacity-40';
  const palette: Record<typeof color, string> = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    emerald: 'bg-emerald-600 text-white hover:bg-emerald-700',
    purple: 'bg-purple-600 text-white hover:bg-purple-700',
    rose: 'bg-rose-600 text-white hover:bg-rose-700',
    gray: 'border backdrop-blur hover:bg-black/10 dark:hover:bg-white/10',
  };
  return (
    <button onClick={onClick} disabled={busy} className={`${base} ${palette[color]}`}>
      {busy ? '…' : children}
    </button>
  );
}

/* prettier, hover-lift pill button just for note cards */
function ActionBtn({
  children,
  color,
  busy,
  onClick,
}: {
  children: string;
  color: 'blue' | 'emerald' | 'purple' | 'rose' | 'gray';
  busy?: boolean;
  onClick: () => void;
}) {
  const base =
    'rounded-full px-5 py-2 text-sm font-medium transition shadow-md '
    + 'hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 transform';
  const palette = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    purple: 'bg-purple-600 hover:bg-purple-700 text-white',
    rose: 'bg-rose-600 hover:bg-rose-700 text-white',
    gray: 'border backdrop-blur hover:bg-black/10 dark:hover:bg-white/10',
  } as const;

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className={`${base} ${palette[color]}`}
    >
      {busy ? '…' : children}
    </button>
  );
}

function AuthForm({
  login,
  signup,
}: {
  login: (e: string, p: string) => Promise<void>;
  signup: (e: string, p: string) => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const email = (e.currentTarget.email as any).value;
        const pw    = (e.currentTarget.pw as any).value;
        try {
          await login(email, pw);
        } catch {
          await signup(email, pw);
        } finally {
          setBusy(false);
        }
      }}
      className="space-y-4"
    >
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-xl bg-white/70 dark:bg-white/20
                   px-4 py-2 outline-none ring-1 ring-inset ring-gray-300
                   dark:ring-gray-600 focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="pw"
        type="password"
        placeholder="••••••••"
        className="w-full rounded-xl bg-white/70 dark:bg-white/20
                   px-4 py-2 outline-none ring-1 ring-inset ring-gray-300
                   dark:ring-gray-600 focus:ring-2 focus:ring-blue-500"
        required
      />

      <Button color="blue" busy={busy} onClick={() => {}}>
        {busy ? 'Signing…' : 'Enter'}
      </Button>
    </form>
  );
}
