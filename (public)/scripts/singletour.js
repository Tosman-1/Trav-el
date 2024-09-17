let currentSlide = 0;
const slides = document.querySelectorAll(".trcrimg");
const prev = document.getElementById("prlft");
const next = document.getElementById("nxrgt");
const totalSlides = slides.length;

const tourDel = document.querySelectorAll(".whte");

function updateSlidePosition() {
  const carouselInner = document.querySelector(".trcrinner");
  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
}

prev.addEventListener("click", prevSlide);

next.addEventListener("click", nextSlide);

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  }
  updateSlidePosition();
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  }
  updateSlidePosition();
}

tourDel.forEach((toDels) => {
  let showtDel = true;

  toDels.addEventListener("click", () => {
    const toSvg = toDels.querySelector("svg");

    if (showtDel) {
      toSvg.classList.add("dwop");
      toDels.classList.remove("whhgt");

      showtDel = false;
    } else {
      toSvg.classList.remove("dwop");
      toDels.classList.add("whhgt");

      showtDel = true;
    }
  });
});
