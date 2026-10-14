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
  ShieldCheck,
  PhoneCall,
  Lock,
} from "lucide-react";
import { Mascot } from "../common/Mascot";
import { KindBotMessage } from "@/types";
import { STARTER_QUESTIONS } from "@/lib/kindbot/engine";
import { playSound } from "@/lib/utils";

export const KindBotChat: React.FC = () => {
  const [messages, setMessages] = useState<KindBotMessage[]>([
    {
      id: "initial-welcome",
      sender: "kindbot",
      content:
        "Hi! I'm KindBot, your friendly online safety companion! 🌟 You can ask me anything about weird messages, suspicious links, game problems, or how to stay safe on the internet. What would you like to explore together?",
      timestamp: new Date().toISOString(),
      suggestedActions: [
        "Ask: Someone sent me a suspicious link.",
        "Ask: Someone online is being mean to me.",
        "Ask: A stranger wants my photo.",
      ],
      isDemoResponse: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botMood, setBotMood] = useState<"happy" | "detective" | "warning" | "thinking" | "cheer">("happy");
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

    playSound("click");
    const userMessage: KindBotMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setBotMood("thinking");

    try {
      const res = await fetch("/api/kindbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageContent }),
      });
      const data = await res.json();

      if (data.success && data.reply) {
        playSound("chime");
        setMessages((prev) => [...prev, data.reply]);
        if (data.reply.urgencyLevel === "EMERGENCY" || data.reply.urgencyLevel === "CONCERNING") {
          setBotMood("warning");
        } else if (data.reply.intent?.includes("scam") || data.reply.intent?.includes("misinformation")) {
          setBotMood("detective");
        } else {
          setBotMood("cheer");
        }
      } else {
        setBotMood("happy");
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
      setBotMood("happy");
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
    playSound("click");
    setBotMood("happy");
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "kindbot",
        content:
          "Conversation refreshed! 🌿 What safety question or situation can I help you think through next?",
        timestamp: new Date().toISOString(),
        suggestedActions: [
          "Ask: Someone sent me a suspicious link.",
          "Ask: Someone online is being mean to me.",
          "Ask: A stranger wants my photo.",
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
          <Mascot size="sm" mood={botMood} />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-white text-base">KindBot Safety AI</h3>
              <span className="px-2 py-0.5 rounded-full bg-clicky-yellow/20 text-clicky-yellow text-[10px] font-black border border-clicky-yellow/40">
                Child Safety Companion
              </span>
            </div>
            <p className="text-xs text-clicky-sky-light font-medium">
              Calm, supportive, and 100% private digital guidance
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

      {/* Privacy Notice Banner */}
      <div className="bg-clicky-pale px-4 py-2 text-[11px] text-clicky-navy border-b border-clicky-sky/30 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-clicky-orange" />
          <span>KindBot will never ask for your real name, passwords, or personal secrets.</span>
        </span>
        <span className="text-gray-500 hidden sm:inline font-semibold">
          On-Device Safety Engine • Zero External Tracking
        </span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-clicky-bg/50">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          const isEmergency = msg.urgencyLevel === "EMERGENCY";
          const isConcerning = msg.urgencyLevel === "CONCERNING";

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className="shrink-0 mt-1">
                {isUser ? (
                  <div className="w-8 h-8 rounded-full bg-clicky-navy text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <Mascot size="sm" mood={isEmergency || isConcerning ? "warning" : "happy"} animate={false} />
                )}
              </div>

              {/* Message Bubble Content */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm font-medium leading-relaxed shadow-card ${
                    isUser
                      ? "bg-clicky-navy text-white rounded-tr-none font-semibold"
                      : isEmergency
                      ? "bg-red-50 border-2 border-red-300 text-red-950 rounded-tl-none font-semibold"
                      : isConcerning
                      ? "bg-amber-50 border-2 border-amber-300 text-amber-950 rounded-tl-none font-semibold"
                      : "bg-white border border-clicky-border text-clicky-text rounded-tl-none font-medium"
                  }`}
                >
                  {isEmergency && (
                    <div className="flex items-center gap-1.5 text-red-700 font-black text-xs uppercase mb-2 pb-1.5 border-b border-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Immediate Adult Assistance Alert</span>
                    </div>
                  )}

                  {isConcerning && !isEmergency && (
                    <div className="flex items-center gap-1.5 text-amber-800 font-black text-xs uppercase mb-2 pb-1.5 border-b border-amber-200">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Safety Guidance Notice</span>
                    </div>
                  )}

                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {/* Emergency Helpline Box if flagged */}
                  {isEmergency && (
                    <div className="mt-3 p-3 rounded-2xl bg-white border border-red-200 text-xs space-y-1.5 text-red-900 font-bold">
                      <div className="flex items-center gap-1.5 font-black text-red-700">
                        <PhoneCall className="w-4 h-4" />
                        <span>Helplines Available 24/7 (Free & Confidential):</span>
                      </div>
                      <p>• Emergency Services: <strong>911</strong></p>
                      <p>• Childhelp National Child Abuse Hotline: <strong>1-800-422-4453</strong></p>
                      <p>• Crisis Text Line: Text <strong>HOME to 741741</strong></p>
                    </div>
                  )}
                </div>

                {/* Suggested Safe Next Steps */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="p-3 rounded-2xl bg-white border border-clicky-border shadow-2xs space-y-1.5">
                    <span className="text-[11px] font-black uppercase text-clicky-navy tracking-wider block">
                      Recommended Safe Next Steps:
                    </span>
                    <ul className="space-y-1">
                      {msg.suggestedActions.map((action, i) => (
                        <li key={i} className="text-xs text-clicky-text font-semibold flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Relevant Game Link Recommendation */}
                {msg.recommendedGameSlug && (
                  <div className="pt-1">
                    <Link
                      href={`/child/games/${msg.recommendedGameSlug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-clicky-yellow hover:bg-clicky-yellow-hover text-clicky-navy-dark font-black text-xs shadow-xs transition-colors"
                    >
                      <span>Practice in {msg.recommendedGameTitle || "Safety Game"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <Mascot size="sm" mood="thinking" animate={false} />
            <div className="p-3.5 rounded-2xl bg-white border border-clicky-border shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-clicky-navy animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-clicky-navy animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-clicky-navy animate-bounce" />
              <span className="text-xs font-bold text-clicky-muted ml-1">KindBot is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Questions Chips */}
      <div className="p-2 sm:px-4 bg-clicky-pale/60 border-t border-clicky-border overflow-x-auto flex items-center gap-2 scrollbar-none">
        <span className="text-[11px] font-black text-clicky-navy shrink-0 hidden sm:inline">
          💡 Try asking:
        </span>
        {STARTER_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isTyping}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-clicky-pale text-clicky-navy border border-clicky-border text-xs font-bold shrink-0 transition-colors shadow-2xs hover:border-clicky-navy"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
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
          disabled={isTyping}
          className="flex-1 px-4 py-3 rounded-2xl bg-clicky-bg border border-clicky-border focus:border-clicky-navy focus:bg-white text-xs sm:text-sm font-semibold transition-all outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-5 py-3 rounded-2xl bg-clicky-orange hover:bg-clicky-orange-hover disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-fun-orange active:translate-y-0.5 transition-all flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
