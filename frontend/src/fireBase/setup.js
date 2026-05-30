import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7QRKisvqGnxNRm8o4pOoq6zScbEZ3x1s",
  authDomain: "snapcart-7f5de.firebaseapp.com",
  projectId: "snapcart-7f5de",
  storageBucket: "snapcart-7f5de.appspot.com",
  messagingSenderId: "518903071613",
  appId: "1:518903071613:web:b7771db33f0982773bc214",
  measurementId: "G-06VE4VGEH3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

