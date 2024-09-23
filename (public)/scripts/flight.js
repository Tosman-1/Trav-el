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
const returnDate = document.getElementById("whcmbk");
const depatDate = document.getElementById("whlv");
const whereTo = document.getElementById("towh");
const whereFro = document.getElementById("fromwh");
const clasType = document.getElementById("clastpy");
const totalPass = document.querySelector(".tolnum");
const tripType = document.getElementById("trtpy");
const fliWrap = document.getElementById("fliwrp");
const fliHead = document.getElementById("flihd");
const franTxt = document.getElementById("flibot");

let allTrv = parseInt(totalPass.innerText);

const testing = async () => {
  try {
    const flightRef = await addDoc(collection(db, "flights"), {
      alogo: "../images/turks-logo.png",
      airline: "Turkish Airlines",
      airplane: "Airbus A350",
      depature: {
        city: "Abuja",
        airport: "Nnamdi Azikiwe International Airport",
        id: "ABV",
        time: "9:00 PM",
      },
      arrival: {
        city: "Paris",
        airport: "Paris Charles de Gaulle Airport",
        id: "CDG",
        time: "5:25 AM",
      },
      travel_class: "Economy",
      flight_num: "AA 101",
      duration: "6 hr 25 min",
      date: "5/12/2024",
      price: "721",
    });

    // const citiesRef = collection(db, "cities");

    // await setDoc(doc(citiesRef, "SF"), {
    //   name: "San Francisco",
    //   state: "CA",
    //   country: "USA",
    //   capital: false,
    //   population: 860000,
    //   regions: ["west_coast", "norcal"],
    // });

    console.log("success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const test = async () => {
  let destination =
    whereTo.value.charAt(0).toUpperCase() + whereTo.value.slice(1);

  let depart = whereFro.value.charAt(0).toUpperCase() + whereFro.value.slice(1);

  try {
    const flightRef = collection(db, "flights");
    const fliQuery = query(
      flightRef,
      and(
        where("travel_class", "==", clasType.innerText),
        or(
          where("arrival.city", "==", destination.trim()),
          where("arrival.id", "==", whereTo.value.trim().toUpperCase())
        ),
        or(
          where("depature.city", "==", depart.trim()),
          where("depature.id", "==", whereFro.value.trim().toUpperCase())
        )
      )
    );

    console.log(whereTo.value);

    const querySnapshot = await getDocs(fliQuery);
    querySnapshot.forEach((doc) => {
      let flight = doc.data();
      let fliPrice = parseInt(flight.price);

      let tolPrice = fliPrice * allTrv;
      fliHead.innerText = "";

      franTxt.innerText = ` Prices include required taxes + fees for ${allTrv} adult. Optional
                charges and bag fees may apply. Passenger assistance info.`;

      if (tripType.innerText == "Round trip") {
        fliHead.innerText = "Departing flights";
        const rtrFli = "shwrtfl";

        console.log("success");

        displayFli(flight, tolPrice, rtrFli);

        returnFlight(destination, depart);
        console.log(doc.data());
      } else {
        fliHead.innerText = "All flights";
        const rtrFli = "shwbkin";

        console.log("success");

        displayFli(flight, tolPrice, rtrFli);

        // returnFlight(destination, depart);
        console.log(doc.data());
      }
    });
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

function returnFlight(destination, depart) {
  const showRtFli = document.querySelectorAll(".shwrtfl");

  showRtFli.forEach((rtFlight) => {
    rtFlight.addEventListener("click", () => {
      try {
        const flightRef = collection(db, "flights");
        const fliQuery = query(
          flightRef,
          and(
            where("travel_class", "==", clasType.innerText),
            or(
              where("arrival.city", "==", depart.trim()),
              where("arrival.id", "==", whereFro.value.trim().toUpperCase())
            ),
            or(
              where("depature.city", "==", destination.trim()),
              where("depature.id", "==", whereTo.value.trim().toUpperCase())
            )
          )
        );

        getDocs(fliQuery).then((querSnapshot) => {
          querSnapshot.forEach((doc) => {
            let flight = doc.data();
            let fliPrice = parseInt(flight.price);

            let tolPrice = fliPrice * allTrv;
            fliHead.innerText = "";

            if (tripType.innerText == "Round trip") {
              fliHead.innerText = "Returning flights";
              const rtrFli = "shwbkin";

              console.log("success");

              displayFli(flight, tolPrice, rtrFli);
              console.log(doc.data());
            } else {
              console.log("condition crap");
            }
          });
        });
      } catch (e) {
        console.error("Error fetchig document: ", e);
      }
    });
  });
}

function displayFli(flight, tolPrice, rtrFli) {
  fliWrap.innerHTML = "";

  fliWrap.innerHTML += `
            <div class="flianod flihg">
              <div class="flidcon dflex">
                <div class="flileft dflex">
                  <div class="arlogo">
                    <img src="${flight.alogo}" alt="" />
                  </div>
                  <div class="artinm">
                    <span class="arrbig">${flight.depature.time} - ${flight.arrival.time}<sup>+1</sup></span>
                    <p>${flight.airline}</p>
                  </div>
                </div>
                <div class="fliright dflex">
                  <div class="flidur">
                    <span class="arrbig">${flight.duration}</span>
                    <p>${flight.depature.id} - ${flight.arrival.id}</p>
                  </div>
                  <div class="flstps">
                    <span class="arrbig">Nonstop</span>
                  </div>
                  <div class="fliprbu">
                    <span class="arrbig flprc">$${tolPrice}</span>
                    <button class="${rtrFli}">Select</button>
                  </div>
                  <div
                    class="fliic"
                    style="cursor: pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      class="updw"
                    >
                      <path
                        d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flidconts">
                <div class="aarprt">
                  <span class="arrbig">${flight.depature.time}</span>
                  <span class="fdot">&#8226; </span>
                  <span class="arrbig">
                    ${flight.depature.airport} (${flight.depature.id})</span
                  >
                  <div class="aaric">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000"
                    >
                      <path
                        d="M120-120v-80h720v80H120Zm70-200L40-570l96-26 112 94 140-37-207-276 116-31 299 251 170-46q32-9 60.5 7.5T864-585q9 32-7.5 60.5T808-487L190-320Z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="aadur">
                  <p>Travel time: ${flight.duration}</p>
                </div>
                <div class="aarprt">
                  <span class="arrbig">${flight.arrival.time}<sup>+1</sup></span>
                  <span class="fdot">&#8226; </span>
                  <span class="arrbig">
                    ${flight.arrival.airport} (${flight.arrival.id})</span
                  >
                  <div class="aaric">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000"
                    >
                      <path
                        d="M120-120v-80h720v80H120Zm622-202L120-499v-291l96 27 48 139 138 39-35-343 115 34 128 369 172 49q25 8 41.5 29t16.5 48q0 35-28.5 61.5T742-322Z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="aardtl">
                  <span>${flight.airline}</span>
                  <span class="sdot">&#8226; </span>
                  <span>${flight.travel_class}</span>
                  <span class="sdot">&#8226; </span>
                  <span>${flight.airplane}</span>
                </div>
                <div class="aarbtm">
                  <span>1 checked bag up to 23 kg included</span>
                  <span class="sdot">&#8226; </span>
                  <span>Fare non-refundable, taxes may be refundable</span>
                  <span class="sdot">&#8226; </span>
                  <span>Ticket changes for a fee</span>
                  <span class="sdot">&#8226; </span>
                </div>
              </div>
            </div>`;
}

sFligt.addEventListener("click", test);

const showflidrp = document.querySelectorAll(".shfldp");
const fliType = document.querySelectorAll(".fltype");
const fliClass = document.querySelectorAll(".flclass");
const addPass = document.querySelectorAll(".plus");
const remPass = document.querySelectorAll(".minus");
const eachTotalPass = document.querySelectorAll(".ttnu");
const fliDetails = document.querySelectorAll(".fliic");
let fliSvg;
let fPicked;

showflidrp.forEach((drop) => {
  drop.addEventListener("click", function (event) {
    closeAllDrops();
    event.stopPropagation();

    picking(showflidrp, drop);

    this.nextElementSibling.classList.remove("dnone");

    fPicked = this.querySelector("p");

    fliSvg = this.querySelector("svg");
    fliSvg.classList.add("dwop");
  });
});

window.addEventListener("click", function () {
  closeAllDrops();
  // getPassTotal();
});

fliType.forEach((type) => {
  type.addEventListener("click", () => {
    picking(fliType, type);
    if (fPicked) {
      fPicked.innerText = type.textContent;
    }
  });
});

remPass.forEach((pass) => {
  pass.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentDiv = pass.parentElement;
    const passNum = parentDiv.querySelector(".num");
    const adultNum = parentDiv.querySelector(".anum");

    if (adultNum) {
      let adult = parseInt(adultNum.textContent);

      if (adult > 1) {
        adult--;

        adultNum.innerText = adult;
      }
    } else {
      let passenger = parseInt(passNum.textContent);

      if (passenger > 0) {
        passenger--;

        passNum.innerText = passenger;
      }
    }
  });
});

addPass.forEach((pass) => {
  pass.addEventListener("click", (event) => {
    event.stopPropagation();
    const parentDiv = pass.parentElement;
    const passNum = parentDiv.querySelector(".num");
    const adultNum = parentDiv.querySelector(".anum");

    if (adultNum) {
      let adult = parseInt(adultNum.textContent);

      if (adult < 9) {
        adult++;

        adultNum.innerText = adult;
      }
    } else {
      let passenger = parseInt(passNum.textContent);

      if (passenger < 9) {
        passenger++;

        passNum.innerText = passenger;
      }
    }
  });
});

document.body.addEventListener("click", (event) => {
  const fliDel = event.target.closest(".fliic");

  if (fliDel) {
    const flDelS = fliDel.querySelector("svg");
    const flExt = fliDel.closest(".flianod");
    let showFliDel = flDelS.classList.contains("dwop");

    if (showFliDel) {
      flDelS.classList.remove("dwop");
      flExt.classList.add("flihg");
    } else {
      flDelS.classList.add("dwop");
      flExt.classList.remove("flihg");
    }
  }
});

// passTotal.addEventListener("click", (event) => {
//   event.stopPropagation();
//   getPassTotal();
// });

fliClass.forEach((classes) => {
  classes.addEventListener("click", () => {
    picking(fliClass, classes);
    if (fPicked) {
      fPicked.innerText = classes.textContent;
    }
  });
});

function getPassTotal() {
  let totalSum = 0;

  eachTotalPass.forEach((eachTolNum) => {
    totalSum += parseInt(eachTolNum.textContent);

    totalPass.innerText = totalSum;
  });
}

function picking(param1, param2) {
  param1.forEach((prevPick) => prevPick.classList.remove("factive"));

  param2.classList.add("factive");
}

function closeAllDrops() {
  document.querySelectorAll(".fldp").forEach((content) => {
    content.classList.add("dnone");
  });
  if (fliSvg) {
    fliSvg.classList.remove("dwop");
  }
  getPassTotal();
}
