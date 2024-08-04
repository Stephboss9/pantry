

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC069ZJSEYCU7UEzOpm3ahAfMIReasCOWo",
    authDomain: "hspantryapp-be49e.firebaseapp.com",
    projectId: "hspantryapp-be49e",
    storageBucket: "hspantryapp-be49e.appspot.com",
    messagingSenderId: "840813118476",
    appId: "1:840813118476:web:ffd71167f143ecec819a29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore }