import aiService from '../services/ai.service.js';

class AiController {
  async assist(req, res) {
    try {
      const userId = req.user.id; // từ JWT middleware
      const { mode, message, month, year, formType, draftPayload } = req.body;

      const data = await aiService.assist(userId, {
        mode,
        message,
        month,
        year,
        formType,
        draftPayload,
      });

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error('[AI]', error.message);
      return res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi gọi AI',
      });
    }
  }
}

export default new AiController();