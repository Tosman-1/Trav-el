import { config } from "./key.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
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
const auth = getAuth();

const bigDiv = document.querySelector(".bkhtfin");

onAuthStateChanged(auth, (user) => {
  if (user) {
    showBokins(user);
  } else {
    const homePage = "../homepage/index.html";
    window.location.replace("index.html" || homePage);
  }
});

const showBokins = async (params) => {
  try {
    const bookRef = collection(db, "bookings");
    const bookQuery = query(
      bookRef,
      where("userid", "==", params.uid),
      orderBy("bookdate")
    );
    let num = 0;

    const querySnapshot = await getDocs(bookQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        let bokin = doc.data();
        let bokinId = doc.id;

        num++;

        const formatPrice = Intl.NumberFormat("en-NG");

        const divWrap = document.createElement("div");
        divWrap.classList.add("bbbcnt");

        if (num % 2 == 0) {
          divWrap.classList.add("fffdg");
        } else {
          divWrap.classList.add("fffgd");
        }

        let padNum = num.toString().padStart(2, "0");

        console.log(padNum);
        console.log(num);

        divWrap.innerHTML = `<div class="llione toobg">
                                    <span>${padNum}</span>
                                </div>
                                <div class="llione">
                                    <span>${bokinId}</span>
                                </div>
                                <div class="llione">
                                    <span>${bokin.type}</span>
                                </div>
                                <div class="llione">
                                    <span>NGN ${formatPrice.format(
                                      bokin.price
                                    )}</span>
                                </div>
                                <div class="llione">
                                    <span>${bokin.bookdate}</span>
                                </div>
                                <div class="llione">
                                    <span>${bokin.status}</span>
                                </div>
                            
                            `;

        bigDiv.appendChild(divWrap);
      });
    } else {
      bigDiv.innerHTML = "";
      bigDiv.innerHTML = `<div class="nobki"><h3>You don't have any bookings</h3></div>`;
    }
  } catch (e) {
    console.error("Error fetchig document: ", e);
  }
};
