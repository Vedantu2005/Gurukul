// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwmbLaRKZetFo52KW0qJq-z63SmeAHL8Y",
  authDomain: "saisanskrithi-gurukul.firebaseapp.com",
  projectId: "saisanskrithi-gurukul",
  storageBucket: "saisanskrithi-gurukul.firebasestorage.app",
  messagingSenderId: "32764357494",
  appId: "1:32764357494:web:03f5c7155f85df2528a857",
  measurementId: "G-CH31SHXZMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Services
export const db = getFirestore(app);
export const storage = getStorage(app); // Useful for uploading blog images later
export const auth = getAuth(app); // Useful for Admin Login

export default app;