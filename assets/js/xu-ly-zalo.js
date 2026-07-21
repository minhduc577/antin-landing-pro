// File: assets/js/xu-ly-zalo.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Lắng nghe sự kiện khi form được submit
    const form = document.getElementById('an-tin-form');
    if (!form) {
        console.error('Không tìm thấy form với id="an-tin-form"');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Chặn hành vi tải lại trang mặc định

        // 2. Lấy dữ liệu từ các ô nhập liệu trong form
        // (Đảm bảo các ID hoTen, soDienThoai, email_khach khớp với trong HTML)
        const hoTen = document.getElementById('ho_ten') ? document.getElementById('ho_ten').value : '';
        const soDienThoai = document.getElementById('so_dien_thoai') ? document.getElementById('so_dien_thoai').value : '';
        const emailKhach = document.getElementById('email_khach') ? document.getElementById('email_khach').value : '';
        
        // Lấy dữ liệu đã chọn cho loại không gian (nếu có)
        // Ta dùng selector để lấy cái đang được active
        const selectedSpaceEl = document.querySelector('.space_input.active');
        const loaiKhongGian = selectedSpaceEl ? selectedSpaceEl.getAttribute('data-value') : '';

        // Hiệu ứng nút đang gửi (tùy chọn)
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Đang gửi...';
        }

        // 3. Tự động gửi dữ liệu sang Make.com
        const makeWebhookUrl = 'https://hook.eu1.make.com/7cli6mft1mqkgaxtu2o67m96qw6vn8xc';
        
        fetch(makeWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Tùy chọn: có thể thêm CORS header nếu bị chặn
                // 'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                hoTen: hoTen,
                soDienThoai: soDienThoai,
                emailKhach: emailKhach,
                loaiKhongGian: loaiKhongGian,
                nguonGoc: 'Zalo Mini App - Landing Page' // Thêm ghi chú
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Gửi Make thành công:', data);
            // Sau khi gửi thành công, chuyển hướng sang trang cảm ơn
            window.location.href = 'thankyou.html';
        })
        .catch(err => {
            console.error('Lỗi gửi Make:', err);
            // Dù lỗi vẫn chuyển hướng sang thank you để tránh khách bị kẹt
            window.location.href = 'thankyou.html';
        })
        .finally(() => {
            // Khôi phục nút bấm sau khi xử lý xong (dù thành công hay lỗi)
             if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'NHẬN PHƯƠNG ÁN & BÁO GIÁ AI'; // Nội dung gốc
            }
        });
    });
});