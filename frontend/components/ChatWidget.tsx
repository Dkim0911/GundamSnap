"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const catAvatar = "https://gundamsnap.s3.us-east-1.amazonaws.com/Shippo/KakaoTalk_20251216_232217412.jpg";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize with the current language greeting
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: t.greeting }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // NEW: Update greeting if language changes
  // (Only updates if the user hasn't started chatting yet)
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "ai") {
      setMessages([{ role: "ai", text: t.greeting }]);
    }
  }, [t.greeting]); // Runs whenever the translation changes

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true); 

    try {
      const response = await fetch("api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(errorData.detail || "Server Connection Failed");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "ai", text: "Meow! 😿 I couldn't reach my brain. Please check the backend terminal for errors." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white pl-2 pr-4 md:pr-6 py-2 rounded-full flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-2xl hover:scale-105 hover:border-white/30 group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-400 overflow-hidden border-2 border-white/20 relative">
               <img src={catAvatar} alt="Shippo" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
            </div>
            <div className="flex flex-col items-start text-left">
               <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">AI Assistant</span>
               <span className="text-xs md:text-sm font-semibold">{t.askShippo} 🐾</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-[90vw] md:w-[400px] h-[50dvh] md:h-[500px] bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-4 border-b border-white/5 bg-neutral-800/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-400 overflow-hidden">
                   <img src={catAvatar} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Shippo 🐈</h3>
                  <p className="text-neutral-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MESSAGES AREA */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-br-none' 
                      : 'bg-neutral-800 text-neutral-200 rounded-bl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 rounded-2xl rounded-bl-none px-4 py-3 border border-white/5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT AREA */}
            <div className="p-4 bg-neutral-900 border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pricing..."
                  className="flex-1 bg-neutral-800 text-white text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-neutral-500"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-white text-black p-3 rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}