import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDwCiWp3j0BdbGrEoSspWxDsaAEDBUT4AQ",
  authDomain: "mytasks-d95a7.firebaseapp.com",
  projectId: "mytasks-d95a7",
  storageBucket: "mytasks-d95a7.appspot.com",
  messagingSenderId: "176470409983",
  appId: "1:176470409983:web:778ee21e3f597535cc42ca"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp)