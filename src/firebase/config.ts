"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA9T6nRCDmhqLtQN223gxRPIEuislrlPR0",
  authDomain: "treasure-empire.firebaseapp.com",
  projectId: "treasure-empire",
  storageBucket: "treasure-empire.appspot.com",
  messagingSenderId: "742169365971",
  appId: "1:742169365971:web:0d7a1a0bd00af55a40b326",
  measurementId: "G-42GCJP6Z02"
};
const isLocalHost = process.env.NEXT_PUBLIC_ENV=="development";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);
if(isLocalHost){
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");

}