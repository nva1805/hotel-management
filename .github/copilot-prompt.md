# Web App Quản Lý Khách Sạn - Prompt cho AI

## Mục Tiêu

Xây dựng một ứng dụng web quản lý khách sạn sử dụng **Next.js** cho frontend. Ứng dụng được thiết kế cho một khách sạn nhỏ, nơi **quản lý cũng là lễ tân**. Giao diện cần ưu tiên sự dễ sử dụng, thao tác nhanh và hiển thị hiệu quả trạng thái phòng và đặt phòng.

---

## Yêu Cầu Chức Năng

### 1. Trang Chủ (Dashboard)
- Hiển thị **lịch/timeline các phòng** (mỗi phòng là một dòng).
- Có màu trạng thái:
  - Trống,
  - Đã đặt,
  - Đang ở,
  - Bảo trì,
  - Đang dọn.
- Cho phép thêm **ghi chú và yêu cầu dịch vụ** cho phòng (VD: “cần nước”, “thêm giường phụ”).
- Có các nút:
  - **Giữ phòng** (chọn thời gian hoặc không bắt buộc).
  - **Mở khóa phòng**.
  - **Tạo nhanh** đặt phòng hoặc check-in từ phòng đó.

---

### 2. Trang Đặt Phòng
- Gồm **2 tab**:
  - **Đặt thủ công** (tab mặc định):
    - Chọn phòng/ngày, khách hàng, giá.
    - Lọc các phòng trống/chưa đặt.
    - Tìm theo **tên/số điện thoại** để hỗ trợ khách vãng lai.
  - **Gợi ý AI** (phần mở rộng sau):
    - Dùng AI gợi ý phòng tốt nhất dựa trên lịch sử khách, thời gian ở, sở thích,...

---

### 3. Trang Check-in
- Trang riêng, tách biệt với Đặt phòng.
- Hiển thị các đơn đặt phòng sẵn sàng check-in.
- Có thể check-in thủ công cho **khách vãng lai**.
- Giao diện check-in bao gồm:
  - Nhập/chỉnh sửa giá
  - Chọn phòng
  - Loại lưu trú (theo đêm / theo giờ)
  - Nếu check-in sớm → áp dụng phụ thu (theo cấu hình trong phần Cài đặt)

---

### 4. Trang Checkout
- Hiển thị danh sách khách đang lưu trú.
- Nhấn để thực hiện checkout:
  - Xem lại giá phòng, dịch vụ phát sinh
  - Áp dụng phụ thu nếu trả phòng trễ
  - Tự động tính tổng chi phí

---

### 5. Trang Khách Hàng
- Danh sách tất cả khách hàng
- Tìm kiếm theo tên/số điện thoại
- Xem lịch sử lưu trú
- Thêm/sửa thông tin khách

---

### 6. Hóa Đơn
- Danh sách hóa đơn với bộ lọc (ngày, trạng thái, khách)
- Xem và in hóa đơn riêng lẻ
- Thêm hóa đơn thủ công nếu cần

---

### 7. Báo Cáo
- Báo cáo doanh thu theo ngày/tuần/tháng
- Tỷ lệ lấp đầy phòng
- Khách quay lại nhiều nhất
- Thống kê sử dụng dịch vụ

---

### 8. Cài Đặt
- Cấu hình:
  - Loại phòng, tên phòng, giá mặc định
  - Giờ check-in / check-out mặc định
  - Khung giờ phụ thu sớm/trễ và phần trăm phụ thu
  - Tùy chọn bật/tắt tự động áp dụng phụ thu
  - Bật/tắt gợi ý AI khi đặt phòng
  - Thông tin khách sạn (logo, địa chỉ,...)

---

### 9. Đối Tác
- Danh sách đối tác:
  - Vận chuyển, giao đồ ăn, giặt ủi,...
- Thêm/sửa/xóa thông tin đối tác

---

### 10. Khoản Chi & Điều Chỉnh
- Thêm ghi chú các khoản chi:
  - Bảo trì, vật tư, hoàn tiền,...
- Điều chỉnh giá đặc biệt:
  - Chỉnh giá phòng theo từng đặt phòng (kèm lý do)
  - Ghi nhận giảm giá nhỏ hoặc làm tròn cho khách

---

## Công Nghệ Sử Dụng

- **Frontend**: Next.js + Tailwind CSS
- **Quản lý trạng thái**: Zustand hoặc Redux
- **Tùy chọn**:
  - Sử dụng FullCalendar hoặc UI timeline tùy chỉnh cho lịch phòng
  - Dùng Headless UI / Radix cho modal, tab,...
  - Hỗ trợ TypeScript
  - Chuẩn bị tích hợp AI cho gợi ý thông minh
  - Axios cho các dịch vụ API (có cấu hình interceptor)
  - Cấu hình mock data trước trong thư mục mock, giả định fetch data nhưng sẽ lấy tạm từ mock
  - Tạo hướng dẫn sử dụng và hướng dẫn xây dựng backend từ mock đã tạo trong thư mục docs

---

## Hướng Dẫn UX

- Giao diện **ưu tiên Desktop**, không yêu cầu mobile.
- Giao diện dạng **dashboard**: thanh bên trái (sidebar), thanh trên (topbar), phần nội dung chính.
- Ưu tiên tốc độ thao tác với các hành động thường dùng: check-in, đặt phòng, đổi trạng thái phòng.
- Sử dụng màu sắc và icon rõ ràng để biểu thị trạng thái và thao tác nhanh.

---

## Ghi Chú

- Hệ thống chỉ dùng bởi **1 người (quản lý kiêm lễ tân)** nên không cần phân quyền phức tạp.
- Thiết kế cho khách sạn **quy mô nhỏ (khoảng 10–30 phòng)**.