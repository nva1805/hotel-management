# Hướng dẫn phát triển Backend

Tài liệu này cung cấp hướng dẫn để xây dựng backend cho ứng dụng quản lý khách sạn dựa trên cấu trúc mock data có sẵn.

## Cấu trúc dữ liệu

Backend cần hỗ trợ các model sau:

1. **Room**: Thông tin phòng và trạng thái
2. **Customer**: Thông tin khách hàng
3. **Booking**: Thông tin đặt phòng
4. **Invoice**: Hóa đơn
5. **Partner**: Đối tác
6. **Expense**: Chi phí và điều chỉnh
7. **Settings**: Cài đặt hệ thống

## API Endpoints cần thiết

### 1. Rooms

- `GET /api/rooms` - Lấy danh sách phòng
- `GET /api/rooms/:id` - Lấy thông tin chi tiết phòng
- `PUT /api/rooms/:id/status` - Cập nhật trạng thái phòng
- `POST /api/rooms/:id/notes` - Thêm ghi chú cho phòng
- `POST /api/rooms/:id/service-requests` - Thêm yêu cầu dịch vụ

### 2. Customers

- `GET /api/customers` - Lấy danh sách khách hàng
- `GET /api/customers/:id` - Lấy thông tin chi tiết khách hàng
- `POST /api/customers` - Thêm khách hàng mới
- `PUT /api/customers/:id` - Cập nhật thông tin khách hàng
- `GET /api/customers/:id/bookings` - Lấy lịch sử đặt phòng của khách

### 3. Bookings

- `GET /api/bookings` - Lấy danh sách đặt phòng
- `GET /api/bookings/:id` - Lấy chi tiết đặt phòng
- `POST /api/bookings` - Tạo đặt phòng mới
- `PUT /api/bookings/:id/check-in` - Check-in
- `PUT /api/bookings/:id/check-out` - Check-out
- `PUT /api/bookings/:id/cancel` - Hủy đặt phòng

### 4. Invoices

- `GET /api/invoices` - Lấy danh sách hóa đơn
- `GET /api/invoices/:id` - Lấy chi tiết hóa đơn
- `POST /api/invoices` - Tạo hóa đơn mới
- `PUT /api/invoices/:id/status` - Cập nhật trạng thái hóa đơn

### 5. Partners

- `GET /api/partners` - Lấy danh sách đối tác
- `POST /api/partners` - Thêm đối tác mới
- `PUT /api/partners/:id` - Cập nhật thông tin đối tác
- `DELETE /api/partners/:id` - Xóa đối tác

### 6. Expenses

- `GET /api/expenses` - Lấy danh sách chi phí
- `POST /api/expenses` - Thêm chi phí mới
- `PUT /api/expenses/:id` - Cập nhật chi phí

### 7. Settings

- `GET /api/settings` - Lấy cài đặt hệ thống
- `PUT /api/settings` - Cập nhật cài đặt hệ thống

## Công nghệ đề xuất cho Backend

1. **Node.js + Express**: API server
2. **MongoDB/PostgreSQL**: Database
3. **Prisma/Mongoose**: ORM
4. **JWT**: Authentication
5. **Jest**: Testing

## Triển khai

1. Tạo database schema dựa trên các types trong `/src/types/index.ts`
2. Phát triển API endpoints theo cấu trúc đã liệt kê
3. Triển khai authentication và authorization
4. Cập nhật các services trong `/src/services/api.ts` để kết nối với API thực tế
