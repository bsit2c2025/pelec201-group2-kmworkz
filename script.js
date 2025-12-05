
//  DO NOT TOUCH
// A function for Navbar Navigation using SPA
function loadPage(page) {

    fetch(`pages/${page}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Page not found");
            return response.text();
        })
        .then(data => {
            let content = document.getElementById("content");
            if (content) {
                content.innerHTML = data;
                history.pushState({ page: page }, null, "#" + page);
            } else {
                console.error("Error: #content div not found in index.html");
            }
        })
        .catch(error => {
            document.getElementById("content").innerHTML = "<h2>Page not found.</h2>";
            console.error("Error loading page:", error);
        });
}

// Load default page if none is specified
document.addEventListener("DOMContentLoaded", () => {
    let page = window.location.hash.substring(1) || "home"; // Default to home
    loadPage(page);
});

// SERVICES MODAL HANDLING (SAFE FOR SPA)
document.addEventListener("click", (e) => {

    const modal = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("closeModalBtn");

    // OPEN MODAL (any inquire button)
    if (e.target.id.startsWith("openModalBtn") || e.target.classList.contains("inquire-btn")) {
        if (modal) modal.style.display = "flex";
    }

    // CLOSE MODAL (X button)
    if (e.target.id === "closeModalBtn") {
        if (modal) modal.style.display = "none";
    }

    // CLOSE MODAL (click outside)
    if (modal && e.target === modal) {
        modal.style.display = "none";
    }

});
