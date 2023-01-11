const carousel = document.querySelector(".carousel"),
  track = document.querySelector(".carousel-track"),
  slides = Array.from(track.children),
  nextBtn = document.querySelector(".carousel-button-right"),
  prevBtn = document.querySelector(".carousel-button-left"),
  dotsNav = document.querySelector(".carousel-nav"),
  dots = Array.from(dotsNav.children),
  firstSlide = track.querySelector(".first"),
  firstNav = dotsNav.querySelector(".first");
  lastNav = dotsNav.querySelector(".last");
  lastSlide = track.querySelector(".last");

let slideSize = slides[0].clientWidth;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideSize * index + "px";
};

slides.forEach(setSlidePosition);

window.addEventListener("resize", () => {
  slides.forEach(() => {
    slideSize = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
  });
  const currentSlide = track.querySelector(".current-slide");
  track.style.transition = "none";
  moveToSlide(track, currentSlide, currentSlide);

  setTimeout(function () {
    track.style.transition = "transform 450ms ease";
  }, 100);
});

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};
const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }
};

prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  let prevSlide = currentSlide.previousElementSibling;
  if(currentSlide.previousElementSibling == null) {
    prevSlide = lastSlide;
  }
  const currentDot = dotsNav.querySelector(".current-slide");
  let prevDot = currentDot.previousElementSibling;
  if(currentDot.previousElementSibling == null) {
    {
      prevDot = lastNav;
    }
  }
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  
  let nextSlide = currentSlide.nextElementSibling;
  if(currentSlide.nextElementSibling == null) {
    nextSlide = firstSlide;
  };


  const currentDot = dotsNav.querySelector(".current-slide");
  let nextDot = currentDot.nextElementSibling;
  if(currentDot.nextElementSibling == null) {
    nextDot = firstNav;
  };

  const nextIndex = slides.findIndex((slide) => slide === nextSlide);


  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});

//slider
const repeater = () => {
  playSlider = setInterval(function () {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    if (nextIndex < 0) {
      moveToSlide(track, currentSlide, firstSlide);
      updateDots(currentDot, firstNav);
      hideShowArrows(slides, prevBtn, nextBtn, 0);
      return;
    }

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
  }, 3000);
};
repeater();

carousel.addEventListener("mousemove", () => {
  clearInterval(playSlider);
});

carousel.addEventListener("mouseout", () => {
  repeater();
});