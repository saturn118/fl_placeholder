import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCEpfwQceSdZJIaY6CYS0rLawE9W8UDNf0",
  authDomain: "fightl.firebaseapp.com",
  projectId: "fightl",
  storageBucket: "fightl.appspot.com",
  messagingSenderId: "129170786205",
  appId: "1:129170786205:web:3489cae5f9c00e2a1ad174",
  measurementId: "G-5JKYQ05GE4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
