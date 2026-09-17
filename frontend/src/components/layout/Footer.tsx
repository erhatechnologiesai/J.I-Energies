import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SITE_CONFIG, PARTNERSHIP_DATA } from "@/lib/constants";
import { Phone, Mail, MapPin, ShieldCheck, Zap, Award, ExternalLink, Instagram, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#071E3D] text-gray-300 pt-16 pb-20 lg:pb-12 border-t border-navy-800">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid matching Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-800/80">
          {/* Col 1: Brand Info & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" size="md" />
            <p className="text-xs font-semibold tracking-widest text-solar uppercase">
              CLEAN ENERGY. BRIGHTER FUTURE.
            </p>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Pakistan&apos;s premier solar engineering &amp; power EPC company. Operating under strategic partnership with <strong>Alp Solar South Punjab</strong> &amp; <strong>The LEGO Group</strong> solar installation benchmark to deliver certified turnkey solar solutions.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-energy font-medium">
              <span className="w-2 h-2 rounded-full bg-energy animate-pulse" />
              <span>Pakistan Operations • NEPRA Approved EPC</span>
            </div>

            {/* Social Media Links with Official Logos */}
            <div className="pt-3 space-y-2">
              <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                Follow J.I ENERGIES
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow J.I ENERGIES on Instagram"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-850 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-gray-200 hover:text-white border border-navy-700 transition-all duration-300 text-xs font-semibold shadow-sm group"
                >
                  <Instagram className="w-4 h-4 text-[#e1306c] group-hover:text-white transition-colors" />
                  <span>Instagram</span>
                </a>

                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow J.I ENERGIES on Facebook"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-850 hover:bg-[#1877F2] text-gray-200 hover:text-white border border-navy-700 transition-all duration-300 text-xs font-semibold shadow-sm group"
                >
                  <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white transition-colors" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Strategic Partnership Badges */}
            <div className="pt-2 space-y-1.5">
              <div className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                Strategic Partnership
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <a
                  href={PARTNERSHIP_DATA.alpsSolar.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-white hover:text-solar transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <span>Alp Solar South Punjab</span>
                  <ExternalLink className="w-2.5 h-2.5 text-solar" />
                </a>
                <span className="text-solar font-bold">&amp;</span>
                <a
                  href={PARTNERSHIP_DATA.legoProject.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-white hover:text-solar transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <span>The LEGO Group</span>
                  <ExternalLink className="w-2.5 h-2.5 text-solar" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/" className="hover:text-solar transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-solar transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-solar transition-colors">Products</Link></li>
              <li><Link href="/projects" className="hover:text-solar transition-colors">Projects</Link></li>
              <li><Link href="/solutions" className="hover:text-solar transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-solar transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Products */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide">Our Products</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/products" className="hover:text-solar transition-colors">Solar Panels (Alp Solar South Punjab N-Type)</Link></li>
              <li><Link href="/products" className="hover:text-solar transition-colors">On-Grid &amp; Hybrid Inverters</Link></li>
              <li><Link href="/products" className="hover:text-solar transition-colors">LiFePO4 Lithium Batteries</Link></li>
              <li><Link href="/solutions" className="hover:text-solar transition-colors">EPC &amp; Turnkey Installation</Link></li>
              <li><Link href="/contact" className="hover:text-solar transition-colors">After-Sales Support &amp; O&amp;M</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-solar shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-solar transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-solar shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-solar transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-solar shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">MA Jinnah Road, Multan, Pakistan</div>
                  <a
                    href={SITE_CONFIG.maps.multan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-solar hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>View Live Location</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2025 J.I ENERGIES. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400">Connect:</span>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-lg hover:bg-navy-800 text-gray-400 hover:text-[#e1306c] transition-colors"
              aria-label="J.I ENERGIES Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-lg hover:bg-navy-800 text-gray-400 hover:text-[#1877F2] transition-colors"
              aria-label="J.I ENERGIES Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          <p className="flex items-center gap-1.5 text-gray-400">
            <span>Clean Energy. Brighter Future.</span>
            <span className="text-emerald-400">🌿</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
