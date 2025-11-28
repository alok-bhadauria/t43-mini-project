const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("openSidebar");

// ⬅️ Open / Close sidebar
toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--open");
});


// Close sidebar when clicking any link (mobile only)
sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        if(window.innerWidth <= 900) sidebar.classList.remove("sidebar--open");
    });
});


// Close when clicking outside (mobile view)
document.addEventListener("click", (e) => {
    if(window.innerWidth <= 900){
        if(!sidebar.contains(e.target) && !toggleBtn.contains(e.target)){
            sidebar.classList.remove("sidebar--open");
        }
    }
});
