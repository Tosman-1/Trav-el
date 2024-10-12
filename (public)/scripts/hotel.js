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
const forWhere = document.getElementById("fowhere");
const searchTitle = document.getElementById("srchead");
const htlWrap = document.querySelector(".htlwrap");
const sFligt = document.getElementById("sflgt");
const checks = document.querySelectorAll("ckinout");

flatpickr("#depature", {
  altInput: true,
  altFormat: "j F, Y",
  minDate: "today",
  dateFormat: "Y-m-d",
  onChange: function (selectedDates, dateStr, instance) {
    const returnPicker = document.querySelector("#return")._flatpickr;
    returnPicker.set("minDate", selectedDates[0]);
    sessionStorage.setItem("checkin", dateStr);
  },
});
flatpickr("#return", {
  altInput: true,
  altFormat: "j F, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  onChange: function (selectedDates, dateStr) {
    sessionStorage.setItem("checkout", dateStr);
  },
});

const testing = async () => {
  try {
    const hotelRef = await addDoc(collection(db, "hotels"), {
      country: "Nigeria",
      city: "Lagos",
      hotel_name: "Blues hotel",
      rating: "5",
      rooms: {
        1: {
          name: "Premium Room",
          images: [
            "../images/rooms1.webp",
            "../images/rooms12.webp",
            "../images/rooms1.webp",
          ],
          amenities: [
            "King-size bed",
            "Free wifi",
            "Bathtub",
            "Air conditioning",
            "340sqft",
            "Mini bar",
          ],
          price: "150",
        },
        2: {
          name: "Standard Room",
          images: ["../images/hotel1-1.jpg", "../images/hotel1-3.jpg"],
          amenities: [
            "Queen-size bed",
            "Free wifi",
            "Bathtub",
            "Air conditioning",
            "Water Heater",
            "Coffee table",
          ],
          price: "100",
        },
      },
      Desp: `Take advantage of recreation opportunities including an outdoor pool and a fitness center. Additional amenities at this hotel include complimentary wireless internet access, a hair salon, and tour/ticket assistance.
            Grab a bite to eat at the hotel's buffet restaurant, which features a bar/lounge, or stay in and take advantage of the room service. Quench your thirst with your favorite drink at the poolside bar.
            Featured amenities include a business center, express check-out, and complimentary newspapers in the lobby. Event facilities at this hotel consist of conference space and meeting rooms. A roundtrip airport shuttle is complimentary (available 24 hours).
            Make yourself at home in one of the 165 guestrooms featuring refrigerators and minibars. LCD televisions with satellite programming provide entertainment, while complimentary wireless internet access keeps you connected. Private bathrooms with showers feature complimentary toiletries and hair dryers. Conveniences include phones, as well as safes and desks.`,
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
      Image: "../images/hotel1-3.jpg",
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

const test = async () => {
  let destination =
    forWhere.value.charAt(0).toUpperCase() + forWhere.value.slice(1);

  try {
    const hotelRef = collection(db, "hotels");
    const htlQuery = query(
      hotelRef,
      or(
        where("country", "==", destination),
        where("city", "==", destination),
        where("hotel_name", "==", destination)
      )
    );

    const querySnapshot = await getDocs(htlQuery);

    if (!querySnapshot.empty) {
      searchTitle.innerText = `Hotels in ${destination}`;

      querySnapshot.forEach((doc) => {
        let hotel = doc.data();
        let hotelId = doc.id;

        displayHotels(hotel, hotelId);

        console.log("good job");
      });
    }
  } catch (e) {
    console.error("Error fetchig document: ", e);
  }
};

sFligt.addEventListener("click", test);

function displayHotels(hotel, hotelId) {
  htlWrap.innerHTML += `<div class="htcondiv dflex">
            <div class="htlimgs">
              <img src="${hotel.Image}" alt="" />
            </div>
            <div class="htltxts">
              <div class="httwrp">
                <div class="htlnp dflex jbtw" width="100%">
                  <p>${hotel.hotel_name}</p>
                  <p>$${hotel.Price}</p>
                </div>
                <div class="htlstar dflex jbtw" width="100%">
                  <div class="htlft dflex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#222"
                    >
                      <path
                        d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"
                      />
                    </svg>
                    <span>${hotel.rating}-star</span>
                  </div>
                  <div class="htrgt">
                    <span>per night</span>
                  </div>
                </div>
              </div>
              <div class="htamen dgrid">
                <div class="htecam">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="htlaic"
                  >
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>${hotel.facilities[0]}</span>
                </div>
                <div class="htecam">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="htlaic"
                  >
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>${hotel.facilities[1]}</span>
                </div>
                <div class="htecam">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="htlaic"
                  >
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>${hotel.facilities[3]}</span>
                </div>
                <div class="htecam">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="htlaic"
                  >
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>${hotel.facilities[4]}</span>
                </div>
                <div class="htecam">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="htlaic"
                  >
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>${hotel.facilities[5]}</span>
                </div>
                <div class="htecam">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    class="htlaic"
                  >
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                  </svg>
                  <span>${hotel.facilities[6]} </span>
                </div>
              </div>
              <div class="htlros" style="text-align: end">
                <button class="selrom">View hotel</button>
              </div>
            </div>
          </div>`;

  htlDetails(hotelId);
}

function htlDetails(hotelId) {
  const shwTrdtl = document.querySelectorAll(".selrom");

  shwTrdtl.forEach((dtls) => {
    dtls.addEventListener("click", () => {
      console.log(hotelId);
      sessionStorage.setItem("hotelId", hotelId);
      window.location.href = "singlehotel.html";
    });
  });
}
