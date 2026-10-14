"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  User,
} from "lucide-react";
import { Mascot } from "../common/Mascot";
import { KindBotMessage } from "@/types";
import { STARTER_QUESTIONS } from "@/lib/kindbot/engine";

export const KindBotChat: React.FC = () => {
  const [messages, setMessages] = useState<KindBotMessage[]>([
    {
      id: "initial-welcome",
      sender: "kindbot",
      content:
        "Hi! I'm KindBot, your friendly online safety companion! 🌟 You can ask me anything about weird messages, suspicious links, game problems, or how to stay safe on the internet. What would you like to explore together?",
      timestamp: new Date().toISOString(),
      suggestedActions: [
        "Ask about strange links or free game coin scams",
        "Ask how to handle someone being mean in a game chat",
        "Ask what to do if someone asks for a private photo",
      ],
      isDemoResponse: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isTyping) return;

    const userMessage: KindBotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/kindbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageContent }),
      });
      const data = await res.json();

      if (data.success && data.reply) {
        setMessages((prev) => [...prev, data.reply]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-fallback-${Date.now()}`,
            sender: "kindbot",
            content:
              "I ran into a small hiccup connecting to my knowledge base, but remember: if anything online makes you feel uncomfortable or worried, always share it with a trusted parent or guardian!",
            timestamp: new Date().toISOString(),
            isDemoResponse: true,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "kindbot",
          content:
            "I'm here for you! Whenever something feels strange online, the number one rule is to talk to a trusted adult or parent. You are never in trouble for asking for help.",
          timestamp: new Date().toISOString(),
          isDemoResponse: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "kindbot",
        content:
          "Conversation refreshed! 🌿 What safety question or situation can I help you think through next?",
        timestamp: new Date().toISOString(),
        suggestedActions: [
          "Ask about strange links or free game coin scams",
          "Ask how to handle someone being mean in a game chat",
          "Ask what to do if someone asks for a private photo",
        ],
        isDemoResponse: true,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[75vh] max-h-[750px] bg-white rounded-3xl border border-clicky-border shadow-card overflow-hidden">
      {/* Top Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-clicky-navy via-clicky-navy to-clicky-navy-dark text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mascot size="sm" mood="happy" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-white text-base">KindBot</h3>
              <span className="px-2 py-0.5 rounded-full bg-clicky-yellow/20 text-clicky-yellow text-[10px] font-black border border-clicky-yellow/40">
                Child Safety AI Companion
              </span>
            </div>
            <p className="text-xs text-clicky-sky-light font-medium">
              Calm, supportive, and privacy-respecting guidance
            </p>
          </div>
        </div>

        <button
          onClick={handleResetConversation}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Notice Banner */}
      <div className="bg-clicky-pale px-4 py-2 text-[11px] text-clicky-navy border-b border-clicky-sky/30 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-clicky-orange" />
          <span>KindBot will never ask for your passwords, address, or secrets.</span>
        </span>
        <span className="text-gray-500 hidden sm:inline">
          Rule-Based Educational Engine Active
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white to-clicky-bg/50">
        {messages.map((msg) => {
          const isBot = msg.sender === "kindbot";
          const isEmergency = msg.urgencyLevel === "EMERGENCY";
          const isConcerning = msg.urgencyLevel === "CONCERNING";

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isBot ? "justify-start" : "justify-end"
              }`}
            >
              {isBot && (
                <div className="mt-1 shrink-0">
                  <Mascot size="sm" mood={isEmergency ? "warning" : "happy"} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-md p-4 rounded-3xl text-sm leading-relaxed shadow-xs ${
                  isBot
                    ? isEmergency
                      ? "bg-red-50 text-red-950 border-2 border-red-300 font-semibold rounded-tl-sm"
                      : isConcerning
                      ? "bg-amber-50 text-amber-950 border border-amber-200 font-semibold rounded-tl-sm"
                      : "bg-white text-clicky-navy border border-clicky-border font-medium rounded-tl-sm"
                    : "bg-clicky-navy text-white font-semibold rounded-tr-sm"
                }`}
              >
                {/* Emergency Indicator if applicable */}
                {isEmergency && (
                  <div className="flex items-center gap-1.5 text-xs font-black text-red-700 uppercase tracking-wide mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Safety Priority Alert</span>
                  </div>
                )}

                <p>{msg.content}</p>

                {/* Suggested Safe Next Steps */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200/60">
                    <span className="text-[11px] font-black text-clicky-orange uppercase tracking-wider block mb-1">
                      Safe Next Steps:
                    </span>
                    <ul className="space-y-1 text-xs">
                      {msg.suggestedActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-clicky-mint-dark font-black">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommended Game Shortcut */}
                {msg.recommendedGameSlug && (
                  <div className="mt-3 pt-2">
                    <Link
                      href={`/child/games/${msg.recommendedGameSlug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-clicky-yellow/30 hover:bg-clicky-yellow/50 text-clicky-navy-dark text-xs font-black transition-colors border border-clicky-yellow/60"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-clicky-orange" />
                      <span>Practice in {msg.recommendedGameTitle || "Arcade"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                <div className="text-[10px] text-gray-400 mt-2 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-full bg-clicky-orange text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-clicky-muted font-bold ml-11">
            <div className="w-2 h-2 rounded-full bg-clicky-sky animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-clicky-sky animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-clicky-sky animate-bounce delay-200" />
            <span>KindBot is thinking carefully...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Question Chips */}
      <div className="px-4 py-2 bg-clicky-bg border-t border-clicky-border/60 overflow-x-auto flex items-center gap-2 scrollbar-none">
        <span className="text-[11px] font-black text-clicky-muted whitespace-nowrap">
          Quick Questions:
        </span>
        {STARTER_QUESTIONS.map((question, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(question)}
            className="px-3 py-1 rounded-full bg-white hover:bg-clicky-pale text-clicky-navy text-xs font-bold border border-clicky-sky/50 whitespace-nowrap transition-colors shadow-xs shrink-0"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-clicky-border flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask KindBot anything about staying safe online..."
          className="flex-1 px-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-sm font-semibold transition-all outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className={`p-3 rounded-2xl transition-all shadow-md ${
            input.trim() && !isTyping
              ? "bg-clicky-orange hover:bg-clicky-orange-hover text-white shadow-fun-orange active:translate-y-1"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Send question"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
