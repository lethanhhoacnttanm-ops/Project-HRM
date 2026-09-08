import { GoogleGenAI } from "@google/genai";
import EmployeeService from "../services/employee.service.js";
import ContractService from "../services/contract.service.js";

const ai = new GoogleGenAI();

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
                contextDescription = `Tổng số lượng nhân viên hiện tại trong hệ thống là: ${countResult.total || countResult}`;
            }
            else if (lowerMsg.includes('danh sách nhân viên') || lowerMsg.includes('xem nhân viên')) {
                const employees = await EmployeeService.getAllListEmployees();
                contextDescription = `Danh sách nhân viên hiện có: ${JSON.stringify(employees)}`;
            }
            else if (lowerMsg.includes('hợp đồng') || lowerMsg.includes('số lượng hợp đồng')) {
                const countResult = await ContractService.getContractCount();
                contextDescription = `Tổng số lượng hợp đồng hiện tại là: ${countResult.total || countResult}`;
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