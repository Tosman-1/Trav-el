import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWpkvivLx86EUo7q5ns2kym-O57p1Kfuk",
  authDomain: "trav-el.firebaseapp.com",
  projectId: "trav-el",
  storageBucket: "trav-el.appspot.com",
  messagingSenderId: "1068904333836",
  appId: "1:1068904333836:web:054fca2e2d356619f0a429",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const sFligt = document.getElementById("sflgt");

const testing = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "matt",
      middle: "son",
      last: "Turing",
      born: 1932,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const test = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data().born);
  });
};

sFligt.addEventListener("click", test);
