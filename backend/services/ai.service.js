import { GoogleGenerativeAI } from '@google/generative-ai';
import reportService from './report.service.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AiService {
  async callLLM(prompt) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Thiếu GEMINI_API_KEY trong .env');
    }

    const modelName = process.env.AI_MODEL || 'gemini-2.5-flash';
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || '';

    if (!text.trim()) {
      throw new Error('Gemini không trả về nội dung');
    }

    return text.trim();
  }

  /**
   * Task 2 – Context loader
   * Chỉ lấy data của employeeId (từ JWT), không lấy user khác
   */
  async loadContext(employeeId, { month, year } = {}) {
    const report = await reportService.getMyReport(employeeId, {
      month,
      year,
    });

    return {
      generatedAt: new Date().toISOString(),
      report,
    };
  }

  /**
   * Task 3 – Summarize
   */
  async summarize(employeeId, { month, year } = {}) {
    const context = await this.loadContext(employeeId, { month, year });

    const prompt = `Bạn là trợ lý HR nội bộ của công ty.
Nhiệm vụ: viết bản tóm tắt báo cáo cá nhân ngắn gọn bằng tiếng Việt (3–6 câu).

QUY TẮC BẮT BUỘC:
- CHỈ được dùng số liệu trong CONTEXT bên dưới.
- KHÔNG bịa số, không suy đoán dữ liệu không có.
- Nếu thiếu mục nào, nói rõ "chưa có dữ liệu".
- Không đưa lời khuyên pháp lý / y tế.
- Giọng văn trung lập, dễ hiểu.

CONTEXT (JSON):
${JSON.stringify(context.report, null, 2)}

Hãy viết bản tóm tắt.`;

    const answer = await this.callLLM(prompt);

    return {
      mode: 'summarize',
      answer,
      period: context.report?.period || { month, year },
    };
  }

  async assist(userId, payload = {}) {
    const { mode = 'ping', message, month, year } = payload;

    if (mode === 'ping') {
      const prompt = `Bạn là trợ lý HR nội bộ. Trả lời ngắn bằng tiếng Việt.
Người dùng nói: ${message || 'Xin chào, hãy xác nhận bạn đang hoạt động.'}`;
      const answer = await this.callLLM(prompt);
      return { mode: 'ping', answer, meta: { userId } };
    }

    if (mode === 'summarize') {
      return await this.summarize(userId, { month, year });
    }

    throw new Error(`Mode chưa hỗ trợ: ${mode}`);
  }
}

export default new AiService();