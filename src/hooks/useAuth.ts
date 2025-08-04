'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      }),
    []
  );

  const login = (email: string, pw: string) =>
    signInWithEmailAndPassword(auth, email, pw);

  const signup = (email: string, pw: string) =>
    createUserWithEmailAndPassword(auth, email, pw);

  const logout = () => signOut(auth);

  return { user, loading, login, signup, logout };
}
