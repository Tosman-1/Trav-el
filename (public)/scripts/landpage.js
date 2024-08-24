// document.addEventListener("DOMContentLoaded", () => {
const slides = document.querySelectorAll(".fsc-slide");
const slideTxt = document.querySelectorAll(".sctxt");
let currentSlide = 0;

function showSlide(index) {
  const outgoingSlide = slides[currentSlide];
  const outTxt = slideTxt[currentSlide];
  outTxt.classList.remove("shanim");

  currentSlide = (index + slides.length) % slides.length;

  const incomingSlide = slides[currentSlide];
  const inTxt = slideTxt[currentSlide];

  inTxt.classList.add("shanim");

  if (incomingSlide.classList.contains("active")) {
    outgoingSlide.classList.add("active");

    incomingSlide.classList.remove("active");
  }
  incomingSlide.classList.add("incoming");
  outgoingSlide.classList.add("active");

  setTimeout(() => {
    incomingSlide.classList.remove("incoming");
    incomingSlide.classList.add("out");
    outgoingSlide.classList.remove("out");
  }, 500);
}

function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlide() {
  showSlide(currentSlide - 1);
}

document.getElementById("next").addEventListener("click", nextSlide);
document.getElementById("prev").addEventListener("click", prevSlide);

// setInterval(nextSlide, 3000);
// });

let tours = [
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/lazio-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/moro-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/lond-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/france-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/korea-low.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: true,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
  {
    country: "Italy",
    city: "Venice",
    tourName: "Grand italy",
    tourDuration: "6Days",
    tourDescrip: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                eligendi numquam praesentium laborum repellat explicabo sunt
                consequatur dignissimos perferendis? Tenetur, veritatis quae
                maiores labore consequuntur quam atque.`,
    tourPrice: "$4000",
    tourAm: [
      "5 star hotels",
      "Boat riding",
      "Horse riding",
      "100% satisfaction",
    ],
    tourImage: "images/amsterdam.jpeg",
    tourImages: {},
    tourDate: "05-08-2024 - 10-08-2024",
    tourBkdn: "",
    space: "",
    bestOffer: false,
  },
];

tours.forEach((tour) => {
  if (tour.bestOffer) {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgdiv");
    imgDiv.innerHTML = `<img src="${tour.tourImage}" alt="" />
                        <div class="boic">
                          <div class="leftc">
                            <p class="bocon">${tour.country}</p>
                            <p class="boturn">${tour.tourName}</p>
                          </div>
                          <div class="rightc">
                            <p class="bocon">${tour.tourDuration}</p>
                            <p class="boturn">${tour.tourPrice}</p>
                          </div>
                        </div>`;
    document.getElementById("midovr").appendChild(imgDiv);
  }
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".tnav");
  if (window.scrollY > 150) {
    nav.classList.add("bgcsc");
  } else {
    if (nav.classList.contains("bgcsc")) {
      nav.classList.remove("bgcsc");
    }
  }
});
