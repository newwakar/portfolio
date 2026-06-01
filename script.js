document.addEventListener('DOMContentLoaded', () => {

    const servicesData = [
        { title: "Web Development", description: "Responsive websites using React, Vue, or vanilla JavaScript. SEO-optimized and fast-loading.", keywords: ["web", "development", "react", "vue", "javascript"] },
        { title: "Mobile Apps", description: "Native and cross-platform mobile applications for iOS and Android using React Native or Flutter.", keywords: ["mobile", "app", "ios", "android"] },
        { title: "API Development", description: "RESTful and GraphQL APIs with Node.js, Python, or Java. Secure and scalable backend solutions.", keywords: ["api", "backend", "node.js", "python"] },
        { title: "Database Design", description: "SQL and NoSQL database design, optimization, and management.", keywords: ["database", "sql", "mongodb"] },
        { title: "UI/UX Design", description: "Modern, user-friendly interfaces with Figma. Prototyping, wireframing.", keywords: ["ui", "ux", "design", "figma"] }
    ];

    const pricingData = [
        { plan: "Basic", price: "$50", period: "/ hour", features: ["Single page website", "Responsive design", "Basic SEO", "2 revisions"], buttonText: "Start Basic" },
        { plan: "Standard", price: "$100", period: "/ hour", features: ["Multi-page website", "Mobile apps (basic)", "API integration", "5 revisions"], buttonText: "Go Standard", highlighted: true },
        { plan: "Premium", price: "$150", period: "/ hour", features: ["Full-stack application", "Custom APIs", "Database design", "Unlimited revisions"], buttonText: "Go Premium" }
    ];

    // --- Horizontal scrolling track with duplicated items ---
    const track = document.getElementById('servicesTrack');
    // Create original cards
    servicesData.forEach(service => {
        const card = createServiceCard(service);
        track.appendChild(card);
    });
    // Duplicate for seamless loop
    servicesData.forEach(service => {
        const card = createServiceCard(service);
        track.appendChild(card);
    });

    function createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.keywords = service.keywords.join(' ');
        card.innerHTML = `
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        return card;
    }

    // --- Pricing ---
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

    // --- Search filtering (affects visible cards) ---
    const searchInput = document.getElementById('searchInput');
    const allCards = document.querySelectorAll('.service-card');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        // Hide all cards first, then show matching ones
        // But scroll track has duplicates, so we filter both sets
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const keywords = (card.dataset.keywords || '').toLowerCase();
            const match = query === '' || title.includes(query) || description.includes(query) || keywords.includes(query);
            card.style.display = match ? '' : 'none';
        });
        // If no results, we might want to show "no results" message - optional
    });

});
