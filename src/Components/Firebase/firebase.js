// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import 'firebase/compat/auth';

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD8vczfc2yhxYa9hS50jOU6CR-usmNhXqQ",
  authDomain: "mybenefits-5e414.firebaseapp.com",
  projectId: "mybenefits-5e414",
  storageBucket: "mybenefits-5e414.appspot.com",
  messagingSenderId: "540905713777",
  appId: "1:540905713777:web:5caecb37fcebcc11282bd0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const Storage = getStorage(app);

// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const db = firebase.firestore();