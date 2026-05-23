import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase.config";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch {
          // silent
        }
      } else {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/logout`,
            {},
            { withCredentials: true }
          );
        } catch {
          
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);