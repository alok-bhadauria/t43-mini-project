// /* ===========================
//     THEME TOGGLER WITH SMOOTH SWITCH
//    =========================== */

// // Buttons & link to secondary stylesheet
// const toggleBtn = document.getElementById("theme-toggle");
// const lightSheet = document.getElementById("theme-light");   // MUST be <link id="theme-light" disabled>
// const icon = toggleBtn.querySelector("i");

// // Try load saved theme
// let currentTheme = localStorage.getItem("theme") || "dark";

// // Apply stored theme immediately
// applyTheme(currentTheme);


// // 🔘 Click to toggle theme
// toggleBtn.addEventListener("click", () => {
//     currentTheme = currentTheme === "dark" ? "light" : "dark";
//     applyTheme(currentTheme);
// });


// /* ========== CORE FUNCTION ========== */

// function applyTheme(mode) {
//     // Smooth fade effect
//     document.body.style.transition = "background 0.6s ease, color 0.6s ease, filter 0.5s";
//     document.body.style.opacity = "0.3";

//     setTimeout(() => {
//         if (mode === "light") {
//             lightSheet.disabled = false;      // enable style2.css
//             icon.className = "ri-moon-line";  // change icon
//         } else {
//             lightSheet.disabled = true;       // default theme.css active
//             icon.className = "ri-sun-line";
//         }

//         localStorage.setItem("theme", mode);

//         // Fade back in
//         document.body.style.opacity = "1";
//     }, 200);
// }
