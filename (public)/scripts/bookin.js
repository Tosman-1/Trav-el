const closeBokin = document.querySelector(".clsbkin");

closeBokin.addEventListener("click", () => {
  const bokinModal = closeBokin.parentElement;
  console.log(bokinModal);

  if (!bokinModal.classList.contains("dnone")) {
    bokinModal.classList.add("dnone");
  }
});
