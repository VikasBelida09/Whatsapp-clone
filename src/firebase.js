import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCvzepNWSGKf0f7JloNkgDtb6neDTZpMJw",
  authDomain: "whatsapp-23693.firebaseapp.com",
  databaseURL: "https://whatsapp-23693.firebaseio.com",
  projectId: "whatsapp-23693",
  storageBucket: "whatsapp-23693.appspot.com",
  messagingSenderId: "617295683666",
  appId: "1:617295683666:web:32625077a8a67b27d1bf8b",
  measurementId: "G-CNLWFK626M",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
