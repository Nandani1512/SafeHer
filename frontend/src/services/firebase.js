import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  push, 
  update, 
  remove, 
  onValue 
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCxiV1imeSnEra41BL9J586NJfYtIFwgM0",
  authDomain: "she-181bf.firebaseapp.com",
  databaseURL: "https://she-181bf-default-rtdb.firebaseio.com",
  projectId: "she-181bf",
  storageBucket: "she-181bf.appspot.com",
  messagingSenderId: "391528342758",
  appId: "1:391528342758:web:8401b7dd12a5d586200727",
  measurementId: "G-MWW8VY6BN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

export {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  signInWithPopup,
  ref,
  set,
  get,
  push,
  update,
  remove,
  onValue
};
