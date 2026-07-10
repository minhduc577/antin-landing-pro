/**
 * AN TÍN Landing Page Pro 1.0 Enterprise Core Engine
 * Tối ưu hóa hiệu năng, tương thích hoàn toàn ES2025, Chống Spam & AJAX Real Form
 * Tích hợp tự động phân loại nguồn: 🔥 KHÁCH NÓNG
 * Tác giả: Chuyên gia Phan Minh Đức - AN TÍN
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 0. CẤU HÌNH BIẾN PHÂN LOẠI "🔥 KHÁCH NÓNG" CHO HỆ THỐNG AN TÍN
    // ==========================================================================
    const GOOGLE_FORM_FIELD_ID = "entry.444444444"; 
    const CLASSIFICATION_TEXT = "🔥 KHÁCH NÓNG";

    const formLinks = document.querySelectorAll('a[href*="docs.google.com/forms"]');
    formLinks.forEach(link => {
        const originalUrl = link.getAttribute('href');
        try {
            let urlObj = new URL(originalUrl);
            if (urlObj.pathname.endsWith('/edit')) {
                urlObj.pathname = urlObj.pathname.replace('/edit', '/viewform');
            }
            urlObj.searchParams.append(GOOGLE_FORM_FIELD_ID, CLASSIFICATION_TEXT);
            link.setAttribute('href', urlObj.toString());
        } catch (e) {
            console.warn("Bỏ qua xử lý URL không hợp lệ:", originalUrl);
        }
    });

    // ==========================================================================
    // 1 -> 8: CÁC KHỐI LOGIC GỐC CỦA ANH
    // ==========================================================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.remove(), 500);
        });
    }

    if (typeof AOS !== 'undefined') { AOS.init({ duration: 800, once: true, mirror: false }); }

    const typingElement = document.querySelector(".typing-effect");
    if (typingElement) {
        const words = ["Bứt Phá Vận Hành", "Kiến Tạo Tương Lai", "Chuẩn Hóa Hệ Thống"];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            typingElement.textContent = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            let typeSpeed = isDeleting ? 50 : 120;
            if (!isDeleting && charIndex === currentWord.length) { typeSpeed = 1500; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 400; }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    const counters = document.querySelectorAll(".counter");
    const observerOptions = { threshold: 0.5, rootMargin: "0px" };
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"), 10);
                let count = 0;
                const speed = target / 50;
                const updateCount = () => {
                    count += speed;
                    if (count < target) { counter.textContent = Math.floor(count); requestAnimationFrame(updateCount); }
                    else { counter.textContent = target; }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    counters.forEach(counter => counterObserver.observe(counter));

    if (typeof Swiper !== 'undefined') {
        new Swiper(".testimonialSwiper", {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    }

    // [Logic Form và các hàm AJAX đã được giữ nguyên vẹn trong bản của anh]
    // ... (Code xử lý Form & AI Scoring Engine) ...

    // ==========================================================================
    // 9. FOOTER ENGINE (TỰ ĐỘNG BƠM FOOTER - ĐÃ CẬP NHẬT CHUẨN)
    // Anh hãy xóa thẻ <footer> cũ trong file HTML để tránh bị trùng lặp
    // ==========================================================================
    const footerHTML = `
    <footer style="background-color: #002060; color: #fff; padding: 40px 20px; text-align: center; margin-top: 50px; font-family: sans-serif;">
        <div style="max-width: 900px; margin: 0 auto;">
            <h3 style="margin-bottom: 10px;">CTY KỸ THUẬT CÔNG NGHỆ AN TÍN</h3>
            <p style="margin: 5px 0;">Địa chỉ: Toà nhà River Garden, Số 170 Nguyễn Văn Hưởng, Phường Thảo Điền, Thành phố Thủ Đức, TP. Hồ Chí Minh.</p>
            <p style="margin: 5px 0;">Hotline kỹ thuật hỗ trợ: 0914 060 339 | Email: info@antinco.com</p>
            <div style="margin-top: 15px;">
                <a href="https://antinco.com" style="color: #fff; text-decoration: underline; margin: 0 10px;">Website</a> | 
                <a href="https://ebook.antinco.com" style="color: #fff; text-decoration: underline; margin: 0 10px;">Ebook</a>
            </div>
            <p style="margin-top: 20px; opacity: 0.7; font-size: 12px;">© 2026 CTY KỸ THUẬT CÔNG NGHỆ AN TÍN. All rights reserved.</p>
        </div>
    </footer>`;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
