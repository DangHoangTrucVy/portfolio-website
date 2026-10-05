const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.background = "#050505";
      header.style.boxShadow = "0 10px 40px rgba(0,0,0,.4)";
    } else {
      header.style.background = "#080808";
      header.style.boxShadow = "none";
    }
  });
}

/* AUTO SLIDER */
const sliders = document.querySelectorAll(".showcase-slider");

sliders.forEach((slider) => {
  const slides = slider.querySelectorAll("img");
  let current = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 2500);
  }
});

document.querySelectorAll(".show-row[data-gallery]").forEach((row) => {
  row.addEventListener("click", () => {
    currentGallery = row.dataset.gallery
      .split(",")
      .map((src) => src.trim());

    currentIndex = 0;

    lightbox.classList.add("active");
    lightboxImg.src = currentGallery[currentIndex];
  });
});

/* SHOW ALL / SHOW LESS */
const showToggle = document.getElementById("showToggle");
const showList = document.querySelector(".show-list");

if (showToggle && showList) {
  showToggle.addEventListener("click", () => {
    showList.classList.toggle("show-all");
    showToggle.textContent = showList.classList.contains("show-all")
      ? "Show Less"
      : "Show All";
  });
}

/* LIGHTBOX GALLERY */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentGallery = [];
let currentIndex = 0;

if (lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {
  sliders.forEach((slider) => {
    const images = slider.querySelectorAll("img");

    slider.addEventListener("click", () => {
      currentGallery = Array.from(images).map((img) => img.src);
      currentIndex = 0;

      lightbox.classList.add("active");
      lightboxImg.src = currentGallery[currentIndex];
    });
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex];
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex =
      (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    lightboxImg.src = currentGallery[currentIndex];
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

document.querySelectorAll("img").forEach(img => {
  img.loading = "lazy";
});

