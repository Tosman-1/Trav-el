import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  and,
  or,
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
    const hotelRef = await addDoc(collection(db, "hotels"), {
      country: "France",
      city: "Paris",
      hotel_name: "Saint lama depre",
      rating: "5",
      rooms: {},
      Desp: "A city-centre château, in Paris? Mais oui… Saint James Paris has always had lofty ambitions: in previous lives, it has been an intellectual boot camp for budding French boffins, and site of the first-ever hot-air balloon airfield. In the hotel's latest guise as a grandiose, cultured, country estate-style hotel, it’s still flying high. Nature reigns in this inner-city sanctuary, where Parisian art de Vivre is infused with the soul of an English country club, reconciling paradoxes with a feather-light touch. The restaurant Bellefeuille whips up flavours of bohemian fancy, from the organic gardens of Saint James, straight to your plate. For those who want old-school Gallic romance of grand staircases, neoclassic frescos, swagged velvet drapes, buttery florals, and gardens galore, Saint James will sweep you off your feet.",
      Price: "661",
      facilities: [
        "Street packing",
        "Private packing",
        "Free wifi",
        "Pet friendly",
        "Air conditioning",
        "Non smoking rooms",
        "Private bathroom",
        "Free toiletries",
        "Bar/lounge",
        "Restaurant",
        "Room service",
        "Daily housekeeping",
        "CCTV outside property",
        "24 hour security",
        "Fire extinguishers",
        "Smoke alarm",
        "Outdoor swimming pool",
      ],
      Image: "../images/hotel-paris.webp",
      Images: [],
      location: {
        address: "5 Place du Chancelier Adenauer Paris 75116 France",
        Descp:
          "This city-central hotel is on the right bank's 16th arrondissement, within easy reach of all Paris' main sights.",
      },
    });
    console.log("sucess");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

sFligt.addEventListener("click", testing);
