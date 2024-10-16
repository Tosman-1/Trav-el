import { config } from "./key.js";
import { paystackKey } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import {
//   getAuth,
//   onAuthStateChanged,
// } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const closeBokin = document.querySelector(".clsbkin");
const bokinSteps = document.querySelectorAll(".prgnum");
const bokinDtls = document.querySelectorAll(".flbkmod");
const payBtn = document.getElementById("bkndpy");
const agreeTerms = document.getElementById("agree");
const phoneNum = document.getElementById("phnnum");
const email = document.getElementById("mail");
const fillname = document.getElementById("flnm");
const userId = sessionStorage.getItem("userId");
let userName;

// console.log("useerid:", userId);

if (userId) {
  const docRef = doc(db, "users", userId);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const user = docSnap.data();
        userName = user.name;

        fillname.value = user.name;
        email.value = user.email;
        phoneNum.value = user.phone || "";
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

closeBokin.addEventListener("click", closeModal);

function closeModal() {
  const bokinModal = closeBokin.parentElement;

  if (!bokinModal.classList.contains("dnone")) {
    bokinModal.classList.add("dnone");
  }
}

bokinSteps.forEach((step, index) => {
  step.addEventListener("click", () => {
    if (step.classList.contains("done")) {
      bokinDtls.forEach((bokDtls) => {
        bokDtls.classList.add("dnone");
      });

      bokinDtls[index].classList.remove("dnone");
    }
  });
});

showNextStep();

function showNextStep() {
  const nextBtn = document.querySelectorAll(".shwnxt");
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneReg =
    /^\+?(\d{1,3})?[-. ]?\(?\d{1,4}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;

  function checkAllNames(fullNames) {
    for (let i = 0; i < fullNames.length; i++) {
      if (fullNames[i].value.trim() !== "") {
        return true;
      }
    }
    return false;
  }

  nextBtn.forEach((next, index) => {
    next.addEventListener("click", () => {
      if (!bokinDtls[index].classList.contains("dnone")) {
        const hasSelect =
          bokinDtls[index].getElementsByTagName("select").length > 0;
        const hasInput =
          bokinDtls[index].getElementsByTagName("input").length > 0;

        if (hasSelect && hasInput) {
          const nameTitles = document.querySelectorAll(".titlens");
          const fullNames = document.querySelectorAll(".fllname");

          if (
            !checkAllNames(nameTitles) ||
            !checkAllNames(fullNames) ||
            phoneNum.value.trim() === "" ||
            email.value.trim() === ""
          ) {
            alert("all field are required");
          } else if (!emailReg.test(email.value.trim())) {
            alert("Input a valid email");
          } else if (!phoneReg.test(phoneNum.value.trim())) {
            alert("Input a valid phone number");
          } else {
            nextStep(index);
          }
        } else {
          nextStep(index);
        }
      }
    });
  });
}

function nextStep(index) {
  if (!bokinSteps[index].classList.contains(".done")) {
    bokinSteps[index].classList.add("done");
  }
  bokinDtls[index].classList.add("dnone");
  bokinDtls[index + 1].classList.remove("dnone");
}

payBtn.addEventListener("click", (e) => {
  if (agreeTerms.checked) {
    payWithPaystack(e);
  } else {
    alert("Read the terms and conditions");
  }
});

function uploadBokin() {
  let bokinDetails = JSON.parse(sessionStorage.getItem("bokin"));
  const totalInNgn = document.getElementById("detopr");

  console.log(bokinDetails);

  if (bokinDetails) {
    console.log("passed condition");

    bokinDetails.status = "confirmed";
    bokinDetails.username = userName;
    bokinDetails.userid = userId;

    addDoc(collection(db, "bookings"), bokinDetails)
      .then((docRef) => {
        console.log("Your bookin id", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    alert("no bookin details");
  }
  console.log("got to the end");
}

function confirmClose() {
  let text = "Are you sure you don't want to pay";
  if (confirm(text) == false) {
    return;
  } else {
    closeModal();
  }
}

function payWithPaystack(e) {
  e.preventDefault();

  const popup = PaystackPop.setup({
    key: paystackKey,
    email: "rafiuhammed78@gmail.com",
    amount: 23400 * 100,
    onClose: () => {
      confirmClose();
    },
    callback: () => {
      uploadBokin();

      closeModal();
      alert("success");
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  popup.openIframe();
}
