// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnoVVfo7HkCI_ZyHMuyozIuqR9QrOwO0Q",
  authDomain: "nextflixgpt-84114.firebaseapp.com",
  projectId: "nextflixgpt-84114",
  storageBucket: "nextflixgpt-84114.appspot.com",
  messagingSenderId: "81524686413",
  appId: "1:81524686413:web:a3cd59c396f17e13f36604",
  measurementId: "G-RS8RNRWMWJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
