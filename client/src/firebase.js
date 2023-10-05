import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUkNQqdR5h_1zjIn7RlWjxcP33ZyDhzRU",
  authDomain: "videoapp-2610f.firebaseapp.com",
  projectId: "videoapp-2610f",
  storageBucket: "videoapp-2610f.appspot.com",
  messagingSenderId: "34063967736",
  appId: "1:34063967736:web:02f49ee345f2711eca620d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;