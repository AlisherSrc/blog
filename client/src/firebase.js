// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrSKHxKKzFh6oOUReX3PNvmAddrM-z-T4",
  authDomain: "alishersk-blog.firebaseapp.com",
  projectId: "alishersk-blog",
  storageBucket: "alishersk-blog.appspot.com",
  messagingSenderId: "283096802084",
  appId: "1:283096802084:web:b4ddb9370d64a762a049b1",
  measurementId: "G-GWKFWJKLCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);