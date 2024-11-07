// Your web app's Firebase configuration
import { config } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  updateDoc,
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
const dprtSeats = document.querySelector(".dsitdiv");
const rtrnSeats = document.querySelector(".rsitdiv");
const agreeTerms = document.getElementById("agree");
const payBtn = document.getElementById("bkndpy");
const formatPrice = Intl.NumberFormat("en-NG");
let loaderTimeout;
let flightType;
let depPrice;
let retPrice;
let returnFliId;
let departFliId;

flatpickr("#whlv", {
  altInput: true,
  altFormat: "j F, Y",
  minDate: "today",
  dateFormat: "d-m-Y",
  onChange: function (selectedDates, dateStr, instance) {
    const returnPicker = document.querySelector("#whcmbk")._flatpickr;
    returnPicker.set("minDate", selectedDates[0]);
  },
});
let returnCal = flatpickr("#whcmbk", {
  altInput: true,
  altFormat: "j F, Y",
  dateFormat: "d-m-Y",
  minDate: "today",
});

function convertDate(dateStr) {
  // Split the input date string by the dash (-)
  const [year, month, day] = dateStr.split("-");

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

const testing = async () => {
  try {
    const flightRef = await addDoc(collection(db, "flights"), {
      alogo: "../images/turks-logo.png",
      airline: "Turkish Airlines",
      airplane: "Airbus A350",
      depature: {
        city: "Lagos",
        airport: "Murtala Mohammed Airport",
        id: "LOS",
        time: "8:00 PM",
      },
      arrival: {
        city: "London",
        airport: "London City Airport",
        id: "LCY",
        time: "6:25 AM",
      },
      flight_num: "AA 101",
      duration: "6 hr 25 min",
      date: "5/12/2024",
      price: "721",
    });

    console.log("success");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const test = async () => {
  let destination =
    whereTo.value.charAt(0).toUpperCase() + whereTo.value.slice(1);

  let depart = whereFro.value.charAt(0).toUpperCase() + whereFro.value.slice(1);

  if (destination !== "" || depart !== "") {
    fliWrap.innerHTML = "";

    fliWrap.innerHTML = `<div id="loader-wrapper">
                        <div class="loader"></div>
                      </div>`;

    loaderTimeout = setTimeout(() => {
      fliWrap.innerHTML = "";
      fliWrap.innerHTML = `<div class="errmg">Something is wrong</div>`;
    }, 9000);
  }

  try {
    const flightRef = collection(db, "flights");
    const fliQuery = query(
      flightRef,
      and(
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

    const querySnapshot = await getDocs(fliQuery);
    if (!querySnapshot.empty) {
      fliWrap.innerHTML = "";
      querySnapshot.forEach((doc) => {
        let flight = doc.data();
        let flightId = doc.id;
        let fliPrice = parseInt(flight.price);
        let allTrv = parseInt(totalPass.innerText);
        flightType = "depart";

        departFliId = flightId;

        let tolPrice = runPrice(fliPrice, allTrv);

        console.log(runPrice(fliPrice, allTrv));

        depPrice = tolPrice;
        fliHead.innerText = "";

        destinationSeat(flight);

        franTxt.innerText = ` Prices include required taxes + fees for ${allTrv} adult. Optional charges and bag fees may apply. Passenger assistance info.`;

        if (tripType.innerText == "Round trip") {
          fliHead.innerText = "Departing flights";
          const rtrFli = "shwrtfl";

          displayFli(flight, tolPrice, rtrFli);

          displaySeats(flight, flightId);

          returnFlight(destination, depart, flightId);

          cnfrmDetails(
            flight,
            "Departing flight",
            convertDate(depatDate.value)
          );
        } else {
          fliHead.innerText = "All flights";
          const rtrFli = "shwbkin";

          displayFli(flight, tolPrice, rtrFli);

          displaySeats(flight, flightId);

          cnfrmDetails(
            flight,
            "Departing flight",
            convertDate(depatDate.value)
          );

          ShowBookin(flightId);
        }
      });
    }
  } catch (e) {
    console.error("Error fetchig document: ", e);
  }
};

function runPrice(params, allTrv) {
  let toPrice;

  let pecPrice = params * allTrv;

  if (clasType.innerText == "First") {
    toPrice = pecPrice * 2;
  } else if (clasType.innerText == "Business") {
    toPrice = (pecPrice * 60) / 100 + pecPrice;
  } else if (clasType.innerText == "Premium") {
    toPrice = (pecPrice * 40) / 100 + pecPrice;
  } else {
    toPrice = pecPrice;
  }

  return toPrice;
}
function returnFlight(destination, depart, flightId) {
  const showRtFli = document.querySelectorAll(".shwrtfl");
  flightType = "return";

  showRtFli.forEach((rtFlight) => {
    rtFlight.addEventListener("click", () => {
      sessionStorage.setItem("departFlight", flightId);

      fliWrap.innerHTML = "";

      fliWrap.innerHTML = `<div id="loader-wrapper">
                        <div class="loader"></div>
                      </div>`;

      loaderTimeout = setTimeout(() => {
        fliWrap.innerHTML = "";
        fliWrap.innerHTML = `<div class="errmg">Something is wrong</div>`;
      }, 9000);

      try {
        const flightRef = collection(db, "flights");
        const fliQuery = query(
          flightRef,
          and(
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
          if (!querSnapshot.empty) {
            fliWrap.innerHTML = "";
            querSnapshot.forEach((doc) => {
              let flight = doc.data();
              let flightId = doc.id;
              let fliPrice = parseInt(flight.price);
              let allTrv = parseInt(totalPass.innerText);

              returnFliId = flightId;

              let tolPrice = runPrice(fliPrice, allTrv);

              retPrice = tolPrice;
              fliHead.innerText = "";

              if (tripType.innerText == "Round trip") {
                fliHead.innerText = "Returning flights";
                const rtrFli = "shwbkin";

                displayFli(flight, tolPrice, rtrFli);

                displaySeats(flight, flightId);

                cnfrmDetails(
                  flight,
                  "Returning flight",
                  convertDate(returnDate.value)
                );

                ShowBookin(flightId);
              }
            });
          }
        });
      } catch (e) {
        console.error("Error fetchig document: ", e);
      }
    });
  });
}

function ShowBookin(flightId) {
  const bokinMod = document.querySelector(".bokmod");
  const shBokBtn = document.querySelectorAll(".shwbkin");

  shBokBtn.forEach((bokinBtn) => {
    bokinBtn.addEventListener("click", () => {
      let theTolPrc = (depPrice + retPrice) * 1500;

      sessionStorage.setItem(
        flightType == "depart" ? "departFlight" : "returnFlight",
        flightId
      );

      if (bokinMod.classList.contains("dnone")) {
        bokinMod.classList.remove("dnone");
      }
      passengersDetails();
    });
  });

  saveBokin();
}

function updateSeats(flightId, seats) {
  payBtn.addEventListener("click", () => {
    setTimeout(() => {
      if (sessionStorage.getItem("paid")) {
        updateDoc(doc(db, "flights", flightId), { seats })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    }, 10000);
  });
}

function cnfrmDetails(params, paramFlight, paramsDate) {
  const overDiv = document.querySelector(".dprtfli");
  const headTitle = document.createElement("div");
  const theTitle = document.createElement("h3");
  const theDate = document.createElement("span");

  headTitle.classList.add("dpfhd");

  theTitle.innerText = paramFlight;
  theDate.innerText = paramsDate;

  headTitle.appendChild(theTitle);
  headTitle.appendChild(theDate);
  overDiv.appendChild(headTitle);

  overDiv.innerHTML += ` <div class="dpbxsd">
                    <div class="dpdt dflex jbtw">
                      <div class="flidconts">
                        <div class="aarprt">
                          <span class="arrbig">${params.depature.time}</span>
                          <span class="fdot">&#8226; </span>
                          <span class="arrbig"> ${params.depature.city} (${params.depature.id})</span>
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
                        <div class="dtlne"></div>
                        <div class="aarprt">
                          <span class="arrbig">${params.arrival.time}<sup>+1</sup></span>
                          <span class="fdot">&#8226; </span>
                          <span class="arrbig"> ${params.arrival.city} (${params.arrival.id})</span>
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
                      </div>
                      <div class="arlogo">
                        <img src=${params.alogo} alt="" />
                      </div>
                    </div>
                    <div class="abtck">
                      <p>Ticket: <span>changeable* - non-refundable*</span></p>
                    </div>
                  </div>`;
}

function saveBokin() {
  const totalInNgn = document.getElementById("detopr");

  const shwUsdPrice = document.querySelector(".arrbigp");
  shwUsdPrice.innerText = retPrice
    ? `USD ${depPrice + retPrice}`
    : `USD ${depPrice}`;

  let currentDate = new Date();

  let formattedDate = currentDate.toLocaleDateString();
  let formattedTime = currentDate.toLocaleTimeString();

  let theTolPrc = retPrice ? (depPrice + retPrice) * 1500 : depPrice * 1500;

  console.log(theTolPrc);

  totalInNgn.innerHTML += `<p id="deto">
                            NGN ${formatPrice.format(theTolPrc)}
                            <span id="prrte">@1500/$</span>
                          </p>`;

  const bokin = {
    departId: departFliId,
    returnId: returnFliId || "one way",
    type: "flight",
    flitype: tripType.innerText,
    date: {
      depart: depatDate.value,
      retun: returnDate.value,
    },
    price: theTolPrc,
    bookdate: `${formattedDate} ${formattedTime}`,
  };

  sessionStorage.setItem("bokin", JSON.stringify(bokin));
}

// function to add input for passenger details if there are more than one passenger
function passengersDetails() {
  const inputNum = totalPass.innerText;

  if (inputNum > 1) {
    const passInputDiv = document.querySelector(".pssinner");

    for (let i = 2; i <= inputNum; i++) {
      passInputDiv.innerHTML += `
         <div class="psbdwp">
                    <p>Passenger ${i} :</p>
                    <div class="psgnm">
                      <div class="rtn">
                        <label class="label">Title*</label>
                        <select name="title" class="select titlens">
                          <option value=""></option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                        </select>
                      </div>
                      <div class="rtnm">
                        <label class="label">Full-name*</label>
                        <input
                          type="text"
                          placeholder="First name   Last name"
                          class="fllname"
                        />
                      </div>
                    </div>
                  </div>
      `;
    }
  }
}

function destinationSeat(flight) {
  const whereToSeat = document.querySelectorAll(".wrto");
  const whereFroSeat = document.querySelectorAll(".wrfm");

  whereToSeat.forEach((toSeat) => {
    toSeat.innerText = flight.arrival.id;
  });

  whereFroSeat.forEach((froSeat) => {
    froSeat.innerText = flight.depature.id;
  });
}

function displaySeats(flight, flightId) {
  let seats = flight.seats ?? new Array(90).fill(false);

  seats.forEach((seat, index) => {
    const maxSeatNum = totalPass.innerText;
    const echSeat = document.createElement("div");
    const seatDtls = document.createElement("div");
    seatDtls.classList.add("shstdt");
    echSeat.classList.add("echsit");

    // Apply a class based on seat availability
    echSeat.classList.add(seat ? "taken" : "available");

    echSeat.appendChild(seatDtls);

    flightType == "return"
      ? rtrnSeats.appendChild(echSeat)
      : dprtSeats.appendChild(echSeat);

    generateRowCol();

    // Set up the click event to handle seat picking
    echSeat.addEventListener("click", () => {
      // echSeat.classList.toggle("selected");
      // const selectedSeats = document.querySelectorAll(".selected");

      // if (selectedSeats.length > maxSeatNum) {
      //   alert(`You can only select up to ${maxSeatNum} seats.`);
      //   echSeat.classList.remove("selected");
      // } else {
      if (echSeat.classList.contains("picked")) {
        seats[index] = false;
        echSeat.classList.remove("picked");
        echSeat.classList.remove("selected");
      } else {
        echSeat.classList.add("picked");
        seats[index] = true;
      }
      // }
    });
  });
  updateSeats(flightId, seats);
}

function displaySeat(flight, flightId, flightType) {
  let seats = flight.seats ?? new Array(90).fill(false);

  // Track selected seats separately for departure and return flights
  let selectedDepartureSeats = [];
  let selectedReturnSeats = [];
  const maxSeatNum = parseInt(totalPass.innerText); // Assuming this is a number

  seats.forEach((seat, index) => {
    const echSeat = document.createElement("div");
    const seatDtls = document.createElement("div");
    seatDtls.classList.add("shstdt");
    echSeat.classList.add("echsit");

    // Apply a class based on seat availability
    echSeat.classList.add(seat ? "taken" : "available");

    echSeat.appendChild(seatDtls);

    // Append seats to the appropriate container based on flight type
    if (flightType === "return") {
      rtrnSeats.appendChild(echSeat);
    } else {
      dprtSeats.appendChild(echSeat);
    }

    generateRowCol();

    // Set up the click event to handle seat picking
    echSeat.addEventListener("click", () => {
      echSeat.classList.toggle("selected");

      // Determine which list to track the selected seat in (departure or return)
      let selectedSeats =
        flightType === "return" ? selectedReturnSeats : selectedDepartureSeats;

      if (echSeat.classList.contains("selected")) {
        // Check if seat limit is exceeded
        if (selectedSeats.length >= maxSeatNum) {
          alert(`You can only select up to ${maxSeatNum} seats.`);
          echSeat.classList.remove("selected");
        } else {
          selectedSeats.push(index); // Add seat index to selected seats
          echSeat.classList.add("picked");
          seats[index] = true; // Mark seat as picked in seat array
        }
      } else {
        // Remove from selected seats if unselected
        const seatIndex = selectedSeats.indexOf(index);
        if (seatIndex > -1) {
          selectedSeats.splice(seatIndex, 1);
        }
        echSeat.classList.remove("picked");
        seats[index] = false; // Mark seat as not picked
      }

      // Ensure seat selections for departure and return remain separate
      if (flightType === "return") {
        selectedReturnSeats = selectedSeats;
      } else {
        selectedDepartureSeats = selectedSeats;
      }

      // Ensure the seat data is updated in the backend or stored
      updateSeats(flightId, seats);
    });
  });
}

function showSeats() {
  const showRtrSeat = document.getElementById("shwto");
  const showDprtSeat = document.getElementById("shwfm");

  showRtrSeat.addEventListener("click", () => {
    showDprtSeat.closest(".rsitcont").classList.remove("ntytn");
    showRtrSeat.closest(".dsitcont").classList.add("ntytn");
  });

  showDprtSeat.addEventListener("click", () => {
    showDprtSeat.closest(".rsitcont").classList.add("ntytn");
    showRtrSeat.closest(".dsitcont").classList.remove("ntytn");
  });
}
showSeats();

function generateRowCol() {
  // Select all the grid items
  const gridItems = document.querySelectorAll(".dsitdiv .echsit");
  const rtrgridItems = document.querySelectorAll(".rsitdiv .echsit");

  // Generate letters from 'A' to 'J'
  const start = "A".charCodeAt(0); // Get the Unicode value for 'A'
  const end = "J".charCodeAt(0); // Get the Unicode value for 'J'
  const letters = [];

  for (let i = start; i <= end; i++) {
    letters.push(String.fromCharCode(i));
  }

  // Variables to track the current row and column
  const totalColumns = 9;
  let rowIndex;
  let colIndex = 1;

  if (clasType.innerText == "First") {
    rowIndex = 1;
  } else if (clasType.innerText == "Business") {
    rowIndex = 11;
  } else if (clasType.innerText == "Premium") {
    rowIndex = 21;
  } else {
    rowIndex = 31;
  }

  rowAndCol(gridItems, rowIndex, colIndex, totalColumns, letters);

  if (rtrgridItems) {
    rowAndCol(rtrgridItems, rowIndex, colIndex, totalColumns, letters);
  }
}

function rowAndCol(gridItems, rowIndex, colIndex, totalColumns, letters) {
  // Loop through each grid item and set the innerText
  gridItems.forEach((item, index) => {
    // get the div that contains the item sit detial
    const itemCont = item.querySelector(".shstdt");

    // Set the innerText for the current item
    itemCont.innerText = ` ${rowIndex}  ${letters[colIndex - 1]}`;

    // Update column index
    colIndex++;

    // If colIndex exceeds the total columns, reset it and move to the next row
    if (colIndex > totalColumns) {
      colIndex = 1;
      rowIndex++;
    }
  });
}

// function to display flights
function displayFli(flight, tolPrice, rtrFli) {
  clearTimeout(loaderTimeout);

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
                  <span>${clasType.innerText}</span>
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

// the search button
sFligt.addEventListener("click", () => {
  if (tripType.innerText == "Round trip") {
    if (depatDate.value == "" && returnDate.value == "") {
      return;
    }
  } else {
    if (depatDate.value == "") {
      return;
    }
  }

  test();
});

const showflidrp = document.querySelectorAll(".shfldp");
const fliType = document.querySelectorAll(".fltype");
const fliClass = document.querySelectorAll(".flclass");
const addPass = document.querySelectorAll(".plus");
const remPass = document.querySelectorAll(".minus");
const eachTotalPass = document.querySelectorAll(".ttnu");
const fliDetails = document.querySelectorAll(".fliic");
let fliSvg;
let fPicked;

// drop down for the extra details to search for flights
showflidrp.forEach((drop) => {
  drop.addEventListener("click", function (event) {
    // close all open dropdown first
    closeAllDrops();

    // stops the current dropdown from closing when clicked
    event.stopPropagation();

    picking(showflidrp, drop);

    this.nextElementSibling.classList.remove("dnone");

    fPicked = this.querySelector("p");

    fliSvg = this.querySelector("svg");
    fliSvg.classList.add("dwop");
  });
});

// this closes all dropdown if you click outside the dropdowns
window.addEventListener("click", function () {
  closeAllDrops();
});

// this updates the flight type once it's changed from the drop down
fliType.forEach((type) => {
  type.addEventListener("click", () => {
    picking(fliType, type);
    if (fPicked) {
      fPicked.innerText = type.textContent;
    }
    if (type.textContent == "One way") {
      returnCal.destroy();
      returnDate.value = "";
      returnDate.disabled = true;
    } else {
      returnDate.disabled = false;
      const minyDate = depatDate.value;

      returnCal = flatpickr("#whcmbk", {
        altInput: true,
        altFormat: "j F, Y",
        dateFormat: "d-m-Y",
        minDate: minyDate,
      });
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
