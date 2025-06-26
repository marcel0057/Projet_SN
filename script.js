document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Demo button alert
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.closest('a[href^="#"]')) return;
            console.log("Demo en cours de développement...");
            alert("La démo vidéo n'est pas encore disponible.");
        });
    });

    // Menu burger
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').appendChild(menuToggle);
    
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Carousel implementation
    class Carousel {
        constructor(selector) {
            this.carousel = document.querySelector(selector);
            this.inner = this.carousel.querySelector('.carousel-inner');
            this.items = Array.from(this.carousel.querySelectorAll('.carousel-item'));
            this.currentIndex = 0;
            
            this.initControls();
            this.updateCarousel();
            this.startAutoPlay();
        }
        
        initControls() {
            this.carousel.querySelector('.prev').addEventListener('click', () => this.prev());
            this.carousel.querySelector('.next').addEventListener('click', () => this.next());
            
            const indicators = this.carousel.querySelector('.carousel-indicators');
            this.items.forEach((_, i) => {
                const indicator = document.createElement('span');
                indicator.addEventListener('click', () => this.goTo(i));
                indicators.appendChild(indicator);
            });
            this.updateIndicators();
        }
        
        updateCarousel() {
            this.inner.style.transform = `translateX(-${this.currentIndex * 100}%)`;
            this.updateIndicators();
        }
        
        updateIndicators() {
            const indicators = this.carousel.querySelectorAll('.carousel-indicators span');
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === this.currentIndex);
            });
        }
        
        prev() {
            this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.items.length - 1;
            this.updateCarousel();
            this.resetAutoPlay();
        }
        
        next() {
            this.currentIndex = (this.currentIndex < this.items.length - 1) ? this.currentIndex + 1 : 0;
            this.updateCarousel();
            this.resetAutoPlay();
        }
        
        goTo(index) {
            this.currentIndex = index;
            this.updateCarousel();
            this.resetAutoPlay();
        }
        
        startAutoPlay() {
            this.interval = setInterval(() => this.next(), 5000);
        }
        
        resetAutoPlay() {
            clearInterval(this.interval);
            this.startAutoPlay();
        }
    }

    // Initialize carousel
    new Carousel('.carousel');

    // Scroll animations
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section, .hero');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionMiddle = sectionTop + (section.offsetHeight / 2);
            
            if (sectionMiddle < windowBottom && sectionMiddle > windowTop) {
                section.classList.add('visible');
                
                // Animate feature cards individually
                if (section.id === 'features') {
                    const cards = section.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load for visible elements
});