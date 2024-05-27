import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK2hXxDBVNBSL_syFusfV9QWykCDkp0s4",
  authDomain: "recipe-sharing-8ca2e.firebaseapp.com",
  projectId: "recipe-sharing-8ca2e",
  storageBucket: "recipe-sharing-8ca2e.appspot.com",
  messagingSenderId: "1083561381162",
  appId: "1:1083561381162:web:066c823876f32e32aea253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
