const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// URL Webhook Make theo yêu cầu
const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/7cli6mft1mqkgaxtu2o67m96qw6vn8xc';

// 1. API Chấm điểm AI & Xử lý tự động hóa Lead
app.post('/api/ai-scoring', (req, res) => {
    try {
        const { name, phone, address, message } = req.body;
        
        let score = 50;
        let tag = "Khách hàng tiêu chuẩn";
        
        const lowerMsg = (message || "").toLowerCase();
        if (lowerMsg.includes('camera') || lowerMsg.includes('smart home') || lowerMsg.includes('lắp đặt')) {
            score = 95;
            tag = "Hot Lead (Tiềm năng nóng)";
        } else if (lowerMsg.includes('bảo trì') || lowerMsg.includes('sửa chữa')) {
            score = 80;
            tag = "Khách bảo trì định kỳ";
        } else {
            score = 65;
            tag = "Warm Lead (Tiềm năng ấm)";
        }

        res.status(200).json({
            success: true,
            data: { name, phone, address, score, tag }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. API Nhận dữ liệu tương tác & Gửi Webhook tới Make chuẩn 5 trường: tên, phone, địa chỉ, time, lịch sử giao tiếp AI
app.post('/api/submit-interaction', async (req, res) => {
    try {
        const { name, phone, address, interaction_history } = req.body;
        
        const payload = {
            name: name || "Chưa cập nhật",
            phone: phone || "Chưa cập nhật",
            address: address || "Chưa cập nhật",
            time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
            interaction_history: interaction_history || "Tương tác tự động qua Zalo Mini App / Web AI"
        };

        const makeResponse = await axios.post(MAKE_WEBHOOK_URL, payload);

        res.status(200).json({
            success: true,
            message: "Đã gửi dữ liệu 5 trường chuẩn tới Make Webhook thành công!",
            makeStatus: makeResponse.status
        });
    } catch (error) {
        console.error("Lỗi gửi Webhook Make:", error.message);
        res.status(500).json({ success: false, error: "Không thể kết nối tới Make Webhook." });
    }
});

// 3. API Tích hợp Cổng thanh toán QR Code (VietQR / ZaloPay Mockup Production)
app.post('/api/create-payment', async (req, res) => {
    try {
        const { amount, description, orderId } = req.body;
        const transactionCode = orderId || "AT-" + Math.floor(Math.random() * 90000 + 10000);
        
        const bankId = "VCB"; 
        const accountNumber = "0914060339";
        const qrCodeUrl = `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=KY%20THUAT%20CONG%20NGHE%20AN%20TIN`;

        res.status(200).json({
            success: true,
            transactionCode,
            qrCodeUrl,
            amount,
            description,
            gateway: "An Tín Pay & ZaloPay Gateway"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 An Tín Backend Production Server đang chạy tại cổng ${PORT}`);
});