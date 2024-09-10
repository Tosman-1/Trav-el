import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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

const testing = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "matt",
      middle: "son",
      last: "Turing",
      born: 1932,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const test = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data().born);
  });
};

sFligt.addEventListener("click", test);

const showflidrp = document.querySelectorAll(".shfldp");
const fliType = document.querySelectorAll(".fltype");
const fliClass = document.querySelectorAll(".flclass");
const addPass = document.querySelectorAll(".plus");
const remPass = document.querySelectorAll(".minus");
const eachTotalPass = document.querySelectorAll(".ttnu");
const totalPass = document.querySelector(".tolnum");
const passTotal = document.querySelector(".alldn");
let fliSvg;
let fPicked;

showflidrp.forEach((drop) => {
  drop.addEventListener("click", function (event) {
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
  getPassTotal();
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
}
