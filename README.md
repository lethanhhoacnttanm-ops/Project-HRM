# 📱 Hệ Thống Quản Lý Nhân Sự & Học Tập (Project-HRM)

## 🎯 Mô Tả Tổng Quan

**Project-HRM** là một hệ thống quản lý nhân sự (Human Resource Management) và quản lý học tập (Learning Management System - LMS) toàn diện, được phát triển nhằm giải quyết các bài toán quản lý nhân sự hiện đại trong các tổ chức công nghệ.

### 📋 Bài Toán Thực Tế & Mục Tiêu

Hệ thống cung cấp giải pháp cho các thách thức như:

- 🔐 **Quản lý phân quyền**: Phân biệt rõ ràng giữa quyền hạn Admin và Nhân viên
- 📚 **Lộ trình học tập có cấu trúc**: Quản lý kỹ năng phát triển theo từng vị trí và level (Intern, Fresher, Junior, Middle, Senior)
- ⬆️ **Quy trình thăng tiến**: Tự động hóa quy trình đề xuất, duyệt và cập nhật thông tin nhân viên khi thăng tiến
- 📊 **Theo dõi tiến độ**: Giám sát tiến độ học tập và hiệu suất công việc của từng nhân viên
- 🏢 **Quản lý đa phòng ban**: Hỗ trợ các bộ phận như DevOps, System Admin, UI/UX, Backend Development, QA/QC, Business Analysis

---

## 🛠️ Tech Stack - Công Nghệ Sử Dụng

### **Frontend** 
- **React 19** - Thư viện UI hiện đại với JSX
- **Vite** - Build tool siêu nhanh (thay thế Webpack)
- **React Router 7** - Định tuyến ứng dụng
- **Ant Design 6** - Thư viện component UI chuyên nghiệp
- **Shadcn UI** - Custom component library được xây dựng trên Radix UI
- **Tailwind CSS 4** - Framework CSS utility-first
- **Recharts** - Thư viện vẽ biểu đồ dữ liệu
- **Axios** - HTTP client
- **Sonner** - Toast notification
- **jsPDF & jsPDF-AutoTable** - Xuất PDF dữ liệu

### **Backend**
- **Node.js** - Runtime JavaScript phía server
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9** - ODM (Object Data Modeling)
- **JWT (jsonwebtoken)** - Xác thực token
- **bcryptjs** - Mã hóa mật khẩu
- **Helmet** - Bảo mật header HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger
- **node-cron** - Lập lịch tự động (cron jobs)
- **Express Rate Limiter** - Giới hạn tỷ lệ request
- **Google Generative AI** - Hỗ trợ AI chatbot/recommendation

### **Database Models**
- `Employee` - Thông tin nhân viên, phân quyền
- `Department` - Phòng ban, bộ phận
- `Position` - Vị trí công việc, level được phép
- `Course` - Khóa học, nội dung đào tạo
- `CourseProgress` - Tiến độ học tập của nhân viên
- `Promotion` - Đề xuất thăng tiến, workflow
- `Contract` - Hợp đồng lao động
- `Payroll` - Lương, phụ cấp, thưởng
- `Leave` - Yêu cầu nghỉ phép
- `Attendance` - Chấm công
- `Performance` - Đánh giá hiệu suất
- `Job` - Tin tuyển dụng nội bộ
- `AuditLog` - Lịch sử hoạt động

---

## ⭐ Tính Năng Nổi Bật

### 1. 🔐 **Phân Quyền Admin & Employee Portal**
- **Admin**: Quản lý toàn bộ hệ thống, tạo chính sách, phê duyệt yêu cầu
- **Employee**: Xem lộ trình học tập, nộp yêu cầu, cập nhật thông tin cá nhân
- **Manager**: Phê duyệt nghỉ phép, đánh giá nhân viên (trong bộ phận)

### 2. 📚 **Module Quản Lý Lộ Trình Học Tập (Training Roadmaps)**
Hệ thống thiết kế đường đi học tập theo từng vị trí và level:

| **Bộ Phận** | **Vị Trí** | **Level** | **Khóa Học Bắt Buộc** |
|---|---|---|---|
| **Software Development** | Backend Developer | Intern → Fresher → Junior → Middle | NodeJS Basics, Database Design, API Development, System Design |
| **Software Development** | Frontend Developer | Intern → Fresher → Junior → Middle | React Fundamentals, Advanced React, UI/UX Integration, Performance Optimization |
| **DevOps & System** | DevOps Engineer | Fresher → Junior → Middle | Docker Mastery, Kubernetes, CI/CD Pipeline, Infrastructure as Code |
| **UI/UX Design** | UI/UX Designer | Fresher → Junior → Middle | Figma Essentials, Design Systems, Prototyping, UX Research |
| **QA/QC** | QA Engineer | Fresher → Junior → Middle | Manual Testing, Automation Testing, Test Strategy, Performance Testing |

**Đặc điểm**:
- Khóa học gắn với vị trí + level cụ thể
- Trạng thái: `Not Started` → `In Progress` → `Completed`
- Theo dõi tiến độ theo % hoàn thành
- Hạn chót (Due Date) và đánh dấu bắt buộc (Mandatory)

### 3. ⬆️ **Module Đề Xuất Thăng Tiến (Promotion Workflow)**
Tự động hóa quy trình thăng tiến với các bước:

1. **Nhân viên nộp đơn** → Trạng thái: `PENDING_REVIEW`
2. **Quản lý duyệt** → Trạng thái: `APPROVED_PENDING_EFFECTIVE`
3. **Admin xác nhận ngày hiệu lực** → Trạng thái: `COMPLETED`

**Dữ liệu tự động cập nhật**:
- ✅ Cấp bậc mới (Level): Vertical, Lateral, Merit-based
- ✅ Phòng ban (Department)
- ✅ Vị trí công việc (Position)
- ✅ Ngày hiệu lực (Effective Date)
- ✅ Xếp hạng hiệu suất (Performance Rating: 0-5)

### 4. 📊 **Theo Dõi Tiến Độ Học Tập (CourseProgress Tracking)**
- Hiển thị danh sách khóa học được gán
- Cập nhật trạng thái: Chưa bắt đầu, Đang học, Hoàn thành
- Ghi nhận ngày hoàn thành
- Liên kết với bộ phận & vị trí của nhân viên

### 5. 📋 **Các Chức Năng Khác**
| Module | Chức Năng |
|--------|----------|
| **Chấm Công** | Check-in/out, tính tổng giờ, báo cáo vắng mặt |
| **Quản Lý Phép** | Nộp yêu cầu, phê duyệt, tính số ngày phép |
| **Lương & Phúc Lợi** | Tính lương, phụ cấp, thưởng, xuất bảng lương |
| **Đánh Giá Hiệu Suất** | Đánh giá theo quý, tự đánh giá, phản hồi quản lý |
| **Tuyển Dụng** | Đăng tin, quản lý ứng viên, phê duyệt |
| **Hợp Đồng** | Lưu trữ, cập nhật, xuất tài liệu |
| **Bảo Mật & Audit** | Lịch sử hoạt động, IP, thiết bị, trạng thái |

---

## 📱 Hướng Dẫn Tài Khoản Demo (Dành cho Hội Đồng Giám Khảo)

### 🌐 Địa Chỉ Truy Cập

Trang đăng nhập: http://localhost:5173/login hoặc: https://project-hrm-zeta.vercel.app/login

### 📌 Tài Khoản Admin (Quản Trị)
Email: lethanhhoa.quantrivien.2026@bigtech.com 
Mật khẩu: Hoa.admin@123

**Quyền truy cập**:
- Xem tất cả nhân viên, phòng ban, vị trí
- Quản lý khóa học & lộ trình
- Duyệt & cập nhật thăng tiến
- Quản lý chính sách công ty
- Xuất báo cáo, lương

### 👤 Tài Khoản Nhân Viên (Employee Portal)
Email: Dieukiet.nhanvien.2026@bigtech.com 
Mật khẩu: Dieukiet.nhanvien@123


**Quyền truy cập**:
- Xem profil cá nhân
- Xem lộ trình học tập được gán
- Nộp yêu cầu nghỉ phép
- Xem chấm công, bảng lương
- Theo dõi tiến độ khóa học
- Nộp đơn thăng tiến

### 🎬 Quick Test Flow cho Giám Khảo

1. **Đăng nhập Admin** → Đi đến `Quản Lý Đào Tạo` → Xem danh sách khóa học
2. **Đăng nhập Admin** → `Đề Xuất Thăng Tiến` → Xem các yêu cầu đang chờ duyệt
3. **Đăng nhập Employee** → `Lộ Trình Sự Nghiệp` → Xem các khóa học bắt buộc
4. **Đăng nhập Employee** → `Đơn Thăng Tiến` → Nộp đơn đề xuất thăng tiến

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### ✅ Yêu Cầu Hệ Thống
- **Node.js** ≥ v18.x
- **npm** ≥ v9.x (hoặc `yarn`)
- **MongoDB** (cục bộ hoặc Atlas cloud)
- **Git**

### 📥 Bước 1: Clone Repository


# Clone dự án từ GitHub
git clone https://github.com/lethanhhoacnttanm-ops/Project-HRM.git
cd Project-HRM

### ⚙️ Bước 2: Cài Đặt Dependencies
Backend:
- cd backend
- npm install

Frontend
- cd ../frontend
- npm install

### 🔧 Bước 3: Cấu Hình File .env
- Backend (backend/.env)

# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/project_hrm
# Hoặc local: mongodb://localhost:27017/project_hrm

# Authentication
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Client URL
CLIENT_URL=http://localhost:5173

# Email (Optional - nếu dùng email notification)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Google AI (Optional - nếu dùng chatbot)
GOOGLE_AI_API_KEY=your_google_ai_key


- Frontend (frontend/.env.local)

# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
# Hoặc production: https://your-backend-url.com/api/v1

# App Mode
VITE_MODE=development

### 🎯 Bước 4: Khởi Động Ứng Dụng

Option A: Chạy cả Frontend & Backend cùng lúc (từ thư mục gốc)

- npm run dev

Backend sẽ chạy tại: http://localhost:5000
Frontend sẽ chạy tại: http://localhost:5173

Option B: Chạy riêng lẻ

- Backend: 
cd backend
npm run dev
# Output: 🚀 Server đang chạy tại: http://localhost:5000

- Frontend (terminal khác):
cd frontend
npm run dev
# Output: VITE ... ready in ... ms
#         ➜  Local:   http://localhost:5173/

### 🔨 Bước 5: Cấu Hình Dữ Liệu Ban Đầu

Hệ thống sẽ tự động khởi tạo:

✅ Tài khoản Admin mặc định khi khởi động lần đầu
✅ Danh sách phòng ban, vị trí, khóa học
✅ Cấu hình hệ thống

# Nếu cần reset database
# Xóa tất cả collections trong MongoDB và khởi động lại server


### 🧪 Bước 6: Kiểm Tra Kết Nối

Mở browser: http://localhost:5173
Trang đăng nhập sẽ hiển thị ✅
Đăng nhập với tài khoản Admin đã cấu hình
Dashboard hiển thị khi đăng nhập thành công


### 📁 Cấu Trúc Thư Mục Dự Án

Project-HRM/
├── backend/
│   ├── models/              # Database schemas (Employee, Course, Promotion, ...)
│   ├── controllers/         # Business logic
│   ├── routers/            # API routes
│   ├── middleware/         # Auth, validation, error handling
│   ├── services/           # Business services
│   ├── repositories/       # Data access layer
│   ├── config/             # Database config
│   ├── seeds/              # Initial data seeding
│   ├── utils/              # Helpers (cron, validators)
│   ├── index.js            # Server entry point
│   ├── env.js              # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components (Admin, Employee)
│   │   ├── components/     # Reusable components
│   │   ├── layouts/        # Layout templates
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API integration
│   │   ├── context/        # React Context state
│   │   ├── utils/          # Helpers, validators
│   │   ├── config/         # App configuration
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js      # Vite configuration
│   └── package.json
│
├── package.json            # Root package (for running both)
└── README.md              # This file


### 🔗 API Endpoints Chính

# Authentication
POST   /api/v1/auth/register        # Đăng ký
POST   /api/v1/auth/login           # Đăng nhập
POST   /api/v1/auth/logout          # Đăng xuất
POST   /api/v1/auth/refresh-token   # Làm mới token
# Employee Management
GET    /api/v1/employees            # Danh sách nhân viên
GET    /api/v1/employees/:id        # Chi tiết nhân viên
POST   /api/v1/employees            # Tạo nhân viên
PUT    /api/v1/employees/:id        # Cập nhật nhân viên
DELETE /api/v1/employees/:id        # Xóa nhân viên
# Training & Courses
GET    /api/v1/courses              # Danh sách khóa học
GET    /api/v1/course-progress      # Tiến độ học tập
POST   /api/v1/course-progress      # Gán khóa học
PUT    /api/v1/course-progress/:id  # Cập nhật tiến độ
# Promotion
GET    /api/v1/promotions           # Danh sách đề xuất
POST   /api/v1/promotions           # Tạo đề xuất thăng tiến
PUT    /api/v1/promotions/:id       # Cập nhật trạng thái
# Payroll
GET    /api/v1/payroll              # Bảng lương
POST   /api/v1/payroll              # Tạo bảng lương
PUT    /api/v1/payroll/:id/lock     # Chốt lương


### 🧪 Testing & Build

# Development Mode
npm run dev
# Build for Production
npm run build
# Preview Production Build
cd frontend
npm run preview

### 🔐 Bảo Mật
✅ JWT Authentication - Token-based access
✅ Password Hashing - bcryptjs mã hóa
✅ CORS Protection - Chỉ allow origins được phép
✅ Rate Limiting - Giới hạn request
✅ Helmet Security - HTTP header protection
✅ Audit Logging - Ghi lại mọi hoạt động admin

### 📞 Support & Troubleshooting

Lỗi: Cannot connect to MongoDB
# Kiểm tra MONGODB_URL trong .env
# Chắc chắn MongoDB service đang chạy
# Hoặc sử dụng MongoDB Atlas cloud

Lỗi: Port 5000 hoặc 5173 đã sử dụng
# Backend - Thay đổi port trong .env
PORT=5001

# Frontend - Thay đổi trong vite.config.js

Lỗi: CORS origin not allowed
# Thêm origin vào allowedOrigins trong backend/index.js

Lỗi: Token hết hạn
# Tự động refresh token hoặc đăng nhập lại

### 👨‍💼 Tác Giả & Liên Hệ
Developer: Lê Thanh Hòa
GitHub: https://github.com/lethanhhoacnttanm-ops
Email: lethanhhoa.cntt.anm@gmail.com

Developer: Lương Diệu Kiệt
GitHub: https://github.com/dieukiet5944
Email: dieukiet1479@gmail.com


### 📄 License
ISC License - Tự do sử dụng cho mục đích giáo dục

### 🎓 Ghi Chú cho Hội Đồng Giám Khảo

✅ Hệ thống này cung cấp:

Giải pháp quản lý nhân sự toàn diện
Công nghệ hiện đại (React 19, Express, MongoDB)
Phân quyền rõ ràng (Admin/Employee)
Quy trình thăng tiến tự động
Lộ trình học tập có cấu trúc
Tracking tiến độ chi tiết
Bảo mật & Audit logging
✨ Dễ dàng trải nghiệm:

Clone repository
Cài đặt dependencies (npm install)
Cấu hình .env (MongoDB URL, JWT secret)
Chạy npm run dev
Mở http://localhost:5173 & đăng nhập
🎯 Test Scenarios:

Login/Logout
Xem lộ trình học tập
Nộp đơn thăng tiến
Duyệt yêu cầu (Admin)
Xuất báo cáo PDF
Cập nhật profile
