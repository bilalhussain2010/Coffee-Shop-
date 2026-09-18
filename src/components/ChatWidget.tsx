"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, RefreshCw, Coffee, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/config/menu";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionCard?: {
    itemId: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export const ChatWidget: React.FC = () => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize persistent Session ID and initial greeting
  useEffect(() => {
    let sid = localStorage.getItem("coffee_chat_session_id");
    if (!sid) {
      sid = `cafe_sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem("coffee_chat_session_id", sid);
    }
    setSessionId(sid);

    // Initial Welcome Message
    const welcomeMsg: ChatMessage = {
      id: "msg_welcome",
      sender: "assistant",
      text: "👋 Welcome to Velvet & Bean! I'm your AI Barista assistant. Ask me about today's specialty roasts, dietary options, store hours, or place an order ahead!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      quickReplies: ["Recommend a Drink", "Store Hours & Location", "Dietary Options", "Cafe Automation B2B"],
    };
    setMessages([welcomeMsg]);
  }, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: query,
          message: query,
          sessionId,
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `msg_ast_${Date.now()}`,
        sender: "assistant",
        text: data.output || "I'm here to help you order coffee!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: data.quickReplies || [],
        actionCard: data.actionCard || undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          sender: "assistant",
          text: "☕ Sorry, I had a slight brewing hiccup. Please ask again or check our full menu!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          quickReplies: ["View Full Menu", "Store Hours"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetSession = () => {
    const newSid = `cafe_sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem("coffee_chat_session_id", newSid);
    setSessionId(newSid);
    setMessages([
      {
        id: `msg_welcome_${Date.now()}`,
        sender: "assistant",
        text: "☕ Session refreshed! What drink can I craft or recommend for you next?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        quickReplies: ["Recommend a Drink", "Artisan Iced Latte", "Fresh Pastries"],
      },
    ]);
  };

  const handleQuickAddFromCard = (itemId: string) => {
    const found = MENU_ITEMS.find((i) => i.id === itemId) || MENU_ITEMS[0];
    addToCart(found);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[92vw] sm:w-[390px] h-[540px] rounded-3xl glass-panel border border-brand-border bg-brand-surface shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Widget Header */}
            <div className="p-4 border-b border-brand-border/60 bg-gradient-to-r from-brand-card to-brand-surface flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-bold shadow-md shadow-brand-primary/30">
                    <Coffee size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-brand-surface" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Barista AI Assistant <Sparkles size={12} className="text-brand-accent animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-brand-muted">n8n Connected • 24/7 Support</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetSession}
                  title="Reset Chat Session"
                  className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-brand-card transition-colors"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-brand-card transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Widget Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-primary text-white rounded-br-none font-medium"
                        : "bg-brand-card border border-brand-border/60 text-brand-text rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Action Card (Product Recommendation) */}
                    {msg.actionCard && (
                      <div className="mt-3 p-3 rounded-xl bg-brand-surface border border-brand-primary/30 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={msg.actionCard.image}
                              alt={msg.actionCard.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-white truncate">{msg.actionCard.name}</h5>
                            <span className="font-bold text-brand-primary">${msg.actionCard.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleQuickAddFromCard(msg.actionCard!.itemId)}
                          className="w-full py-1.5 px-3 rounded-lg bg-brand-primary text-white font-bold text-[11px] hover:bg-brand-primary-hover transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag size={12} /> Add to Order
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-brand-muted mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Dynamic Quick Reply Action Buttons */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && msg.id === messages[messages.length - 1]?.id && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSendMessage(reply)}
                          className="px-3 py-1.5 rounded-xl bg-brand-primary/10 border border-brand-primary/30 text-brand-accent hover:bg-brand-primary/20 hover:border-brand-primary text-[11px] font-semibold transition-all"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-brand-card border border-brand-border/60 text-brand-muted text-xs max-w-[70%]">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping delay-300" />
                  </div>
                  <span>Brewing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-brand-border/60 bg-brand-surface flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Barista AI... (e.g. menu, hours)"
                className="flex-1 bg-brand-card border border-brand-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-brand-primary text-white disabled:opacity-40 hover:bg-brand-primary-hover active:scale-95 transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-2xl shadow-brand-primary/40 flex items-center gap-2.5 border border-white/20"
      >
        <div className="relative">
          <MessageSquare size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-brand-surface animate-pulse" />
        </div>
        <span className="hidden sm:inline font-bold text-xs">
          {isOpen ? "Close Chat" : "Ask Barista AI"}
        </span>
      </motion.button>
    </div>
  );
};
