// document.addEventListener("DOMContentLoaded", () => {
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

bestOffers();

function bestOffers() {
  const tourRef = collection(db, "tours");
  const turQuery = query(tourRef, where("bestOffer", "==", true));

  getDocs(turQuery)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          let tour = doc.data();
          let tourId = doc.id;

          displayTours(tour, tourId);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching documents: ", error);
    });
}

const slides = document.querySelectorAll(".fsc-slide");
const slideTxt = document.querySelectorAll(".sctxt");
let currentSlide = 0;

function showSlide(index) {
  const outgoingSlide = slides[currentSlide];
  const outTxt = slideTxt[currentSlide];
  outTxt.classList.remove("shanim");

  currentSlide = (index + slides.length) % slides.length;

  const incomingSlide = slides[currentSlide];
  const inTxt = slideTxt[currentSlide];

  inTxt.classList.add("shanim");

  if (incomingSlide.classList.contains("active")) {
    outgoingSlide.classList.add("active");

    incomingSlide.classList.remove("active");
  }
  incomingSlide.classList.add("incoming");
  outgoingSlide.classList.add("active");

  setTimeout(() => {
    incomingSlide.classList.remove("incoming");
    incomingSlide.classList.add("out");
    outgoingSlide.classList.remove("out");
  }, 500);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlide() {
  showSlide(currentSlide - 1);
}

document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("prev").addEventListener("click", prevSlide);

// setInterval(nextSlide, 3000);
// });

function displayTours(tour, tourId) {
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("imgdiv");
  imgDiv.setAttribute("tour_id", tourId);

  imgDiv.innerHTML = `<img src="${tour.image}" alt="" />
                        <div class="boic">
                          <div class="leftc">
                            <p class="bocon">${tour.city}</p>
                            <p class="boturn">${tour.name}</p>
                          </div>
                          <div class="rightc">
                            <p class="bocon">${tour.duration}</p>
                            <p class="boturn">${tour.Price}</p>
                          </div>
                        </div>`;
  document.getElementById("midovr").appendChild(imgDiv);

  tourDetails();
}

function tourDetails() {
  const shwTrdtl = document.querySelectorAll(".imgdiv");

  shwTrdtl.forEach((dtls) => {
    dtls.addEventListener("click", (e) => {
      const tourElement = e.target.closest(".imgdiv");
      const tourId = tourElement ? tourElement.getAttribute("tour_id") : null;
      console.log(tourId);

      sessionStorage.setItem("tourId", tourId);
      window.location.href = "../tour/singletour.html";
    });
  });
}
