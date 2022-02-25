const imgs = document.querySelectorAll(".rdw-container .sldier");
// const dots = document.querySelectorAll(".dot i");
// const leftArrow = document.querySelector(".arrow-left");
// const rightArrow = document.querySelector(".arrow-right");

let currentIndex = 0;
let time = 2000; // default time for auto slideshow

const defClass = (startPos, index) => {
  for (let i = startPos; i < imgs.length; i++) {
    imgs[i].style.display = "none";
    // dots[i].classList.remove("fa-dot-circle");
    // dots[i].classList.add("fa-circle");
  }
  imgs[index].style.display = "block";
  // dots[index].classList.add("fa-dot-circle");
};

defClass(1, 0);

const startAutoSlide = () => {
  setInterval(() => {
    currentIndex >= imgs.length - 1 ? (currentIndex = 0) : currentIndex++;
    defClass(0, currentIndex);
  }, time);
};

startAutoSlide();
