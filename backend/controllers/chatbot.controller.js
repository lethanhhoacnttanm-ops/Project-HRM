import { GoogleGenAI } from "@google/genai";
import EmployeeService from "../services/employee.service.js";
import ContractService from "../services/contract.service.js";
import budgetService from "../services/budget.service.js";
import candidateService from "../services/candidate.service.js";
import supportService from "../services/support.service.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const hrmTools = [{
    functionDeclarations: [
        {
            name: 'getAllListEmployees',
            description: 'Lấy toàn bộ danh sách chi tiết nhân viên',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getEmployeeCount',
            description: 'Lấy tổng số lượng nhân viên hiện có trong hệ thống',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getListContracts',
            description: 'Lấy danh sách tất cả các hợp đồng lao động',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getContractCount',
            description: 'Lấy tổng số lượng hợp đồng lao động trong hệ thống',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getEmployeesByDepartment',
            description: 'Lấy danh sách nhân viên thuộc một phòng ban cụ thể',
            parameters: {
                type: 'OBJECT',
                properties: {
                    departmentName: {
                        type: 'STRING',
                        description: 'Tên phòng ban cần lọc, ví dụ: "Kỹ thuật", "IT", "HR", "Marketing"'
                    }
                },
                required: ['departmentName']
            }
        },
        {
            name: 'getNewEmployeesThisMonth',
            description: 'Lấy danh sách hoặc số lượng nhân viên mới gia nhập trong tháng này',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getRealtimeBudgetStats',
            description: 'Lấy thông tin tổng ngân sách quỹ lương và chi phí thực tế đã chi trong tháng hiện tại',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getCandidatesByStage',
            description: 'Lấy danh sách hoặc số lượng ứng viên đang ở một giai đoạn tuyển dụng cụ thể (ví dụ: vòng phỏng vấn, hồ sơ mới, đánh giá, trúng tuyển)',
            parameters: {
                type: 'OBJECT',
                properties: {
                    stage: {
                        type: 'STRING',
                        description: 'Giai đoạn tuyển dụng cần lọc, ví dụ: "interview" (phỏng vấn), "new" (hồ sơ mới), "evaluating" (đánh giá), "offered" (trúng tuyển)'
                    }
                },
                required: ['stage']
            }
        },
        {
            name: 'getPendingSupportTickets',
            description: 'Lấy danh sách hoặc số lượng các yêu cầu hỗ trợ (tickets) từ nhân viên đang ở trạng thái mở hoặc chưa được giải quyết',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getContractTypeStatistics',
            description: 'Thống kê tổng quan tình trạng hợp đồng hiện tại: bao nhiêu hợp đồng chính thức, thử việc và thời vụ',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getPendingContractsForNewEmployees',
            description: 'Kiểm tra có bao nhiêu nhân sự mới gia nhập trong tháng này nhưng chưa có hợp đồng hoặc đang treo trạng thái chờ ký',
            parameters: { type: 'OBJECT', properties: {} }
        }
    ]
}];

class ChatbotAiController {

    async handleAIChatAgent(req, res) {
        try {
            const { message } = req.body;
            const lowerMsg = message.toLowerCase();
            let contextDescription = "";

            if (lowerMsg.includes('bao nhiêu nhân viên') || lowerMsg.includes('số lượng nhân viên') || lowerMsg.includes('tổng nhân viên')) {
                const countResult = await EmployeeService.getEmployeeCount();
                const total = countResult?.total !== undefined ? countResult.total : countResult;
                contextDescription = `Tổng số lượng nhân viên hiện tại trong hệ thống là: ${total}`;
            }
            else if (lowerMsg.includes('danh sách nhân viên') || lowerMsg.includes('xem nhân viên')) {
                const employees = await EmployeeService.getAllListEmployees();
                contextDescription = `Danh sách nhân viên hiện có: ${JSON.stringify(employees)}`;
            }
            else if (lowerMsg.includes('hợp đồng') || lowerMsg.includes('số lượng hợp đồng')) {
                const countResult = await ContractService.getContractCount();
                const total = countResult?.total !== undefined ? countResult.total : countResult;
                contextDescription = `Tổng số lượng hợp đồng hiện tại là: ${total}`;
            }
            else if (lowerMsg.includes('nhân viên mới') || (lowerMsg.includes('mới gia nhập') && lowerMsg.includes('tháng này'))) {
                const newEmployees = await EmployeeService.getNewEmployeesThisMonth();
                contextDescription = `Số lượng nhân viên mới gia nhập trong tháng này là: ${newEmployees.length} người. Chi tiết: ${JSON.stringify(newEmployees)}`;
            }
            else if (lowerMsg.includes('Software Development') || lowerMsg.includes('UX/UI Designer') || lowerMsg.includes('QA/QC') || lowerMsg.includes('Business Analysis & Product') || lowerMsg.includes('DevOps & System') || lowerMsg.includes('PMO/PM')) {
                const keyword = lowerMsg.includes('Software Development') ? 'UX/UI Designer' : 'QA/QC' ? 'Business Analysis & Product' : 'DevOps & System' ? 'PMO/PM' : 'none';
                const employees = await EmployeeService.getEmployeesByDepartment(keyword);
                contextDescription = `Danh sách nhân viên thuộc phòng ban ${keyword}: ${JSON.stringify(employees)}`;
            }
            else if (fnName === 'getRealtimeBudgetStats') {
                const budgetStats = await budgetService.getRealtimeStats();
                apiResult = JSON.stringify(budgetStats);
            }
            else if (fnName === 'getCandidatesByStage') {
                const targetStage = fnArgs.stage || 'interview';

                const candidatesRes = await candidateService.getAllCandidatesWithoutPagination().catch(() => ({ dataCandidates: [] }));
                const candidates = candidatesRes?.dataCandidates || [];

                const filteredCandidates = candidates.filter(c => c.stage === targetStage);

                apiResult = JSON.stringify({
                    stage: targetStage,
                    totalCount: filteredCandidates.length,
                    candidates: filteredCandidates
                });
            }
            else if (fnName === 'getPendingSupportTickets') {
                const ticketsRes = await supportService.getAllTicketsWithoutPagination().catch(() => ({ dataTickets: [] }));
                const tickets = ticketsRes?.dataTickets || [];

                const pendingTickets = tickets.filter(t => t.status === 'Mở' || t.status === 'pending' || t.status === 'Open');

                apiResult = JSON.stringify({
                    totalPending: pendingTickets.length,
                    tickets: pendingTickets
                });
            }
            else if (fnName === 'getContractTypeStatistics') {
                const stats = await ContractService.getContractTypeStatistics();
                apiResult = JSON.stringify(stats);
            }
            else if (fnName === 'getPendingContractsForNewEmployees') {
                const pendingData = await ContractService.getPendingContractsForNewEmployees();
                apiResult = JSON.stringify(pendingData);
            }

            if (contextDescription) {
                const response = await ai.models.generateContent({
                    model: 'gemini-3.6-flash',
                    contents: [{
                        role: 'user',
                        parts: [{
                            text: `Dựa vào dữ liệu hệ thống HRM sau: "${contextDescription}". Hãy trả lời câu hỏi của người dùng một cách ngắn gọn, lịch sự và thân thiện: "${message}"`
                        }]
                    }]
                });
                return res.status(200).json({ reply: response.text });
            }

            const normalResponse = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: [{ role: 'user', parts: [{ text: message }] }]
            });

            return res.status(200).json({ reply: normalResponse.text });

        } catch (error) {
            console.error('Lỗi AI Agent:', error);
            return res.status(500).json({ reply: 'Hệ thống AI đang gặp sự cố nhỏ.' });
        }
    }
}


export default new ChatbotAiController();