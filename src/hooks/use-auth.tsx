'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { ref, set, serverTimestamp } from 'firebase/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const updateUserInDatabase = (user: User) => {
  if (!user) return;
  const userRef = ref(db, 'users/' + user.uid);
  set(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLogin: serverTimestamp(),
  });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        updateUserInDatabase(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      updateUserInDatabase(result.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        updateUserInDatabase(userCredential.user);
        return userCredential;
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        updateUserInDatabase(userCredential.user);
        return userCredential;
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  };


  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await firebaseSignOut(auth);
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
