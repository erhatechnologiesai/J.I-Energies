"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function WhatsAppFloatingButton() {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-50">
      {tooltipOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-surface-border shadow-xl rounded-2xl p-3.5 w-64 text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-energy animate-ping" />
            <span className="text-xs font-bold text-navy-800">JIENERGIES Solar Desk</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Have a question about your electricity bill or net metering? Chat with our engineers on WhatsApp!
          </p>
        </div>
      )}

      <a
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum,%20I%20am%20interested%20in%20a%20solar%20solution%20from%20JIENERGIES.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-energy-500 hover:bg-energy-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 relative"
        aria-label="Chat on WhatsApp with JIENERGIES"
      >
        <span className="absolute inset-0 rounded-full bg-energy-400 animate-ping opacity-30 group-hover:opacity-60" />
        <MessageCircle className="w-7 h-7 fill-white relative z-10" />
      </a>
    </div>
  );
}
