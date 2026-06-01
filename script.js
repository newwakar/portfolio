// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // ---- Data Definitions ----
    const servicesData = [ /* ... same as before ... */ ];
    const pricingData = [ /* ... same as before ... */ ];

    // ---- Render Services ----
    // (same code as previous)

    // ---- Render Pricing ----
    // (same code as previous)

    // ---- Search Functionality ----
    // (same code as previous)

    // ---- Auto‑scroll for Pricing Section ----
    const pricingGrid = document.getElementById('pricingGrid');
    let scrollInterval;
    let isPaused = false;

    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            if (isPaused) return;
            const maxScroll = pricingGrid.scrollWidth - pricingGrid.clientWidth;
            if (pricingGrid.scrollLeft >= maxScroll - 5) {
                pricingGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                pricingGrid.scrollBy({ left: 2, behavior: 'smooth' });
            }
        }, 30);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    // Pause on hover/touch
    pricingGrid.addEventListener('mouseenter', () => isPaused = true);
    pricingGrid.addEventListener('mouseleave', () => isPaused = false);
    pricingGrid.addEventListener('touchstart', () => isPaused = true);
    pricingGrid.addEventListener('touchend', () => setTimeout(() => isPaused = false, 2000));

    startAutoScroll();

    // ---- Intersection Observer for Service Cards (fade‑in on scroll) ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.service-card').forEach(card => observer.observe(card));

    // ---- Smooth scroll for nav links ----
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
