"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calculator, FileText, MessageCircle, Layers } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function MobileBottomBar() {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Solutions", href: "/solutions", icon: Layers },
    { label: "Calculator", href: "/calculator", icon: Calculator },
    { label: "Quote", href: "/quote", icon: FileText, highlight: true },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border shadow-lg py-2 px-3">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                item.highlight
                  ? "bg-solar text-navy-950 font-bold shadow-sm"
                  : isActive
                  ? "text-navy-800 font-bold"
                  : "text-gray-500 hover:text-navy-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}

        {/* WhatsApp Direct Action */}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum,%20I%20am%20interested%20in%20a%20solar%20solution%20from%20JIENERGIES.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-energy-600 font-bold"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-energy-500 text-energy-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-energy animate-ping" />
          </div>
          <span className="text-[11px] mt-0.5">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
