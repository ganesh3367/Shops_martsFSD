import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../config/firebase';
import { setUser, clearUser, setLoading } from '../store/userSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuth;
