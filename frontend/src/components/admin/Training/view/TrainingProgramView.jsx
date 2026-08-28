import React, { useState } from "react";
import { 
  ClipboardList, 
  BookOpen, 
  CheckCircle2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  ShieldCheck, 
  Briefcase, 
  Layout, 
  ServerCog,
  Kanban,
  CloudCog
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TRAINING_PROGRAMS_DATA = [
  {
    id: "prog-1",
    department: "Software Development",
    deptIcon: Code2,
    position: "Frontend Web/App Developer",
    levels: [
      {
        levelName: "Intern",
        duration: "1 - 2 tháng",
        courses: ["HTML5, CSS3 & Modern JavaScript (ES6+)", "Git & GitHub cơ bản", "ReactJS Fundamentals"],
        output: "Dựng chuẩn giao diện tĩnh từ Figma, biết dùng Git quản lý mã nguồn."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["Tailwind CSS / Ant Design", "React Hooks nâng cao", "RESTful API Integration & Axios"],
        output: "Code hoàn chỉnh module CRUD đơn giản, gọi API mượt mà."
      },
      {
        levelName: "Junior",
        duration: "6 - 12 tháng",
        courses: ["React Performance Optimization", "TypeScript with React", "Clean Code & Unit Testing (Jest)"],
        output: "Nhận task độc lập, viết code sạch, tự test kỹ trước khi bàn giao."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Next.js / Server-Side Rendering (SSR)", "Design Patterns in Frontend", "Agile/Scrum for Developers"],
        output: "Xử lý bài toán hiệu năng phức tạp, review code cho cấp dưới."
      }
    ]
  },
  {
    id: "prog-2",
    department: "Software Development",
    deptIcon: ServerCog,
    position: "Backend Web/App Developer",
    levels: [
      {
        levelName: "Intern",
        duration: "1 - 2 tháng",
        courses: ["Node.js / ExpressJS cơ bản", "TypeScript nền tảng", "MongoDB / PostgreSQL cơ bản"],
        output: "Tạo HTTP Server đơn giản, kết nối database và thao tác CRUD."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["RESTful API Best Practices", "Authentication & Authorization (JWT)", "Database Indexing"],
        output: "Xây dựng API bảo mật, phân quyền rõ ràng, tối ưu query."
      },
      {
        levelName: "Junior",
        duration: "6 - 12 tháng",
        courses: ["Node.js Advanced Architecture", "Error Handling & Logging", "Docker cơ bản cho Developer"],
        output: "Thiết kế cấu trúc backend chuẩn, đóng gói ứng dụng qua Docker."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Microservices Architecture", "Caching với Redis & Message Queues", "System Design Fundamentals"],
        output: "Thiết kế hệ thống chịu tải tốt, giải quyết bài toán dữ liệu lớn."
      }
    ]
  },
  {
    id: "prog-3",
    department: "QA/QC",
    deptIcon: ShieldCheck,
    position: "Manual & Automation Tester",
    levels: [
      {
        levelName: "Intern",
        duration: "1 tháng",
        courses: ["Software Testing Fundamentals", "Viết Test Case cơ bản", "Quy trình kiểm thử Agile"],
        output: "Đọc đặc tả yêu cầu (SRS) viết test case kiểm tra lỗi cơ bản."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["API Testing with Postman", "Bug Tracking tools (Jira)", "Mobile App Testing basics"],
        output: "Test độc lập tính năng, sử dụng Postman kiểm tra luồng API."
      },
      {
        levelName: "Junior",
        duration: "6 tháng",
        courses: ["Selenium WebDriver / Playwright", "Cypress cho Web Automation"],
        output: "Viết kịch bản kiểm thử tự động cho các luồng lặp đi lặp lại."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Performance Testing (JMeter)", "CI/CD Integration for Testing"],
        output: "Tự xây dựng khung kiểm thử tự động, đánh giá tải hệ thống."
      }
    ]
  },
  {
    id: "prog-4",
    department: "Business Analysis & Product",
    deptIcon: Briefcase,
    position: "Business Analyst (BA)",
    levels: [
      {
        levelName: "Intern",
        duration: "1 - 2 tháng",
        courses: ["Business Analysis Fundamentals", "Use Case & User Story Writing", "UML Diagrams cơ bản"],
        output: "Vẽ biểu đồ quy trình và viết tài liệu yêu cầu nghiệp vụ (BRD/SRS)."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["Agile & Scrum Framework", "Wireframing với Figma", "Quản lý Backlog trên Jira"],
        output: "Bóc tách yêu cầu thành User Story chi tiết, làm việc mượt với dev."
      },
      {
        levelName: "Junior",
        duration: "6 - 12 tháng",
        courses: ["Advanced Requirement Elicitation", "API Documentation (Swagger)", "Scope Management"],
        output: "Xử lý tốt khi khách hàng thay đổi yêu cầu, đàm phán tiến độ."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Product Strategy & Roadmap", "Stakeholder Management", "Agile Project Management"],
        output: "Chủ trì họp với khách hàng lớn, quản lý trọn gói dự án outsourcing."
      }
    ]
  },
  {
    id: "prog-5",
    department: "UI/UX Design",
    deptIcon: Layout,
    position: "UI/UX Designer",
    levels: [
      {
        levelName: "Intern",
        duration: "1 - 2 tháng",
        courses: ["Figma Masterclass", "UI Principles", "Typography & Color Theory"],
        output: "Sử dụng thành thạo Figma dựng màn hình theo mẫu."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["Responsive Web & Mobile Design", "Design Systems cơ bản", "UX Research"],
        output: "Thiết kế hoàn thiện giao diện tuân thủ chuẩn UX, bàn giao cho Dev."
      },
      {
        levelName: "Junior",
        duration: "6 - 12 tháng",
        courses: ["Advanced UX Wireframing", "User Persona & Journey Mapping", "Usability Testing"],
        output: "Tổ chức nghiên cứu hành vi người dùng, tối ưu trải nghiệm thực tế."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Design Systems Architecture", "UX Writing", "Design Leadership & Presentation"],
        output: "Xây dựng hệ thống Design System chuẩn hóa, bảo vệ phương án thiết kế."
      }
    ]
  },
  {
    id: "prog-6",
    department: "DevOps & System",
    deptIcon: CloudCog, 
    position: "DevOps Engineer / System Admin",
    levels: [
      {
        levelName: "Intern",
        duration: "1 - 2 tháng",
        courses: ["Linux & Shell Scripting cơ bản", "Networking Fundamentals (TCP/IP, DNS)", "Git & Version Control"],
        output: "Thao tác mượt mà trên môi trường Linux, hiểu cách cấu hình mạng cơ bản."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["Docker & Containerization", "CI/CD Pipeline cơ bản (GitHub Actions / GitLab CI)", "Nginx / Apache Web Server"],
        output: "Đóng gói ứng dụng qua Docker, thiết lập các pipeline build/deploy tự động đơn giản."
      },
      {
        levelName: "Junior",
        duration: "6 - 12 tháng",
        courses: ["Kubernetes (K8s) Fundamentals", "Cloud Providers (AWS / GCP / Azure)", "Infrastructure as Code (Terraform cơ bản)"],
        output: "Quản trị cụm k8s, dựng hạ tầng cloud tự động hóa bằng code."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Advanced Kubernetes & Helm", "Monitoring & Logging (Prometheus, Grafana, ELK)", "System Security & Disaster Recovery"],
        output: "Vận hành hệ thống lớn chịu tải cao, thiết lập hệ thống cảnh báo và bảo mật tự động."
      }
    ]
  },
  {
    id: "prog-7",
    department: "Project Management Office(PMO)/Project Management(PM)",
    deptIcon: Kanban, 
    position: "Project Manager / Scrum Master",
    levels: [
      {
        levelName: "Intern",
        duration: "1 - 2 tháng",
        courses: ["Agile & Scrum Framework căn bản", "Jira & Confluence Management", "Quy trình phát triển phần mềm (SDLC)"],
        output: "Hiểu rõ vận hành Scrum, quản lý task và cập nhật tiến độ trên Jira."
      },
      {
        levelName: "Fresher",
        duration: "2 - 3 tháng",
        courses: ["Risk Management cơ bản", "Stakeholder Communication", "Estimation Techniques (Planning Poker, Story Points)"],
        output: "Tổ chức các buổi Daily Standup, hỗ trợ PMO theo dõi tiến độ dự án outsourcing."
      },
      {
        levelName: "Junior",
        duration: "6 - 12 tháng",
        courses: ["Resource & Budget Planning", "Advanced Conflict Resolution", "Contract & Vendor Management"],
        output: "Chủ động điều phối nguồn lực dev/test, xử lý các điểm nghẽn phát sinh trong sprint."
      },
      {
        levelName: "Middle",
        duration: "Trên 1 năm",
        courses: ["Strategic Portfolio Management", "Enterprise Agile Transformation", "Leadership & Negotiation Skills"],
        output: "Quản trị danh mục dự án lớn, đàm phán scope và tối ưu hóa biên độ lợi nhuận với khách hàng."
      }
    ]
  }
];

export default function TrainingProgramView({ onOpenModal }) {
  const [selectedDept, setSelectedDept] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredPrograms = selectedDept === "All" 
    ? TRAINING_PROGRAMS_DATA 
    : TRAINING_PROGRAMS_DATA.filter(p => p.department === selectedDept);

  const departments = ["All", "Software Development", "QA/QC", "Business Analysis & Product", "UI/UX Design", "DevOps & System", "Project Management Office(PMO) / Project Management(PM)"];

  const handleDeptChange = (dept) => {
    setSelectedDept(dept);
    setCurrentIndex(0);
  };

  const handleNavigation = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === "next") {
        setCurrentIndex((prev) => (prev < filteredPrograms.length - 1 ? prev + 1 : 0));
      } else {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredPrograms.length - 1));
      }
      setIsAnimating(false);
    }, 200); 
  };

  const currentProgram = filteredPrograms[currentIndex] || filteredPrograms[0];
  const IconComponent = currentProgram?.deptIcon || Code2;

  return (
    <div className="space-y-6 my-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Chương trình Đào tạo & Phát triển (Learning Paths)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Hệ thống lộ trình chuẩn hóa theo Phòng ban, Vị trí và Cấp bậc từ Intern đến Middle.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onOpenModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thiết lập chương trình mới
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => handleDeptChange(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedDept === dept
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {dept === "All" ? "Tất cả phòng ban" : dept}
          </button>
        ))}
      </div>

      {filteredPrograms.length > 0 ? (
        <div className="relative group">
          <button 
            onClick={() => handleNavigation("prev")}
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer shadow-lg"
            title="Vị trí trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button 
            onClick={() => handleNavigation("next")}
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer shadow-lg"
            title="Vị trí tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6 transition-all duration-300 transform ${
            isAnimating ? "opacity-0 translate-y-2 scale-[0.99]" : "opacity-100 translate-y-0 scale-100"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {currentProgram.department}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    {currentProgram.position}
                  </h4>
                </div>
              </div>

              <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                Vị trí: <span className="text-slate-800 font-bold">{currentIndex + 1} / {filteredPrograms.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentProgram.levels.map((lvl, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-xs text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                        {lvl.levelName}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        ⏱ {lvl.duration}
                      </span>
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-indigo-500" /> Khóa học bắt buộc:
                      </p>
                      <ul className="space-y-1">
                        {lvl.courses.map((course, cIdx) => (
                          <li key={cIdx} className="text-xs text-slate-700 font-medium flex items-start gap-1.5 bg-white p-2 rounded-lg border border-slate-100 shadow-3xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span className="line-clamp-2">{course}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 mt-auto">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Chuẩn đầu ra:
                    </p>
                    <p className="text-[11px] text-slate-600 leading-snug font-medium italic">
                      "{lvl.output}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-slate-100 rounded-2xl">
          <p className="text-xs text-slate-500 font-medium">Không tìm thấy lộ trình nào cho phòng ban này.</p>
        </div>
      )}
    </div>
  );
}