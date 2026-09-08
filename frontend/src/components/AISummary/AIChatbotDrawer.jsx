import React, { useState } from 'react';
import { Drawer, Button, Input } from 'antd';
import { RobotOutlined, SendOutlined } from '@ant-design/icons';
import { Bot, Send, Sparkles, Search } from 'lucide-react';
import { aiService } from '@/services/ai.service';

export default function AIChatbotDrawer() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Xin chào! Tôi là trợ lý AI HRM. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState({
    text: 'AI đang phân tích yêu cầu...',
    icon: <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
  });

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    
    const userMsg = inputVal;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setLoading(true);
    setLoadingState({
      text: 'AI đang phân tích yêu cầu...',
      icon: <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
    });

    const timer = setTimeout(() => {
      setLoadingState({
        text: 'Đang truy vấn dữ liệu từ hệ thống HRM...',
        icon: <Search className="w-4 h-4 animate-bounce text-indigo-600" />
      });
    }, 3000);

    try {
      const responseData = await aiService.sendMessage(userMsg);

      console.log("Response từ API:", responseData);
      
      const botReply = 
        responseData?.reply || 
        responseData?.data?.reply || 
        responseData?.message || 
        (typeof responseData === 'string' ? responseData : null) || 
        JSON.stringify(responseData);
      
      setMessages(prev => [...prev, { sender: 'ai', text: typeof botReply === 'string' ? botReply : JSON.stringify(botReply) }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Lỗi kết nối tới server AI.' }]);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<RobotOutlined style={{ fontSize: '24px' }} />}
          onClick={() => setVisible(true)}
          className="shadow-xl bg-indigo-600 hover:bg-indigo-700 w-14 h-14 flex items-center justify-center"
        />
      </div>

      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span>HRM AI Copilot</span>
          </div>
        }
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={400}
        styles={{ body: { display: 'flex', flexDirection: 'column', padding: '16px' } }}
      >
        <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-indigo-600 text-xs italic animate-pulse flex items-center gap-1">
              {loadingState.icon}
              {loadingState.text}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Hỏi AI về nhân sự, báo cáo..."
            disabled={loading}
          />
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={handleSend} 
            className="bg-indigo-600" 
            loading={loading}
          />
        </div>
      </Drawer>
    </>
  );
}