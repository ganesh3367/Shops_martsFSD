import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

const toSerializable = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

const ensureUserDoc = async (user, extra = {}) => {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      phone: '',
      address: '',
      createdAt: serverTimestamp(),
      ...extra,
    });
  }
};

export const registerWithEmail = async (email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });
  await ensureUserDoc({ ...user, displayName });
  return toSerializable({ ...user, displayName });
};

export const loginWithEmail = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return toSerializable(user);
};

export const loginWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  await ensureUserDoc(user);
  return toSerializable(user);
};

export const logoutUser = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};

export const updateUserProfile = async (uid, data) => {
  await setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
  if (data.displayName && auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: data.displayName });
  }
};

export const getFirebaseError = (code) => {
  const map = {
    'auth/email-already-in-use': 'This email is already registered. Try signing in.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    'auth/api-key-not-valid': 'Firebase is not configured. Add your credentials to .env.local',
  };
  return map[code] || 'Something went wrong. Please try again.';
};
