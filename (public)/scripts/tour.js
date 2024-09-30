import { config } from "./key.js";

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
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const whereGo = document.getElementById("trwhto");
const sFligt = document.getElementById("sflgt");
const tourWrap = document.getElementById("midovr");

const testing = async () => {
  try {
    const tourRef = await addDoc(collection(db, "tours"), {
      country: "Italy",
      city: "Rome",
      name: "Tour of the Vatican, Sistine Chapel & St. Peter's Basilica",
      duration: "2 hr",
      Descrp: `dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
              quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
              aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ulla.Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
              nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla.`,
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

// let depart = whereFro.value.charAt(0).toUpperCase() + whereFro.value.slice(1);

const test = async () => {
  let destination =
    whereGo.value.charAt(0).toUpperCase() + whereGo.value.slice(1);

  try {
    const tourRef = collection(db, "tours");
    const turQuery = query(
      tourRef,
      or(where("country", "==", destination), where("city", "==", destination))
    );

    console.log(turQuery);

    const querySnapshot = await getDocs(turQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let tour = doc.data();
        let tourId = doc.id;

        displayTours(tour, tourId);

        console.log("good job");
      });
    } else {
      const docSnap = await getDocs(tourRef);
      docSnap.forEach((doc) => {
        let tour = doc.data();
        let tourId = doc.id;

        let checkWord = tour.name.toLowerCase();
        let keyWord = whereGo.value.trim().toLowerCase();

        console.log(checkWord);
        console.log(keyWord);

        if (checkWordheckWord.includes(keyWord)) {
          displayTours(tour, tourId);
          console.log("heloooo");
        } else {
          console.error("can't find any matching document");
        }
      });
      console.log("thank God");
    }
  } catch (e) {
    console.error("Error fetchig document: ", e);
  }

  // const docRef = doc(db, "flights", "2KNroxoaIK0xGt23ZK3I");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }
};

addClickListener();

function addClickListener() {
  if (sFligt) {
    sFligt.addEventListener("click", test);
  }
}

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
];

function displayTours(tour, tourId) {
  tourWrap.innerHTML = "";
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("trimg");
  imgDiv.innerHTML = `<div class="torimg">
                          <img src="${tour.image}" alt="" />
                        </div>
                        <div class="boictr">
                          <div class="leftc">
                            <p class="bocon">${tour.city}</p>
                            <p class="boturn">${tour.name}</p>
                          </div>
                          <div class="rightc">
                            <p class="bocon">${tour.duration}</p>
                            <p class="boturn">$${tour.Price}</p>
                          </div>
                        </div>`;
  tourWrap.appendChild(imgDiv);

  tourDetails(tourId);
}

function tourDetails(tourId) {
  const shwTrdtl = document.querySelectorAll(".trimg");

  shwTrdtl.forEach((dtls) => {
    dtls.addEventListener("click", () => {
      console.log(tourId);
      sessionStorage.setItem("tourId", tourId);
      window.location.href = "singletour.html";
    });
  });
}
