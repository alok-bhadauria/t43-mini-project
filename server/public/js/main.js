document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement
  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = document.getElementById("themeIcon")
  const navToggle = document.getElementById("navToggle")
  const sidebar = document.getElementById("sidebar")
  const yearSpan = document.getElementById("year")

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }

  // THEME
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "light"
      const next = current === "light" ? "dark" : "light"
      setTheme(next)
      localStorage.setItem("theme", next)
    })
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme)
    if (!themeIcon) return
    if (theme === "dark") {
      themeIcon.classList.remove("ri-moon-line")
      themeIcon.classList.add("ri-sun-line")
    } else {
      themeIcon.classList.remove("ri-sun-line")
      themeIcon.classList.add("ri-moon-line")
    }
  }

  // MOBILE NAV
  if (navToggle && sidebar) {
    navToggle.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar--open")
    })

    sidebar.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          sidebar.classList.remove("sidebar--open")
        }
      })
    })
  }

  // TOASTS
  const toastData = window.APP_TOAST
  const toastEl = document.getElementById("toast")
  const toastMsg = toastEl ? toastEl.querySelector(".toast-message") : null
  const toastIcon = toastEl ? toastEl.querySelector(".toast-icon i") : null
  const toastClose = document.getElementById("toastClose")

  if (toastData && toastEl && toastMsg) {
    toastMsg.textContent = toastData.message || ""

    toastEl.classList.remove("hidden")
    toastEl.classList.remove("toast-success", "toast-error")

    if (toastData.type === "success") {
      toastEl.classList.add("toast-success")
      if (toastIcon) {
        toastIcon.className = "ri-checkbox-circle-line"
      }
    } else {
      toastEl.classList.add("toast-error")
      if (toastIcon) {
        toastIcon.className = "ri-alert-line"
      }
    }

    setTimeout(() => {
      toastEl.classList.add("hidden")
    }, 3800)
  }

  if (toastClose && toastEl) {
    toastClose.addEventListener("click", () => {
      toastEl.classList.add("hidden")
    })
  }

  // Scroll reveal (light)
  const revealEls = document.querySelectorAll(".reveal")
  if (revealEls.length) {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.2 }
    )
    revealEls.forEach(el => obs.observe(el))
  }
})
