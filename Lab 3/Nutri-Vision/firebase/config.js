// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARlb3gidDyk8L6Ip-1-mEHXX2Z-mFA0So",
  authDomain: "nutri-vision-78db7.firebaseapp.com",
  projectId: "nutri-vision-78db7",
  storageBucket: "nutri-vision-78db7.appspot.com",
  messagingSenderId: "277823958210",
  appId: "1:277823958210:web:0674dfda598d5494359f5b",
  measurementId: "G-T3JFYVNJQN"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);