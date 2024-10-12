import { config } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
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

const hotelId = sessionStorage.getItem("hotelId");
const bigImg = document.getElementById("bigimg");
const htlName = document.getElementById("citry");
const htlPrice = document.getElementById("htprc");
const htlDescrip = document.getElementById("decrpt");
const imageSlide = document.getElementById("imgSld");
const facWrap = document.getElementById("facwrp");
const shwOverview = document.getElementById("trdesc");
const shwRoom = document.getElementById("shwroms");
const roomBtn = document.querySelector(".bdrgt");
const scrollBtns = document.querySelectorAll(".trdnrm");
const scrollWhere = document.querySelectorAll(".trdscrl");
const disRooms = document.getElementById("shwroms");
const checkIn = document.getElementById("comein");
const checkOut = document.getElementById("going");

flatpickr("#comein", {
  altInput: true,
  altFormat: "j F, Y",
  minDate: "today",
  dateFormat: "Y-m-d",
  defaultDate: sessionStorage.getItem("checkin")
    ? sessionStorage.getItem("checkin")
    : "",
  onChange: function (selectedDates, dateStr, instance) {
    const returnPicker = document.querySelector("#going")._flatpickr;
    returnPicker.set("minDate", selectedDates[0]);
  },
});
flatpickr("#going", {
  altInput: true,
  altFormat: "j F, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  defaultDate: sessionStorage.getItem("checkin")
    ? sessionStorage.getItem("checkout")
    : "",
});

getHotelDocs();

function getHotelDocs() {
  if (hotelId) {
    const docRef = doc(db, "hotels", hotelId);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const singleHotel = docSnap.data();
        const rooms = singleHotel.rooms;
        // console.log("Document data:", singleHotel);

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

            runCarousel(".topcarcon", ".prlft", ".nxrgt");
          });

        const facList = document.createElement("ul");
        singleHotel.facilities.forEach((fac) => {
          facList.innerHTML += `<li>${fac}</li>`;
          // console.log(fac);
        });
        facWrap.appendChild(facList);

        Object.keys(rooms).forEach((key) => {
          const room = rooms[key];
          showRooms(room, singleHotel, rooms);
          // console.log(room);
        });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }
}

roomBtn.addEventListener("click", () => {
  if (shwRoom.classList.contains("dnone")) {
    shwRoom.classList.remove("dnone");
    shwOverview.classList.add("dnone");
  }
});

scrollBtns.forEach((scrolls, index) => {
  scrolls.addEventListener("click", () => {
    if (!shwRoom.classList.contains("dnone")) {
      shwRoom.classList.add("dnone");
      shwOverview.classList.remove("dnone");
    }
    scrollWhere[index].scrollIntoView({ behavior: "smooth", block: "end" });
  });
});

// runCarousel();
function runCarousel(carouselContainerId, prevBtn, nextBtn) {
  const carouselContainer = document.querySelectorAll(carouselContainerId);

  carouselContainer.forEach((container) => {
    const carouselInner = container.querySelector(".trcrinner");

    let currentSlide = 0;
    const totalSlides = carouselInner.children.length;

    // const totalSlides = inner.children.length;

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

    const prev = container.querySelector(prevBtn);
    const next = container.querySelector(nextBtn);

    prev.addEventListener("click", prevSlide);
    next.addEventListener("click", nextSlide);
  });
}

function ShowBookin(paramtoo, paramso) {
  const bokinMod = document.querySelector(".bokmod");
  const shBokBtn = document.querySelectorAll(".shwbkin");

  shBokBtn.forEach((bokinBtn, index) => {
    bokinBtn.addEventListener("click", () => {
      if (checkIn.value == "" || checkOut.value == "") {
        alert("Pick check-in and check-out date");
      } else {
        const param = paramso[index + 1];

        if (bokinMod.classList.contains("dnone")) {
          bokinMod.classList.remove("dnone");
        }
        fillCnfrBokin(paramtoo, param, index);
      }
    });
  });
}

function showRooms(param, paramtoo, paramso) {
  disRooms.innerHTML += `<div class="htpodiv dflex">
              <div class="htlpos smalldwcar">
                <div class="trcrinner dntdis" ></div>
                <button class="jstmv left dwlft">&#10094;</button>
                <button class="jstmv right dwrgt">&#10095;</button>
              </div>
              <div class="htltxts">
                <div class="httwrp">
                  <div class="htlnp dflex jbtw" width="100%">
                    <p>${param.name}</p>
                    <p>$${param.price}</p>
                  </div>
                  <div class="htlstar dflex jbtw" width="100%">
                    <div class="htlft dflex">
                      <span>.2 guests</span>
                    </div>
                    <div class="htrgt">
                      <span>per night</span>
                    </div>
                  </div>
                </div>
                <div class="htamen lvemel dgrid">
                  
                </div>
                <div class="htlros" style="text-align: end">
                  <button class="shwbkin">Select room</button>
                </div>
              </div>
            </div>`;

  stillDisplay(param);
  ShowBookin(paramtoo, paramso);
  runCarousel(".smalldwcar", ".dwlft", ".dwrgt");
}

function stillDisplay(param) {
  param.images.forEach((img) => {
    const carImgWrap = document.createElement("div");
    const carImg = document.createElement("img");

    const allCont = document.querySelectorAll(".dntdis");

    carImgWrap.classList.add("romimg");
    carImg.src = img;

    carImgWrap.appendChild(carImg);
    allCont.forEach((cont) => {
      cont.appendChild(carImgWrap);
    });
  });

  param.amenities.forEach((amen) => {
    const amenWrap = document.createElement("div");
    const amenIn = document.createElement("span");
    const amcontainer = document.querySelectorAll(".lvemel");

    amenWrap.classList.add("htecam");

    amenWrap.innerHTML = `<svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                                class="htlaic"
                              >
                                <path
                                  d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                                />
                              </svg>`;
    amenIn.innerText = amen;

    amenWrap.appendChild(amenIn);
    amcontainer.forEach((container) => {
      container.appendChild(amenWrap);
    });
  });
}

function convertDate(dateStr) {
  // Split the input date string by the dash (-)
  const [day, month, year] = dateStr.split("-");

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert the month from num to the name
  const monthName = months[parseInt(month, 10) - 1];

  // Return the date in the new format
  return `${day} ${monthName} ${year}`;
}

function fillCnfrBokin(paramtoo, param, index) {
  const hotelName = document.getElementById("htname");
  const roomName = document.getElementById("rmname");
  const checkInOut = document.getElementById("ckcodte");
  const guest = document.getElementById("gustnm");
  const totalPrice = document.getElementById("alldyprc");
  const totalInNgn = document.getElementById("detopr");

  let price = parseInt(param.price);
  let dateIn = new Date(checkIn.value);
  let dateOut = new Date(checkOut.value);

  // Calculate the difference in time (milliseconds) and convert it to days
  let diffInTime = dateOut - dateIn;
  let diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days
  let theTolPrc = parseInt(diffInDays) * price * 1500;

  if (diffInDays > 0) {
    totalPrice.innerText += parseInt(diffInDays) * price;
  }

  hotelName.innerText = paramtoo.hotel_name;
  roomName.innerText = param.name;
  checkInOut.innerText = `${convertDate(checkIn.value)} - ${convertDate(
    checkOut.value
  )} (${diffInDays}nights)`;

  totalInNgn.innerHTML += `<p id="deto">
                            NGN ${theTolPrc}
                            <span id="prrte">@1500/$</span>
                          </p>`;

  const bokin = {
    id: hotelId,
    name: paramtoo.hotel_name,
    roomname: param.name,
    roomId: index + 1,
    date: {
      in: checkIn.value,
      out: checkOut.value,
    },
    duration: diffInDays,
    type: "hotel",
    price: theTolPrc,
  };

  sessionStorage.setItem("bokin", JSON.stringify(bokin));
}
