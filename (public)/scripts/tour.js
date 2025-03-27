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
const allCity = document.querySelectorAll(".tpddiv");
const rome = document.getElementById("rome");
let loaderTimeout;

flatpickr("#when", {
  altInput: true,
  altFormat: "j F, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  onChange: function (selectedDates, dateStr) {
    sessionStorage.setItem("tourDate", dateStr);
  },
});

const testing = async () => {
  try {
    const tourRef = await addDoc(collection(db, "tours"), {
      country: "South korea",
      city: "South-korea",
      name: "Busan Private Tour with licensed tour guide + private vehicle",
      duration: "11 hr",
      Descrp: `dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ulla.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
             .`,
      Price: "26",
      whats_in: [
        "Entry to Stonehenge (with entry option selected)",
        "Entry to Roman Baths (with option selected)",
        "Entry to Jane Austen Museum (with option selected)",
        "Professional Guide",
        "Transportation by Air-Conditioned Coach",
      ],
      what_exp: `Depart central London by air-conditioned coach and venture into the English countryside. As you travel, hear interesting facts about the region and your first destination — the prehistoric monument of Stonehenge on Salisbury Plain.On arrival, enjoy time to explore this atmospheric site at leisure. Head inside, collect an informative audio guide, and ride the shuttle or follow the pathways to the UNESCO-listed stones that date back some 4,500 years.`,
      image: "../images/korea-low.jpeg",
      images: [
        "../images/f0.jpg",
        "../images/korea-low.jpeg",
        "../images/f0.jpg",
        "../images/korea-low.jpeg",
      ],
      location: {
        start: "Victoria Coach Station, 164 Buckingham Palace Rd, south korea",
        end: "Gloucester Road Station, Gloucester Rd, South Kensington, south korea",
      },
      space: "16",
      bestOffer: false,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const test = async () => {
  let destination =
    whereGo.value.charAt(0).toUpperCase() + whereGo.value.slice(1);

  try {
    const tourRef = collection(db, "tours");
    const turQuery = query(
      tourRef,
      or(where("country", "==", destination), where("city", "==", destination))
    );

    if (destination !== "") {
      tourWrap.innerHTML = "";

      tourWrap.innerHTML = `<div id="loader-wrapper">
                            <div class="loader"></div>
                          </div>`;

      loaderTimeout = setTimeout(() => {
        tourWrap.innerHTML = "";
        tourWrap.innerHTML = `<div class="errmg">Something is wrong</div>`;
      }, 20000);
    }
    const querySnapshot = await getDocs(turQuery);
    if (!querySnapshot.empty) {
      tourWrap.innerHTML = "";

      querySnapshot.forEach((doc) => {
        let tour = doc.data();
        let tourId = doc.id;

        displayTours(tour, tourId);
      });
    } else {
      const docSnap = await getDocs(tourRef);
      tourWrap.innerHTML = "";

      let matchTour = false;

      docSnap.forEach((doc) => {
        let tour = doc.data();
        let tourId = doc.id;

        let checkWord = tour.name.toLowerCase();
        let keyWord = whereGo.value.trim().toLowerCase();

        if (checkWord.includes(keyWord)) {
          displayTours(tour, tourId);
          matchTour = true;
        }
      });
      if (!matchTour) {
        clearTimeout(loaderTimeout);
        tourWrap.innerHTML = "";
        tourWrap.innerHTML = `<div class="errmg">Uh-oh! Looks like we couldn't find anything. Maybe try a different search?</div>`;
      }
    }
  } catch (e) {
    console.error("Error fetchig document: ", e);
  }
};

addClickListener();

function addClickListener() {
  if (sFligt) {
    sFligt.addEventListener("click", test);
  }
}

allCity.forEach((city) => {
  city.addEventListener("click", () => {
    if (city.getAttribute("data-city")) {
      whereGo.value = city.getAttribute("data-city");
      test();
    }
  });
});

// let tours = [
//   {
//     country: "Italy",
//     city: "Rome",
//     tourName: "Tour of the Vatican, Sistine Chapel & St. Peter's Basilica",
//     tourDuration: "2 hr",
//     tourDescrip: `Make the most of your valuable vacation time by skipping the line at the Vatican Museums.
//                   You save hours waiting by booking a group tour, and get engaging commentary from your guide as you explore.
//                   Admission is included to the Sistine Chapel and St. Peter's Basilica; follow your guide on a carefully-crafted
//                    itinerary to ensure you don't miss a thing.`,
//     tourPrice: "80",
//     tourAm: [
//       "An expert tour guide with over 10 years of experience. Excellent story teller.",
//       "Guaranteed skip-the-line access to the Vatican Museums",
//       "Admission tickets to the Vatican Museums, Sistine Chapel and St. Peter's Basilica",
//       "Entry/Admission - Vatican Museums",
//       "Entry/Admission - Sistine Chapel",
//       "Entry/Admission - St. Peter's Basilica",
//       "Guaranteed to skip the lines",
//     ],
//     what_to_expect: `Meet your guide and group in the Borgo neighborhood, a short walk away from the St. Peter's Square, for an introductory briefing for this Vatican Museums skip-the-line tour. Then, head to the square as a group, passing along the Via della Conciliazione along the way, while your guide provides commentary about the Vatican and its history.

//                     Arrive at St. Peter's Square and head into the Vatican Museums, taking advantage of your special skip-the-line admission ticket to speed your tour along. Once inside, listen to your guide provide commentary as you take in the sculptures, paintings, and tapestries that flank the main halls.`,
//     tourImage: "../images/lazio-low.jpeg",
//     tourImages: [],
//     tourDate: "05-10-2024 - 20-10-2024",
//     location: {
//       start: "Via Plauto, 17, 00193 Roma RM, Italy",
//       end: "St. Peter's Basilica, Piazza San Pietro, 00120 Città del Vaticano, Vatican City",
//     },
//     space: "25",
//     bestOffer: true,
//   },
// ];

function displayTours(tour, tourId) {
  clearTimeout(loaderTimeout);

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("trimg");
  imgDiv.innerHTML = `<div class="torimg" >
                          <img src="${tour.image}" alt="" tourid = "${tourId}" class="rrtim"/>
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

  tourDetails();
}

function tourDetails() {
  const shwTrdtl = document.querySelectorAll(".rrtim");

  shwTrdtl.forEach((dtls) => {
    dtls.addEventListener("click", (e) => {
      const tourId = e.target.getAttribute("tourid");
      // console.log(e.target);

      sessionStorage.setItem("tourId", tourId);

      window.location.href = "singletour.html";
    });
  });
}
