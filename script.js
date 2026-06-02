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
        },
        {
            title: "Cloud Architecture",
            description: "AWS, GCP, or Azure infrastructure. Scalable, cost-optimized cloud solutions.",
            keywords: ["cloud", "aws", "gcp", "azure", "infrastructure", "scalable"]
        },
        {
            title: "DevOps & CI/CD",
            description: "Docker, Kubernetes, GitHub Actions. Automated deployments and monitoring.",
            keywords: ["devops", "ci/cd", "docker", "kubernetes", "github actions", "deployment"]
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

    // ---- Render Services (Horizontal Scroll) ----
    const servicesGrid = document.getElementById('servicesGrid');
    // Ensure it stays horizontal (styles.css already sets flex)
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

    // ---- Render Pricing (Vertical grid) ----
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

    // ---- Search Functionality (filters horizontal cards) ----
    const searchInput = document.getElementById('searchInput');
    const serviceCards = document.querySelectorAll('.service-card');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const keywords = (card.dataset.keywords || '').toLowerCase();
            
            if (query === '' || title.includes(query) || description.includes(query) || keywords.includes(query)) {
                card.style.display = 'block';
                card.style.flex = '0 0 auto';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // ---- Scroll Animation: Fade-in on scroll ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate service cards, pricing cards, and contact form
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---- Optional: Typewriter effect on hero subtitle ----
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroSubtitle.textContent += text[i];
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);
    }

    // ---- Floating particles in hero (decorative) ----
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = 'rgba(255,255,255,0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${5 + Math.random() * 5}s linear infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            hero.appendChild(particle);
        }
    }
    createParticles();

    // Add keyframe for floating animation dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

});
