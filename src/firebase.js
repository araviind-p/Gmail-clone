// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "clone-f2409.firebaseapp.com",
  projectId: "clone-f2409",
  storageBucket: "clone-f2409.appspot.com",
  messagingSenderId: "285212661363",
  appId: "1:285212661363:web:a99221ce0eb93ac257fc06",
  measurementId: "G-BLKHSVT4Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()