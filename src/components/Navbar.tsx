/* ------------------------------------------ *
 *  Navbar – fixed at the top of every page   *
 * ------------------------------------------ */
"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useDarkMode from "@/hooks/useDarkMode";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [isDark, setDark] = useDarkMode();

  const { user } = useAuth();

  if (!user) return null;

  const handleLogout = () => signOut(auth);

  return (
    <nav
      className={`
        w-full flex items-center justify-between px-6 py-4
        border-b border-white/10 backdrop-blur-sm
      `}
    >
      {/* ---------- brand ---------- */}
      <h1 className="text-2xl font-bold whitespace-nowrap">
        Smart&nbsp;Note-taking
      </h1>

      {/* ---------- right side ---------- */}
      <div className="flex items-center gap-4">
        {/* theme toggle */}
        <button
          onClick={() => setDark(!isDark)}
          className={`
            flex items-center gap-1 rounded-full border px-4 py-1
            text-sm transition hover:bg-white/10
          `}
        >
          <span role="img" aria-hidden>
            {isDark ? "🌙" : "🌞"}
          </span>
          {isDark ? "Dark" : "Light"}
        </button>

        {/* log-out */}
        <button
          onClick={handleLogout}
          className="underline underline-offset-2 text-sm hover:text-indigo-400"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
