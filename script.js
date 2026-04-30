/**
 * Kyntrava AI - Main JavaScript File
 * شركة Kyntrava AI للذكاء الاصطناعي والحلول البرمجية
 * © 2026 جميع الحقوق محفوظة
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // ========== 1. حركات الظهور عند التمرير ==========
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .card, .service-box, .service-card, .study-item, .exhibition-item, .about-block, .feature-card, .stat-box, .info-card, .quote-card, .process-step, .why-us-item, .testimonial-card, .branch-card, .quick-contact-card, .quick-stat, .portfolio-card, .value-item, .branch-card, .quick-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    animatedElements.forEach((el, index) => {
        // لا تطبق الحركة إذا كان العنصر ظاهراً بالفعل
        if (el.style.opacity === "1") return;
        
        el.style.opacity = "0";
        el.style.transform = "translateY(35px)";
        el.style.transition = `opacity 0.6s ease ${index * 0.03}s, transform 0.6s ease ${index * 0.03}s`;
        observer.observe(el);
        
        // تحسين: تأخير بسيط جداً للعناصر الأولى
        setTimeout(() => {
            if (el.getBoundingClientRect().top < window.innerHeight && el.style.opacity === "0") {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        }, 150);
    });

    // ========== 2. منع إرسال الفورم وإظهار رسالة نجاح احترافية ==========
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من الحقول المطلوبة
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#E74C3C';
                    field.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.1)';
                    field.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
                    setTimeout(() => {
                        field.style.borderColor = '#e8eaed';
                        field.style.boxShadow = 'none';
                    }, 3000);
                }
            });
            
            // التحقق من checkbox الموافقة إذا وجد
            const consentCheckbox = form.querySelector('input[type="checkbox"][required]');
            if (consentCheckbox && !consentCheckbox.checked) {
                isValid = false;
                consentCheckbox.parentElement.style.color = '#E74C3C';
                setTimeout(() => {
                    consentCheckbox.parentElement.style.color = '#777';
                }, 3000);
            }
            
            if (!isValid) {
                // تمرير لأول حقل فارغ
                const firstEmpty = form.querySelector('[required]:invalid, input[required]:placeholder-shown, textarea[required]:placeholder-shown');
                if (firstEmpty) {
                    firstEmpty.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstEmpty.focus();
                }
                return;
            }
            
            showSuccessMessage();
            form.reset();
        });
    });

    function showSuccessMessage() {
        // إزالة أي رسالة نجاح سابقة
        const existingMsg = document.querySelector('.success-overlay');
        if (existingMsg) existingMsg.remove();
        
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-popup">
                <div class="success-icon-wrapper">
                    <i class="fas fa-check"></i>
                </div>
                <h3>تم إرسال طلبك بنجاح!</h3>
                <p>شكراً لتواصلك مع <strong>Kyntrava AI</strong>. سيتواصل معك أحد خبرائنا خلال 24 ساعة.</p>
                <button class="success-close-btn">حسناً <i class="fas fa-arrow-left" style="margin-right:6px;"></i></button>
            </div>
        `;
        
        // تنسيقات الـ overlay
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(10,22,40,0.7); backdrop-filter: blur(6px);
            z-index: 10000; display: flex; align-items: center; justify-content: center;
            animation: fadeIn 0.35s ease;
        `;
        
        // إضافة أنماط الـ popup
        const styleTag = document.createElement('style');
        styleTag.textContent = `
            .success-popup {
                background: white; border-radius: 22px; padding: 40px 32px;
                text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.25);
                border: 2px solid #00B4FF; max-width: 450px; width: 90%;
                animation: slideUp 0.4s ease;
            }
            .success-icon-wrapper {
                width: 75px; height: 75px; background: linear-gradient(135deg, #00B4FF, #0066CC);
                border-radius: 50%; display: flex; align-items: center; justify-content: center;
                margin: 0 auto 20px; font-size: 2.2rem; color: white;
                box-shadow: 0 8px 25px rgba(0,180,255,0.3);
            }
            .success-popup h3 { color: #0a1628; margin-bottom: 12px; font-size: 1.4rem; font-weight: 800; }
            .success-popup p { color: #666; margin-bottom: 24px; line-height: 1.9; font-size: 0.95rem; }
            .success-close-btn {
                background: linear-gradient(135deg, #00B4FF, #0066CC); color: white;
                border: none; padding: 13px 32px; border-radius: 50px;
                font-weight: 700; cursor: pointer; font-family: 'Cairo', sans-serif;
                font-size: 1rem; transition: all 0.3s ease;
                box-shadow: 0 6px 18px rgba(0,180,255,0.25);
            }
            .success-close-btn:hover { background: #0066CC; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,180,255,0.4); }
            @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(styleTag);
        document.body.appendChild(overlay);
        
        // إغلاق الرسالة
        const closeBtn = overlay.querySelector('.success-close-btn');
        const closeOverlay = () => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeOverlay);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeOverlay();
        });
        
        // إغلاق تلقائي بعد 6 ثوانٍ
        setTimeout(() => {
            if (document.body.contains(overlay)) closeOverlay();
        }, 6000);
    }

    // ========== 3. تمرير سلس للروابط الداخلية ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ========== 4. تأثير الأيقونات العائمة ==========
    const whatsappBtn = document.querySelector('.whatsapp-float');
    const consultBtn = document.querySelector('.consult-float');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', () => {
            whatsappBtn.style.transform = 'scale(1.15)';
            whatsappBtn.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        whatsappBtn.addEventListener('mouseleave', () => {
            whatsappBtn.style.transform = 'scale(1)';
        });
    }
    if (consultBtn) {
        consultBtn.addEventListener('mouseenter', () => {
            consultBtn.style.transform = 'scale(1.15)';
            consultBtn.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        consultBtn.addEventListener('mouseleave', () => {
            consultBtn.style.transform = 'scale(1)';
        });
    }

    // ========== 5. إخفاء/إظهار الأيقونات عند التمرير ==========
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 600) {
            if (whatsappBtn) {
                whatsappBtn.style.opacity = '0.4';
                whatsappBtn.style.transition = 'opacity 0.4s ease';
            }
            if (consultBtn) {
                consultBtn.style.opacity = '0.4';
                consultBtn.style.transition = 'opacity 0.4s ease';
            }
        } else {
            if (whatsappBtn) whatsappBtn.style.opacity = '1';
            if (consultBtn) consultBtn.style.opacity = '1';
        }
        lastScrollTop = scrollTop;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (whatsappBtn) whatsappBtn.style.opacity = '1';
            if (consultBtn) consultBtn.style.opacity = '1';
        }, 1500);
    });

    // ========== 6. تمييز الصفحة النشطة ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ========== 7. إغلاق النوافذ بالضغط على Escape ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // إغلاق Lightbox
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
            // إغلاق رسالة النجاح
            const successOverlay = document.querySelector('.success-overlay');
            if (successOverlay) {
                successOverlay.style.opacity = '0';
                successOverlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => successOverlay.remove(), 300);
            }
        }
    });

    // ========== 8. إضافة تأثير التموج (Ripple) على الأزرار ==========
    document.querySelectorAll('.btn, .btn-primary, .btn-outline, .btn-cta, .btn-submit, .btn-project, .service-cta-btn, .portfolio-btn, .btn-email, .btn-whatsapp').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute; width: ${size}px; height: ${size}px;
                left: ${x}px; top: ${y}px; background: rgba(255,255,255,0.3);
                border-radius: 50%; transform: scale(0); animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = button.style.position || 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    console.log('🚀 Kyntrava AI | موقع شركة Kyntrava AI جاهز للعمل');
    console.log('📞 للتواصل: +963 933 438 019');
    console.log('© 2026 جميع الحقوق محفوظة');
});

// ========== دوال Lightbox ==========
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightbox && lightboxImg) {
        lightbox.classList.add('active');
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== إضافة أنماط Ripple عالمياً ==========
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(rippleStyle);