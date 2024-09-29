const picks = document.querySelectorAll(".prfinfs");
const pickedDtls = document.querySelectorAll(".perprf");

picks.forEach((picked, index) => {
  picked.addEventListener("click", () => {
    picks.forEach((pick) => pick.classList.remove("cactive"));

    picked.classList.add("cactive");

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
