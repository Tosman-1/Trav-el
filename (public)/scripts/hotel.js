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
