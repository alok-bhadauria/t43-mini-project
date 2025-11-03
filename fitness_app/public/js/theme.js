// Ensures theme is applied before content is visible
(function () {
  const storedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);
})();
