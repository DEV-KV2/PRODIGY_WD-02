// Get DOM elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll event handler
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when scrolled past 50px
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu toggle handler
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a nav link
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scroll to section
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu after clicking a link
    closeMobileMenu();
}

// Highlight active nav link based on scroll position
function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current section's nav link
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Add special hover effects
function addHoverEffects() {
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Add click effect
        link.addEventListener('click', function(e) {
            // Create click effect
            const clickEffect = document.createElement('span');
            clickEffect.style.position = 'absolute';
            clickEffect.style.borderRadius = '50%';
            clickEffect.style.background = 'rgba(26, 35, 126, 0.3)';
            clickEffect.style.transform = 'scale(0)';
            clickEffect.style.animation = 'ripple 0.6s linear';
            clickEffect.style.left = '50%';
            clickEffect.style.top = '50%';
            clickEffect.style.width = '20px';
            clickEffect.style.height = '20px';
            clickEffect.style.marginLeft = '-10px';
            clickEffect.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(clickEffect);
            
            setTimeout(() => {
                if (clickEffect.parentNode) {
                    clickEffect.parentNode.removeChild(clickEffect);
                }
            }, 600);
        });
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Scroll events (throttled for performance)
    window.addEventListener('scroll', throttle(() => {
        handleScroll();
        highlightActiveSection();
    }, 10));
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// Add dynamic CSS for ripple animation
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            background: linear-gradient(45deg, #1a237e, #3f51b5) !important;
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(26, 35, 126, 0.4);
        }
        
        .navbar.scrolled .nav-link.active {
            background: linear-gradient(45deg, #fff, #e3f2fd) !important;
            color: #1a237e !important;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    addHoverEffects();
    addDynamicStyles();
    
    // Initial calls
    handleScroll();
    highlightActiveSection();
});

// Handle page load
window.addEventListener('load', () => {
    // Ensure initial state is correct
    handleScroll();
    highlightActiveSection();
});
