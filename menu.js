/* ===== menu.js ===== */

// ============================================================
// 1. IMAGE LOADING WITH RETRY AND FALLBACK
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.menu-item-image img');
    
    images.forEach(img => {
        // Function to handle successful load
        function loadImage() {
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.6s ease';
            }, 100);
        }
        
        // If image is already loaded
        if (img.complete && img.naturalWidth > 0) {
            loadImage();
        } else {
            // Wait for image to load
            img.addEventListener('load', loadImage);
            
            // If image fails, try different extensions
            img.addEventListener('error', function() {
                console.log('❌ Failed to load:', this.src);
                // Try .jpg if .jfif fails
                if (this.src.endsWith('.jfif')) {
                    const newSrc = this.src.replace('.jfif', '.jpg');
                    console.log('🔄 Trying .jpg:', newSrc);
                    this.src = newSrc;
                    // If .jpg fails, try .png
                    this.addEventListener('error', function() {
                        if (this.src.endsWith('.jpg')) {
                            const newSrc2 = this.src.replace('.jpg', '.png');
                            console.log('🔄 Trying .png:', newSrc2);
                            this.src = newSrc2;
                            // If all fail, hide the image
                            this.addEventListener('error', function() {
                                console.log('❌ All formats failed for:', this.src);
                                this.style.display = 'none';
                            });
                        }
                    });
                }
            });
        }
    });
});

// ============================================================
// 2. FORCE IMAGE RELOAD ON PAGE VISIBILITY CHANGE
// ============================================================
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const images = document.querySelectorAll('.menu-item-image img');
        images.forEach(img => {
            if (!img.complete || img.naturalWidth === 0) {
                const src = img.src.split('?')[0];
                img.src = src + '?t=' + new Date().getTime();
            }
        });
    }
});

// ============================================================
// 3. ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.menu-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                const navHeight = document.querySelector('.menu-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================================
// 4. UPDATE ACTIVE NAV ON SCROLL
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.menu-category');
    const navLinks = document.querySelectorAll('.menu-nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = document.querySelector('.menu-nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// ============================================================
// 5. SCROLL REVEAL ANIMATIONS FOR MENU ITEMS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item, .wine-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(item);
        });
    }
});

// ============================================================
// 6. KEYBOARD NAVIGATION FOR MENU
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const activeLink = document.querySelector('.menu-nav-link.active');
        const links = document.querySelectorAll('.menu-nav-link');
        let currentIndex = Array.from(links).indexOf(activeLink);
        
        if (e.key === 'ArrowDown' && currentIndex < links.length - 1) {
            links[currentIndex + 1].click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            links[currentIndex - 1].click();
        }
    }
});

// ============================================================
// 7. SMOOTH SCROLL FOR NAVIGATION LINKS IN FOOTER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.menu-nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ============================================================
// 8. PARALLAX EFFECT ON MENU HERO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.menu-hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < hero.offsetHeight) {
                const opacity = 1 - (scrollPosition / hero.offsetHeight) * 0.3;
                hero.style.opacity = opacity;
                hero.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });
    }
});

// ============================================================
// 9. CONSOLE BRANDING
// ============================================================
console.log('%c✦ OSTERIA VESUVIO ✦', 'font-size: 24px; color: #C4973E; font-weight: bold;');
console.log('%cAuthentic Italian Cuisine', 'font-size: 14px; color: #f0d68a;');
console.log('%cExplore our menu and experience the flavors of Naples.', 'font-size: 14px; color: #f0d68a;');
console.log('✅ Menu page loaded successfully!');