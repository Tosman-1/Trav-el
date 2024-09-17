// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const provider = new GoogleAuthProvider();
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
const auth = getAuth();
let isSignedIn = false;
const showName = document.getElementById("whesin");
const signDrp = document.querySelector(".signdrp");
const signInWithG = document.getElementById("siwg");

onAuthStateChanged(auth, (user) => {
  showName.innerHTML = "";
  if (user) {
    isSignedIn = true;
    showName.innerHTML = user.displayName;
  } else {
    isSignedIn = false;
    showName.innerHTML = "Account";
  }
  siDropDwn();
});

// showSignIn();

signInWithG.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((response) => {
      // console.log(response);
      const user = auth.currentUser;
      showMod();
    })
    .catch((err) => {
      console.log(err);
    });
});

const name = document.getElementById("usrn");
const email = document.getElementById("em");
const password = document.getElementById("pass");
const confPass = document.getElementById("cnfpass");
const lgEmail = document.getElementById("lgemail");
const lgPass = document.getElementById("lgpass");
const signIn = document.getElementById("login");
const signUp = document.getElementById("signup");
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passReg =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*_^#?&]{8,}$/;

signUp.addEventListener("click", () => {
  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    password.value.trim() === "" ||
    confPass.value.trim() === ""
  ) {
    alert("all fields are mandatory");
  } else if (!emailReg.test(email.value.trim())) {
    alert("Input a valid email");
  } else if (!passReg.test(password.value.trim())) {
    alert(
      "password should be atleast 8 chars, with a special char, a number , a lowercase & uppercase letter"
    );
  } else if (confPass.value.trim() !== password.value.trim()) {
    alert("passwords do not match");
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((usercredentials) => {
        // console.log("successfull");
        // console.log(usercredentials);
        const user = usercredentials.user;
        showMod();

        updateProfile(usercredentials.user, { displayName: name.value }).then(
          (res) => {
            if (res) {
              // showSignIn();
              alert("success");
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

signIn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, lgEmail.value, lgPass.value)
    .then((userCredential) => {
      // Signed in
      const userCr = userCredential.user;
      console.log(userCredential);
      if (userCr) {
        // console.log(userCr);
        showMod();
        lgEmail.value = "";
        lgPass.value = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const slideRight = document.getElementById("slirgt");
const slideLeft = document.getElementById("slilft");
const signupTxt = document.querySelector(".siptxt");
const mSlide = document.querySelector(".scover");
const signinTxt = document.querySelector(".sintxt");
const closmod = document.getElementById("clsmod");
const fullmod = document.querySelector(".stpp");
const shDrop = document.getElementById("whesin");
let isShow = true;

slideLeft.addEventListener("click", () => {
  mSlide.classList.add("slide");
  signupTxt.classList.remove("dnone");
  signinTxt.classList.add("dnone");
});

slideRight.addEventListener("click", () => {
  mSlide.classList.remove("slide");
  signupTxt.classList.add("dnone");
  signinTxt.classList.remove("dnone");
});

function siDropDwn() {
  signDrp.innerHTML = "";
  if (isSignedIn) {
    signDrp.innerHTML = ` <div class="whsiin">
                            <div class="itli">
                              <ul>
                                <li><a href="">Profile</a></li>
                                <li><a href="">Bookings</a></li>
                                <li><a href="">Wishlists</a></li>
                                <li><a href="">Become an admin</a></li>
                                <li><a href="">Help</a></li>
                              </ul>
                            </div>
                            <div class="siupou" id="signout">
                              <span>Sign out</span>
                            </div>
                          </div>`;

    setSignOut();
  } else {
    signDrp.innerHTML = ` <div class="siupin">
                            <span>sign in/ sign up</span>
                          </div>`;

    setMod();
  }
}

function setSignOut() {
  const logOut = document.querySelector(".siupou");

  if (logOut) {
    logOut.addEventListener("click", () => {
      signOut(auth)
        .then((res) => {
          alert("logout successful");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } else {
    console.log("no logout");
  }
}

closmod.addEventListener("click", showMod);

function setMod() {
  const opnmod = document.querySelector(".siupin");

  if (opnmod) {
    opnmod.addEventListener("click", showMod);
  }
}

function showMod() {
  if (fullmod.classList.contains("dnone")) {
    if (isSignedIn) {
      return;
    } else {
      fullmod.classList.remove("dnone");
    }
  } else {
    fullmod.classList.add("dnone");
  }
}

shDrop.addEventListener("click", showDrop);

function showDrop() {
  if (isShow) {
    signDrp.classList.remove("dnone");
    isShow = false;
  } else {
    if (!shDrop.classList.contains("dnone")) {
      signDrp.classList.add("dnone");
      isShow = true;
    }
  }
}

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".tnav");
  if (window.scrollY > 150) {
    if (!nav.classList.contains("bgcsc")) {
      nav.classList.add("bgcsc");
    }
  } else {
    if (nav.classList.contains("bgcsc")) {
      nav.classList.remove("bgcsc");
    }
  }
});
