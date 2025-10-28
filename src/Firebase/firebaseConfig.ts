// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ3tYPd34U7tl9oMmbit4cX1bbEgc4k_4",
  authDomain: "financesapp-7043f.firebaseapp.com",
  projectId: "financesapp-7043f",
storageBucket: "financesapp-7043f.appspot.com",
  messagingSenderId: "461041499733",
  appId: "1:461041499733:web:cce29874ea608bd2e59edc",
  measurementId: "G-5F5CL7MNS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
