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
                const speed = target / 50;

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
    const leadForm = document.getElementById("ai-scoring-form") || document.getElementById("enterprise-lead-form") || document.querySelector("form");
    const formStatus = document.getElementById("form-status");

    // Lấy động danh sách các nút Bước 1 bằng cơ chế quét thông minh theo từ khóa text nội dung
    let spaceButtons = [];
    document.querySelectorAll('div[class*="border"], div[class*="rounded"]').forEach(el => {
        const text = el.textContent.trim();
        // Chỉ chọn những khối cha trực tiếp chứa tiêu đề không gian và không bọc quá rộng
        if ((text.includes("Nhà Ở") || text.includes("Cửa Hàng") || text.includes("Kho Bãi") || text.includes("Nhà ở") || text.includes("Cửa hàng") || text.includes("Kho bãi")) && el.children.length > 0 && el.children.length < 10) {
            if (!spaceButtons.includes(el) && !el.parentElement.textContent.trim().startsWith("Bước 1")) {
                spaceButtons.push(el);
            }
        }
    });

    // Nếu không quét được tự động, gán dự phòng theo class chuẩn danh định
    if (spaceButtons.length === 0) {
        spaceButtons = Array.from(document.querySelectorAll(".space-btn"));
    }

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

    // Hàm cập nhật điểm số AI thời gian thực
    function updateAIScore() {
        let score = 30; 
        
        const activeScaleBtn = document.querySelector(".scale-option-btn.bg-navy, .scale-option-btn.active");
        if (activeScaleBtn) score += parseInt(activeScaleBtn.getAttribute("data-weight") || 0, 10);

        const activeSubBtn = document.querySelector(".sub-btn.bg-navy, .sub-btn.active");
        if (activeSubBtn) score += parseInt(activeSubBtn.getAttribute("data-weight") || 0, 10);

        const activeTechBtn = document.querySelector(".tech-btn.bg-navy, .tech-btn.active");
        if (activeTechBtn) score += parseInt(activeTechBtn.getAttribute("data-weight") || 0, 10);

        if (aiScoreContainer && aiScoreValue) {
            aiScoreContainer.classList.remove("hidden", "d-none");
            aiScoreValue.textContent = score;
            
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

    // Kích hoạt xử lý click an toàn tuyệt đối cho Bước 1
    spaceButtons.forEach(btn => {
        btn.style.cursor = "pointer";
        // Chống hiệu ứng bấm trượt chữ hoặc icon con bên trong bằng Pointer-events cứu cánh
        Array.from(btn.children).forEach(child => {
            child.style.pointerEvents = "none";
        });

        btn.addEventListener("click", function(e) {
            spaceButtons.forEach(b => {
                b.classList.remove("border-navy", "bg-gray-100", "ring-2", "ring-navy", "active");
                b.style.backgroundColor = "";
                b.style.borderColor = "";
            });

            this.classList.add("border-navy", "bg-gray-100", "ring-2", "ring-navy", "active");
            this.style.backgroundColor = "#f3f4f6"; 
            this.style.borderColor = "#002060"; 

            let rawText = this.textContent.trim();
            let selectedSpace = "Nhà ở / Biệt thự"; 
            
            if (rawText.includes("Nhà") || rawText.includes("Biệt thự")) selectedSpace = "Nhà ở / Biệt thự";
            else if (rawText.includes("Cửa Hàng") || rawText.includes("Cửa hàng") || rawText.includes("Shop")) selectedSpace = "Cửa hàng / Chuỗi shop";
            else if (rawText.includes("Kho") || rawText.includes("Xưởng")) selectedSpace = "Kho bãi / Nhà xưởng";

            const customerTypeInput = document.getElementById("customerType");
            if (customerTypeInput) customerTypeInput.value = selectedSpace;

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

            if (dynamicFields) dynamicFields.classList.remove("hidden", "d-none");
            updateAIScore();
        });
    });

    // Lắng nghe chọn Bước 3
    document.querySelectorAll(".sub-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("bg-navy", "text-white", "border-navy", "active"));
            this.classList.add("bg-navy", "text-white", "border-navy", "active");
            const cameraQtyInput = document.getElementById("cameraQty");
            if (cameraQtyInput) cameraQtyInput.value = this.getAttribute("data-value") || this.textContent.trim();
            updateAIScore();
        });
    });

    // Lắng nghe chọn Bước 4
    document.querySelectorAll(".tech-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".tech-btn").forEach(b => b.classList.remove("bg-navy", "text-white", "border-navy", "active"));
            this.classList.add("bg-navy", "text-white", "border-navy", "active");
            const techPriorityInput = document.getElementById("techPriority");
            if (techPriorityInput) techPriorityInput.value = this.getAttribute("data-value") || this.textContent.trim();
            updateAIScore();
        });
    });

    // Cấu hình gửi AJAX Form chống reload trang
    if (leadForm) {
        leadForm.addEventListener("submit", async (e) => {
            const honeypotEl = document.getElementById("honeypot_field");
            if (honeypotEl && honeypotEl.value) {
                e.preventDefault();
                console.warn("Spam Bot detected!");
                return;
            }

            window.formSubmitted = true;
            const submitBtn = document.getElementById("submit-form-btn") || leadForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý mã hóa...`;
            }

            if (!leadForm.getAttribute("target")) {
                e.preventDefault();
                const fullname = document.getElementById("fullname").value.trim();
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
                    formData.append(GOOGLE_FORM_FIELD_ID, CLASSIFICATION_TEXT);

                    await fetch(GOOGLE_FORM_ACTION_URL, {
                        method: "POST",
                        mode: "no-cors",
                        body: formData
                    });

                    if (typeof window.handleFormSuccess === "function") {
                        window.handleFormSuccess();
                    } else {
                        showStatus("Đăng ký thành công!", "alert-success");
                        leadForm.reset();
                        setTimeout(() => {
                            window.open("https://sites.google.com/view/antinco", "_blank");
                        }, 2000);
                    }
                } catch (error) {
                    console.error("Form Submit Error: ", error);
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                }
            }
        });
    }

   window.handleFormSuccess = function() {
        // 1. TÍNH TOÁN BÁO GIÁ AI
        const loai = document.getElementById("customerType") ? document.getElementById("customerType").value : "Chưa chọn";
        const ketQua = window.tinhToanBaoGia(loai);
        
        // 2. HIỂN THỊ BÁO GIÁ CHO KHÁCH
        alert(`THÔNG BÁO TỪ AN TÍN AI:\n\n` +
              `Danh mục: ${ketQua.danhMuc}\n` +
              `Giá trọn gói: ${ketQua.giaHienThi}\n` +
              `Ưu đãi: ${ketQua.khuyenMai}\n\n` +
              `Hệ thống sẽ chuyển hướng bạn đến tài liệu ngay...`);

        // 3. RESET FORM VÀ GIAO DIỆN
        if (leadForm) leadForm.reset();
        
        document.querySelectorAll(".space-btn, .scale-option-btn, .sub-btn, .tech-btn").forEach(b => {
            b.classList.remove("border-navy", "bg-gray-100", "bg-navy", "text-white", "ring-2", "ring-navy", "active");
        });
        
        if (dynamicFields) dynamicFields.classList.add("hidden");
        if (aiScoreContainer) aiScoreContainer.classList.add("hidden");
        
        // 4. CHUYỂN TRANG
        window.open("https://sites.google.com/view/antinco", "_blank");
        
        // 5. KHÔI PHỤC NÚT GỬI
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
                if (targetScript) {
                    e.preventDefault();
                    const nextSection = document.getElementById(targetScript);
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
                        nextSection.classList.add("ai-active-route");
                    }
                }
            });
        });
    }
    // ==========================================================================
    // 9. ENGINE BÁO GIÁ AI (TÍNH TOÁN & KẾT XUẤT TRONG 5 GIÂY)
    // ==========================================================================
    window.tinhToanBaoGia = function(loaiKhongGian) {
        // Ma trận giá chuẩn hóa - Dễ dàng điều chỉnh tỷ lệ chiết khấu
        const bangGia = {
            'Nhà ở / Biệt thự': { 
                danhMuc: 'Camera Wifi + Chuông cửa', 
                giaGoc: 3000000, tyLeGiam: 0.16, noiDungKM: 'Tặng thẻ nhớ 64GB' 
            },
            'Cửa hàng / Chuỗi shop': { 
                danhMuc: 'Camera IP + Đầu ghi 8 kênh', 
                giaGoc: 10000000, tyLeGiam: 0.15, noiDungKM: 'Miễn phí lắp đặt' 
            },
            'Kho bãi / Nhà xưởng': { 
                danhMuc: 'Camera Bullet + Đầu ghi 16 kênh', 
                giaGoc: 18000000, tyLeGiam: 0.16, noiDungKM: 'Bảo hành 2 năm' 
            }
        };

        const thongTin = bangGia[loaiKhongGian] || { 
            danhMuc: 'Tư vấn chuyên sâu', giaGoc: 0, tyLeGiam: 0, noiDungKM: 'Khảo sát miễn phí' 
        };

        const giaSauKM = thongTin.giaGoc * (1 - thongTin.tyLeGiam);

        return {
            danhMuc: thongTin.danhMuc,
            giaHienThi: giaSauKM.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            khuyenMai: thongTin.noiDungKM
        };
    };

    // Tích hợp vào sự kiện thành công của Form (trong window.handleFormSuccess)
    // Anh có thể gọi: const ketQua = tinhToanBaoGia(customerTypeInput.value);
});
