let currentSlide = 0;
const slides = document.querySelectorAll(".trcrimg");
const prev = document.getElementById("prlft");
const next = document.getElementById("nxrgt");
const totalSlides = slides.length;

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
