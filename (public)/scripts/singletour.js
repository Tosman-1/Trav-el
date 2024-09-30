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

// const tourId = sessionStorage.getItem("tourId");
const tourId = "6Yz9967Z8TIrHJRHifqH";
const bigImg = document.getElementById("bigimg");
const topDtls = document.getElementById("topdtls");
const descrip = document.getElementById("descrip");
const imgSlide = document.getElementById("imgslide");
const whatIn = document.getElementById("whatin");
const whatExp = document.getElementById("whatexp");
const tourStart = document.getElementById("trstr");
const tourEnd = document.getElementById("trend");
const imprt = document.querySelector(".depresp");
const tourDel = document.querySelectorAll(".whte");

console.log(tourId);

function getDetails() {
  const docRef = doc(db, "tours", tourId);
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      const singleTour = docSnap.data();
      console.log("Document data:", singleTour);

      bigImg.style.backgroundImage = `url(${singleTour.image})`;

      const tourName = document.createElement("h3");
      tourName.innerText = singleTour.name;

      bigImg.appendChild(tourName);

      const date = document.createElement("div");
      date.classList.add("trlidt");
      date.innerHTML = `<p>Date</p>
                        <h3>${shwDate()}</h3>`;

      const duration = document.createElement("div");
      duration.classList.add("trlidt");
      duration.innerHTML = `<p>Duration</p>
                            <h3>${singleTour.duration}</h3>`;

      const price = document.createElement("div");
      price.classList.add("trlidt");
      price.innerHTML = `<p>price</p>
                          <h3>$${singleTour.Price}</h3>`;

      const space = document.createElement("div");
      space.classList.add("trlidt");
      space.innerHTML = `<p>Max per group</p>
                         <h3>${singleTour.space}</h3>`;

      const bookNow = document.createElement("div");
      bookNow.classList.add("trlidt");
      bookNow.classList.add("bdrgt");
      bookNow.innerHTML = `<div class="buut">
                             <button id="">BOOK NOW</button>
                           </div>`;

      topDtls.appendChild(date);
      topDtls.appendChild(duration);
      topDtls.appendChild(price);
      topDtls.appendChild(space);
      topDtls.appendChild(bookNow);

      descrip.innerText = singleTour.Descrp;

      singleTour.images &&
        singleTour.images.forEach((img) => {
          const eachImg = document.createElement("div");
          eachImg.classList.add("trcrimg");

          eachImg.innerHTML = `<img src="${img}" alt="" />`;
          imgSlide.appendChild(eachImg);
          runCarousel();
        });

      const inList = document.createElement("ul");
      singleTour.whats_in.forEach((list) => {
        inList.innerHTML += `<li>
                              <span>${list}</span>
                            </li>`;
      });

      whatIn.appendChild(inList);

      const expContent = document.createElement("span");
      expContent.innerText = singleTour.what_exp;

      whatExp.appendChild(expContent);

      tourStart.innerText += singleTour.location.start;
      tourEnd.innerText += singleTour.location.end;
      imprt.innerText += `Please check your booking for the start time of the Vatican ENGLISH tour. Arrive 20 minutes before at the meeting point ( ${singleTour.location.start} ) for check-in. Thank you !`;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  });
}

getDetails();

function shwDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month =
    month == 1
      ? "Jan"
      : month == 2
      ? "Feb"
      : month == 3
      ? "Mar"
      : month == 4
      ? "Apr"
      : month == 5
      ? "May"
      : month == 6
      ? "June"
      : month == 7
      ? "July"
      : month == 8
      ? "Aug"
      : month == 9
      ? "Sept"
      : month == 10
      ? "Oct"
      : month == 11
      ? "Nov"
      : "Dec";

  return `${day} ${month} ${year}`;
}

function runCarousel() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".trcrimg");
  const prev = document.getElementById("prlft");
  const next = document.getElementById("nxrgt");
  const totalSlides = slides.length;

  function updateSlidePosition() {
    const carouselInner = document.querySelector(".trcrinner");
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  prev.addEventListener("click", prevSlide);

  next.addEventListener("click", nextSlide);

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
}

tourDel.forEach((toDels) => {
  let showtDel = true;

  toDels.addEventListener("click", () => {
    const toSvg = toDels.querySelector("svg");

    if (showtDel) {
      toSvg.classList.add("dwop");
      toDels.classList.remove("whhgt");

      showtDel = false;
    } else {
      toSvg.classList.remove("dwop");
      toDels.classList.add("whhgt");

      showtDel = true;
    }
  });
});
