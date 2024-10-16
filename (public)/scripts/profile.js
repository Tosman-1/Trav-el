const picks = document.querySelectorAll(".prfinfs");
const pickedDtls = document.querySelectorAll(".perprf");
const bfrEdit = document.querySelectorAll(".pepfcon");

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

console.log(window.location.pathname);

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
  // console.log(cancelEdit);
});

export const profileLoc = window.location.href;
