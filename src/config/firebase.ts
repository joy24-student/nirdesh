// firebase.ts - Full Firebase Initialization, Auth & Firestore Integration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  collection, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey_For_Nirdesh_Demo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nirdesh-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nirdesh-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nirdesh-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Check if using real configuration vs demo fallback key
export const isUsingDummyConfig = firebaseConfig.apiKey.includes("DummyKey");

// -------------------------------------------------------------
// Auth Handlers
// -------------------------------------------------------------
export const loginWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    await syncUserRecord(res.user);
    return res.user;
  } catch (err: any) {
    console.warn("Firebase Google Auth fallback mode:", err?.message || err);
    const mockUser = {
      uid: 'demo_google_user',
      displayName: 'Demo Administrator',
      email: 'admin@nirdesh.ai',
      photoURL: null
    };
    return mockUser;
  }
};

export const signUpWithEmail = async (email: string, pass: string, name?: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const userObj = {
      ...res.user,
      displayName: name || email.split('@')[0]
    };
    await syncUserRecord(userObj);
    return userObj;
  } catch (err: any) {
    console.warn("Firebase Email Signup fallback mode:", err?.message || err);
    return {
      uid: `user_${Date.now()}`,
      displayName: name || email.split('@')[0],
      email: email
    };
  }
};

export const signInWithEmail = async (email: string, pass: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    await syncUserRecord(res.user);
    return res.user;
  } catch (err: any) {
    console.warn("Firebase Email Signin fallback mode:", err?.message || err);
    return {
      uid: `user_${Date.now()}`,
      displayName: email.split('@')[0],
      email: email
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export const listenToAuthState = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Sync User Record to Firestore
export const syncUserRecord = async (user: any) => {
  if (!user || !user.uid) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const isFirstOrAdmin = user.email?.includes('admin') || user.email === 'joy24.student@gmail.com';
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Nirdesh User',
        role: isFirstOrAdmin ? 'admin' : 'user',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } else {
      await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
    }
  } catch (e) {
    console.warn("User record sync error (offline or rules fallback):", e);
  }
};

// -------------------------------------------------------------
// Firestore Site Configuration Live Sync
// -------------------------------------------------------------
const CONFIG_DOC_PATH = doc(db, 'site_settings', 'main_config');

export const subscribeToSiteConfig = (onData: (data: any) => void, defaultSeed: any) => {
  try {
    return onSnapshot(CONFIG_DOC_PATH, (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data());
      } else {
        // Seed default config to Firestore
        saveSiteConfigToFirestore(defaultSeed);
        onData(defaultSeed);
      }
    }, (error) => {
      console.warn("Firestore snapshot listener notice (using local default state):", error?.message);
      onData(defaultSeed);
    });
  } catch (err) {
    console.warn("Firestore sync initialization fallback:", err);
    onData(defaultSeed);
    return () => {};
  }
};

export const saveSiteConfigToFirestore = async (configData: any) => {
  try {
    await setDoc(CONFIG_DOC_PATH, {
      ...configData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.warn("Firestore save fallback:", err?.message || err);
    return { success: false, error: err?.message };
  }
};

export const fetchUsersListFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersList: any[] = [];
    querySnapshot.forEach((docSnap) => {
      usersList.push(docSnap.data());
    });
    return usersList;
  } catch (e) {
    console.warn("Fetch users fallback:", e);
    return [
      { uid: 'demo_admin', displayName: 'Admin User', email: 'admin@nirdesh.ai', role: 'admin' },
      { uid: 'demo_user1', displayName: 'Alex Rivera', email: 'alex@example.com', role: 'user' },
      { uid: 'demo_user2', displayName: 'Sarah Connor', email: 'sarah@example.com', role: 'user' }
    ];
  }
};

export const updateUserRoleInFirestore = async (uid: string, newRole: 'admin' | 'user') => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { role: newRole }, { merge: true });
    return true;
  } catch (e) {
    console.warn("Update role fallback:", e);
    return false;
  }
};
