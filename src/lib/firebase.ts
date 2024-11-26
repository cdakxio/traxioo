import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyApPJVfUWLcgkxLn53kWCB7v7f0EEULSyA",
  authDomain: "experio-1d348.firebaseapp.com",
  projectId: "experio-1d348",
  storageBucket: "experio-1d348.firebasestorage.app",
  messagingSenderId: "1068968751801",
  appId: "1:1068968751801:web:7e03c95426947aa4c8e168",
  measurementId: "G-NDX4PL87CP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);