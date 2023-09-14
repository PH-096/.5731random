 document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".clickable-image");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      const imageUrl = image.getAttribute("src");
      const overlay = document.createElement("div");
      overlay.classList.add("image-overlay");

      const enlargedImage = document.createElement("img");
      enlargedImage.src = imageUrl;
      enlargedImage.classList.add("enlarged-image");

      overlay.appendChild(enlargedImage);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        overlay.remove();
      });
    });
  });
});
