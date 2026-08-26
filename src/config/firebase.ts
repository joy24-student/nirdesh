// firebase.ts - Firebase Initialization & Auth Integration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey_For_Nirdesh_Demo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nirdesh-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nirdesh-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nirdesh-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } catch (err) {
    console.warn("Firebase Auth fallback demo mode:", err);
    return { displayName: "Demo User", email: "user@nirdesh.ai" };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
  }
};
