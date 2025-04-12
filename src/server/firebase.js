import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKATaDPAze6M7juyyoCsMotvLqcDWA-mk",
  authDomain: "footytinni.firebaseapp.com",
  projectId: "footytinni",
  storageBucket: "footytinni.firebasestorage.app",
  messagingSenderId: "871159436846",
  appId: "1:871159436846:web:5578bdf84e456265a7b1bf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
