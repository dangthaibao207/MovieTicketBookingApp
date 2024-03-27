// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfVrSDA0cv6DeN3ZMb26JyHBGVWmHN9Nk",
  authDomain: "doan-fc0b7.firebaseapp.com",
  databaseURL: "https://doan-fc0b7-default-rtdb.firebaseio.com",
  projectId: "doan-fc0b7",
  storageBucket: "doan-fc0b7.appspot.com",
  messagingSenderId: "416305364773",
  appId: "1:416305364773:web:2c549c1f312dd02aeda4cc"
};

// Initialize Firebase
let app;
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};