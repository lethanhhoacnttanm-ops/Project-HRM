import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { aiService } from '@/services/ai.service.js';

const EmployeeAiChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Xin chào! Tôi là trợ lý HR. Bạn có thể hỏi về chấm công, lương, nghỉ phép, đánh giá của bạn.',
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      const now = new Date();
      const res = await aiService.assist({
        mode: 'qa',
        message: text,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      });

      const answer = res?.data?.answer || res?.answer || 'Không nhận được câu trả lời.';
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      const msg = error.customMessage || error.message || 'Lỗi khi gọi AI';
      toast.error('AI tạm thời không phản hồi', { description: msg });
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Xin lỗi, hiện tôi không trả lời được. Vui lòng thử lại sau.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Nút mở chat */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 transition-colors"
          aria-label="Mở trợ lý AI"
        >
          <MessageCircle className="size-6" />
        </button>
      )}

      {/* Panel chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-violet-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5" />
              <div>
                <p className="text-sm font-semibold">Trợ lý HR AI</p>
                <p className="text-[11px] text-violet-100">Hỏi về thông tin của bạn</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 hover:bg-violet-500"
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-violet-600 text-white rounded-br-md'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                  <Loader2 className="size-4 animate-spin" />
                  Đang trả lời...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="VD: Lương gần nhất của tôi?"
                disabled={loading}
                className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EmployeeAiChat;