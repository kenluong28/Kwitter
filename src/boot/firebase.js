//import firebase from "firebase/app";
//import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBraDXO0kMZS7PdKxk3DWU3jU_TZ0FU6R8",
  authDomain: "kwitter-8f077.firebaseapp.com",
  projectId: "kwitter-8f077",
  storageBucket: "kwitter-8f077.appspot.com",
  messagingSenderId: "956949541973",
  appId: "1:956949541973:web:e585bb4413c06a520950dc"
};

//firebase.initializeApp(firebaseConfig);

//let db = firebase.firestore();

//export default db

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export default db