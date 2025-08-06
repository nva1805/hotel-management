# Kiến trúc và Lộ trình phát triển

Tài liệu này mô tả kiến trúc hiện tại của ứng dụng quản lý khách sạn và đề xuất các chức năng cần phát triển tiếp theo.

## Kiến trúc hiện tại

### 1. Cấu trúc thư mục
```
hotel-management/
├── .github/
│   └── copilot-instructions.md
├── .vscode/
│   └── tasks.json
├── docs/
│   ├── backend-guide.md
│   └── user-guide.md
├── public/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── bookings/
│   │   │   └── page.tsx
│   │   ├── check-in/
│   │   │   └── page.tsx
│   │   ├── check-out/
│   │   │   └── page.tsx
│   │   ├── customers/
│   │   ├── invoices/
│   │   ├── reports/
│   │   ├── settings/
│   │   ├── partners/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── room/
│   │   │   ├── RoomCard.tsx
│   │   │   └── RoomStatusBadge.tsx
│   │   ├── booking/
│   │   └── customer/
│   ├── mock/
│   │   ├── rooms.ts
│   │   ├── customers.ts
│   │   ├── bookings.ts
│   │   ├── invoices.ts
│   │   ├── partners.ts
│   │   ├── expenses.ts
│   │   └── settings.ts
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
└── ... (các file cấu hình)
```

### 2. Công nghệ sử dụng
- **Framework**: Next.js với App Router
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Headless UI, FullCalendar
- **HTTP Client**: Axios (được cấu hình nhưng chưa sử dụng API thực tế)

### 3. Mô hình dữ liệu
Các interface chính được định nghĩa trong `src/types/index.ts`:
- `Room`: Thông tin và trạng thái phòng
- `Customer`: Thông tin khách hàng
- `Booking`: Thông tin đặt phòng
- `Invoice`: Hóa đơn
- `Partner`: Đối tác dịch vụ
- `Expense`: Chi phí và điều chỉnh
- `HotelSettings`: Cài đặt khách sạn

### 4. Quản lý state
Sử dụng Zustand store (`src/store/index.ts`) với các chức năng:
- Quản lý danh sách phòng
- Quản lý trạng thái phòng
- Quản lý đặt phòng, check-in, check-out
- Quản lý khách hàng

## Các chức năng đã hoàn thiện

### 1. Trang Dashboard
- ✅ Hiển thị lịch/timeline các phòng theo tầng
- ✅ Màu sắc biểu thị trạng thái phòng (trống, đã đặt, đang ở, bảo trì, đang dọn)
- ✅ Xem và thêm ghi chú cho phòng
- ✅ Xem và thêm yêu cầu dịch vụ
- ✅ Đổi trạng thái phòng

### 2. Trang Đặt Phòng
- ✅ Tab đặt thủ công
- ✅ Tìm kiếm khách hàng
- ✅ Chọn phòng trống
- ✅ Chọn ngày check-in/check-out
- ✅ Tạo đặt phòng mới
- ✅ Cấu trúc tab gợi ý AI (chưa có chức năng thực tế)

### 3. Trang Check-in
- ✅ Hiển thị đặt phòng sẵn sàng check-in
- ✅ Chức năng check-in
- ✅ Cấu trúc check-in thủ công (chưa hoàn thiện giao diện)

### 4. Trang Check-out
- ✅ Hiển thị danh sách khách đang lưu trú
- ✅ Chức năng check-out
- ✅ Đánh dấu trả phòng trễ

### 5. Hệ thống layout và điều hướng
- ✅ Layout tổng thể với sidebar và topbar
- ✅ Menu điều hướng đến các trang chức năng
- ✅ Chuyển hướng tự động từ trang chủ đến dashboard

## Chức năng cần phát triển tiếp theo

### 1. Hoàn thiện các trang hiện có
- ⬜ **Dashboard**: Thêm chức năng "Giữ phòng" và "Mở khóa phòng"
- ⬜ **Dashboard**: Hoàn thiện thao tác "Đặt phòng nhanh" và "Check-in nhanh"
- ⬜ **Đặt phòng**: Thêm chức năng thêm khách hàng mới
- ⬜ **Check-in**: Hoàn thiện giao diện và logic check-in thủ công
- ⬜ **Check-out**: Thêm giao diện xem chi tiết và thanh toán khi check-out

### 2. Phát triển các trang còn lại
- ⬜ **Trang Khách Hàng**: 
  - Danh sách khách hàng với bộ lọc
  - Thêm/sửa thông tin khách
  - Xem lịch sử lưu trú

- ⬜ **Trang Hóa Đơn**:
  - Danh sách hóa đơn
  - Xem và in hóa đơn
  - Thêm hóa đơn thủ công

- ⬜ **Trang Báo Cáo**:
  - Báo cáo doanh thu
  - Tỷ lệ lấp đầy phòng
  - Thống kê khách quay lại

- ⬜ **Trang Cài Đặt**:
  - Quản lý loại phòng
  - Cấu hình giờ check-in/check-out
  - Cấu hình phụ thu sớm/trễ
  - Thông tin khách sạn

- ⬜ **Trang Đối Tác**:
  - Danh sách đối tác dịch vụ
  - Thêm/sửa/xóa thông tin đối tác

- ⬜ **Trang Khoản Chi & Điều Chỉnh**:
  - Thêm các khoản chi (bảo trì, vật tư)
  - Điều chỉnh giá đặt phòng

### 3. Cải tiến UI/UX
- ⬜ Thêm timeline view sử dụng FullCalendar trong Dashboard
- ⬜ Thêm hiệu ứng loading và skeleton khi tải dữ liệu
- ⬜ Hoàn thiện responsive design cho các trang
- ⬜ Thêm thông báo (toasts) khi thực hiện các hành động thành công/thất bại

### 4. Tích hợp backend
- ⬜ Phát triển hoặc kết nối với API thực tế thay vì sử dụng mock data
- ⬜ Thêm authentication và authorization
- ⬜ Xử lý lỗi và hiển thị thông báo phù hợp
- ⬜ Thêm loading state khi gọi API

### 5. Tính năng nâng cao
- ⬜ Chức năng gợi ý AI cho đặt phòng
- ⬜ In hóa đơn và báo cáo
- ⬜ Lưu trữ dữ liệu offline và đồng bộ khi có kết nối
- ⬜ Thông báo qua email/SMS cho khách hàng
- ⬜ Đa ngôn ngữ

## Chiến lược phát triển đề xuất

1. **Giai đoạn 1 (Ngắn hạn)**: Hoàn thiện các trang hiện có và phát triển các trang còn lại với mock data
2. **Giai đoạn 2 (Trung hạn)**: Phát triển backend API và kết nối với frontend
3. **Giai đoạn 3 (Dài hạn)**: Thêm các tính năng nâng cao và cải tiến UI/UX

## Kiến trúc đề xuất cho backend

Để hỗ trợ các chức năng frontend đã phát triển, backend nên được thiết kế với:

1. **API RESTful** theo hướng dẫn trong `docs/backend-guide.md`
2. **Cơ sở dữ liệu** phù hợp với các model đã định nghĩa trong `src/types/index.ts`
3. **Authentication** sử dụng JWT hoặc session-based cho quản lý người dùng
4. **WebSocket** cho các cập nhật real-time về trạng thái phòng

## Tóm tắt

Ứng dụng hiện đã có một nền tảng vững chắc với:
- Cấu trúc dự án rõ ràng và mô-đun hóa
- Các thành phần UI có thể tái sử dụng
- Mock data đầy đủ để phát triển UI
- Luồng nghiệp vụ cơ bản cho các chức năng chính

Việc phát triển tiếp theo nên tập trung vào hoàn thiện các trang hiện có trước khi mở rộng sang các tính năng mới và tích hợp backend.
