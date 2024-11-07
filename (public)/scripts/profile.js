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
  updateDoc,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

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
const storage = getStorage();
const auth = getAuth();
let userId;
let image;

onAuthStateChanged(auth, (user) => {
  if (user) {
    showUserDtls(user.uid);
    userId = user.uid;
  } else {
    const homePage = "../homepage/index.html";
    window.location.replace("index.html" || homePage);
  }
});

const picks = document.querySelectorAll(".prfinfs");
const pickedDtls = document.querySelectorAll(".perprf");
const bfrEdit = document.querySelectorAll(".pepfcon");
const userName = document.getElementById("fllname");
const userMail = document.getElementById("email");
const userPhone = document.getElementById("phone");
const userDob = document.getElementById("daofbr");
const userHome = document.getElementById("address");
const uploadPic = document.getElementById("upprfp");
const theProfPic = document.getElementById("profpicc");
const updatePhone = document.getElementById("inphone");
const savePhone = document.getElementById("svphn");
const uploadBtn = document.querySelector(".prch");

picks.forEach((picked, index) => {
  picked.addEventListener("click", () => {
    // remove the classname from the previously active div
    picks.forEach((pick) => pick.classList.remove("cactive"));

    // adds the classname to the clicked div, making it the active div
    picked.classList.add("cactive");

    // this display none the current details and show the details of the clicked one
    pickedDtls.forEach((details) => {
      if (!details.classList.contains("dnone")) {
        details.classList.add("dnone");
      }
    });

    if (pickedDtls[index].classList.contains("dnone")) {
      pickedDtls[index].classList.remove("dnone");
    }
  });
});

function uploadProfPic() {
  let file = uploadPic.files[0];

  let profilepic = file.name;

  updateDoc(doc(db, "users", userId), { picture: profilepic })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

  const storageRef = stRef(storage, `${profilepic}`);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("image uploaded");
  });
}

function updateNum() {
  const phoneReg =
    /^\+?(\d{1,3})?[-. ]?\(?\d{1,4}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;

  if (!phoneReg.test(updatePhone.value.trim())) {
    alert("Input a valid phone number");
    Swal.fire({
      toast: true,
      position: "top",
      timer: "3000",
      icon: "error",
      title: "Input a valid phone number",
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  } else {
    updateDoc(doc(db, "users", userId), { phone_num: updatePhone.value })
      .then(() => {
        console.log("Document successfully updated!");
        Swal.fire({
          toast: true,
          position: "top",
          timer: "3000",
          icon: "success",
          title: "Phone number successfully updated",
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        Swal.fire({
          toast: true,
          position: "top",
          timer: "3000",
          icon: "error",
          title: "Something is wrong",
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
      });
  }
}

savePhone.addEventListener("click", updateNum);

function getProfPic() {
  if (image) {
    let imageRef = stRef(storage, `${image}`);
    getDownloadURL(imageRef).then((res) => {
      theProfPic.src = res;
    });
  }
}

uploadBtn.addEventListener("change", uploadProfPic);

function showUserDtls(param) {
  const docRef = doc(db, "users", param);

  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const user = docSnap.data();
        userName.innerText = user.name;
        userMail.innerText = user.email;
        userPhone.innerText = user.phone_num || "Not provided";
        userDob.innerText = user.dob || "Not provided";
        userHome.innerText = user.city || "Not provided";

        image = user.picture;

        getProfPic();
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

bfrEdit.forEach((notEdit) => {
  const editCont = notEdit.querySelector(".pepinner");
  const editBtn = notEdit.querySelector(".pepoint");
  const editItems = notEdit.querySelector(".ppedit");
  const cancelEdit = notEdit.querySelector(".pepcan");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      if (editItems) {
        if (!editCont.classList.contains("dnone")) {
          editCont.classList.add("dnone");
        }
        if (editItems.classList.contains("dnone")) {
          editItems.classList.remove("dnone");
        }
      }
    });
  }

  if (cancelEdit) {
    cancelEdit.addEventListener("click", () => {
      if (!editItems.classList.contains("dnone")) {
        editItems.classList.add("dnone");
      }
      if (editCont.classList.contains("dnone")) {
        editCont.classList.remove("dnone");
      }
    });
  }
});
