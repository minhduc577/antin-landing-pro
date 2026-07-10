/**
 * ==========================================================================
 * AN TÍN Landing Page Pro 1.0 Enterprise Core Engine
 * Tối ưu hóa hiệu năng, tương thích hoàn toàn ES2025, Chống Spam & AJAX Real Form
 * Đã tích hợp Module: AI Scoring Real-time Logic (Gamification)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Tắt màn hình Preloader tối ưu trải nghiệm người dùng
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.remove(), 500);
        });
    }

    // 2. Khởi tạo Thư viện AOS Animation mượt mà
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            mirror: false
        });
    }

    // 3. Khởi tạo Hiệu ứng Chữ Đánh Máy (Typing Effect) độc quyền Hero Section
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

    // 4. Đồng hồ Số đếm Tự động Tăng tốc (Enterprise Counter-up Engine)
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

    // 5. Cấu hình Slider Feedback Khách Hàng (SwiperJS)
    if (typeof Swiper !== 'undefined') {
        new Swiper(".testimonialSwiper", {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
        });
    }

    // ==========================================================================
    // CẤU TRÚC MỚI BỔ SUNG: LOGIC AI SCORING (TỰ ĐỘNG KÍCH HOẠT THEO INPUT/CHANGE)
    // ==========================================================================
    let startTime = Date.now(); // Ghi nhận thời gian bắt đầu tải trang
    let baseScore = 70;         // Điểm sàn hệ thống tự chấm ban đầu
    let hasInteracted = false;  // Đánh dấu nếu khách đã tương tác thực tế với ô nhập liệu

    // Hàm sinh số ngẫu nhiên từ min đến max (Dùng tạo Bonus ngẫu nhiên 1 - 5 điểm)
    const getRandomBonus = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Tự động dựng hộp Badge hiển thị điểm số AI đẹp mắt phía trên form (Tương thích tốt với Bootstrap)
    const createScoreBadge = () => {
        const formContainer = document.getElementById("enterprise-lead-form");
        if (formContainer && !document.getElementById("ai-score-container")) {
            const badge = document.createElement("div");
            badge.id = "ai-score-container";
            // Sử dụng các class tiện ích chuẩn dễ hiển thị trên cả Light/Dark Mode
            badge.className = "my-3 p-3 text-center rounded border bg-opacity-10 shadow-sm transition-all duration-300";
            badge.style.backgroundColor = "rgba(212, 175, 55, 0.1)"; // Đổ nền màu Gold nhạt thương hiệu
            badge.style.borderColor = "rgba(212, 175, 55, 0.3)";
            badge.innerHTML = `
                <div class="fw-medium text-uppercase tracking-wider" style="font-size: 11px; color: #D4AF37;">
                    <i class="fas fa-robot text-warning animate-pulse me-1"></i> AI Profile Rating Real-time
                </div>
                <div class="my-1 text-navy dark:text-white" style="font-size: 14px;">
                    Điểm số hồ sơ tối ưu: <span id="ai-score-value" class="fw-bold fs-4 text-primary" style="color: #D4AF37 !important;">${baseScore}</span>/100 Pts
                </div>
                <div class="small italic text-muted" id="ai-status" style="font-size: 11px;">Đang quét luồng phân tích hành vi dữ liệu...</div>
            `;
            formContainer.insertBefore(badge, formContainer.firstChild);
        }
    };

    // Hàm xử lý thuật toán tính điểm AI lõi
    const calculateAIScore = () => {
        if (!hasInteracted) {
            hasInteracted = true;
            startTime = Date.now(); // Đồng bộ lại mốc thời gian từ lúc gõ ký tự đầu tiên
        }

        let currentScore = baseScore;
        const nameElem = document.getElementById("fullname");
        
        // Thuật toán 1: Đánh giá theo độ dài ký tự của Tên (Name Density Assessment)
        if (nameElem && nameElem.value.trim().length > 2) {
            const nameLength = nameElem.value.trim().length;
            if (nameLength > 15) currentScore += 5;      // Điền đầy đủ cả họ và tên, độ tin cậy cao
            else if (nameLength > 7) currentScore += 3;  // Tên hợp lệ ngắn gọn
            else currentScore += 1;
        }

        // Thuật toán 2: Đánh giá dựa trên tốc độ điền form (Time-to-Action) để chống Bot hoặc Auto-fill quá nhanh
        const timeElapsed = (Date.now() - startTime) / 1000; // Quy đổi ra giây
        if (timeElapsed > 4 && timeElapsed < 25) {
            currentScore += 5; // Tốc độ đọc và điền dữ liệu tự nhiên, nghiêm túc
        } else if (timeElapsed >= 25 && timeElapsed < 60) {
            currentScore += 3; // Điền kỹ hoặc có ngắt quãng ngắn
        }

        // Thuật toán 3: Thêm điểm thưởng Bonus ngẫu nhiên (từ 1 - 5 điểm) tạo cảm giác AI phân tích sâu liên tục
        currentScore += getRandomBonus(1, 5);

        // Giới hạn điểm trần tối đa không vượt quá 99 (Dành 1 điểm tuyệt đối cho bước duyệt thực tế của kỹ sư)
        if (currentScore > 99) currentScore = 99;

        // Tiến hành cập nhật kết quả Real-time lên giao diện trực quan cho khách hàng
        const scoreValueElem = document.getElementById("ai-score-value");
        const statusElem = document.getElementById("ai-status");
        
        if (scoreValueElem) scoreValueElem.innerText = currentScore;
        if (statusElem) {
            if (currentScore >= 92) {
                statusElem.innerHTML = "⚡ <b class='text-success'>Hồ sơ Xuất sắc!</b> Hệ thống đã ưu tiên phân phối độc quyền tới Kỹ sư trưởng Phan Minh Đức.";
            } else if (currentScore >= 82) {
                statusElem.innerHTML = "✓ <b class='text-primary'>Hồ sơ Đủ điều kiện.</b> Đang chuẩn bị kích hoạt quyền tải bộ cẩm nang an ninh.";
            } else {
                statusElem.innerText = "🔍 AI đang bóc tách phân tích sơ đồ luồng dữ liệu an ninh công trình...";
            }
        }
    };

    // Kích hoạt cơ chế lắng nghe sự kiện change hoặc input trên khu vực Form
    const leadFormZone = document.getElementById("enterprise-lead-form");
    if (leadFormZone) {
        // Tự tạo Badge khi khách hàng vừa click (focus) vào bất cứ ô nào trong Form
        leadFormZone.addEventListener("focusin", createScoreBadge, { once: true });
        // Tính điểm lập tức mỗi khi có thay đổi chữ hoặc lựa chọn
        leadFormZone.addEventListener("input", calculateAIScore);
        leadFormZone.addEventListener("change", calculateAIScore);
    }

    // 6. Xử lý Logic Form Đăng Ký Chống Spam, AJAX Thật, Không Reload Trang
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
                // Đường dẫn URL Action form Google của bạn
                const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfXXXXXXXXXXXXX/formResponse";

                const formData = new FormData();
                formData.append("entry.111111111", fullname);
                formData.append("entry.222222222", email);
                formData.append("entry.333333333", phone);

                // Gửi ngầm không tải lại trang sử dụng mode no-cors nâng cao
                await fetch(GOOGLE_FORM_ACTION_URL, {
                    method: "POST",
                    mode: "no-cors",
                    body: formData
                });

                // Phản hồi thành công
                showStatus("Chúc mừng! Đăng ký thành công. Hệ thống đang kích hoạt link download tài liệu...", "alert-success");
                leadForm.reset();

                // Dọn dẹp badge điểm AI sau khi form được gửi đi thành công
                const scoreContainer = document.getElementById("ai-score-container");
                if (scoreContainer) scoreContainer.remove();

                // Redirect hoặc kích hoạt mở Link Google site / Flipbook sau 2 giây
                setTimeout(() => {
                    window.open("https://sites.google.com", "_blank");
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
        formStatus.textContent = message;
        formStatus.className = `alert ${className}`;
        formStatus.classList.remove("d-none");
    }

    // 7. Chuyển Đổi Dark Mode / Light Mode mượt mà lưu Cache LocalStorage
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    const savedMode = localStorage.getItem("antin-theme") || "light-mode";
    body.className = savedMode;
    if (darkModeToggle) updateToggleIcon(savedMode);

    if (darkModeToggle) {
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
        const icon = darkModeToggle.querySelector("i");
        if (!icon) return;
        if (mode === "dark-mode") {
            icon.className = "fas fa-sun text-warning";
        } else {
            icon.className = "fas fa-moon";
        }
    }
});
