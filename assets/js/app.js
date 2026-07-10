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
                const speed = target / 50; // Điều chỉnh tốc độ tăng mượt màng

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
    // 6. Xử lý Logic Form Đăng Ký Chống Spam, AJAX & Tương Tác Chạm Đa Nhánh Real-time
    // ==========================================================================
    // Tự động nhận diện ID form cũ hoặc form mới để không lỗi hệ thống
    const leadForm = document.getElementById("ai-scoring-form") || document.getElementById("enterprise-lead-form");
    const formStatus = document.getElementById("form-status");

    // Thành phần điều hướng giao diện chạm (May đo cho giao diện mới)
    const spaceButtons = document.querySelectorAll(".space-btn");
    const dynamicFields = document.getElementById("dynamic-ai-fields");
    const scaleLabel = document.getElementById("scale-label");
    const scaleOptionsContainer = document.getElementById("scale-options");
    const aiScoreContainer = document.getElementById("ai-score-container");
    const aiScoreValue = document.getElementById("ai-score-value");
    const aiStatus = document.getElementById("ai-status");

    // Ma trận dữ liệu quy mô cho Bước 2
    const scaleData = {
        "Nhà ở / Biệt thự": [
            { text: "Nhà phố / Nhà ống", weight: 15 },
            { text: "Biệt thự độc bản / Villa", weight: 30 },
            { text: "Căn hộ chung cư", weight: 10 }
        ],
        "Cửa hàng / Chuỗi shop": [
            { text: "Cửa hàng đơn lẻ (<100m2)", weight: 15 },
            { text: "Showroom / Chuỗi shop lớn", weight: 35 },
            { text: "Siêu thị / Trung tâm TM", weight: 45 }
        ],
        "Kho bãi / Nhà xưởng": [
            { text: "Kho xưởng nhỏ (<1000m2)", weight: 25 },
            { text: "Khu sản xuất lớn (>1000m2)", weight: 45 },
            { text: "Cụm kho bãi Logistics", weight: 50 }
        ]
    };

    // Hàm tính toán và chấm điểm AI động dựa trên hành vi chạm của khách hàng
    function updateAIScore() {
        let score = 30; // Điểm sàn cơ bản khi điền form
        
        // Cộng điểm Bước 2: Quy mô
        const activeScaleBtn = document.querySelector(".scale-option-btn.bg-navy, .scale-option-btn.active");
        if (activeScaleBtn) score += parseInt(activeScaleBtn.getAttribute("data-weight") || 0, 10);

        // Cộng điểm Bước 3: Số lượng mắt camera
        const activeSubBtn = document.querySelector(".sub-btn.bg-navy, .sub-btn.active");
        if (activeSubBtn) score += parseInt(activeSubBtn.getAttribute("data-weight") || 0, 10);

        // Cộng điểm Bước 4: Tiêu chí kỹ thuật ưu tiên
        const activeTechBtn = document.querySelector(".tech-btn.bg-navy, .tech-btn.active");
        if (activeTechBtn) score += parseInt(activeTechBtn.getAttribute("data-weight") || 0, 10);

        // Hiển thị khung điểm số AI real-time lên giao diện
        if (aiScoreContainer && aiScoreValue) {
            aiScoreContainer.classList.remove("hidden", "d-none");
            aiScoreValue.textContent = score;
            
            // Phân luồng nhãn ưu tiên gửi về hệ thống quản trị
            const aiStatusField = document.getElementById("ai_status_field");
            if (score >= 90) {
                if (aiStatus) aiStatus.innerHTML = "<span class='text-redbrand font-bold'>🔥 KHÁCH SIÊU VIP (DỰ ÁN LỚN)</span>";
                if (aiStatusField) aiStatusField.value = "🔥 KHÁCH SIÊU VIP";
            } else if (score >= 60) {
                if (aiStatus) aiStatus.innerHTML = "<span class='text-amber-500 font-bold'>🔥 KHÁCH NÓNG TIỀM NĂNG</span>";
                if (aiStatusField) aiStatusField.value = "🔥 KHÁCH NÓNG";
            } else {
                if (aiStatus) aiStatus.innerHTML = "<span class='text-blue-600'>Khách hàng cá nhân / Cần tư vấn thêm</span>";
                if (aiStatusField) aiStatusField.value = "Khách trung bình";
            }
        }
    }

    // Khởi tạo bộ lắng nghe sự kiện Click cho Bước 1 (Không gian khảo sát)
    if (spaceButtons.length > 0) {
        spaceButtons.forEach(btn => {
            btn.addEventListener("click", function() {
                // Xóa trạng thái active cũ
                spaceButtons.forEach(b => b.classList.remove("border-navy", "bg-gray-100", "ring-2", "ring-navy", "active"));
                this.classList.add("border-navy", "bg-gray-100", "ring-2", "ring-navy", "active");
                
                // Lấy giá trị chữ từ thuộc tính data hoặc textContent
                const selectedSpace = this.getAttribute("data-value") || this.textContent.trim().split('\n')[0];
                const customerTypeInput = document.getElementById("customerType");
                if (customerTypeInput) customerTypeInput.value = selectedSpace;

                // Tạo tự động và hiển thị các nút lựa chọn của Bước 2
                if (scaleOptionsContainer && scaleData[selectedSpace]) {
                    scaleOptionsContainer.innerHTML = "";
                    if (scaleLabel) scaleLabel.textContent = `Bước 2: Quy mô diện tích ứng với [${selectedSpace}]`;

                    scaleData[selectedSpace].forEach(opt => {
                        const button = document.createElement("button");
                        button.type = "button";
                        button.className = "scale-option-btn px-3 py-2 border border-gray-200 rounded-lg text-xs transition text-left bg-white text-gray-700 hover:border-navy";
                        button.setAttribute("data-value", opt.text);
                        button.setAttribute("data-weight", opt.weight);
                        button.textContent = opt.text;

                        // Lắng nghe hành vi chọn Bước 2
                        button.addEventListener("click", function() {
                            document.querySelectorAll(".scale-option-btn").forEach(b => b.classList.remove("bg-navy", "text-white", "border-navy", "active"));
                            this.classList.add("bg-navy", "text-white", "border-navy", "active");
                            const projectScaleInput = document.getElementById("projectScale");
                            if (projectScaleInput) projectScaleInput.value = this.getAttribute("data-value");
                            updateAIScore();
                        });

                        scaleOptionsContainer.appendChild(button);
                    });
                }

                // Kích hoạt hiển thị phân đoạn form ẩn tiếp theo mượt mà
                if (dynamicFields) dynamicFields.classList.remove("hidden", "d-none");
                updateAIScore();
            });
        });
    }

    // Bộ lắng nghe hành vi chọn Bước 3 (Số mắt Camera)
    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("bg-navy", "text-white", "border-navy", "active"));
            this.classList.add("bg-navy", "text-white", "border-navy", "active");
            const cameraQtyInput = document.getElementById("cameraQty");
            if (cameraQtyInput) cameraQtyInput.value = this.getAttribute("data-value") || this.textContent.trim();
            updateAIScore();
        });
    });

    // Bộ lắng nghe hành vi chọn Bước 4 (Tiêu chuẩn kỹ thuật ưu tiên)
    document.querySelectorAll(".tech-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("bg-navy", "text-white", "border-navy", "active"));
            this.classList.add("bg-navy", "text-white", "border-navy", "active");
            const techPriorityInput = document.getElementById("techPriority");
            if (techPriorityInput) techPriorityInput.value = this.getAttribute("data-value") || this.textContent.trim();
            updateAIScore();
        });
    });

    // Xử lý gửi Form AJAX ngầm/Iframe chặn Reload trang hoàn toàn
    if (leadForm) {
        leadForm.addEventListener("submit", async (e) => {
            // Kiểm tra bẫy Honeypot chống Bot Spam tự động
            const honeypotEl = document.getElementById("honeypot_field");
            if (honeypotEl && honeypotEl.value) {
                e.preventDefault();
                console.warn("Spam Bot detected!");
                return; 
            }

            // Nếu form dùng cơ chế gửi qua target Iframe ẩn, ta thiết lập cờ đánh dấu thành công
            window.formSubmitted = true;

            const submitBtn = document.getElementById("submit-form-btn") || leadForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý mã hóa...`;
            }

            // Trường hợp Form không sử dụng Iframe mà muốn đẩy trực tiếp qua API Fetch AJAX thuần
            if (!leadForm.getAttribute("target")) {
                e.preventDefault();
                const fullname = document.getElementById("fullname").value.trim();
                const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
                const phone = document.getElementById("phone").value.trim();

                if (!fullname || !phone) {
                    showStatus("Vui lòng điền đầy đủ Họ tên và Số điện thoại.", "alert-danger");
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                    return;
                }

                try {
                    const GOOGLE_FORM_ACTION_URL = leadForm.getAttribute("action") || "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfXXXXXXXXXXXXX/formResponse";
                    const formData = new FormData(leadForm);
                    
                    // Đính kèm bổ sung dữ liệu phân luồng nguồn
                    formData.append(GOOGLE_FORM_FIELD_ID, CLASSIFICATION_TEXT);

                    await fetch(GOOGLE_FORM_ACTION_URL, {
                        method: "POST",
                        mode: "no-cors",
                        body: formData
                    });

                    if (typeof window.handleFormSuccess === "function") {
                        window.handleFormSuccess();
                    } else {
                        showStatus("Đăng ký thành công! Đang chuyển hướng...", "alert-success");
                        leadForm.reset();
                        setTimeout(() => {
                            window.open("https://sites.google.com/view/antinco", "_blank");
                        }, 2000);
                    }
                } catch (error) {
                    console.error("Form Submit Error: ", error);
                    showStatus("Có lỗi hệ thống nhỏ xảy ra. Xin vui lòng liên hệ trực tiếp hotline.", "alert-danger");
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                }
            }
        });
    }

    // Hàm CallBack toàn cục xử lý giao diện sạch sau khi gửi thành công qua Iframe
    window.handleFormSuccess = function() {
        alert("Chúc mừng anh/chị đã đăng ký thành công! Hệ thống đang kích hoạt luồng tải tệp dữ liệu...");
        if (leadForm) leadForm.reset();
        
        // Hoàn tác các trạng thái active trên các nút bấm
        document.querySelectorAll(".space-btn, .scale-option-btn, .sub-btn, .tech-btn").forEach(b => {
            b.classList.remove("border-navy", "bg-gray-100", "bg-navy", "text-white", "ring-2", "ring-navy", "active");
        });
        if (dynamicFields) dynamicFields.classList.add("hidden");
        if (aiScoreContainer) aiScoreContainer.classList.add("hidden");
        
        // Mở trang phân phối tài liệu/ebook của AN TÍN
        window.open("https://sites.google.com/view/antinco", "_blank");
        
        const submitBtn = document.getElementById("submit-form-btn") || (leadForm ? leadForm.querySelector("button[type='submit']") : null);
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-file-invoice text-sm"></i> NHẬN PHƯƠNG ÁN THIẾT KẾ MAY ĐO & FILE EBOOK`;
        }
    };

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

    // ==========================================================================
    // 8. Xử lý Logic Phân Nhánh Kịch Bản Thông Minh (AI Smart Branching Engine)
    // ==========================================================================
    const aiBranchingNodes = document.querySelectorAll("[data-ai-node]");
    
    if (aiBranchingNodes.length > 0) {
        aiBranchingNodes.forEach(node => {
            node.addEventListener("click", function(e) {
                const targetScript = this.getAttribute("data-next-script");
                const conditionCheck = this.getAttribute("data-condition");

                if (targetScript) {
                    e.preventDefault();
                    console.log(`[AI Branching] Kích hoạt nhánh kịch bản tiếp theo: ${targetScript} dưới điều kiện: ${conditionCheck || "Bình thường"}`);
                    
                    const nextSection = document.getElementById(targetScript);
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
                        nextSection.classList.add("ai-active-route");
                    }
                }
            });
        });
    }
});
