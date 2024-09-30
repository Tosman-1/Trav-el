import { config } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
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

// const HotelId = sessionStorage.getItem("HotelId");
const hotelId = "h1pp7Kc3KuY4DdRfdXOz";
const bigImg = document.getElementById("bigimg");
const htlName = document.getElementById("citry");
const htlPrice = document.getElementById("htprc");
const htlDescrip = document.getElementById("decrpt");
const imageSlide = document.getElementById("imgSld");
const facWrap = document.getElementById("facwrp");

const docRef = doc(db, "hotels", hotelId);
getDoc(docRef).then((docSnap) => {
  if (docSnap.exists()) {
    const singleHotel = docSnap.data();
    console.log("Document data:", singleHotel);

    bigImg.style.backgroundImage = `url(${singleHotel.Image})`;
    htlName.innerHTML = `<span>${
      singleHotel.city
    }, ${singleHotel.country.toLowerCase()}</span>
              <p>${singleHotel.hotel_name}</p>`;

    htlPrice.innerHTML = ` <span>Price per night from</span>
                         <p>$${singleHotel.Price}</p>`;

    htlDescrip.innerText = singleHotel.Desp;

    singleHotel.Images &&
      singleHotel.Images.forEach((img) => {
        const eachImg = document.createElement("div");
        eachImg.classList.add("trcrimg");

        eachImg.innerHTML = `<img src="${img}" alt="" />`;
        imageSlide.appendChild(eachImg);

        runCarousel("topcarcon", "prlft", "nxrgt");
      });

    const facList = document.createElement("ul");
    singleHotel.facilities.forEach((fac) => {
      facList.innerHTML += `<li>${fac}</li>`;
      // console.log(fac);
    });
    facWrap.appendChild(facList);
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
});

// runCarousel();

function runCarousel(carouselContainerId, prevBtn, nextBtn) {
  const carouselContainer = document.getElementById(carouselContainerId);
  const carouselInner = carouselContainer.querySelector(".trcrinner");
  const prev = document.getElementById(prevBtn);
  const next = document.getElementById(nextBtn);

  let currentSlide = 0;
  const totalSlides = carouselInner.children.length;

  function updateSlidePosition() {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    }
    updateSlidePosition();
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    }
    updateSlidePosition();
  }

  prev.addEventListener("click", prevSlide);
  next.addEventListener("click", nextSlide);
}

runCarousel("smalldwcar", "dwlft", "dwrgt");
