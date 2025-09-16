import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgJpOmnBZLSGFdPz3liP4D92yZO2YHeZo",
  authDomain: "prepai-d7191.firebaseapp.com",
  projectId: "prepai-d7191",
  storageBucket: "prepai-d7191.firebasestorage.app",
  messagingSenderId: "152110507265",
  appId: "1:152110507265:web:9b6b127983777aba70e700",
  measurementId: "G-54DR1YYWNR"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);