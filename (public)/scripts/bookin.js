import { config } from "./key.js";
import { paystackKey } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
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
let userEmail;
let tolPrice;

if (userId) {
  const docRef = doc(db, "users", userId);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const user = docSnap.data();
        userName = user.name;
        // userEmail = user.email;

        fillname.value = user.name;
        email.value = user.email;
        phoneNum.value = user.phone_num || "";
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
    const namesArray = Array.from(fullNames);
    return namesArray.every((names) => names.value.trim() !== "");
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

          console.log(checkAllNames(nameTitles));
          console.log(checkAllNames(fullNames));
          console.log(fullNames);

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

function getPrice() {
  let bokinDet = JSON.parse(sessionStorage.getItem("bokin"));

  tolPrice = bokinDet.price;
}

payBtn.addEventListener("click", (e) => {
  if (agreeTerms.checked) {
    getPrice();
    payWithPaystack(e);
  } else {
    Swal.fire({
      toast: true,
      position: "top",
      timer: "3000",
      icon: "info",
      title: "Read the terms and condition",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }
});

function uploadBokin() {
  let bokinDetails = JSON.parse(sessionStorage.getItem("bokin"));

  // console.log(bokinDetails);

  if (bokinDetails) {
    bokinDetails.status = "confirmed";
    bokinDetails.username = userName;
    bokinDetails.userid = userId;

    addDoc(collection(db, "bookings"), bokinDetails)
      .then((docRef) => {
        Swal.fire({
          toast: true,
          position: "top",
          timer: "4000",
          icon: "success",
          title: `Your booking id is ${docRef.id}`,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        // console.log("Your bookin id", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    alert("no bookin details");
  }
}

function confirmClose() {
  Swal.fire({
    position: "top",
    title: "Are you sure you don't want to pay?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: `I want to pay`,
    confirmButtonColor: "#6b6777",
    cancelButtonColor: "#2a2a2c",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      closeModal();
      window.location.reload();
    }
  });
}

function payWithPaystack(e) {
  e.preventDefault();

  const tolPriceNgn = parseInt(tolPrice) * 100;
  userEmail = email.value;

  const popup = PaystackPop.setup({
    key: paystackKey,
    email: userEmail,
    amount: tolPriceNgn,
    onClose: () => {
      confirmClose();
    },
    callback: () => {
      uploadBokin();

      closeModal();
      window.location.reload();
    },
    onError: (error) => {
      console.log("Error: ", error.message);
    },
  });

  popup.openIframe();
}
