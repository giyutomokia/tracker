// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAM-9IeEk6-jJ4iadTVyQhYhpZbfJKG1Bs",
  authDomain: "tracker-d972c.firebaseapp.com",
  projectId: "tracker-d972c",
  storageBucket: "tracker-d972c.appspot.com",  // Use this one, not firebasestorage.app
  messagingSenderId: "634237083492",
  appId: "1:634237083492:web:05e0cdffda84d5bb282471",
  measurementId: "G-9MHE8YJ1XH"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
