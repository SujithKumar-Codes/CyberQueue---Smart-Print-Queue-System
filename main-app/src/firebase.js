import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyBGLyuePbZSFBiyMJK4qM3RmhHQwIMtk",
  authDomain: "cyberqueue-ca8b1.firebaseapp.com",
  projectId: "cyberqueue-ca8b1",
  storageBucket: "cyberqueue-ca8b1.firebasestorage.app",
  messagingSenderId: "23159766148",
  appId: "1:23159766148:web:9c9bf6be63f8de816716d1"
};

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error('Firebase initialization error', error.stack);
  }
  app = getApp(); // Use existing app if already initialized
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);