import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'AIzaSyCeLwSyj8oVXgWgVf7K4k2MTKhwplIlhpk',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'travelp-36fbe.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'travelp-36fbe',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'travelp-36fbe.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '549168722198',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '1:549168722198:web:809de60e6659de743e6037',
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     || 'G-J38DL3V0FP',
};

// Prevent re-initialization on hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
