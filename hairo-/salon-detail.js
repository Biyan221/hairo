
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

// Favorite button
const favoriteBtn = document.getElementById("favoriteBtn");

favoriteBtn.addEventListener("click", () => {
  const saved = favoriteBtn.classList.toggle("saved");

  favoriteBtn.textContent = saved ? "♥" : "♡";

  favoriteBtn.setAttribute(
    "aria-label",
    saved ? "Remove from favourites" : "Add to favourites"
  );

  showToast(
    saved
      ? "Added to your favourites"
      : "Removed from your favourites"
  );
});

// Salon gallery lightbox
const galleryImages = [
  ...document.querySelectorAll(".gallery img")
];

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const photoCounter = document.getElementById("photoCounter");

let currentPhoto = 0;

function showPhoto(index) {
  currentPhoto =
    (index + galleryImages.length) % galleryImages.length;

  lightboxImage.src = galleryImages[currentPhoto].src;
  lightboxImage.alt = galleryImages[currentPhoto].alt;

  photoCounter.textContent =
    `${currentPhoto + 1} / ${galleryImages.length}`;

  lightbox.classList.add("open");
}

document.getElementById("viewPhotos")
  .addEventListener("click", () => showPhoto(0));

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => showPhoto(index));
});

document.getElementById("closePhotos")
  .addEventListener("click", () => {
    lightbox.classList.remove("open");
  });

document.getElementById("previousPhoto")
  .addEventListener("click", () => {
    showPhoto(currentPhoto - 1);
  });

document.getElementById("nextPhoto")
  .addEventListener("click", () => {
    showPhoto(currentPhoto + 1);
  });

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    lightbox.classList.remove("open");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    lightbox.classList.remove("open");
  }

  if (event.key === "ArrowRight") {
    showPhoto(currentPhoto + 1);
  }

  if (event.key === "ArrowLeft") {
    showPhoto(currentPhoto - 1);
  }
});

// Choose a service
document.querySelectorAll(".choose-btn").forEach(button => {
  button.addEventListener("click", () => {
    const service = button.dataset.service;
    const price = button.dataset.price;

    // Pass selected service to the next page.
    sessionStorage.setItem("hairoService", service);
    sessionStorage.setItem("hairoPrice", price);

    // The booking page will be created next.
    window.location.href = "booking.html";
  });
});

// Main booking button
document.getElementById("bookNow").addEventListener("click", () => {
  window.location.href = "booking.html";
});

// Mobile navigation
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

// Demo navigation for bookings
document.getElementById("myBookings").addEventListener("click", event => {
  event.preventDefault();
  showToast("The My Bookings page will be available soon.");
});
