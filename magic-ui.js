/* ===== MAGICAL UI EFFECTS AND ANIMATIONS ===== */

// ===== MAGICAL PARTICLES SYSTEM =====
class MagicalParticles {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color
        const colors = ['#6B46C1', '#9333EA', '#EC4899', '#F59E0B', '#10B981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            // Add floating animation
            particle.style.animation = `float-particle ${5 + Math.random() * 10}s infinite linear`;
            
            // Remove and recreate particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    this.createParticle();
                }
            }, (5 + Math.random() * 10) * 1000);
        });
    }
}

// ===== MAGICAL TEXT EFFECTS =====
class MagicalText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.init();
    }
    
    init() {
        this.createSpans();
        this.addHoverEffect();
    }
    
    createSpans() {
        const text = this.element.textContent;
        this.element.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            span.className = 'magical-char';
            this.element.appendChild(span);
        });
    }
    
    addHoverEffect() {
        this.element.addEventListener('mouseenter', () => {
            this.element.classList.add('magical-text-glow');
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.classList.remove('magical-text-glow');
        });
    }
    
    animateText() {
        const spans = this.element.querySelectorAll('.magical-char');
        spans.forEach((span, index) => {
            span.style.animation = 'none';
            setTimeout(() => {
                span.style.animation = 'char-appear 0.5s ease-out forwards';
            }, index * 50);
        });
    }
}

// ===== MAGICAL BUTTON EFFECTS =====
class MagicalButton {
    constructor(button) {
        this.button = button;
        this.init();
    }
    
    init() {
        this.addRippleEffect();
        this.addGlowEffect();
        this.addHoverEffect();
    }
    
    addRippleEffect() {
        this.button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    addGlowEffect() {
        this.button.addEventListener('mouseenter', () => {
            this.button.style.boxShadow = '0 0 20px rgba(107, 70, 193, 0.6)';
        });
        
        this.button.addEventListener('mouseleave', () => {
            this.button.style.boxShadow = '';
        });
    }
    
    addHoverEffect() {
        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// ===== MAGICAL CARD EFFECTS =====
class MagicalCard {
    constructor(card) {
        this.card = card;
        this.init();
    }
    
    init() {
        this.add3DEffect();
        this.addGlowEffect();
        this.addHoverAnimation();
    }
    
    add3DEffect() {
        this.card.addEventListener('mousemove', (e) => {
            const rect = this.card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        this.card.addEventListener('mouseleave', () => {
            this.card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    addGlowEffect() {
        this.card.addEventListener('mouseenter', () => {
            this.card.style.boxShadow = '0 10px 40px rgba(107, 70, 193, 0.4)';
        });
        
        this.card.addEventListener('mouseleave', () => {
            this.card.style.boxShadow = '';
        });
    }
    
    addHoverAnimation() {
        this.card.addEventListener('mouseenter', () => {
            this.card.style.transform += ' translateY(-5px)';
        });
        
        this.card.addEventListener('mouseleave', () => {
            this.card.style.transform = this.card.style.transform.replace(' translateY(-5px)', '');
        });
    }
}

// ===== MAGICAL FORM EFFECTS =====
class MagicalForm {
    constructor(form) {
        this.form = form;
        this.init();
    }
    
    init() {
        this.addInputEffects();
        this.addSubmitEffect();
        this.addValidationEffects();
    }
    
    addInputEffects() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
                this.addMagicalGlow(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
                this.removeMagicalGlow(input);
            });
            
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }
    
    addMagicalGlow(input) {
        input.style.boxShadow = '0 0 15px rgba(107, 70, 193, 0.3)';
        input.style.borderColor = '#6B46C1';
    }
    
    removeMagicalGlow(input) {
        input.style.boxShadow = '';
        input.style.borderColor = '';
    }
    
    validateInput(input) {
        const isValid = input.checkValidity();
        const formGroup = input.closest('.form-group');
        
        if (formGroup) {
            if (isValid) {
                formGroup.classList.add('valid');
                formGroup.classList.remove('invalid');
            } else {
                formGroup.classList.add('invalid');
                formGroup.classList.remove('valid');
            }
        }
    }
    
    addSubmitEffect() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = this.form.querySelector('button[type="submit"]');
            if (submitButton) {
                this.animateSubmitButton(submitButton);
            }
            
            // Add magical form submission effect
            this.animateFormSubmission();
        });
    }
    
    animateSubmitButton(button) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> تم!';
            button.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            
            setTimeout(() => {
                button.innerHTML = button.dataset.originalText || 'إرسال';
                button.disabled = false;
                button.style.background = '';
            }, 2000);
        }, 2000);
    }
    
    animateFormSubmission() {
        this.form.style.transform = 'scale(0.95)';
        this.form.style.opacity = '0.7';
        
        setTimeout(() => {
            this.form.style.transform = 'scale(1)';
            this.form.style.opacity = '1';
        }, 300);
    }
    
    addValidationEffects() {
        this.form.addEventListener('invalid', (e) => {
            e.preventDefault();
            
            const invalidField = e.target;
            const formGroup = invalidField.closest('.form-group');
            
            if (formGroup) {
                formGroup.classList.add('shake');
                setTimeout(() => {
                    formGroup.classList.remove('shake');
                }, 500);
            }
            
            this.showValidationError(invalidField);
        }, true);
    }
    
    showValidationError(field) {
        const errorMessage = field.validationMessage || 'هذا الحقل مطلوب';
        const errorElement = document.createElement('div');
        errorElement.className = 'validation-error';
        errorElement.textContent = errorMessage;
        
        const existingError = field.parentElement.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
        
        field.parentElement.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }
}

// ===== MAGICAL LOADING EFFECTS =====
class MagicalLoader {
    constructor(container) {
        this.container = container;
        this.init();
    }
    
    init() {
        this.createLoader();
    }
    
    createLoader() {
        const loader = document.createElement('div');
        loader.className = 'magical-loader';
        loader.innerHTML = `
            <div class="loader-orb"></div>
            <div class="loader-text">جاري التحميل...</div>
            <div class="loader-particles"></div>
        `;
        
        this.container.appendChild(loader);
        this.animateLoader();
    }
    
    animateLoader() {
        const orb = this.container.querySelector('.loader-orb');
        const particles = this.container.querySelector('.loader-particles');
        
        // Animate orb
        orb.style.animation = 'pulse-orb 2s ease-in-out infinite';
        
        // Create particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'loader-particle';
            particle.style.animationDelay = `${i * 0.2}s`;
            particles.appendChild(particle);
        }
    }
    
    show() {
        const loader = this.container.querySelector('.magical-loader');
        if (loader) {
            loader.style.display = 'block';
        }
    }
    
    hide() {
        const loader = this.container.querySelector('.magical-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// ===== MAGICAL NOTIFICATION SYSTEM =====
class MagicalNotification {
    constructor() {
        this.container = this.createContainer();
        this.notifications = [];
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.className = 'magical-notifications';
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `magical-notification ${type}`;
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        this.container.appendChild(notification);
        this.notifications.push(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hide(notification);
        });
        
        // Auto hide
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }
        
        return notification;
    }
    
    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    hide(notification) {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }
    
    success(message, duration) {
        return this.show(message, 'success', duration);
    }
    
    error(message, duration) {
        return this.show(message, 'error', duration);
    }
    
    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }
    
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize magical particles
    const particleContainers = document.querySelectorAll('.magical-particles-bg');
    particleContainers.forEach(container => {
        new MagicalParticles(container);
    });
    
    // Initialize magical text
    const magicalTexts = document.querySelectorAll('.glowing-text, .magical-title');
    magicalTexts.forEach(text => {
        new MagicalText(text);
    });
    
    // Initialize magical buttons
    const magicalButtons = document.querySelectorAll('.magic-btn');
    magicalButtons.forEach(button => {
        new MagicalButton(button);
    });
    
    // Initialize magical cards
    const magicalCards = document.querySelectorAll('.magic-card');
    magicalCards.forEach(card => {
        new MagicalCard(card);
    });
    
    // Initialize magical forms
    const magicalForms = document.querySelectorAll('.magic-form');
    magicalForms.forEach(form => {
        new MagicalForm(form);
    });
    
    // Initialize notification system
    window.notifications = new MagicalNotification();
    
    // Add global magical effects
    addGlobalMagicalEffects();
});

// ===== GLOBAL MAGICAL EFFECTS =====
function addGlobalMagicalEffects() {
    // Add cursor trail effect
    addCursorTrail();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

function addCursorTrail() {
    let trail = [];
    const maxTrail = 20;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        if (trail.length > maxTrail) {
            const oldDot = trail.shift();
            if (oldDot.parentNode) {
                oldDot.parentNode.removeChild(oldDot);
            }
        }
        
        setTimeout(() => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        }, 1000);
    });
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for quick actions
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showQuickActions();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            closeModals();
        }
    });
}

function showQuickActions() {
    // Implementation for quick actions modal
    console.log('Quick actions triggered');
}

function closeModals() {
    // Implementation for closing all modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

// Export classes for global use
window.MagicalParticles = MagicalParticles;
window.MagicalText = MagicalText;
window.MagicalButton = MagicalButton;
window.MagicalCard = MagicalCard;
window.MagicalForm = MagicalForm;
window.MagicalLoader = MagicalLoader;
window.MagicalNotification = MagicalNotification;