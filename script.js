/**
 * Kyntrava AI - Main JavaScript File (Enhanced Version)
 * شركة Kyntrava AI للذكاء الاصطناعي والحلول البرمجية
 * © 2026 جميع الحقوق محفوظة
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // ========== 1. حركات الظهور المتطورة عند التمرير ==========
    const revealElements = document.querySelectorAll(
        '.reveal, .animate-on-scroll, .card, .service-box, .service-card, .study-item, .exhibition-item, .about-block, .feature-card, .stat-box, .info-card, .quote-card, .process-step, .why-us-item, .testimonial-card, .branch-card, .quick-contact-card, .quick-stat, .portfolio-card'
    );

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) rotateX(0)";
                entry.target.style.filter = "blur(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((el, index) => {
        // إعدادات متقدمة للأنيميشن
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.filter = "blur(2px)";
        el.style.transition = `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s`;
        el.style.willChange = "opacity, transform";
        
        revealObserver.observe(el);
        
        // Fallback: ظهور فوري للعناصر المرئية
        setTimeout(() => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                el.style.filter = "blur(0)";
            }
        }, 300);
    });

    // ========== 2. قائمة الموبايل المتجاوبة ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-label', 'القائمة الرئيسية');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            
            // إضافة تأثير تجميد التمرير عند فتح القائمة
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // إغلاق القائمة عند النقر على رابط
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('show') && 
            !e.target.closest('.nav-container') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });

    // ========== 3. شريط تقدم القراءة ==========
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = Math.min(scrollPercent, 100) + '%';
            });
        });
    }

    // ========== 4. زر الرجوع للأعلى ==========
    const backToTop = document.querySelector('.back-to-top') || createBackToTopButton();
    
    function createBackToTopButton() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btn.setAttribute('aria-label', 'الرجوع للأعلى');
        document.body.appendChild(btn);
        return btn;
    }

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== 5. إدارة الفورم المتطورة ==========
    document.querySelectorAll('form').forEach(form => {
        // منع الإرسال المزدوج
        let isSubmitting = false;
        
        // تحسين الحقول
        form.querySelectorAll('input, select, textarea').forEach(field => {
            // إضافة تأثير floating label
            if (field.previousElementSibling && field.previousElementSibling.tagName === 'LABEL') {
                const label = field.previousElementSibling;
                
                field.addEventListener('focus', () => {
                    label.style.color = 'var(--gold, #D4AF37)';
                    label.style.transform = 'translateY(-2px)';
                    label.style.transition = 'all 0.3s ease';
                });
                
                field.addEventListener('blur', () => {
                    label.style.color = '';
                    label.style.transform = '';
                });
            }
            
            // التحقق الفوري
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // إزالة رسائل الخطأ عند الكتابة
            field.addEventListener('input', function() {
                this.style.borderColor = 'var(--border-color, #e8eaed)';
                this.style.boxShadow = 'none';
                
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (isSubmitting) return;
            
            // التحقق من جميع الحقول
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // إزالة رسائل الخطأ السابقة
            form.querySelectorAll('.error-message').forEach(msg => msg.remove());
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                const firstError = form.querySelector('.error-message');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // محاكاة الإرسال
            isSubmitting = true;
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            }
            
            // محاكاة تأخير الشبكة
            setTimeout(() => {
                showSuccessNotification();
                form.reset();
                isSubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'إرسال';
                }
            }, 1500);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // التحقق من البريد الإلكتروني
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
            }
        }
        
        // التحقق من رقم الهاتف
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'يرجى إدخال رقم هاتف صحيح';
            }
        }
        
        // التحقق من الحقول الفارغة
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        }
        
        // التحقق من الحد الأدنى للطول
        if (field.minLength && value.length < field.minLength) {
            isValid = false;
            errorMessage = `يجب أن يكون ${field.minLength} أحرف على الأقل`;
        }
        
        if (!isValid) {
            field.style.borderColor = '#E74C3C';
            field.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.15)';
            
            // إضافة رسالة خطأ
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #E74C3C; font-size: 0.8rem; margin-top: -10px;
                margin-bottom: 12px; padding-right: 5px;
                animation: slideDown 0.3s ease;
            `;
            errorDiv.textContent = errorMessage;
            field.parentElement.insertBefore(errorDiv, field.nextSibling);
            
            setTimeout(() => {
                field.style.borderColor = '#E74C3C';
                field.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.15)';
            }, 3000);
        } else {
            field.style.borderColor = '#27AE60';
            field.style.boxShadow = '0 0 0 3px rgba(39,174,96,0.1)';
            setTimeout(() => {
                field.style.borderColor = 'var(--border-color, #e8eaed)';
                field.style.boxShadow = 'none';
            }, 2000);
        }
        
        return isValid;
    }

    function showSuccessNotification() {
        // إزالة الإشعارات السابقة
        document.querySelectorAll('.success-overlay').forEach(el => el.remove());
        
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            animation: fadeIn 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        
        overlay.innerHTML = `
            <div style="
                background: white;
                border-radius: 20px;
                padding: 40px 35px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                border: 2px solid #D4AF37;
                max-width: 480px;
                width: 90%;
                animation: zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
            ">
                <div style="
                    width: 80px; height: 80px;
                    background: linear-gradient(135deg, #D4AF37, #B49430);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 2.2rem; color: white;
                    box-shadow: 0 10px 30px rgba(212,175,55,0.3);
                "><i class="fas fa-check"></i></div>
                <h3 style="color:#1A1A2E; margin-bottom:12px; font-size:1.4rem; font-weight:800;">
                    ✅ تم إرسال طلبك بنجاح!
                </h3>
                <p style="color:#666; margin-bottom:25px; line-height:1.9; font-size:0.95rem;">
                    شكراً لتواصلك مع <strong style="color:#D4AF37;">Kyntrava AI</strong> 🚀<br>
                    سيتواصل معك أحد خبرائنا خلال <strong>24 ساعة</strong>.
                </p>
                <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
                    <button class="close-notification" style="
                        background: linear-gradient(135deg, #D4AF37, #B49430); color: white; border: none;
                        padding: 12px 30px; border-radius: 50px;
                        font-weight: 700; cursor: pointer;
                        font-family: 'Cairo'; font-size: 0.95rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 5px 15px rgba(212,175,55,0.3);
                    ">حسناً 👍</button>
                    <button class="close-notification-outline" style="
                        background: transparent; color: #666; border: 2px solid #ddd;
                        padding: 12px 30px; border-radius: 50px;
                        font-weight: 600; cursor: pointer;
                        font-family: 'Cairo'; font-size: 0.95rem;
                        transition: all 0.3s ease;
                    ">إغلاق</button>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute; top: 10px; left: 15px;
                    background: none; border: none; font-size: 1.5rem;
                    cursor: pointer; color: #999; transition: 0.3s;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // إغلاق الإشعار
        const closeBtns = overlay.querySelectorAll('.close-notification, .close-notification-outline');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            });
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        });
        
        // إغلاق تلقائي
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        }, 6000);
    }

    // ========== 6. تمرير سلس متطور للروابط الداخلية ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // إغلاق قائمة الموبايل إذا كانت مفتوحة
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                const headerHeight = navbar ? navbar.offsetHeight : 80;
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({ 
                    top: offsetTop, 
                    behavior: 'smooth' 
                });
                
                // تحديث URL
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========== 7. تأثيرات الأيقونات العائمة المتطورة ==========
    const floatingButtons = [
        { element: document.querySelector('.whatsapp-float'), originalBottom: '20px' },
        { element: document.querySelector('.consult-float'), originalBottom: '82px' }
    ];
    
    floatingButtons.forEach(btn => {
        if (btn.element) {
            btn.element.addEventListener('mouseenter', () => {
                btn.element.style.transform = 'scale(1.15) rotate(5deg)';
                btn.element.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
            
            btn.element.addEventListener('mouseleave', () => {
                btn.element.style.transform = 'scale(1) rotate(0deg)';
            });
            
            // تأثير النقر
            btn.element.addEventListener('mousedown', () => {
                btn.element.style.transform = 'scale(0.9)';
            });
            
            btn.element.addEventListener('mouseup', () => {
                btn.element.style.transform = 'scale(1.15)';
            });
        }
    });

    // ========== 8. إخفاء ذكي للأيقونات عند التمرير ==========
    let lastScrollTop = 0;
    let scrollTimeout;
    const scrollThreshold = 300;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollingDown = scrollTop > lastScrollTop;
        
        floatingButtons.forEach(btn => {
            if (btn.element) {
                if (scrollingDown && scrollTop > scrollThreshold) {
                    btn.element.style.transform = 'translateX(80px)';
                    btn.element.style.opacity = '0.4';
                } else {
                    btn.element.style.transform = 'translateX(0)';
                    btn.element.style.opacity = '1';
                }
                btn.element.style.transition = 'all 0.4s ease';
            }
        });
        
        lastScrollTop = scrollTop;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            floatingButtons.forEach(btn => {
                if (btn.element) {
                    btn.element.style.transform = 'translateX(0)';
                    btn.element.style.opacity = '1';
                }
            });
        }, 2000);
    });

    // ========== 9. تمييز الصفحة النشطة في القائمة ==========
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPath.includes(linkHref) && linkHref !== '#')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // ========== 10. إدارة Lightbox المتطورة ==========
    window.openLightbox = function(src, alt = '') {
        let lightbox = document.getElementById('lightbox');
        let lightboxImg = document.getElementById('lightboxImg');
        
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <span class="close" onclick="closeLightbox()" aria-label="إغلاق">&times;</span>
                <img id="lightboxImg" src="" alt="" />
            `;
            document.body.appendChild(lightbox);
            lightboxImg = document.getElementById('lightboxImg');
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('close')) {
                    closeLightbox();
                }
            });
        }
        
        lightbox.classList.add('active');
        if (lightboxImg) {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
        }
        document.body.style.overflow = 'hidden';
        lightbox.setAttribute('aria-hidden', 'false');
    };
    
    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.opacity = '0';
            lightbox.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                lightbox.classList.remove('active');
                lightbox.style.opacity = '1';
                document.body.style.overflow = '';
            }, 300);
            lightbox.setAttribute('aria-hidden', 'true');
        }
    };

    // ========== 11. اختصارات لوحة المفاتيح ==========
    document.addEventListener('keydown', function(e) {
        // Escape - إغلاق النوافذ
        if (e.key === 'Escape') {
            closeLightbox();
            document.querySelectorAll('.success-overlay').forEach(el => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 300);
            });
            document.body.style.overflow = '';
        }
        
        // Ctrl/Cmd + K - فتح البحث (للتحضير المستقبلي)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('🔍 ميزة البحث السريع قيد التطوير');
        }
    });

    // ========== 12. تحسينات الصور (Lazy Loading) ==========
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback للمتصفحات القديمة
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========== 13. تهيئة الروابط الخارجية ==========
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
        }
    });

    // ========== 14. تحسينات الطباعة ==========
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.whatsapp-float, .consult-float, .back-to-top, .reading-progress, .menu-toggle')
            .forEach(el => el.style.display = 'none');
    });
    
    window.addEventListener('afterprint', () => {
        document.querySelectorAll('.whatsapp-float, .consult-float, .back-to-top, .reading-progress, .menu-toggle')
            .forEach(el => el.style.display = '');
    });

    // ========== الترحيب في الكونسول ==========
    console.log(`
    🚀 Kyntrava AI | شركة رائدة في الذكاء الاصطناعي
    📍 سوريا - دمشق
    📞 للتواصل: +963 933 438 019
    🌐 جميع الأنظمة جاهزة للعمل
    © 2026 Kyntrava AI - جميع الحقوق محفوظة
    
    ✨ استمتع بتجربة مستخدم سلسة!
    `);
});

// ========== دوال مساعدة عالمية ==========
window.debounce = function(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

window.throttle = function(func, limit = 250) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
