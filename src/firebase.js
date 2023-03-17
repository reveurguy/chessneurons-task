// const firebaseConfig = {
//   apiKey: "AIzaSyCwpSq_BDT1et7uxCgMVp9G-FpiC2fy_o0",
//   authDomain: "chessneurons-9f3ce.firebaseapp.com",
//   projectId: "chessneurons-9f3ce",
//   storageBucket: "chessneurons-9f3ce.appspot.com",
//   messagingSenderId: "604478456362",
//   appId: "1:604478456362:web:ecc140f61e413915eeb953",
//   measurementId: "G-QEM5TL8J37"
// };

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { toast } from "sonner"

const firebaseConfig = {
  apiKey: "AIzaSyCwpSq_BDT1et7uxCgMVp9G-FpiC2fy_o0",
  authDomain: "chessneurons-9f3ce.firebaseapp.com",
  projectId: "chessneurons-9f3ce",
  storageBucket: "chessneurons-9f3ce.appspot.com",
  messagingSenderId: "604478456362",
  appId: "1:604478456362:web:ecc140f61e413915eeb953",
  measurementId: "G-QEM5TL8J37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast("Password reset link sent!");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};