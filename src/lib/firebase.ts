import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "dishadesk",
  appId: "1:781150870360:web:6dbf9958e464d163cb632d",
  storageBucket: "dishadesk.firebasestorage.app",
  apiKey: "AIzaSyDaZJUWoifY838DCQm1oYPHFkz_J55LjsM",
  messagingSenderId: "781150870360",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
