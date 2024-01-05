import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
