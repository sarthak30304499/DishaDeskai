// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: 'dishadesk',
  appId: '1:781150870360:web:6dbf9958e464d163cb632d',
  storageBucket: 'dishadesk.firebasestorage.app',
  apiKey: 'AIzaSyDaZJUWoifY838DCQm1oYPHFkz_J55LjsM',
  authDomain: 'dishadesk.firebaseapp.com',
  messagingSenderId: '781150870360',
  databaseURL: 'https://dishadesk.firebaseio.com',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
