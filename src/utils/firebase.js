// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-2FwLEdWlOv0sJQRqnnLkRO26RS-3CPw",
  authDomain: "pickmyflick-72ba5.firebaseapp.com",
  projectId: "pickmyflick-72ba5",
  storageBucket: "pickmyflick-72ba5.firebasestorage.app",
  messagingSenderId: "315137433734",
  appId: "1:315137433734:web:db21ceca5e26ca55b0b107",
  measurementId: "G-KMQNYH38J3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
