
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

                // ✅ Initialize slider if it exists
                initSlider();
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

// Slider

function initSlider() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const cards = Array.from(document.querySelectorAll('.cardService'));
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 20;

    // Clone cards for seamless infinite scroll
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    let isDragging = false;
    let startX;
    let scrollStart;

    // Drag to scroll
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollStart = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => isDragging = false);
    carousel.addEventListener('mouseup', () => isDragging = false);

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (startX - x);
        carousel.scrollLeft = scrollStart + walk;

        // Infinite wrap
        if (carousel.scrollLeft >= cardWidth * cards.length) {
            carousel.scrollLeft -= cardWidth * cards.length;
        } 
        else if (carousel.scrollLeft <= 0) {
            carousel.scrollLeft += cardWidth * cards.length;
        }
    });

    // Buttons with smooth animation
    document.getElementById("nextBtn").onclick = () => {
        carousel.style.scrollBehavior = "smooth";
        carousel.scrollLeft += cardWidth;

        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";

            if (carousel.scrollLeft >= cardWidth * cards.length) {
                carousel.scrollLeft -= cardWidth * cards.length;
            }
        }, 300); // matches animation time
    };

    document.getElementById("prevBtn").onclick = () => {
        carousel.style.scrollBehavior = "smooth";
        carousel.scrollLeft -= cardWidth;

        setTimeout(() => {
            carousel.style.scrollBehavior = "auto";

            if (carousel.scrollLeft <= 0) {
                carousel.scrollLeft += cardWidth * cards.length;
            }
        }, 300);
    };
}

