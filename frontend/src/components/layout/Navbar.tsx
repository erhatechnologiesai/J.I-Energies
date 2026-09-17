"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SITE_CONFIG, PARTNERSHIP_DATA } from "@/lib/constants";
import { Menu, X, Phone, ArrowRight, Sun, MessageCircle, Calculator } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-surface-border py-2.5"
          : "bg-white border-b border-surface-border/50 py-3.5"
      }`}
    >
      {/* Top micro bar for corporate trust */}
      <div className="hidden lg:block bg-navy-900 text-white text-xs py-1.5 border-b border-navy-800">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 xl:gap-6">
            <span className="hidden 2xl:flex items-center gap-1.5 text-solar-400 font-medium shrink-0">
              <Sun className="w-3.5 h-3.5" /> Clean Energy. Brighter Future.
            </span>
            <span className="hidden 2xl:inline text-navy-700">|</span>
            <div className="flex items-center gap-1.5 text-gray-300 shrink-0">
              <span className="text-gray-400">Partnership:</span>
              <a
                href={PARTNERSHIP_DATA.alpsSolar.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-solar transition-colors inline-flex items-center gap-1"
                title="Alp Solar South Punjab Official Portal"
              >
                <span>Alp Solar South Punjab</span>
              </a>
              <span className="text-solar-400 font-bold">&amp;</span>
              <a
                href={PARTNERSHIP_DATA.legoProject.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:text-solar transition-colors inline-flex items-center gap-1"
                title="The LEGO Group Jiaxing Factory Solar Project"
              >
                <span>The LEGO Group</span>
              </a>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300 truncate">Pakistan&apos;s Trusted Solar EPC Partner • NEPRA Net Metering Approved</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 hover:text-solar-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-solar-400" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum,%20I%20am%20interested%20in%20a%20solar%20solution.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-energy-400 font-medium hover:text-energy-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo variant="horizontal" size="md" />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? "text-navy-800 bg-navy-50 font-bold"
                      : "text-gray-700 hover:text-navy-800 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/calculator"
              className="px-5 py-2.5 text-sm font-bold text-navy-900 hover:text-navy-950 bg-navy-50/80 hover:bg-navy-100 border border-navy-200/80 transition-all rounded-full inline-flex items-center gap-1.5 shadow-sm"
            >
              <Calculator className="w-4 h-4 text-solar-600" />
              <span>Calculate</span>
            </Link>

            <Link
              href="/quote"
              className="px-6 py-2.5 text-sm font-extrabold text-navy-950 bg-solar hover:bg-solar-600 shadow-sm hover:shadow-md transition-all rounded-full inline-flex items-center gap-2 group"
            >
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Mobile Action & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/calculator"
              className="px-2.5 py-1.5 text-xs font-bold text-navy-900 bg-navy-50 border border-navy-200 rounded-full flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-solar-600" />
              <span>Calculate</span>
            </Link>
            <Link
              href="/quote"
              className="px-3 py-1.5 text-xs font-extrabold bg-solar text-navy-950 rounded-full shadow-sm"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-navy-800 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-surface-border shadow-xl px-4 py-6 transition-all animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base font-semibold rounded-xl ${
                    isActive
                      ? "text-navy-800 bg-navy-50 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-bold text-navy-800 bg-navy-50 rounded-xl"
              >
                Solar ROI Calculator
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-bold bg-solar text-navy-950 rounded-xl shadow"
              >
                Get Free Solar Quote
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum,%20I%20want%20to%20inquire%20about%20J.I%20ENERGIES%20solar%20system.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 text-sm font-bold bg-energy-500 text-white rounded-xl shadow flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Sales Engineer
              </a>

              {/* Mobile Partnership Badge */}
              <div className="pt-2 pb-1 flex flex-col items-center gap-1 text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Strategic Partnership
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
                  <a
                    href={PARTNERSHIP_DATA.alpsSolar.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-solar-600 underline decoration-solar/40"
                  >
                    Alp Solar South Punjab
                  </a>
                  <span className="text-solar-600 font-bold">&amp;</span>
                  <a
                    href={PARTNERSHIP_DATA.legoProject.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-solar-600 underline decoration-solar/40"
                  >
                    The LEGO Group
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
