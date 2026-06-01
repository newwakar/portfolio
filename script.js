// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // ---- Data Definitions ----
    const servicesData = [
        {
            title: "Web Development",
            description: "Responsive websites using React, Vue, or vanilla JavaScript. SEO-optimized and fast-loading.",
            keywords: ["web", "development", "react", "vue", "javascript", "html", "css", "frontend", "responsive"]
        },
        {
            title: "Mobile Apps",
            description: "Native and cross-platform mobile applications for iOS and Android using React Native or Flutter.",
            keywords: ["mobile", "app", "ios", "android", "react native", "flutter", "cross-platform"]
        },
        {
            title: "API Development",
            description: "RESTful and GraphQL APIs with Node.js, Python, or Java. Secure and scalable backend solutions.",
            keywords: ["api", "backend", "node.js", "python", "java", "rest", "graphql", "server"]
        },
        {
            title: "Database Design",
            description: "SQL and NoSQL database design, optimization, and management. PostgreSQL, MongoDB, Firebase.",
            keywords: ["database", "sql", "nosql", "postgresql", "mongodb", "firebase", "data"]
        },
        {
            title: "UI/UX Design",
            description: "Modern, user-friendly interfaces with Figma. Prototyping, wireframing, and user research.",
            keywords: ["ui", "ux", "design", "figma", "prototyping", "wireframe", "interface"]
        }
    ];

    const pricingData = [
        {
            plan: "Basic",
            price: "$50",
            period: "/ hour",
            features: ["Single page website", "Responsive design", "Basic SEO", "2 revisions"],
            buttonText: "Start Basic"
        },
        {
            plan: "Standard",
            price: "$100",
            period: "/ hour",
            features: ["Multi-page website", "Mobile apps (basic)", "API integration", "5 revisions"],
            buttonText: "Go Standard",
            highlighted: true
        },
        {
            plan: "Premium",
            price: "$150",
            period: "/ hour",
            features: ["Full-stack application", "Custom APIs", "Database design", "Unlimited revisions"],
            buttonText: "Go Premium"
        }
    ];

    // ---- Render Services ----
    const servicesGrid = document.getElementById('servicesGrid');
    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.keywords = service.keywords.join(' ');
        card.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesGrid.appendChild(card);
    });

    // ---- Render Pricing ----
    const pricingGrid = document.getElementById('pricingGrid');
    pricingData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pricing-card' + (item.highlighted ? ' featured' : '');
        let featuresList = item.features.map(f => `<li>${f}</li>`).join('');
        card.innerHTML = `
            <h3>${item.plan}</h3>
            <div class="price">${item.price}</div>
            <div class="price-period">${item.period}</div>
            <ul>${featuresList}</ul>
            <button class="pricing-button">${item.buttonText}</button>
        `;
        pricingGrid.appendChild(card);
    });

    // ---- Search Functionality ----
    const searchInput = document.getElementById('searchInput');
    const serviceCards = document.querySelectorAll('.service-card');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const keywords = (card.dataset.keywords || '').toLowerCase();
            
            if (query === '' || title.includes(query) || description.includes(query) || keywords.includes(query)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });

});

// ---- Scroll Animation ----
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Observe the main sections
document.querySelectorAll('#services, #pricing, #contact').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Also observe individual pricing cards if desired
document.querySelectorAll('.pricing-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    observer.observe(card);
});
