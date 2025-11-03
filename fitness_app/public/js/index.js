// Smooth fade-in effect for homepage sections
document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".feature");
  features.forEach((f, i) => {
    f.style.opacity = "0";
    setTimeout(() => {
      f.style.transition = "opacity 0.6s ease";
      f.style.opacity = "1";
    }, i * 150);
  });
});
