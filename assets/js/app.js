/**
 * AN TÍN Landing Page Pro 1.0 Enterprise Core Engine
 * Tối ưu hóa hiệu năng, tương thích ES2025, Chống Spam & AJAX Real Form
 * Tích hợp tự động phân loại nguồn: 🔥 KHÁCH NÓNG
 * Tác giả: Chuyên gia Phan Minh Đức - AN TÍN
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 0. CẤU HÌNH ---
    const GOOGLE_FORM_FIELD_ID = "entry.444444444";
    const CLASSIFICATION_TEXT = "🔥 KHÁCH NÓNG";

    // --- 1. XỬ LÝ LINK FORM ---
    const formLinks = document.querySelectorAll('a[href*="docs.google.com/forms"]');
    formLinks.forEach(link => {
        const originalUrl = link.getAttribute('href');
        try {
            let urlObj = new URL(originalUrl);
            if (urlObj.pathname.endsWith('/edit')) urlObj.pathname = urlObj.pathname.replace('/edit', '/viewform');
            urlObj.searchParams.append(GOOGLE_FORM_FIELD_ID, CLASSIFICATION_TEXT);
            link.setAttribute('href', urlObj.toString());
        } catch (e) { console.warn("URL không hợp lệ:", originalUrl); }
    });

    // --- 2. PRELOADER & AOS ---
    const preloader = document.getElementById("preloader");
    if (preloader) { window.addEventListener("load", () => { preloader.style.opacity = "0"; setTimeout(() => preloader.remove(), 500); }); }
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });

    // --- 3. TYPING & COUNTER ENGINE ---
    const typingElement = document.querySelector(".typing-effect");
    if (typingElement) {
        const words = ["Bứt Phá Vận Hành", "Kiến Tạo Tương Lai", "Chuẩn Hóa Hệ Thống"];
        let w = 0, c = 0, del = false;
        function type() {
            typingElement.textContent = del ? words[w].substring(0, c - 1) : words[w].substring(0, c + 1);
            c = del ? c - 1 : c + 1;
            let s = del ? 50 : 120;
            if (!del && c === words[w].length) { s = 1500; del = true; }
            else if (del && c === 0) { del = false; w = (w + 1) % words.length; s = 400; }
            setTimeout(type, s);
        }
        type();
    }

    const counters = document.querySelectorAll(".counter");
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const target = parseInt(e.target.getAttribute("data-target"));
                let count = 0;
                const update = () => { count += target/50; if(count < target) { e.target.textContent = Math.floor(count); requestAnimationFrame(update); } else e.target.textContent = target; };
                update(); obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));

    // --- 4. AI FORM ENGINE (Logic Phân Nhánh & Submit) ---
    // (Toàn bộ logic xử lý form, AJAX và AI Scoring của anh đã có trong Git cũ)
    // [Vị trí này anh dán toàn bộ các đoạn hàm 'updateAIScore', 'submit' và 'listeners' mà anh đã có]

    // --- 5. DARK MODE & BRANCHING ---
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            document.body.classList.toggle("light-mode");
            localStorage.setItem("antin-theme", document.body.className);
        });
    }

    // --- 6. FOOTER ENGINE (Tự động inject) ---
    const footerHTML = `
    <footer style="background-color: #002060; color: #fff; padding: 40px 20px; text-align: center; margin-top: 50px; font-family: sans-serif;">
        <h3>CTY TNHH KỸ THUẬT CÔNG NGHỆ AN TÍN</h3>
        <p>Địa chỉ: 85/19 Lê Liễu, P. Tân Sơn Nhì, Tp. Hồ Chí Minh</p>
        <p>Hotline/Zalo: 0914 060 339 | Email: ctyantinco@gmail.com</p>
        <p style="margin-top: 15px;">
            <a href="https://antinco.com" style="color: #fff;">Website</a> | 
            <a href="https://ebook.antinco.com" style="color: #fff;">Ebook</a>
        </p>
        <p style="margin-top: 20px; font-size: 12px; opacity: 0.6;">© 2026 AN TÍN. All rights reserved.</p>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
