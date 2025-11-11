// ============================================
// Beautiful Love Letter Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScroll();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Timeline animation on scroll
    initTimelineAnimation();
    
    // Letter tabs functionality
    initLetterTabs();
    
    // Gallery hover effects
    initGalleryEffects();
    
    // Floating hearts animation
    initFloatingHearts();
    
    // Parallax effect for hero section
    initParallaxEffect();
    
    // Add fade-in animations to cards
    initFadeInAnimations();
});

// ============================================
// Smooth Scrolling with Custom Easing
// ============================================

// Custom easing function for smooth scrolling
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const scrollButtons = document.querySelectorAll('[data-scroll-target]');
    
    function handleScroll(e, target) {
        e.preventDefault();
        if (!target) return;
        
        const navHeight = document.querySelector('.top-nav').offsetHeight || 0;
        const targetPosition = target.offsetTop - navHeight;
        
        smoothScrollTo(targetPosition, 1200);
    }
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            handleScroll(e, target);
        });
    });
    
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-scroll-target');
            const target = document.querySelector(targetId);
            handleScroll(e, target);
        });
    });
}

// ============================================
// Navbar Scroll Effect
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.top-nav');
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('visible');
            navbar.classList.add('scrolled');
        } else if (currentScroll > 50) {
            navbar.classList.add('visible');
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.remove('visible');
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Initial check on page load
    updateNavbar();
}

// ============================================
// Timeline Animation
// ============================================

function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ============================================
// Letter Tabs
// ============================================

function initLetterTabs() {
    const letterTabs = document.querySelectorAll('.letter-tab');
    const letterContent = document.querySelector('.letter-content');
    
    const letters = {
        gratitude: {
            title: 'Gratitude',
            text: 'Thank you for believing in me even when I doubted myself. Your steady love is my courage, my reminder that I am cherished. Every day you choose to stand by me is a gift I never take for granted.'
        },
        admiration: {
            title: 'Admiration',
            text: 'I am in awe of your strength, your kindness, and the way you light up every room you enter. You have this incredible ability to make everything better just by being you. I fall in love with you all over again every time I see you smile.'
        },
        dreams: {
            title: 'Dreams',
            text: 'I dream of growing old with you, of watching sunsets together, of building a life filled with laughter and love. Every dream I have includes you, because you are not just part of my future—you are my future.'
        },
        promise: {
            title: 'Promise',
            text: 'I promise to love you through every season, to be your safe place, your biggest cheerleader, and your best friend. I promise to choose us, every single day, for the rest of our lives. You are my forever.'
        }
    };
    
    letterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            letterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get letter data
            const letterType = this.getAttribute('data-letter');
            const letter = letters[letterType];
            
            if (letter) {
                // Fade out
                letterContent.style.opacity = '0';
                letterContent.style.transform = 'translateY(10px)';
                
                // Update content after fade
                setTimeout(() => {
                    letterContent.querySelector('.letter-title').textContent = letter.title;
                    letterContent.querySelector('.letter-text').textContent = letter.text;
                    
                    // Fade in
                    letterContent.style.opacity = '1';
                    letterContent.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });
}

// ============================================
// Gallery Effects
// ============================================

function initGalleryEffects() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}


// ============================================
// Parallax Effect
// ============================================

function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        
        if (scrolled < window.innerHeight) {
            const parallaxValue = scrolled * 0.5;
            if (heroContent) {
                heroContent.style.transform = `translateY(${parallaxValue}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }
    });
}

// ============================================
// Fade In Animations
// ============================================

function initFadeInAnimations() {
    const animatedElements = document.querySelectorAll('.promise-card, .gallery-card, .future-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// Add some interactive sparkles on click
// ============================================

document.addEventListener('click', function(e) {
    if (e.target.closest('.cta, .letter-tab, .promise-card, .gallery-card')) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#d4a574';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / 6;
        const distance = 30 + Math.random() * 20;
        const duration = 500 + Math.random() * 300;
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}


