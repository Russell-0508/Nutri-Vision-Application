import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Configuration Object containing keys and identifiers for your project.
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyARlb3gidDyk8L6Ip-1-mEHXX2Z-mFA0So",
  authDomain: "nutri-vision-78db7.firebaseapp.com",
  projectId: "nutri-vision-78db7",
  storageBucket: "nutri-vision-78db7.appspot.com",
  messagingSenderId: "277823958210",
  appId: "1:277823958210:web:0674dfda598d5494359f5b",
  measurementId: "G-T3JFYVNJQN"
};

/**
 * Initializes and exports the Firebase application instance.
 * @module firebaseapp
 * @type {firebaseapp}
 */
const firebaseapp = initializeApp(firebaseConfig);

/**
 * Analytics service connected to the Firebase application instance.
 * @module analytics
 * @type {FirebaseAnalytics}
 */
const analytics = getAnalytics(firebaseapp);

/**
 * Firestore service connected to the Firebase application instance.
 * This is the database instance used throughout the application.
 * @module firestore
 * @type {firestore}
 */
const firestore = getFirestore(firebaseapp);

/**
 * Authentication service connected to the Firebase application instance.
 * This is used for user authentication tasks such as sign in and sign up.
 * @module auth
 * @type {auth}
 */
export const auth = getAuth(firebaseapp);

export default firestore;