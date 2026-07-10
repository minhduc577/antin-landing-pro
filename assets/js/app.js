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
    const GOOGLE_FORM_FIELD_ID = "entry.444444444"; // Mã ID ô phân loại nguồn trên Form của anh
    const CLASSIFICATION_TEXT = "🔥 KHÁCH NÓNG";

    // Tự động xử lý cấu hình cho các Nút bấm nhảy link Form trực tiếp (Thẻ a)
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
    // 1. Tắt màn hình Preloader tối ưu trải nghiệm người dùng
    // ==========================================================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.remove(), 500);
        });
    }

    // ==========================================================================
    // 2. Khởi tạo Thư viện AOS Animation mượt mà
    // ==========================================================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            mirror: false
        });
    }

    // ==========================================================================
    // 3. Khởi tạo Hiệu ứng Chữ Đánh Máy (Typing Effect) độc quyền Hero Section
    // ==========================================================================
    const typingElement = document.querySelector(".typing-effect");
    if (typingElement) {
        const words = ["Bứt Phá Vận Hành", "Kiến Tạo Tương Lai", "Chuẩn Hóa Hệ Thống"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // Nghỉ sau khi gõ xong cụm từ
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // ==========================================================================
    // 4. Đồng hồ Số đếm Tự động Tăng tốc (Enterprise Counter-up Engine)
    // ==========================================================================
    const counters = document.querySelectorAll(".counter");
    const observerOptions = { threshold: 0.5, rootMargin: "0px" };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute("data-target"), 10);
                let count = 0;
                const speed = target / 50; // Điều chỉnh tốc độ tăng mượt mà

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================================================
    // 5. Cấu hình Slider Feedback Khách Hàng (SwiperJS)
    // ==========================================================================
    if (typeof Swiper !== 'undefined') {
        new Swiper(".testimonialSwiper", {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    }

    // ==========================================================================
    // 6. Xử lý Logic Form Đăng Ký Chống Spam, AJAX Thật, Không Reload Trang
    // ==========================================================================
    const leadForm = document.getElementById("enterprise-lead-form");
    const formStatus = document.getElementById("form-status");

    if (leadForm) {
        leadForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Kích hoạt Cơ chế Honeypot Anti-Spam
            const honeypot = document.getElementById("honeypot_field").value;
            if (honeypot) {
                console.warn("Spam Bot detected!");
                return; 
            }

            // Client-side Sanitization thô sơ & Kiểm tra Valid của Bootstrap 5
            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();

            if (!fullname || !email || !phone) {
                showStatus("Vui lòng điền đầy đủ tất cả thông tin bắt buộc.", "alert-danger");
                return;
            }

            // Thay đổi trạng thái UI nút bấm sang loading
            const submitBtn = leadForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý mã hóa...`;

            try {
                // Đường dẫn URL Action form Google của bạn (Ví dụ thực tế cấu trúc Google Form AJAX)
                const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfXXXXXXXXXXXXX/formResponse";

                const formData = new FormData();
                formData.append("entry.111111111", fullname);
                formData.append("entry.222222222", email);
                formData.append("entry.333333333", phone);
                
                // [CHÈN MỚI]: Gửi kèm nhãn phân loại nguồn về Google Sheet qua AJAX
                formData.append(GOOGLE_FORM_FIELD_ID, CLASSIFICATION_TEXT);

                // Gửi ngầm không tải lại trang sử dụng mode no-cors nâng cao
                await fetch(GOOGLE_FORM_ACTION_URL, {
                    method: "POST",
                    mode: "no-cors",
                    body: formData
                });

                // Phản hồi thành công
                showStatus("Chúc mừng! Đăng ký thành công. Hệ thống đang kích hoạt link download tài liệu...", "alert-success");
                leadForm.reset();

                // Redirect hoặc kích hoạt mở Link Google site / Flipbook sau 2 giây
                setTimeout(() => {
                    window.open("https://sites.google.com/view/antinco", "_blank");
                }, 2000);

            } catch (error) {
                console.error("Form Submit Error: ", error);
                showStatus("Có lỗi hệ thống nhỏ xảy ra. Xin vui lòng liên hệ trực tiếp hotline.", "alert-danger");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    function showStatus(message, className) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `alert ${className}`;
            formStatus.classList.remove("d-none");
        }
    }

    // ==========================================================================
    // 7. Chuyển Đổi Dark Mode / Light Mode mượt mà lưu Cache LocalStorage
    // ==========================================================================
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (darkModeToggle) {
        const savedMode = localStorage.getItem("antin-theme") || "light-mode";
        body.className = savedMode;
        updateToggleIcon(savedMode);

        darkModeToggle.addEventListener("click", () => {
            if (body.classList.contains("light-mode")) {
                body.classList.replace("light-mode", "dark-mode");
                localStorage.setItem("antin-theme", "dark-mode");
                updateToggleIcon("dark-mode");
            } else {
                body.classList.replace("dark-mode", "light-mode");
                localStorage.setItem("antin-theme", "light-mode");
                updateToggleIcon("light-mode");
            }
        });
    }

    function updateToggleIcon(mode) {
        if (!darkModeToggle) return;
        const icon = darkModeToggle.querySelector("i");
        if (icon) {
            if (mode === "dark-mode") {
                icon.className = "fas fa-sun text-warning";
            } else {
                icon.className = "fas fa-moon";
            }
        }
    }
});
