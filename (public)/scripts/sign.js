// Import the functions you need from the SDKs you need
import { config } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const provider = new GoogleAuthProvider();
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
const auth = getAuth();
let isSignedIn = false;
const showName = document.getElementById("whesin");
const signDrp = document.querySelector(".signdrp");
const signInWithG = document.querySelectorAll(".siwg");

let today = new Date();
let formattedDate = today.toLocaleDateString();
let formattedTime = today.toLocaleTimeString();

onAuthStateChanged(auth, (user) => {
  showName.innerHTML = "";
  if (user) {
    isSignedIn = true;
    const name = user.displayName;
    const email = user.email;
    const userId = user.uid;
    showName.innerHTML = user.displayName;

    sessionStorage.setItem("userId", userId);
    saveUserDetails(name, email, userId);
  } else {
    isSignedIn = false;
    showName.innerHTML = "Account";
  }
  siDropDwn();
});

const saveUserDetails = async (name, email, userId) => {
  try {
    const usersRef = doc(db, "users", userId);

    const docSnap = await getDoc(usersRef);

    if (docSnap.exists()) {
      console.log("Document data:");
    } else {
      const userRef = collection(db, "users");

      await setDoc(doc(userRef, userId), {
        name,
        email,
        signupdate: `${formattedDate} ${formattedTime}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// sign in with google
signInWithG.forEach((signInUp) => {
  signInUp.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        const user = auth.currentUser;
        const name = user.displayName;
        const email = user.email;
        const userId = user.uid;

        saveUserDetails(name, email, userId);

        showMod();
      })
      .catch((err) => {
        console.log(err);
      });
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
const signLoader = document.getElementById("sigbtn");
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
    Swal.fire({
      toast: true,
      position: "top",
      timer: "3000",
      icon: "error",
      title: "All field are mandatory",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  } else if (!emailReg.test(email.value.trim())) {
    Swal.fire({
      toast: true,
      position: "top",
      timer: "3000",
      icon: "error",
      title: "Input a valid email",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  } else if (!passReg.test(password.value.trim())) {
    Swal.fire({
      toast: true,
      position: "top",
      timer: "4000",
      icon: "error",
      title:
        "password should be atleast 8 chars, with a special char, a number , a lowercase & uppercase letter",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  } else if (confPass.value.trim() !== password.value.trim()) {
    Swal.fire({
      toast: true,
      position: "top",
      timer: "3000",
      icon: "error",
      title: "Password do not match",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  } else {
    signUp.innerHTML = "";
    signUp.innerHTML = `<div id="loader-wrapper">
                            <div class="loader"></div>
                          </div>`;
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((usercredentials) => {
        const user = usercredentials.user;
        signUp.innerHTML = "";
        signUp.innerHTML = "SIGN UP";
        updateProfile(usercredentials.user, { displayName: name.value }).then(
          () => {
            Swal.fire({
              toast: true,
              position: "top",
              timer: "3000",
              icon: "error",
              title: "Registration successfull",
              showConfirmButton: false,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            showMod();
          }
        );
      })
      .catch((error) => {
        signUp.innerHTML = "";
        signUp.innerHTML = "SIGN UP";
        console.log(error);
      });
    // showMod();
  }
});

signIn.addEventListener("click", () => {
  if (!lgEmail.value.trim() == "" && lgPass.value.trim()) {
    signLoader.innerHTML = "";
    signLoader.innerHTML = `<div id="loader-wrapper">
                          <div class="loader"></div>
                        </div>`;

    signInWithEmailAndPassword(auth, lgEmail.value, lgPass.value)
      .then((userCredential) => {
        const userCr = userCredential.user;
        signLoader.innerHTML = "";
        signLoader.innerHTML = "SIGN IN";
        if (userCr) {
          Swal.fire({
            toast: true,
            position: "top",
            timer: "3000",
            icon: "success",
            title: "Signed in successfully",
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          showMod();
          lgEmail.value = "";
          lgPass.value = "";
        }
      })
      .catch((error) => {
        signLoader.innerHTML = "";
        signLoader.innerHTML = "SIGN IN";
        console.log(error);
      });
  }
});

const slideRight = document.getElementById("slirgt");
const slideLeft = document.getElementById("slilft");
const signupTxt = document.querySelector(".siptxt");
const mSlide = document.querySelector(".scover");
const signinTxt = document.querySelector(".sintxt");
const closmod = document.getElementById("clsmod");
const frgPass = document.getElementById("frgps");
const fullmod = document.querySelector(".stpp");
const shDrop = document.getElementById("whesin");
const sideMenu = document.querySelector(".sdmenu");
const hamMenu = document.querySelector(".hambug");
const closeMenu = document.querySelector(".clsdme");
let isShow = true;

if (hamMenu) {
  hamMenu.addEventListener("click", () => {
    if (sideMenu.classList.contains("hdsd")) {
      sideMenu.classList.remove("hdsd");
    }
  });
}
if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    if (!sideMenu.classList.contains("hdsd")) {
      sideMenu.classList.add("hdsd");
    }
  });
}

const forgetPassword = async () => {
  const { value: email } = await Swal.fire({
    input: "email",
    inputLabel: "Enter your email address",
    showCancelButton: true,
    confirmButtonColor: "#5c6997",
    allowOutsideClick: false,
  });
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top",
          timer: "3000",
          icon: "success",
          title: `Reset link has been sent to ${email}`,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
};

frgPass.addEventListener("click", forgetPassword);

// const profileLoc = "../profile/profile.html";

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
                                <li><a href="../profile/profile.html">Profile</a></li>
                                <li><a href="../bookinpage/checkbokin.html">Bookings</a></li>
                                <li><a href="">Wishlists</a></li>
                                <li><a href="">Help</a></li>
                              </ul>
                            </div>
                            <div class="siupou" id="signout">
                              <span>Sign out</span>
                            </div>
                          </div>`;

    setSignOut();
    // showProfile();
  } else {
    signDrp.innerHTML = ` <div class="siupin">
                            <span>sign in/ sign up</span>
                          </div>`;

    setMod();
  }
}

// function showProfile() {
//   const refToProf = document.getElementById("prof");

//   refToProf.addEventListener("click", () => {
//     window.location.assign(profileLoc);
//   });
// }

function setSignOut() {
  const logOut = document.querySelector(".siupou");

  if (logOut) {
    logOut.addEventListener("click", () => {
      signOut(auth)
        .then((res) => {
          Swal.fire({
            toast: true,
            position: "top",
            timer: "3000",
            icon: "success",
            title: "Signed out successfully",
            showConfirmButton: false,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
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
    if (!isShow) {
      signDrp.classList.add("dnone");
      isShow = true;
    }
  }
}

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".tnav");
  if (nav) {
    if (window.scrollY > 150) {
      if (!nav.classList.contains("bgcsc")) {
        nav.classList.add("bgcsc");
      }
    } else {
      if (nav.classList.contains("bgcsc")) {
        nav.classList.remove("bgcsc");
      }
    }
  }
});
