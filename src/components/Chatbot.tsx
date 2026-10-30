import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "You are the digital assistant for Legacy Digital, a premier digital agency for industry leaders. Your tone is professional, sophisticated, and helpful. You help potential clients understand Legacy Digital's services: digital authority building, executive LinkedIn optimization, and bespoke web development. If asked about pricing or specific project details, encourage them to use the contact form on the site to book a confidential consultation. Keep responses concise and elegant.",
        }
      });

      const modelResponse = response.text || "I apologize, I'm having trouble connecting right now. Please try again or use our contact form.";
      setMessages(prev => [...prev, { role: 'model', text: modelResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-brand-ink/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-ink text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-accent rounded-full overflow-hidden flex items-center justify-center border border-white/20">
                  <img 
                    src="https://picsum.photos/seed/legacy-avatar/100/100" 
                    alt="Legacy Assistant" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-medium">Legacy Assistant</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[#F9F8F6]"
            >
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-brand-ink/40 italic font-serif">How can Legacy Digital assist your digital evolution today?</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-accent text-white rounded-tr-none' 
                      : 'bg-white text-brand-ink border border-brand-ink/5 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-brand-ink/5 shadow-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-accent" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-brand-ink/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full pl-4 pr-12 py-3 bg-[#F5F2ED] rounded-xl text-sm outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-ink text-white rounded-lg flex items-center justify-center hover:bg-brand-accent transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? 'bg-white text-brand-ink rotate-90' : 'bg-brand-ink text-white hover:bg-brand-accent'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Chatbot;
