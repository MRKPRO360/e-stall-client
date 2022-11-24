import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext();

export const useAuth = function () {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentuser, setCurrentuser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentuser(user);
      setLoading(false);
    });
    //do cleanup
    return unsubscribe;
  }, []);

  const signup = async function (email, password, username) {
    setLoading(true);
    const result = await (auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    const user = auth.currentUser;
    setCurrentuser({ ...user });
    return result;
  };

  const login = async function (email, password) {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = async function () {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logout = async function () {
    setLoading(true);
    return signOut(auth);
  };

  const value = {
    currentuser,
    loading,
    signup,
    login,
    googleLogin,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
