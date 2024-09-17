import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
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
    const tourRef = await addDoc(collection(db, "tours"), {
      country: "Italy",
      city: "Rome",
      name: "Tour of the Vatican, Sistine Chapel & St. Peter's Basilica",
      duration: "2 hr",
      Descrp: `Make the most of your valuable vacation time by skipping the line at the Vatican Museums.
                  You save hours waiting by booking a group tour, and get engaging commentary from your guide as you explore. 
                  Admission is included to the Sistine Chapel and St. Peter's Basilica; follow your guide on a carefully-crafted
                   itinerary to ensure you don't miss a thing.`,
      Price: "80",
      whats_in: [
        "An expert tour guide with over 10 years of experience. Excellent story teller.",
        "Guaranteed skip-the-line access to the Vatican Museums",
        "Admission tickets to the Vatican Museums, Sistine Chapel and St. Peter's Basilica",
        "Entry/Admission - Vatican Museums",
        "Entry/Admission - Sistine Chapel",
        "Entry/Admission - St. Peter's Basilica",
        "Guaranteed to skip the lines",
      ],
      what_exp: `Meet your guide and group in the Borgo neighborhood, a short walk away from the St. Peter's Square, for an introductory briefing for this Vatican Museums skip-the-line tour. Then, head to the square as a group, passing along the Via della Conciliazione along the way, while your guide provides commentary about the Vatican and its history. 

                    Arrive at St. Peter's Square and head into the Vatican Museums, taking advantage of your special skip-the-line admission ticket to speed your tour along. Once inside, listen to your guide provide commentary as you take in the sculptures, paintings, and tapestries that flank the main halls.`,
      image: "../images/lazio-low.jpeg",
      images: [],
      date: "05-10-2024 - 20-10-2024",
      location: {
        start: "Via Plauto, 17, 00193 Roma RM, Italy",
        end: "St. Peter's Basilica, Piazza San Pietro, 00120 Città del Vaticano, Vatican City",
      },
      space: "25",
      bestOffer: true,
    });
    console.log("success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

sFligt.addEventListener("click", testing);

let tours = [
  {
    country: "Italy",
    city: "Rome",
    tourName: "Tour of the Vatican, Sistine Chapel & St. Peter's Basilica",
    tourDuration: "2 hr",
    tourDescrip: `Make the most of your valuable vacation time by skipping the line at the Vatican Museums.
                  You save hours waiting by booking a group tour, and get engaging commentary from your guide as you explore. 
                  Admission is included to the Sistine Chapel and St. Peter's Basilica; follow your guide on a carefully-crafted
                   itinerary to ensure you don't miss a thing.`,
    tourPrice: "80",
    tourAm: [
      "An expert tour guide with over 10 years of experience. Excellent story teller.",
      "Guaranteed skip-the-line access to the Vatican Museums",
      "Admission tickets to the Vatican Museums, Sistine Chapel and St. Peter's Basilica",
      "Entry/Admission - Vatican Museums",
      "Entry/Admission - Sistine Chapel",
      "Entry/Admission - St. Peter's Basilica",
      "Guaranteed to skip the lines",
    ],
    what_to_expect: `Meet your guide and group in the Borgo neighborhood, a short walk away from the St. Peter's Square, for an introductory briefing for this Vatican Museums skip-the-line tour. Then, head to the square as a group, passing along the Via della Conciliazione along the way, while your guide provides commentary about the Vatican and its history. 

                    Arrive at St. Peter's Square and head into the Vatican Museums, taking advantage of your special skip-the-line admission ticket to speed your tour along. Once inside, listen to your guide provide commentary as you take in the sculptures, paintings, and tapestries that flank the main halls.`,
    tourImage: "../images/lazio-low.jpeg",
    tourImages: [],
    tourDate: "05-10-2024 - 20-10-2024",
    location: {
      start: "Via Plauto, 17, 00193 Roma RM, Italy",
      end: "St. Peter's Basilica, Piazza San Pietro, 00120 Città del Vaticano, Vatican City",
    },
    space: "25",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/moro-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/lond-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/france-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/korea-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "../images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
];

tours.forEach((tour) => {
  // if (tour.bestOffer) {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("trimg");
  imgDiv.innerHTML = `<div class="torimg">
                          <img src="${tour.tourImage}" alt="" />
                        </div>
                        <div class="boictr">
                          <div class="leftc">
                            <p class="bocon">${tour.city}</p>
                            <p class="boturn">${tour.tourName}</p>
                          </div>
                          <div class="rightc">
                            <p class="bocon">${tour.tourDuration}</p>
                            <p class="boturn">$${tour.tourPrice}</p>
                          </div>
                        </div>`;
  document.getElementById("midovr").appendChild(imgDiv);
  // }
});
