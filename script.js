// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'slideUp 0.8s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Lütfen tüm alanları doldurun!', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mesajınız başarıyla gönderildi!', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.text-block, .interest-card, .portfolio-item, .timeline-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.stars, .particles');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('stars') ? 0.5 : 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add floating particles animation
    function createFloatingParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 212, 255, 0.6)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createFloatingParticles();
    
    // Add cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({x: mouseX, y: mouseY, time: Date.now()});
        
        // Keep only recent trail points
        trail = trail.filter(point => Date.now() - point.time < 1000);
        
        // Update trail elements
        updateTrail();
    });
    
    function updateTrail() {
        // Remove existing trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());
        
        // Create new trail elements
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'cursor-trail';
            trailElement.style.position = 'fixed';
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.width = '4px';
            trailElement.style.height = '4px';
            trailElement.style.background = 'rgba(0, 212, 255, 0.3)';
            trailElement.style.borderRadius = '50%';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.zIndex = '9999';
            trailElement.style.transform = 'translate(-50%, -50%)';
            trailElement.style.opacity = (index / trail.length) * 0.5;
            
            document.body.appendChild(trailElement);
            
            // Remove trail element after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 1000);
        });
    }
    
    // Add loading screen
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.style.position = 'fixed';
        loader.style.top = '0';
        loader.style.left = '0';
        loader.style.width = '100%';
        loader.style.height = '100%';
        loader.style.background = 'var(--dark-bg)';
        loader.style.display = 'flex';
        loader.style.alignItems = 'center';
        loader.style.justifyContent = 'center';
        loader.style.zIndex = '10000';
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 3px solid rgba(0, 212, 255, 0.3); border-top: 3px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <p style="color: var(--text-primary); font-family: 'Orbitron', monospace;">Loading...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
});

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10001';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease-out';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00d4ff, #00b8d4)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #e53935)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #26c6da, #00bfa5)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add theme toggle (bonus feature)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Add theme toggle button (optional)
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.left = '20px';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.border = 'none';
    themeToggle.style.background = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.onclick = toggleTheme;
    
    document.body.appendChild(themeToggle);
}

// Uncomment to add theme toggle
// addThemeToggle();

// Carousel Systems
let experienceCurrentIndex = 0;
let skillsCurrentIndex = 0;
let isScrolling = false;

// Experience Carousel - Clean Implementation
function moveExperienceCarousel(direction) {
    if (isScrolling) return;
    
    const carousel = document.querySelector('.experience-carousel');
    const cards = document.querySelectorAll('.experience-card');
    if (!carousel || cards.length === 0) return;
    
    const totalCards = cards.length;
    const currentIndex = experienceCurrentIndex;
    
    // Calculate new index with wrap-around
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
        newIndex = totalCards - 1;
    } else if (newIndex >= totalCards) {
        newIndex = 0;
    }
    
    // Get card width including gap
    const card = cards[0];
    const cardWidth = card.offsetWidth;
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
    const scrollAmount = cardWidth + gap;
    
    // Update index
    experienceCurrentIndex = newIndex;
    
    // Remove active class from all cards
    cards.forEach(card => card.classList.remove('active'));
    
    // Calculate scroll position to center the card while keeping neighbors visible
    const carouselWidth = carousel.offsetWidth;
    // Center the card in the viewport
    const scrollPosition = (newIndex * scrollAmount) - (carouselWidth / 2) + (cardWidth / 2);
    
    // Scroll to the card
    isScrolling = true;
    carousel.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
    });
    
    // Update active card after scroll
    setTimeout(() => {
        if (cards[newIndex]) {
            cards[newIndex].classList.add('active');
        }
    }, 100);
    
    // Update indicators immediately
    updateExperienceIndicators();
    
    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function moveSkillsCarousel(direction) {
    const carousel = document.querySelector('.skills-carousel');
    const cards = document.querySelectorAll('.interest-card');
    const totalCards = cards.length;
    const cardsPerView = window.innerWidth < 768 ? 1 : 3;
    
    skillsCurrentIndex += direction;
    
    if (skillsCurrentIndex < 0) {
        skillsCurrentIndex = Math.ceil(totalCards / cardsPerView) - 1;
    } else if (skillsCurrentIndex >= Math.ceil(totalCards / cardsPerView)) {
        skillsCurrentIndex = 0;
    }
    
    const cardWidth = cards[0].offsetWidth + 16; // width + gap
    carousel.scrollTo({
        left: skillsCurrentIndex * cardsPerView * cardWidth,
        behavior: 'smooth'
    });
    
    updateSkillsIndicators();
}

function updateExperienceIndicators() {
    const indicators = document.getElementById('experienceIndicators');
    const cards = document.querySelectorAll('.experience-card');
    
    if (!indicators || cards.length === 0) return;
    
    indicators.innerHTML = '';
    
    cards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${index === experienceCurrentIndex ? 'active' : ''}`;
        indicator.onclick = () => {
            if (isScrolling) return;
            
            const carousel = document.querySelector('.experience-carousel');
            if (!carousel) return;
            
            experienceCurrentIndex = index;
            
            // Remove active class from all cards
            cards.forEach(card => card.classList.remove('active'));
            
            const card = cards[0];
            const cardWidth = card.offsetWidth;
            const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
            const scrollAmount = cardWidth + gap;
            
            // Calculate scroll position to center the card while keeping neighbors visible
            const carouselWidth = carousel.offsetWidth;
            // Center the card in the viewport
            const scrollPosition = (index * scrollAmount) - (carouselWidth / 2) + (cardWidth / 2);
            
            isScrolling = true;
            carousel.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
            
            // Update active card after scroll
            setTimeout(() => {
                if (cards[index]) {
                    cards[index].classList.add('active');
                }
            }, 100);
            
            updateExperienceIndicators();
            
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        };
        indicators.appendChild(indicator);
    });
}

function updateSkillsIndicators() {
    const indicators = document.getElementById('skillsIndicators');
    const cards = document.querySelectorAll('.interest-card');
    const cardsPerView = window.innerWidth < 768 ? 1 : 3;
    const totalPages = Math.ceil(cards.length / cardsPerView);
    
    indicators.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${i === skillsCurrentIndex ? 'active' : ''}`;
        indicator.onclick = () => {
            skillsCurrentIndex = i;
            const carousel = document.querySelector('.skills-carousel');
            const cardWidth = cards[0].offsetWidth + 16;
            carousel.scrollTo({
                left: i * cardsPerView * cardWidth,
                behavior: 'smooth'
            });
            updateSkillsIndicators();
        };
        indicators.appendChild(indicator);
    }
}

// Initialize indicators on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateExperienceIndicators();
        updateSkillsIndicators();
        
        // Initialize experience carousel with scroll detection
        const experienceCarousel = document.querySelector('.experience-carousel');
        if (experienceCarousel) {
            let scrollTimeout;
            
            // Update index based on scroll position and set active card
            const updateIndexFromScroll = () => {
                const cards = document.querySelectorAll('.experience-card');
                if (cards.length === 0) return;
                
                const carouselRect = experienceCarousel.getBoundingClientRect();
                const carouselCenter = carouselRect.left + carouselRect.width / 2;
                
                let closestCard = null;
                let closestDistance = Infinity;
                let activeIndex = 0;
                
                // Find the card closest to center
                cards.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const distance = Math.abs(carouselCenter - cardCenter);
                    
                    // Remove active class from all cards
                    card.classList.remove('active');
                    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCard = card;
                        activeIndex = index;
                    }
                });
                
                // Add active class to closest card and ensure neighbors are visible
                if (closestCard) {
                    closestCard.classList.add('active');
                    
                    // Ensure left and right neighbors are visible and blurred
                    // Left neighbor
                    if (activeIndex > 0) {
                        const leftCard = cards[activeIndex - 1];
                        if (leftCard) {
                            leftCard.classList.remove('active');
                            // Force blur by ensuring it doesn't have active class
                        }
                    }
                    
                    // Right neighbor
                    if (activeIndex < cards.length - 1) {
                        const rightCard = cards[activeIndex + 1];
                        if (rightCard) {
                            rightCard.classList.remove('active');
                            // Force blur by ensuring it doesn't have active class
                        }
                    }
                }
                
                // Update index for indicators
                const card = cards[0];
                const cardWidth = card.offsetWidth;
                const gap = parseInt(window.getComputedStyle(experienceCarousel).gap) || 32;
                const scrollAmount = cardWidth + gap;
                const scrollLeft = experienceCarousel.scrollLeft;
                
                const newIndex = Math.round(scrollLeft / scrollAmount);
                
                if (newIndex !== experienceCurrentIndex && newIndex >= 0 && newIndex < cards.length) {
                    experienceCurrentIndex = newIndex;
                    updateExperienceIndicators();
                }
            };
            
            // Use scroll event with debouncing
            experienceCarousel.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(updateIndexFromScroll, 100);
            });
            
            // Handle scroll end (for scroll-snap)
            experienceCarousel.addEventListener('scrollend', () => {
                updateIndexFromScroll();
                isScrolling = false;
            });
            
            // Initial update
            updateIndexFromScroll();
            
            // Set first card as active on initial load
            const cards = document.querySelectorAll('.experience-card');
            if (cards.length > 0) {
                cards[0].classList.add('active');
            }
        }
        
        // Update indicators on scroll for skills carousel
        const skillsCarousel = document.querySelector('.skills-carousel');
        if (skillsCarousel) {
            skillsCarousel.addEventListener('scroll', () => {
                const cards = document.querySelectorAll('.interest-card');
                const cardsPerView = window.innerWidth < 768 ? 1 : 3;
                const scrollLeft = skillsCarousel.scrollLeft;
                const cardWidth = cards[0] ? cards[0].offsetWidth + 16 : 0;
                const newIndex = Math.round(scrollLeft / (cardWidth * cardsPerView));
                if (newIndex !== skillsCurrentIndex && newIndex >= 0 && newIndex < Math.ceil(cards.length / cardsPerView)) {
                    skillsCurrentIndex = newIndex;
                    updateSkillsIndicators();
                }
            });
        }
    }, 100);
});

// Experience Modal System
const experienceData = [
    {
        icon: 'fas fa-tasks',
        title: 'Project Management Intern',
        company: 'Sca Social',
        period: 'July 2025 - August 2025',
        overview: 'Completed a theory-oriented internship program focused on project management and related fields. Gained insights into project planning, organizational structures, budgeting, AI integration into projects, and the legal aspects of IT.',
        responsibilities: [
            'Learning project planning methodologies and best practices',
            'Understanding organizational structures and team dynamics',
            'Studying budgeting principles and cost management',
            'Exploring AI integration strategies in modern projects',
            'Gaining knowledge in IT law and legal compliance'
        ],
        achievements: [
            'Completed comprehensive project management training program',
            'Gained understanding of AI integration in project workflows',
            'Developed knowledge in IT legal frameworks and compliance',
            'Enhanced skills in data analysis for project decision-making'
        ],
        technologies: ['Project Management', 'IT Law', 'Artificial Intelligence', 'Data Analysis', 'Organizational Structure', 'Budgeting'],
        projects: [
            {
                name: 'Project Management Theory',
                description: 'Comprehensive study of project management principles, methodologies, and best practices for IT projects.'
            },
            {
                name: 'AI in Project Management',
                description: 'Research on integrating artificial intelligence tools and techniques into project management workflows.'
            }
        ]
    },
    {
        icon: 'fas fa-gamepad',
        title: 'Game Programming Intern',
        company: 'Erik Games',
        period: 'August 2024 - November 2024',
        overview: 'Working on game mechanics using C++ in Unreal Engine 4, building a structured quest system, integrating a smooth user interface, and developing a reliable save system to keep player progress consistent.',
        responsibilities: [
            'Developing game mechanics using C++ in Unreal Engine 4',
            'Building structured quest systems for player progression',
            'Integrating smooth and intuitive user interfaces',
            'Developing reliable save/load systems for player progress',
            'Collaborating with team members on feature implementation'
        ],
        achievements: [
            'Successfully implemented complex quest system architecture',
            'Integrated seamless UI that enhanced user experience',
            'Created robust save system ensuring data persistence',
            'Contributed to core gameplay mechanics development'
        ],
        technologies: ['Unreal Engine 4', 'C++', 'Quest Systems', 'UI Integration', 'Save Systems', 'Git'],
        projects: [
            {
                name: 'Quest Management System',
                description: 'Comprehensive quest system with branching narratives and progress tracking.'
            },
            {
                name: 'Player Save System',
                description: 'Reliable save/load functionality maintaining player progress across sessions.'
            }
        ]
    },
    {
        icon: 'fas fa-code',
        title: 'Software Engineering Intern',
        company: 'TURK AI',
        period: 'August 2023',
        overview: 'Developed a system to fetch and manage INTERPOL data using Python. Designed and implemented a PostgreSQL database, integrated RabbitMQ for messaging, and built a Flask-based web interface. Containerized the project using Docker for microservices compatibility.',
        responsibilities: [
            'Developing Python-based data fetching and management system',
            'Designing and implementing PostgreSQL database schema',
            'Integrating RabbitMQ for asynchronous messaging',
            'Building Flask-based web interface for data visualization',
            'Containerizing application using Docker for deployment'
        ],
        achievements: [
            'Built complete data management system from scratch',
            'Implemented efficient database design for large datasets',
            'Successfully integrated message queue architecture',
            'Deployed containerized microservices solution'
        ],
        technologies: ['Python', 'PostgreSQL', 'RabbitMQ', 'Flask', 'Docker', 'Microservices'],
        projects: [
            {
                name: 'INTERPOL Data Management System',
                description: 'Web-based system for fetching, managing and displaying INTERPOL data with microservices architecture.'
            }
        ]
    },
    {
        icon: 'fas fa-gamepad',
        title: 'Game Programming Intern',
        company: 'gamegine games',
        period: 'March 2023 - July 2023',
        overview: 'Conducted market research, gained proficiency in Unreal Engine 5, participated in game design processes, prototyped gameplay mechanics using Blueprint, collaborated within a team environment, and managed project workflows using GitHub.',
        responsibilities: [
            'Conducting market research for game development',
            'Learning and applying Unreal Engine 5 development practices',
            'Participating in game design and prototyping sessions',
            'Developing gameplay mechanics using Blueprint visual scripting',
            'Managing project workflows and version control with GitHub'
        ],
        achievements: [
            'Gained proficiency in Unreal Engine 5 and Blueprint',
            'Successfully prototyped multiple gameplay mechanics',
            'Contributed to game design decisions',
            'Managed collaborative workflows with GitHub'
        ],
        technologies: ['Unreal Engine 5', 'Blueprint', 'Game Design', 'GitHub', 'Market Research'],
        projects: [
            {
                name: 'Gameplay Prototypes',
                description: 'Multiple gameplay mechanic prototypes developed using Blueprint for concept validation.'
            },
            {
                name: 'Market Analysis',
                description: 'Comprehensive market research report for game genre and audience targeting.'
            }
        ]
    }
];

function openExperienceModal(index) {
    const modal = document.getElementById('experienceModal');
    const data = experienceData[index];
    
    // Update modal content
    document.getElementById('modalIcon').className = data.icon;
    document.getElementById('modalJobTitle').textContent = data.title;
    document.getElementById('modalCompany').textContent = data.company;
    document.getElementById('modalPeriod').textContent = data.period;
    document.getElementById('modalOverview').textContent = data.overview;
    
    // Update responsibilities
    const responsibilitiesList = document.getElementById('modalResponsibilities');
    responsibilitiesList.innerHTML = '';
    data.responsibilities.forEach(responsibility => {
        const li = document.createElement('li');
        li.textContent = responsibility;
        responsibilitiesList.appendChild(li);
    });
    
    // Update achievements
    const achievementsList = document.getElementById('modalAchievements');
    achievementsList.innerHTML = '';
    data.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
    });
    
    // Update technologies
    const technologiesContainer = document.getElementById('modalTechnologies');
    technologiesContainer.innerHTML = '';
    data.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-item';
        span.textContent = tech;
        technologiesContainer.appendChild(span);
    });
    
    // Update projects
    const projectsContainer = document.getElementById('modalProjects');
    projectsContainer.innerHTML = '';
    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <h5>${project.name}</h5>
            <p>${project.description}</p>
        `;
        projectsContainer.appendChild(div);
    });
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeExperienceModal() {
    const modal = document.getElementById('experienceModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('experienceModal');
    if (event.target === modal) {
        closeExperienceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeExperienceModal();
        closeProjectModal();
    }
});

// Project Modal System
const projectData = [
    {
        icon: 'fas fa-cube',
        title: 'Blockchain Certificate Management',
        category: 'Blockchain & Web3',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Developed a decentralized digital certificate platform using Blockchain, IPFS, React, and Node.js. Implemented smart contracts and secure data management for tamper-proof certificate verification and distribution.',
        downloads: 'Academic Project',
        rating: 'N/A',
        platforms: 'Web',
        duration: '4 months',
        technologies: ['Blockchain', 'IPFS', 'React', 'Node.js', 'Smart Contracts', 'Web3'],
        features: [
            'Decentralized certificate storage using IPFS',
            'Smart contract implementation for verification',
            'Tamper-proof certificate management',
            'Secure digital identity verification',
            'React-based user interface',
            'Node.js backend API'
        ],
        process: 'The project was developed over 4 months, focusing on blockchain technology implementation and secure data management. Smart contracts were written and deployed to ensure certificate authenticity and immutability.',
        links: [
            { icon: 'fab fa-github', text: 'View on GitHub', url: 'https://github.com/aslcerenhzr', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-book',
        title: 'Bookstore Web Application',
        category: 'Full-Stack Web Development',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Built a book favoriting application using React, Node.js, Express.js, and MongoDB with role-based access control. Features user authentication, book management, and personalized recommendations.',
        downloads: 'N/A',
        rating: 'N/A',
        platforms: 'Web',
        duration: '3 months',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'RESTful API'],
        features: [
            'User authentication and authorization',
            'Role-based access control',
            'Book favoriting and management',
            'Personalized book recommendations',
            'RESTful API architecture',
            'MongoDB database integration'
        ],
        process: 'Developed using MERN stack (MongoDB, Express, React, Node.js) over 3 months. Implemented secure authentication with JWT and created a scalable RESTful API for book management.',
        links: [
            { icon: 'fab fa-github', text: 'View on GitHub', url: 'https://github.com/aslcerenhzr', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-database',
        title: 'INTERPOL Data Management System',
        category: 'Data Management & Backend',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Designed a web system to fetch and display INTERPOL data using Python, PostgreSQL, RabbitMQ, Flask, and Docker. Implemented microservices architecture with message queuing for scalable data processing.',
        downloads: 'Internship Project',
        rating: 'N/A',
        platforms: 'Web',
        duration: '1 month',
        technologies: ['Python', 'PostgreSQL', 'RabbitMQ', 'Flask', 'Docker', 'Microservices'],
        features: [
            'Automated data fetching system',
            'PostgreSQL database design and implementation',
            'RabbitMQ message queuing for async processing',
            'Flask web interface for data visualization',
            'Docker containerization for deployment',
            'Microservices architecture'
        ],
        process: 'Completed during software engineering internship at TURK AI. Implemented a complete data management pipeline from fetching to visualization using modern microservices architecture.',
        links: [
            { icon: 'fab fa-github', text: 'View on GitHub', url: 'https://github.com/aslcerenhzr', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-car',
        title: 'Driving License Exam Simulation',
        category: 'Game Development & Simulation',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Developing an interactive simulation project using Unity, allowing users to prepare for the driving license exam through gamified scenarios. Integrates a React-based frontend and PostgreSQL database for user progress tracking.',
        downloads: 'In Development',
        rating: 'N/A',
        platforms: 'PC & Web',
        duration: 'Ongoing',
        technologies: ['Unity', 'C#', 'React', 'PostgreSQL', 'Game Development', 'UI/UX'],
        features: [
            'Interactive driving simulation in Unity',
            'Realistic traffic scenarios',
            'Gamified exam preparation',
            'React-based web dashboard',
            'PostgreSQL for progress tracking',
            'User performance analytics'
        ],
        process: 'Currently in development, combining Unity game development with web technologies. The project aims to provide an engaging and effective way for users to prepare for driving license exams through interactive simulations.',
        links: [
            { icon: 'fab fa-github', text: 'View on GitHub', url: 'https://github.com/aslcerenhzr', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-hotel',
        title: 'Hotel Owner Simulator',
        category: 'Hotel Management Simulation',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Developed a hotel management simulation game using Unreal Engine 4 and C++ as part of a small development team. The game allows players to transform a small, old hotel into a thriving luxury resort empire by managing every aspect of hotel operations.',
        downloads: 'Team Project',
        rating: 'N/A',
        platforms: 'PC',
        duration: '6 months',
        technologies: ['Unreal Engine 4', 'C++', 'Blueprint', 'Game Design', 'Simulation', 'Team Development'],
        features: [
            'Design and customize hotel rooms',
            'Guest interaction and negotiation system',
            'Strategic management mechanics',
            'Business expansion and hotel acquisition',
            'Facility upgrades and improvements',
            'Player-driven customization systems',
            'Immersive simulation experience'
        ],
        process: 'Developed as part of a small development team, focusing on creating an immersive hotel management experience. The project emphasizes player-driven customization, strategic decision-making, and realistic guest interaction systems. Built using Unreal Engine 4 with C++ for core gameplay mechanics.',
        links: [
            { icon: 'fab fa-steam', text: 'View on Steam', url: 'https://store.steampowered.com/app/3158480/Hotel_Owner_Simulator', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-rocket',
        title: 'Mars Marine',
        category: 'Wave-Based FPS Game',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'One of my first projects in Unreal Engine 5. A wave-based shooter where enemies spawn at random locations and players must fight to survive. Features health pickup mechanics, UE5 animation system integration, and custom UI implementation.',
        downloads: 'Learning Project',
        rating: 'N/A',
        platforms: 'PC',
        duration: '3 months',
        technologies: ['Unreal Engine 5', 'Blueprint', 'Animation System', 'UI/UX', 'Game Design'],
        features: [
            'Wave-based enemy spawning system',
            'Random spawn locations (10 predefined points)',
            'Health pickup mechanics',
            'Game over system on player death',
            'UE5 animation system integration',
            'Custom UI implementation',
            'Menu level with bug fixes'
        ],
        process: 'This was one of my first projects in Unreal Engine 5, providing valuable hands-on experience with the engine. The project allowed me to explore UE5\'s animation system and UI integration in depth. After the initial development, I added a menu level and fixed various bugs to improve the overall experience.',
        links: [
            { icon: 'fab fa-github', text: 'View on GitHub', url: 'https://github.com/aslcerenhzr/mars_marine', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-puzzle-piece',
        title: '2D Jigsaw Puzzle Game',
        category: 'Procedural Puzzle Game',
        year: '2024',
        image: 'images/jigsaw-puzzle.png',
        description: 'Developed a 2D puzzle game using Unity, featuring dynamic photo loading and procedurally generated puzzle layouts. The system automatically divides any selected image into jigsaw pieces, ensuring a unique experience each playthrough.',
        downloads: 'N/A',
        rating: 'N/A',
        platforms: 'PC & Mobile',
        duration: '4 months',
        technologies: ['Unity', 'C#', 'Procedural Generation', '2D Graphics', 'Algorithm Design'],
        features: [
            'Dynamic photo loading system',
            'Procedural puzzle piece generation',
            'Custom image upload functionality',
            'Adjustable difficulty levels',
            'Automatic piece shape variation',
            'Smooth 2D environment with intuitive controls',
            'Scalable puzzle design for different image sizes'
        ],
        process: 'Developed using Unity with emphasis on algorithmic generation and user interaction. The project features a procedural logic system that dynamically adjusts piece shapes and difficulty levels based on the selected image. Players can upload their own photos to create personalized puzzles, making each gameplay session unique.',
        links: [
            { icon: 'fab fa-github', text: 'View on GitHub', url: 'https://github.com/aslcerenhzr/JigsawPuzzleGame', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-folder-open',
        title: 'SCA Social Internship Projects',
        category: 'Project Management Documentation',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Comprehensive collection of project management documentation created during a theory-oriented internship at SCA Social. Includes management and organizational analysis, project planning documents, AI & data science research, scheduling tools, and IT law studies.',
        downloads: 'Internship Project',
        rating: 'N/A',
        platforms: 'Documentation',
        duration: '2 months',
        technologies: ['Project Management', 'AI & Data Science', 'IT Law', 'Gantt Charts', 'Documentation', 'Organizational Analysis'],
        features: [
            'Management and Organization document',
            'Project Initiation Document (Project Charter)',
            'AI and Data Science project analysis',
            'Gantt Chart for project scheduling',
            'IT Law research and documentation',
            'Budgeting and cost management principles',
            'Organizational structure analysis'
        ],
        process: 'Completed during a 2-month remote internship at SCA Social (July-August 2025). The internship focused on project management theory and practical applications, covering project planning methodologies, organizational structures, AI integration strategies, and IT legal frameworks. All documents are available in the shared Google Drive folder.',
        links: [
            { icon: 'fas fa-folder', text: 'View Documents', url: 'https://drive.google.com/drive/u/0/folders/1tR_Ir7FkSHl1aDmUQb8WU18kFPoICpns', type: 'primary' }
        ]
    },
    {
        icon: 'fas fa-gamepad',
        title: 'UE5 Game Jam & Task Projects',
        category: 'Game Jam & Development Tasks',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        description: 'Collection of small-scale game projects developed with Unreal Engine 5 and C++ for various game jams and development tasks. Demonstrates rapid prototyping skills, creative problem-solving, and collaborative development in time-constrained environments.',
        downloads: 'Video Portfolio',
        rating: 'N/A',
        platforms: 'PC',
        duration: 'Multiple Events',
        technologies: ['Unreal Engine 5', 'C++', 'Blueprint', 'Game Design', 'Rapid Prototyping', 'Team Collaboration'],
        features: [
            'Horror Game Task - Atmospheric gameplay mechanics',
            'METU Game Jam - Collaborative team project',
            'Skill-based Task - Technical challenge implementation',
            'TED Game Jam - Creative rapid development',
            'Time-constrained development experience',
            'Video demonstrations of gameplay',
            'Multiple game genres and mechanics'
        ],
        process: 'Participated in various game jams and completed development tasks using Unreal Engine 5 and C++. These projects showcase the ability to work under tight deadlines, collaborate with teams, and rapidly prototype game ideas. All project videos are available in the Google Drive folder, demonstrating different gameplay mechanics and technical implementations.',
        links: [
            { icon: 'fas fa-video', text: 'View Videos', url: 'https://drive.google.com/drive/u/0/folders/1OvMgaaQvkiq6QKVZ-oEZ_5iT6YRU0yFL', type: 'primary' }
        ]
    }
];

function openProjectModal(index) {
    const modal = document.getElementById('projectModal');
    const data = projectData[index];
    
    // Update modal content
    document.getElementById('projectModalIcon').className = data.icon;
    document.getElementById('projectModalTitle').textContent = data.title;
    document.getElementById('projectModalCategory').textContent = data.category;
    document.getElementById('projectModalYear').textContent = data.year;
    document.getElementById('projectModalImage').src = data.image;
    document.getElementById('projectModalImage').alt = data.title;
    document.getElementById('projectModalDescription').textContent = data.description;
    
    // Update stats
    document.getElementById('projectModalDownloads').textContent = data.downloads;
    document.getElementById('projectModalRating').textContent = data.rating;
    document.getElementById('projectModalPlatforms').textContent = data.platforms;
    document.getElementById('projectModalDuration').textContent = data.duration;
    
    // Update technologies
    const techContainer = document.getElementById('projectModalTech');
    techContainer.innerHTML = '';
    data.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-item';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Update features
    const featuresContainer = document.getElementById('projectModalFeatures');
    featuresContainer.innerHTML = '';
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });
    
    // Update process
    document.getElementById('projectModalProcess').textContent = data.process;
    
    // Update links
    const linksContainer = document.getElementById('projectModalLinks');
    linksContainer.innerHTML = '';
    data.links.forEach(link => {
        const linkBtn = document.createElement('a');
        linkBtn.href = link.url;
        linkBtn.className = `project-link-btn ${link.type === 'secondary' ? 'secondary' : ''}`;
        linkBtn.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
        linksContainer.appendChild(linkBtn);
    });
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close project modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});
