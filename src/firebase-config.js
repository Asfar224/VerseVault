import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.MY_API_KEY,
  authDomain: process.env.MY_AUTH_DOMAIN,
  projectId: process.env.MY_PROJECT_ID,
  storageBucket: process.env.MY_storage_BUCKET,
  messagingSenderId: process.env.MY_MESSAGING_SENDERID,
  appId: process.env.MY_APP_ID,
  measurementId: process.env.MY_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore  = getFirestore(app); 

