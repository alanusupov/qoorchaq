import { auth } from "../index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

//creates user in firebase authentication
export const createUser = (email: string, pass: string) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};
