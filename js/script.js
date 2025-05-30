// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '';
    }
});

// Form Submission
const consultationForm = document.getElementById('consultation-form');

consultationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(consultationForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = consultationForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Prepare email data
        const emailData = {
            to_email: 'info@agenticsolutionsllc.com',
            from_name: data.name,
            from_email: data.email,
            company: data.company || 'Not provided',
            phone: data.phone || 'Not provided',
            message: data.message || 'No additional details provided',
            subject: `New Consultation Request from ${data.name}`,
            reply_to: data.email
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            'service_your_service_id', // Replace with your EmailJS service ID
            'template_your_template_id', // Replace with your EmailJS template ID
            {
                to_email: emailData.to_email,
                from_name: emailData.from_name,
                from_email: emailData.from_email,
                company: emailData.company,
                phone: emailData.phone,
                message: emailData.message,
                subject: emailData.subject,
                reply_to: emailData.reply_to
            },
            'your_public_key' // Replace with your EmailJS public key
        );

        if (response.status === 200) {
            // Show success message
            showNotification('Your consultation request has been sent! We\'ll be in touch within 24 hours.', 'success');
            
            // Reset form
            consultationForm.reset();
        } else {
            throw new Error('Failed to send email');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Fallback to a server endpoint if EmailJS fails
        try {
            const response = await fetch('/api/send-consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: data.company || 'Not provided',
                    phone: data.phone || 'Not provided',
                    message: data.message || 'No additional details provided'
                })
            });

            if (response.ok) {
                showNotification('Your consultation request has been sent! We\'ll be in touch within 24 hours.', 'success');
                consultationForm.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (backupError) {
            console.error('Backup submission error:', backupError);
            showNotification('Something went wrong. Please try again or contact us directly at info@agenticsolutionsllc.com', 'error');
        }
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .service-card, .solution-item, .benefit-item').forEach(el => {
    observer.observe(el);
});

// Parallax Effect for Hero Section
const heroContent = document.querySelector('.hero-content');
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.5;
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${rate * 0.3}px)`;
    }
    
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate * 0.5}px)`;
    }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card, .solution-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation feedback
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '';
    });
});

// Budget range dynamic update
const budgetSelect = document.getElementById('budget');
if (budgetSelect) {
    budgetSelect.addEventListener('change', function() {
        const timeline = document.getElementById('timeline');
        if (this.value === '5k-10k' && timeline) {
            timeline.value = '1-3months';
        }
    });
}

// Add loading animation when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Easter Egg
console.log('%c🤖 Welcome to Agentic Solutions! 🚀', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cInterested in AI solutions? Contact us at info@agenticsolutions.ai', 'font-size: 14px; color: #8b5cf6;'); 