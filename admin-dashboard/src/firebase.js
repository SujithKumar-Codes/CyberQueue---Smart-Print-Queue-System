import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyBGLyuePbZSFBiyMJK4qM3RmhHQwIMtk",
  authDomain: "http://cyberqueue-ca8b1.firebaseapp.com/",
  projectId: "cyberqueue-ca8b1",
  storageBucket: "http://cyberqueue-ca8b1.firebasestorage.app/",
  messagingSenderId: "23159766148",
  appId: "1:23159766148:web:9c9bf6be63f8de816716d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };