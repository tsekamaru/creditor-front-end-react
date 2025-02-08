// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAbXFA0Nz8gDzbcdiltitcu3b-4c8r-iQ",
  authDomain: "creditor-app-5e528.firebaseapp.com",
  projectId: "creditor-app-5e528",
  storageBucket: "creditor-app-5e528.firebasestorage.app",
  messagingSenderId: "716218852162",
  appId: "1:716218852162:web:9a59e1b6c01fbc2bcddedb",
  measurementId: "G-1DMB6WCBSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
