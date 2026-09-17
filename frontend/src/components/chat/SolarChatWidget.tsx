"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Trash2,
  ArrowRight,
  ExternalLink,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Zap,
  ShieldCheck,
  Calendar,
  DollarSign,
  Layers,
  Sparkles
} from "lucide-react";
import { RobotAvatar } from "./RobotAvatar";
import { SITE_CONFIG } from "@/lib/constants";

interface SocialChannel {
  name: string;
  label: string;
  handle: string;
  url: string;
  type: string;
}

interface SolarRecommendation {
  bill?: number;
  recommended_kw?: number;
  panel_count?: number;
  monthly_saving?: number;
  turnkey_min?: number;
  turnkey_max?: number;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendation?: SolarRecommendation | null;
  channels?: SocialChannel[] | null;
  timestamp: string;
}

const STARTER_SUGGESTIONS = [
  "⚡ Mera monthly bill Rs 50,000 hai, kitna system lagega?",
  "📱 Give me your social media accounts & contact details",
  "💡 Alp Solar South Punjab N-Type 585W panels info",
  "📜 MEPCO Net Metering ka mukammal procedure?",
];

// Helper to strip markdown asterisks and headers cleanly
function cleanText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/###\s*/g, "")
    .replace(/##\s*/g, "")
    .replace(/#\s*/g, "");
}

function StructuredMessageContent({ text }: { text: string }) {
  const cleaned = cleanText(text);
  const lines = cleaned.split("\n");

  return (
    <div className="space-y-1.5 text-xs text-slate-800 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-0.5" />;
        }

        // 1. Bullet point item (starts with • or - or *)
        if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
          const itemText = trimmed.replace(/^[•\-]\s*/, "");
          const colonIdx = itemText.indexOf(":");
          if (colonIdx > 0 && colonIdx < 35) {
            const label = itemText.slice(0, colonIdx);
            const val = itemText.slice(colonIdx + 1);
            return (
              <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-solar-500 mt-1.5 shrink-0" />
                <span className="leading-snug">
                  <strong className="font-bold text-navy-950">{label}:</strong>
                  <span className="text-slate-700">{val}</span>
                </span>
              </div>
            );
          }
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-solar-500 mt-1.5 shrink-0" />
              <span className="text-slate-700 leading-snug">{itemText}</span>
            </div>
          );
        }

        // 2. Numbered step (e.g. 1. 2. 3.)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          const num = numMatch[1];
          const content = numMatch[2];
          const colonIdx = content.indexOf(":");
          if (colonIdx > 0 && colonIdx < 35) {
            const label = content.slice(0, colonIdx);
            const val = content.slice(colonIdx + 1);
            return (
              <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
                <span className="text-[11px] font-bold text-solar-600 mt-0.5 shrink-0 w-4">{num}.</span>
                <span className="leading-snug">
                  <strong className="font-bold text-navy-950">{label}:</strong>
                  <span className="text-slate-700">{val}</span>
                </span>
              </div>
            );
          }
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="text-[11px] font-bold text-solar-600 mt-0.5 shrink-0 w-4">{num}.</span>
              <span className="text-slate-700 leading-snug">{content}</span>
            </div>
          );
        }

        // 3. Key-Value Row (e.g. Recommended System: 7.5 kW)
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx > 0 && colonIdx < 30 && !trimmed.startsWith("http") && !trimmed.startsWith("Hi!")) {
          const label = trimmed.slice(0, colonIdx);
          const val = trimmed.slice(colonIdx + 1);
          return (
            <div key={idx} className="flex items-baseline justify-between py-1 px-2.5 rounded-lg bg-slate-50 border border-slate-200/80 my-0.5">
              <span className="font-bold text-navy-900 text-[11px]">{label}:</span>
              <span className="font-semibold text-solar-700 text-xs text-right">{val}</span>
            </div>
          );
        }

        // 4. Regular line / greeting / question
        return (
          <p key={idx} className="font-medium text-navy-950 leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export function SolarChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTooltipOpen(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
      const chatEndpoint = backendUrl ? `${backendUrl}/api/chat` : "/api/chat";
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }

      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        recommendation: data.recommendation,
        channels: data.channels,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn("Backend chat fetch error, fallback:", err);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Hi! 🤖 Hamara AI engine solar inquiry process kar raha hai. Aap direct hamare senior engineer se rabta karne ke liye WhatsApp button use kar sakte hain!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* 1. Floating Attention Tooltip (Clean, Normal Width w-64 to w-72 - Identical to Old WhatsApp Popover) */}
      {!isOpen && tooltipOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-surface-border shadow-2xl rounded-2xl p-3.5 w-64 sm:w-72 max-w-[calc(100vw-3rem)] text-left animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-auto z-50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTooltipOpen(false);
            }}
            className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold text-navy-800 uppercase tracking-wider">
              Online • J.I Solar AI
            </span>
          </div>

          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer group"
          >
            <p className="text-sm font-extrabold text-navy-950 leading-snug group-hover:text-solar-600 transition-colors">
              Hi! 🤖 Mujh se baat karein!
            </p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Apna bijli ka bill batayein aur foran solar system sizing aur bachat calculate karein.
            </p>
            <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-solar-600 group-hover:translate-x-0.5 transition-transform">
              <span>Chat Shuru Karein</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Robot Trigger Button (w-14 h-14 Circular with Bright Solar Theme) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setTooltipOpen(false);
          }}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 via-solar-500 to-yellow-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none ring-2 ring-white/90"
          aria-label="Open J.I Solar AI Assistant"
        >
          {/* Pulsing Solar Ring */}
          <span className="absolute inset-0 rounded-full bg-solar-400 opacity-40 group-hover:opacity-70 animate-ping" />

          {/* Robot Avatar (Bare variant, crisp and large inside the w-14 circle) */}
          <RobotAvatar size="md" variant="bare" className="relative z-10" />

          {/* Live Online Green Dot */}
          <span className="absolute top-0.5 right-0.5 z-20 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
        </button>
      )}

      {/* 3. Interactive Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-6 sm:right-6 w-auto sm:w-[390px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#0B2D5B] via-[#071E3D] to-[#0B2D5B] text-white p-3.5 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <RobotAvatar size="sm" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-sm tracking-tight">
                    J.I Solar Assistant
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 font-medium">
                  Alp Solar South Punjab &amp; Engineering AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear Chat"
                  className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                title="Close Window"
                className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 bg-[#F8FAFC]">
            {/* Welcome Greeting Card */}
            {messages.length === 0 && (
              <div className="space-y-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-2.5">
                    <RobotAvatar size="sm" />
                    <div>
                      <h4 className="font-extrabold text-navy-950 text-sm">
                        Hi! 🤖 Main J.I Solar Assistant hoon.
                      </h4>
                      <p className="text-xs text-gray-500">
                        Senior Engineering &amp; Solar ROI Consultant
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aap mujh se apne bijli ke bill ke mutabiq System Size, Alp Solar South Punjab N-Type panels, MEPCO Net Metering, ya official social media &amp; contact channels ke baray mein pooch sakte hain!
                  </p>
                </div>

                {/* Quick Suggestion Chips */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-1">
                    Quick Sawalaat:
                  </div>
                  <div className="space-y-1.5">
                    {STARTER_SUGGESTIONS.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-solar-50 border border-slate-200/90 hover:border-solar text-xs text-navy-950 font-semibold transition-all shadow-2xs flex items-center justify-between group"
                      >
                        <span className="truncate pr-2">{sug}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-solar-700 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Message Stream */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-start gap-2 max-w-[92%]">
                  {msg.role === "assistant" && <RobotAvatar size="sm" className="mt-0.5 shrink-0" />}
                  <div
                    className={`rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#0B2D5B] text-white rounded-br-none shadow-sm px-4 py-2.5 font-medium"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-none shadow-sm p-3.5 space-y-2.5"
                    }`}
                  >
                    {/* User Text */}
                    {msg.role === "user" ? (
                      <p className="text-white text-xs font-medium leading-relaxed">{msg.content}</p>
                    ) : (
                      /* Assistant Message */
                      <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                        <StructuredMessageContent text={msg.content} />

                        {/* Social Channels Deck (Rendered as Clean Cards when available) */}
                        {msg.channels && msg.channels.length > 0 && (
                          <div className="mt-2 space-y-1.5 pt-1">
                            {msg.channels.map((chan, cIdx) => {
                              let IconComponent = ExternalLink;
                              let iconClass = "text-navy-700";
                              let badgeBg = "bg-navy-50 text-navy-800";
                              let actionLabel = "Open ↗";

                              if (chan.type === "instagram") {
                                IconComponent = Instagram;
                                iconClass = "text-[#e1306c]";
                                badgeBg = "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white";
                                actionLabel = "Follow ↗";
                              } else if (chan.type === "facebook") {
                                IconComponent = Facebook;
                                iconClass = "text-[#1877F2]";
                                badgeBg = "bg-[#1877F2] text-white";
                                actionLabel = "Visit ↗";
                              } else if (chan.type === "whatsapp") {
                                IconComponent = MessageCircle;
                                iconClass = "text-emerald-600";
                                badgeBg = "bg-emerald-600 text-white";
                                actionLabel = "Chat ↗";
                              } else if (chan.type === "email") {
                                IconComponent = Mail;
                                iconClass = "text-blue-600";
                                badgeBg = "bg-blue-600 text-white";
                                actionLabel = "Email ↗";
                              } else if (chan.type === "maps") {
                                IconComponent = MapPin;
                                iconClass = "text-solar-600";
                                badgeBg = "bg-navy-900 text-white";
                                actionLabel = "Maps ↗";
                              }

                              return (
                                <a
                                  key={cIdx}
                                  href={chan.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all group"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                    <IconComponent className={`w-4 h-4 ${iconClass} shrink-0`} />
                                    <div className="min-w-0">
                                      <div className="font-bold text-navy-900 text-xs truncate">
                                        {chan.label}
                                      </div>
                                      <div className="text-[10px] text-gray-500 truncate">
                                        {chan.handle}
                                      </div>
                                    </div>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 ${badgeBg} shadow-2xs`}>
                                    {actionLabel}
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        )}

                        {/* Interactive Solar Sizing Spec Card */}
                        {msg.recommendation && (
                          <div className="mt-2.5 p-3 rounded-2xl bg-gradient-to-br from-solar-50 to-amber-100/40 border border-solar-200 space-y-2.5">
                            <div className="flex items-center justify-between border-b border-solar-200/80 pb-1.5">
                              <span className="font-extrabold text-navy-950 text-xs flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-solar-600" />
                                <span>Recommended: {msg.recommendation.recommended_kw} kW Solution</span>
                              </span>
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                                ~Rs. {msg.recommendation.monthly_saving?.toLocaleString()} Bachat/Mo
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                              <div className="p-2 rounded-xl bg-white border border-solar-200/80">
                                <div className="text-gray-500 text-[10px]">Alp Solar Panels</div>
                                <div className="font-bold text-navy-900">{msg.recommendation.panel_count}x 585W TOPCon</div>
                              </div>
                              <div className="p-2 rounded-xl bg-white border border-solar-200/80">
                                <div className="text-gray-500 text-[10px]">Payback Period</div>
                                <div className="font-bold text-emerald-700">~2.5 – 3 Saal</div>
                              </div>
                            </div>

                            <a
                              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum%20J.I%20ENERGIES,%20I%20used%20your%20AI%20Chatbot%20for%20bill%20Rs.%20${msg.recommendation.bill}%20and%20got%20recommendation%20for%20${msg.recommendation.recommended_kw}kW%20system.%20Please%20send%20formal%20proposal.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>WhatsApp par Formal Proposal Mangwayein</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex items-center gap-2">
                <RobotAvatar size="sm" />
                <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-solar-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-solar-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-solar-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-gray-400 ml-1">J.I AI soch raha hai...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick WhatsApp Escalation Strip */}
          <div className="px-3.5 py-1.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-gray-600">Senior Engineer se baat karni hai?</span>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum%20J.I%20ENERGIES,%20I%20want%20to%20speak%20with%20a%20Solar%20Engineer.`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Sawal ya monthly bill likhein..."
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-solar focus:ring-1 focus:ring-solar transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-solar hover:bg-solar-600 disabled:opacity-40 disabled:hover:bg-solar text-navy-950 rounded-xl font-bold transition-all shadow-sm shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
