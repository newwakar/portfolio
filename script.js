document.addEventListener('DOMContentLoaded', () => {

    // ---- DATA ----
    const servicesData = [
        { title: "Web Development", description: "Responsive websites using React, Vue, or vanilla JavaScript. SEO-optimized.", keywords: ["web","development","react","vue","javascript","html","css","frontend"] },
        { title: "Mobile Apps", description: "Native & cross-platform apps for iOS and Android using React Native or Flutter.", keywords: ["mobile","app","ios","android","react native","flutter"] },
        { title: "API Development", description: "RESTful & GraphQL APIs with Node.js, Python, or Java. Scalable backend.", keywords: ["api","backend","node.js","python","java","rest","graphql"] },
        { title: "Database Design", description: "SQL & NoSQL design, optimization, management. PostgreSQL, MongoDB, Firebase.", keywords: ["database","sql","nosql","postgresql","mongodb","firebase"] },
        { title: "UI/UX Design", description: "Modern interfaces with Figma. Prototyping, wireframing, user research.", keywords: ["ui","ux","design","figma","prototyping","wireframe"] },
        { title: "Cloud Architecture", description: "AWS, GCP, Azure. Scalable, cost-optimized cloud solutions.", keywords: ["cloud","aws","gcp","azure","infrastructure"] },
        { title: "DevOps", description: "Docker, Kubernetes, GitHub Actions. Automated deployments & monitoring.", keywords: ["devops","docker","kubernetes","github actions","ci/cd"] }
    ];

    const pricingData = [
        { plan: "Basic", price: "$50", period: "/ hour", features: ["Single page website","Responsive design","Basic SEO","2 revisions"], buttonText: "Start Basic" },
        { plan: "Standard", price: "$100", period: "/ hour", features: ["Multi-page website","Mobile apps (basic)","API integration","5 revisions"], buttonText: "Go Standard", highlighted: true },
        { plan: "Premium", price: "$150", period: "/ hour", features: ["Full-stack application","Custom APIs","Database design","Unlimited revisions"], buttonText: "Go Premium" }
    ];

    // ---- RENDER SERVICES (Horizontal Scroll) ----
    const servicesGrid = document.getElementById('servicesGrid');
    servicesData.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.keywords = service.keywords.join(' ');
        card.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p>`;
        servicesGrid.appendChild(card);
    });

    // ---- RENDER PRICING (Vertical) ----
    const pricingGrid = document.getElementById('pricingGrid');
    pricingData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pricing-card' + (item.highlighted ? ' featured' : '');
        const featuresHTML = item.features.map(f => `<li>${f}</li>`).join('');
        card.innerHTML = `
            <h3>${item.plan}</h3>
            <div class="price">${item.price}</div>
            <div class="price-period">${item.period}</div>
            <ul>${featuresHTML}</ul>
            <button class="pricing-button">${item.buttonText}</button>
        `;
        pricingGrid.appendChild(card);
    });

    // ---- SEARCH FILTER (for services) ----
    const searchInput = document.getElementById('searchInput');
    const serviceCards = document.querySelectorAll('.service-card');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const keywords = (card.dataset.keywords || '').toLowerCase();
            const match = query === '' || title.includes(query) || desc.includes(query) || keywords.includes(query);
            card.style.display = match ? 'block' : 'none';
        });
    });

    // ---- SCROLL ANIMATIONS (Intersection Observer) ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all cards (already have CSS animation, but this ensures they appear when scrolled into view)
    document.querySelectorAll('.service-card, .pricing-card, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---- TYPEWRITER EFFECT ON HERO SUBTITLE ----
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                heroSubtitle.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 25);
    }

    // ---- FLOATING PARTICLES (decorative) ----
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${5 + Math.random() * 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }

    // Add keyframe for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

});
