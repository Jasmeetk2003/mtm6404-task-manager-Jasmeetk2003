// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";



// Firebase configuration (replace with your own Firebase project details)
const firebaseConfig = {
    apiKey: "AIzaSyAwxZyq8t0Ojtzsr6aip4hvqNLbVrlZABs",
    authDomain: "iteration05.firebaseapp.com",
    projectId: "iteration05",
    storageBucket: "iteration05.firebasestorage.app",
    messagingSenderId: "249368531673",
    appId: "1:249368531673:web:045e57e0ddf78b45c824c8",
    measurementId: "G-JBP1W1S6XP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore Database

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("⚠️ Persistence failed: Multiple tabs open.");
    } else if (err.code === 'unimplemented') {
      console.warn("⚠️ Persistence is not available in this browser.");
    }
  });
  


export { db};
