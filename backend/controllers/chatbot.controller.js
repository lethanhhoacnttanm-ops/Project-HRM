import { GoogleGenAI } from "@google/genai";
import EmployeeService from "../services/employee.service.js";
import ContractService from "../services/contract.service.js";
import budgetService from "../services/budget.service.js";
import candidateService from "../services/candidate.service.js";
import supportService from "../services/support.service.js";
import performanceService from "../services/performance.service.js";

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
            description: 'Thống kê tổng quan tình trạng hợp đồng hiện tại: chính thức, thử việc, thời vụ và danh sách nhân sự mới chưa ký hợp đồng',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getPendingContractsForNewEmployees',
            description: 'Kiểm tra có bao nhiêu nhân sự mới gia nhập trong tháng này nhưng chưa có hợp đồng hoặc đang treo trạng thái chờ ký',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getPerformanceStatistics',
            description: 'Lấy thông tin đánh giá hiệu suất, phòng ban đạt điểm cao nhất và danh sách nhân sự bị tụt giảm KPI hoặc điểm số thấp',
            parameters: { type: 'OBJECT', properties: {} }
        },
        {
            name: 'getRecruitmentPipelineStats',
            description: 'Lấy số lượng và danh sách ứng viên ở các vòng tuyển dụng như phỏng vấn, hồ sơ mới, đánh giá để phân tích tiến độ tuyển dụng',
            parameters: { type: 'OBJECT', properties: {} }
        }
    ]
}];

class ChatbotAiController {

    async handleAIChatAgent(req, res) {
        try {
            const { message, pageContext } = req.body;

            const textMessage = typeof message === 'object' && message !== null
                ? (message.message || JSON.stringify(message))
                : String(message || '');

            const currentContext = pageContext || (typeof message === 'object' && message !== null ? message.pageContext : '');

            const initialResponse = await ai.models.generateContent({
                model: 'gemini-3.6-flash',
                contents: [{ role: 'user', parts: [{ text: textMessage }] }],
                config: {
                    tools: hrmTools,
                }
            });

            const functionCalls = initialResponse.functionCalls;

            if (functionCalls && functionCalls.length > 0) {
                const call = functionCalls[0];
                const fnName = call.name;
                const fnArgs = call.args || {};

                let apiResult = null;

                switch (fnName) {
                    case 'getAllListEmployees':
                        apiResult = await EmployeeService.getAllListEmployees();
                        break;
                    case 'getEmployeeCount':
                        apiResult = await EmployeeService.getEmployeeCount();
                        break;
                    case 'getListContracts':
                        apiResult = await ContractService.getListContracts();
                        break;
                    case 'getContractCount':
                        apiResult = await ContractService.getContractCount();
                        break;
                    case 'getEmployeesByDepartment':
                        apiResult = await EmployeeService.getEmployeesByDepartment(fnArgs.departmentName);
                        break;
                    case 'getNewEmployeesThisMonth':
                        apiResult = await EmployeeService.getNewEmployeesThisMonth();
                        break;
                    case 'getRealtimeBudgetStats':
                        apiResult = await budgetService.getRealtimeStats();
                        break;
                    case 'getCandidatesByStage': {
                        const targetStage = fnArgs.stage || 'interview';
                        const candidatesRes = await candidateService.getAllCandidatesWithoutPagination().catch(() => ({ dataCandidates: [] }));
                        const candidates = candidatesRes?.dataCandidates || [];
                        const filteredCandidates = candidates.filter(c => c.stage === targetStage);
                        apiResult = { stage: targetStage, totalCount: filteredCandidates.length, candidates: filteredCandidates };
                        break;
                    }
                    case 'getPendingSupportTickets': {
                        const ticketsRes = await supportService.getAllTicketsWithoutPagination().catch(() => ({ dataTickets: [] }));
                        const tickets = ticketsRes?.dataTickets || [];
                        const pendingTickets = tickets.filter(t => t.status === 'Mở' || t.status === 'pending' || t.status === 'Open');
                        apiResult = { totalPending: pendingTickets.length, tickets: pendingTickets };
                        break;
                    }
                    case 'getContractTypeStatistics':
                        apiResult = await ContractService.getContractTypeStatistics();
                        break;
                    case 'getPendingContractsForNewEmployees':
                        apiResult = await ContractService.getPendingContractsForNewEmployees();
                        break;
                    case 'getPerformanceStatistics':
                        apiResult = await performanceService.getPerformanceStats();
                        break;
                    case 'getContractTypeStatistics':
                        apiResult = await ContractService.getContractTypeStatistics();
                        break;
                    case 'getRecruitmentPipelineStats':
                        const candidatesRes = await candidateService.getAllCandidatesWithoutPagination().catch(() => ({ dataCandidates: [] }));
                        apiResult = { totalCandidates: candidatesRes?.dataCandidates?.length || 0, candidates: candidatesRes?.dataCandidates || [] };
                        break;
                    default:
                        apiResult = { error: "Không tìm thấy chức năng tương ứng" };
                }

                const finalResponse = await ai.models.generateContent({
                    model: 'gemini-3.6-flash',
                    contents: [
                        { role: 'user', parts: [{ text: textMessage }] },
                        ...initialResponse.candidates.map(c => c.content),
                        {
                            role: 'user',
                            parts: [{
                                functionResponse: {
                                    name: fnName,
                                    response: { result: apiResult }
                                }
                            }]
                        }
                    ]
                });

                return res.status(200).json({ reply: finalResponse.text });

                const fallbackResponse = await ai.models.generateContent({
                    model: 'gemini-3.6-flash',
                    contents: [{ role: 'user', parts: [{ text: textMessage + " (Hãy trả lời ngắn gọn, chuyên nghiệp bằng tiếng Việt dựa trên hệ thống quản trị nhân sự HRM)" }] }]
                });

                return res.status(200).json({ reply: fallbackResponse.text || "Hệ thống hiện tại chưa ghi nhận dữ liệu phù hợp với yêu cầu này." });
            }

            return res.status(200).json({ reply: initialResponse.text });

        } catch (error) {
            console.error('Lỗi chi tiết tại AI Agent:', error);
            return res.status(500).json({ reply: 'Hệ thống AI đang gặp sự cố nhỏ: ' + (error.message || 'Lỗi không xác định') });
        }
    }
}

export default new ChatbotAiController();