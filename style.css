@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Cairo', sans-serif;
}

:root {
    --primary-dark: #0A1628;
    --primary-blue: #0D1B2A;
    --cyan: #00D4FF;
    --cyan-dark: #0099CC;
    --gray-light: #F0F4F8;
    --gray-medium: #E8ECF0;
    --text-dark: #1A2A4A;
    --text-gray: #4A5A6A;
    --text-light: #7A8A9A;
    --white: #FFFFFF;
    --shadow: 0 4px 20px rgba(0,0,0,0.08);
    --shadow-hover: 0 12px 35px rgba(0,0,0,0.15);
    --radius: 16px;
    --transition: all 0.3s ease;
}

body {
    background: var(--gray-light);
    color: var(--text-dark);
    line-height: 1.8;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: inherit;
    transition: var(--transition);
}

/* ===== أيقونات عائمة ===== */
.whatsapp-float {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 52px;
    height: 52px;
    background: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    box-shadow: 0 4px 15px rgba(37,211,102,0.4);
    z-index: 999;
    animation: pulse 2s infinite;
}
.consult-float {
    position: fixed;
    bottom: 82px;
    right: 20px;
    width: 52px;
    height: 52px;
    background: var(--cyan);
    color: var(--primary-dark);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 4px 15px rgba(0,212,255,0.3);
    z-index: 999;
}
@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
    70% { box-shadow: 0 0 0 18px rgba(37,211,102,0); }
    100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
}

/* ===== شريط التنقل ===== */
.navbar {
    background: var(--white);
    box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 0 20px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid var(--cyan);
}
.logo-area {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.logo-img {
    height: 40px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
}
.nav-menu {
    display: flex;
    list-style: none;
    gap: 4px;
    align-items: center;
}
.nav-menu li {
    position: relative;
}
.nav-menu a {
    color: var(--text-gray);
    font-weight: 600;
    font-size: 0.8rem;
    padding: 7px 14px;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: block;
    white-space: nowrap;
}
.nav-menu a:hover,
.nav-menu a.active {
    background: var(--cyan);
    color: var(--primary-dark);
}

/* ===== زر القائمة للجوال ===== */
.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.6rem;
    color: var(--text-dark);
    cursor: pointer;
    padding: 4px;
    transition: all 0.3s ease;
}
.menu-toggle:hover {
    color: var(--cyan);
}

/* ===== خلفية القائمة ===== */
.nav-overlay {
    display: none;
    position: fixed;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 999;
}
.nav-overlay.active {
    display: block;
}

/* ===== الفوتر ===== */
footer {
    background: var(--primary-dark);
    color: #ccc;
    text-align: center;
    padding: 25px 15px 18px;
    font-size: 0.82rem;
    border-top: 4px solid var(--cyan);
}
footer a {
    color: var(--cyan);
    text-decoration: none;
    margin: 4px 8px;
    font-weight: 600;
}
footer a:hover {
    text-decoration: underline;
    color: var(--cyan-dark);
}
footer .footer-links {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
}

/* ===== ميديا كويري ===== */
@media (max-width: 768px) {
    .navbar {
        height: 56px;
        padding: 0 12px;
    }
    .logo-img {
        height: 34px;
        max-width: 120px;
    }
    .menu-toggle {
        display: block;
        font-size: 1.5rem;
    }
    .nav-menu {
        position: fixed;
        top: 56px;
        right: -100%;
        width: 260px;
        height: calc(100vh - 56px);
        background: var(--white);
        flex-direction: column;
        padding: 16px 0;
        gap: 2px;
        box-shadow: -5px 0 30px rgba(0,0,0,0.12);
        transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow-y: auto;
        align-items: stretch;
    }
    .nav-menu.open {
        right: 0;
    }
    .nav-menu li {
        width: 100%;
    }
    .nav-menu a {
        padding: 12px 20px;
        font-size: 0.9rem;
        border-radius: 0;
        border-right: 3px solid transparent;
        white-space: normal;
    }
    .nav-menu a:hover,
    .nav-menu a.active {
        background: rgba(0,212,255,0.08);
        border-right-color: var(--cyan);
        color: var(--cyan);
    }
    .nav-overlay {
        top: 56px;
    }
}

@media (max-width: 480px) {
    .nav-menu {
        width: 100%;
    }
    .whatsapp-float,
    .consult-float {
        width: 44px;
        height: 44px;
        font-size: 20px;
    }
    .consult-float {
        bottom: 70px;
    }
}

@media (min-width: 769px) {
    .nav-overlay {
        display: none !important;
    }
}
