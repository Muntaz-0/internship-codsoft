// Navbar Shadow on Scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
        } else {
            navbar.style.boxShadow = "none";
        }
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Hero Animation
window.addEventListener("load", function () {
    const hero = document.querySelector(".hero");

    if (hero) {
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";
    }
});