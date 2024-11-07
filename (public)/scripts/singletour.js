import { config } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
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

const tourId = sessionStorage.getItem("tourId");
console.log(tourId);

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
const toDate = document.getElementById("whentoo");
const theDay = new Date();
const day = theDay.getDate();
const month = theDay.getMonth() + 1;
const year = theDay.getFullYear();
const today = `${year}-${month}-${day}`;

flatpickr("#whentoo", {
  altInput: true,
  altFormat: "j F, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  defaultDate: sessionStorage.getItem("tourDate") ?? today,
});

function getDetails() {
  const docRef = doc(db, "tours", tourId);

  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      const singleTour = docSnap.data();
      document.title = document.title = `Trav-el/Tours/${singleTour.name}`;

      bigImg.style.backgroundImage = `linear-gradient(#25252763, #25252763), url(${singleTour.image})`;

      const tourName = document.createElement("h3");
      tourName.innerText = singleTour.name;

      bigImg.appendChild(tourName);

      const date = document.createElement("div");
      date.classList.add("trlidt");
      date.innerHTML = `<p>Date</p>
                        <h3>${shwDate(toDate.value || today)}</h3>`;

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
      space.innerHTML = `<p>Tourists</p>
                         <input type="text" value="2" class="jststle">`;

      const bookNow = document.createElement("div");
      bookNow.classList.add("trlidt");
      bookNow.classList.add("bdrgt");
      bookNow.innerHTML = `<div class="buut">
                             <button class="shwbkin">BOOK NOW</button>
                           </div>`;

      topDtls.appendChild(date);
      topDtls.appendChild(duration);
      topDtls.appendChild(price);
      topDtls.appendChild(space);
      topDtls.appendChild(bookNow);

      ShowBookin(singleTour);

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
      imprt.innerText += `Please check your booking for the start time of the tour. Arrive 20 minutes before at the meeting point ( ${singleTour.location.start} ) for check-in. Thank you !`;
    } else {
      console.log("No such document!");
    }
  });
}

const formatPrice = Intl.NumberFormat("en-NG");

function fillbkin(params) {
  const tourName = document.getElementById("htname");
  const tourDate = document.getElementById("ckcodte");
  const tourists = document.getElementById("gustnm");
  const toustNum = document.querySelector(".jststle");
  const tourTime = document.getElementById("trtime");
  const tourDur = document.getElementById("trdur");
  const totalInNgn = document.getElementById("detopr");
  const totalPrice = document.getElementById("alldyprc");

  tourName.innerText = params.name;
  tourists.innerText = toustNum.value;
  tourDate.innerText = shwDate(toDate.value || today);
  tourTime.innerText = params.time || "The time will be sent to your email ";
  tourDur.innerText = params.duration;
  totalPrice.innerText = "";
  totalPrice.innerText = `$${
    parseInt(params.Price) * parseInt(toustNum.value)
  }`;

  const theTolPrc = parseInt(params.Price) * parseInt(toustNum.value) * 1500;

  totalInNgn.innerHTML += `<p id="deto">
                            NGN ${formatPrice.format(theTolPrc)}
                            <span id="prrte">@1500/$</span>
                          </p>`;

  let formattedDate = theDay.toLocaleDateString();
  let formattedTime = theDay.toLocaleTimeString();

  const bokin = {
    id: tourId,
    name: params.name,
    tourist: toustNum,
    date: toDate.value || today,
    bookdate: `${formattedDate} ${formattedTime}`,
    duration: `${params.duration}`,
    type: "tour",
    price: theTolPrc,
  };

  sessionStorage.setItem("bokin", JSON.stringify(bokin));
}

getDetails();

function shwDate(dateStr) {
  const [year, month, day] = dateStr.split("-");

  // Array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert the month from num to the name
  const monthName = months[parseInt(month, 10) - 1];

  // Return the date in the new format
  return `${day} ${monthName} ${year}`;
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

function ShowBookin(params) {
  const bokinMod = document.querySelector(".bokmod");
  const shBokBtn = document.querySelectorAll(".shwbkin");

  shBokBtn.forEach((bokinBtn, index) => {
    bokinBtn.addEventListener("click", () => {
      // if (checkIn.value == "" || checkOut.value == "") {
      //   alert("Pick check-in and check-out date");
      // } else {
      //   const param = paramso[index + 1];

      if (bokinMod.classList.contains("dnone")) {
        bokinMod.classList.remove("dnone");
      }

      fillbkin(params);
      // }
    });
  });
}
