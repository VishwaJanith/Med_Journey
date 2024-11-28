// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCgQLx_MV6VRBRsgiFD-9tU3CLMa8Jx2A",
  authDomain: "med-journey-mobile-app.firebaseapp.com",
  projectId: "med-journey-mobile-app",
  storageBucket: "med-journey-mobile-app.firebasestorage.app",
  messagingSenderId: "765453445174",
  appId: "1:765453445174:web:396849f8756420aff45097",
  measurementId: "G-4Y93CMEWNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export { signInWithEmailAndPassword };