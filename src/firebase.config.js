// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//db we are using
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3srt_WO5bgwsSqp8PQeCfpUOHw1kVv48",
  authDomain: "house-market-place-40433.firebaseapp.com",
  projectId: "house-market-place-40433",
  storageBucket: "house-market-place-40433.appspot.com",
  messagingSenderId: "215678561075",
  appId: "1:215678561075:web:29695411c5036173a2ac46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();