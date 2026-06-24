/* ===== script.js ===== */

// ============================================================
// 0. EMAILJS CONFIGURATION - UPDATED WITH YOUR CREDENTIALS
// ============================================================
const EMAILJS_CONFIG = {
    // Your actual credentials
    PUBLIC_KEY: '161CU5FCV6O1N6Nbg',
    SERVICE_ID: 'service_x4x5dhj',
    RESTAURANT_TEMPLATE_ID: 'template_z1kb45e',
    CUSTOMER_TEMPLATE_ID: 'template_wz3u6v4'
};

// ============================================================
// 0.1 EMAILJS INITIALIZATION
// ============================================================
(function() {
    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        try {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('✅ EmailJS initialized successfully');
        } catch (error) {
            console.error('❌ EmailJS initialization failed:', error);
        }
    };
    script.onerror = function() {
        console.error('❌ Failed to load EmailJS SDK');
    };
    document.head.appendChild(script);
})();

// ============================================================
// 1. NAVBAR SCROLL EFFECT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.nav-bar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// ============================================================
// 2. SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a, .reserve-btn a, .book-btn a, .menu-btn a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.nav-bar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
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
// 3. DATE PICKER - DEFAULT VALUE & LUXURIOUS CALENDAR
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const datePicker = document.getElementById('myDatePicker');
    
    if (datePicker) {
        // Set default date to today
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        datePicker.value = `${year}-${month}-${day}`;
        
        // Add luxury styling when date is selected
        datePicker.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#f0d68a';
            }
        });
        
        // Trigger change event to set initial color
        datePicker.dispatchEvent(new Event('change'));
    }
});

// ============================================================
// 4. INTERACTIVE INPUT FIELDS - LUXURIOUS EFFECTS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const textInputs = document.querySelectorAll('input[type="text"].requ, input[type="email"].requ');
    
    textInputs.forEach(input => {
        // Keep background color same on focus and blur
        input.addEventListener('focus', function() {
            this.style.borderColor = '#C4973E';
            this.style.boxShadow = '0 0 30px rgba(196, 151, 62, 0.15), inset 0 0 20px rgba(196, 151, 62, 0.03)';
            this.style.background = 'linear-gradient(135deg, #1a1612, #14100c)';
        });
        
        input.addEventListener('blur', function() {
            if (this.value) {
                this.style.borderColor = 'rgba(196, 151, 62, 0.4)';
                this.style.color = '#f0d68a';
            } else {
                this.style.borderColor = 'rgba(196, 151, 62, 0.15)';
                this.style.color = '#fff';
                this.style.boxShadow = 'none';
            }
            this.style.background = 'linear-gradient(135deg, #1a1612, #14100c)';
        });
        
        // Keep background color on input
        input.addEventListener('input', function() {
            this.style.background = 'linear-gradient(135deg, #1a1612, #14100c)';
            if (this.value.length > 0) {
                this.style.color = '#f0d68a';
            } else {
                this.style.color = '#fff';
            }
        });
    });
});

// ============================================================
// 5. INTERACTIVE DROPDOWN - LUXURIOUS EFFECTS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('select.requ');
    
    selects.forEach(select => {
        select.addEventListener('focus', function() {
            this.style.borderColor = '#C4973E';
            this.style.boxShadow = '0 0 30px rgba(196, 151, 62, 0.15), inset 0 0 20px rgba(196, 151, 62, 0.03)';
        });
        
        select.addEventListener('blur', function() {
            if (this.value && this.value !== '' && this.value !== 'Select time' && this.value !== 'Select guests') {
                this.style.borderColor = 'rgba(196, 151, 62, 0.4)';
                this.style.color = '#f0d68a';
            } else {
                this.style.borderColor = 'rgba(196, 151, 62, 0.15)';
                this.style.color = '#fff';
                this.style.boxShadow = 'none';
            }
        });
        
        select.addEventListener('change', function() {
            if (this.value && this.value !== '' && this.value !== 'Select time' && this.value !== 'Select guests') {
                this.style.color = '#f0d68a';
                this.style.borderColor = 'rgba(196, 151, 62, 0.5)';
            }
        });
    });
});

// ============================================================
// 6. RESERVATION FORM - EMAIL SUBMISSION WITH EMAILJS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('myDatePicker').value;
            const time = document.getElementById('Time').value;
            const guests = document.getElementById('Guest').value;
            const occasion = document.getElementById('Occassion').value;
            
            // Validate required fields
            if (!fullName || !email || !date || !time || !guests) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Format date for display
            const formattedDate = formatDate(date);
            
            // Prepare reservation data
            const reservationData = {
                fullName: fullName,
                email: email,
                date: formattedDate,
                time: time,
                guests: guests,
                occasion: occasion || 'None specified'
            };
            
            // Send reservation emails using EmailJS
            sendReservationEmails(reservationData);
        });
    }
});

// ============================================================
// 7. EMAIL SENDING FUNCTION WITH EMAILJS
// ============================================================
function sendReservationEmails(data) {
    const submitBtn = document.querySelector('.on-click');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = '⏳ SENDING...';
    submitBtn.style.background = 'linear-gradient(135deg, #d4a84a, #e8c97a)';
    submitBtn.disabled = true;
    
    // Check if EmailJS is configured
    const isConfigured = EMAILJS_CONFIG.PUBLIC_KEY && 
                        EMAILJS_CONFIG.PUBLIC_KEY !== '' &&
                        EMAILJS_CONFIG.SERVICE_ID && 
                        EMAILJS_CONFIG.SERVICE_ID !== '' &&
                        EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID && 
                        EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID !== '' &&
                        EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID && 
                        EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID !== '';
    
    if (!isConfigured) {
        console.error('❌ EmailJS is not configured!');
        showNotification('⚠️ Email service is not configured. Please contact the restaurant directly.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #C4973E, #d4a84a, #e8c97a)';
        submitBtn.disabled = false;
        return;
    }
    
    // Prepare template parameters
    const templateParams = {
        to_name: data.fullName,
        to_email: data.email,
        from_name: data.fullName,
        from_email: data.email,
        date: data.date,
        time: data.time,
        guests: data.guests,
        occasion: data.occasion,
        restaurant_address: '14 Via della Vigna Nuova, Lower East Side, NY',
        restaurant_phone: '+1 (212) 744-3811',
        restaurant_email_contact: 'hello@osteriavesuvio.com'
    };
    
    console.log('📧 Sending emails with params:', templateParams);
    console.log('📧 Using Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('📧 Restaurant Template:', EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID);
    console.log('📧 Customer Template:', EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID);
    
    // Check if emailjs is available
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS SDK not loaded!');
        showNotification('⚠️ Email service is not available. Please try again later.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #C4973E, #d4a84a, #e8c97a)';
        submitBtn.disabled = false;
        return;
    }
    
    // Send both emails
    const promises = [];
    
    // 1. Send to restaurant
    const restaurantPromise = emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID,
        templateParams
    ).then(function(response) {
        console.log('✅ Restaurant email sent!', response);
        return { type: 'restaurant', success: true };
    }).catch(function(error) {
        console.error('❌ Restaurant email failed:', error);
        console.error('Error details:', error.text || error.message || error);
        return { type: 'restaurant', success: false, error: error };
    });
    promises.push(restaurantPromise);
    
    // 2. Send to customer
    const customerPromise = emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID,
        templateParams
    ).then(function(response) {
        console.log('✅ Customer email sent!', response);
        return { type: 'customer', success: true };
    }).catch(function(error) {
        console.error('❌ Customer email failed:', error);
        console.error('Error details:', error.text || error.message || error);
        return { type: 'customer', success: false, error: error };
    });
    promises.push(customerPromise);
    
    // Wait for all emails
    Promise.all(promises).then((results) => {
        const allSuccessful = results.every(r => r.success === true);
        
        if (allSuccessful) {
            submitBtn.textContent = '✓ RESERVATION CONFIRMED!';
            submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            submitBtn.style.transform = 'scale(1.02)';
            submitBtn.disabled = false;
            showNotification('✅ Your reservation has been confirmed! A confirmation email has been sent to you.', 'success');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #C4973E, #d4a84a, #e8c97a)';
                submitBtn.style.transform = 'scale(1)';
                
                const form = document.getElementById('reservationForm');
                form.reset();
                
                const datePicker = document.getElementById('myDatePicker');
                if (datePicker) {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    datePicker.value = `${year}-${month}-${day}`;
                }
                
                document.querySelectorAll('.requ').forEach(input => {
                    input.style.color = '#fff';
                    input.style.borderColor = 'rgba(196, 151, 62, 0.15)';
                    input.style.boxShadow = 'none';
                });
            }, 4000);
        } else {
            const failed = results.filter(r => !r.success);
            console.error('❌ Some emails failed:', failed);
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #C4973E, #d4a84a, #e8c97a)';
            submitBtn.disabled = false;
            showNotification('⚠️ Reservation received but there was an email issue. We will contact you shortly.', 'error');
        }
    }).catch((error) => {
        console.error('❌ Unexpected error:', error);
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #C4973E, #d4a84a, #e8c97a)';
        submitBtn.disabled = false;
        showNotification('⚠️ Something went wrong. Please try again or contact us directly.', 'error');
    });
}

// ============================================================
// 8. UTILITY FUNCTIONS
// ============================================================

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    
    const colors = {
        success: 'linear-gradient(135deg, #27ae60, #2ecc71)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #3498db, #2980b9)'
    };
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${colors[type] || colors.success};
        color: #fff;
        padding: 20px 30px;
        border-radius: 12px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        max-width: 400px;
        animation: slideIn 0.5s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        letter-spacing: 0.5px;
    `;
    
    // Add slide-in animation
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
    
    notification.innerHTML = `
        <span style="font-size: 24px;">${icons[type]}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ============================================================
// 9. ADD SHAKE ANIMATION FOR FORM VALIDATION
// ============================================================
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// ============================================================
// 10. MARQUEE PAUSE ON HOVER
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const marquee = document.querySelector('marquee');
    
    if (marquee) {
        marquee.addEventListener('mouseenter', function() {
            this.stop();
        });
        
        marquee.addEventListener('mouseleave', function() {
            this.start();
        });
    }
});

// ============================================================
// 11. CONSOLE WELCOME MESSAGE (Luxury Branding)
// ============================================================
console.log('%c✦ OSTERIA VESUVIO ✦', 'font-size: 24px; color: #C4973E; font-weight: bold;');
console.log('%cAuthentic Neapolitan cuisine in the heart of Lower Manhattan.', 'font-size: 14px; color: #f0d68a;');
console.log('%cA table worth lingering at.', 'font-size: 14px; color: #f0d68a;');

// ============================================================
// 12. SCROLL REVEAL ANIMATIONS FOR SECTIONS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.story, .menu, .space, .reservation, .footer');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            sectionObserver.observe(section);
        });
    }
});

// ============================================================
// 13. RESERVE BUTTON PULSE ANIMATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const reserveBtn = document.querySelector('.reserve-btn');
    
    if (reserveBtn) {
        setInterval(() => {
            reserveBtn.style.transform = 'scale(1.02)';
            setTimeout(() => {
                reserveBtn.style.transform = 'scale(1)';
            }, 200);
        }, 5000);
    }
});

// ============================================================
// 14. CHECK EMAILJS CONFIGURATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📧 EmailJS Configuration:');
    console.log('✅ Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('✅ Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('✅ Restaurant Template:', EMAILJS_CONFIG.RESTAURANT_TEMPLATE_ID);
    console.log('✅ Customer Template:', EMAILJS_CONFIG.CUSTOMER_TEMPLATE_ID);
    console.log('📧 Free tier: 200 emails per month');
});