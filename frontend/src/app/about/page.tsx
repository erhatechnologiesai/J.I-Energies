import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, PARTNERSHIP_DATA } from "@/lib/constants";
import { ShieldCheck, Award, Wrench, Users, CheckCircle2, ArrowRight, Sun, Zap, Globe, Target, ExternalLink, Factory, Leaf } from "lucide-react";

export const metadata = {
  title: "About Us • J.I ENERGIES | Solar Energy & Power Solutions",
  description: "Learn about J.I ENERGIES, Pakistan's engineering-led solar energy company, our Alp Solar South Punjab & The LEGO Group international supply partnership, and 25-year reliability commitment.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* Hero Header */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5 text-solar" /> Brand Foundation &amp; Engineering Philosophy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Clean Energy. Brighter Future.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            J.I ENERGIES was founded to bridge the gap in Pakistan&apos;s solar market: replacing generic panel reselling with certified, engineering-led power solutions that deliver verifiable kilowatt-hour output.
          </p>
        </div>
      </section>

      {/* Position Statement & Brand Core (PDF Page 2) */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="p-4 rounded-2xl bg-solar/10 border border-solar/20 text-navy-950 inline-block">
              <span className="text-xs font-bold uppercase tracking-wider text-solar-700">Recommended Brand Position</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Not Just a Reseller — An Engineering Partner
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              J.I ENERGIES is a Pakistan-based solar energy company providing residential, commercial, and industrial solar solutions, supported by international product sourcing and dependable local technical service.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We focus on structural integrity, verified Tier-1 hardware, electrical safety standards (IEC compliant), and lifetime post-commissioning monitoring so our clients enjoy 25+ years of uninterrupted energy independence.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Trustworthy",
                desc: "Clear specifications, genuine manufacturer warranties, and transparent proposals with zero hidden costs.",
                icon: ShieldCheck,
                color: "text-navy-800",
                bg: "bg-navy-50"
              },
              {
                title: "Technical",
                desc: "Engineering-led system sizing and DISCO-certified electrical designs rather than price-only selling.",
                icon: Wrench,
                color: "text-energy",
                bg: "bg-energy-50"
              },
              {
                title: "Modern",
                desc: "Clean digital monitoring experience, premium hardware aesthetics, and high-efficiency N-Type technology.",
                icon: Zap,
                color: "text-solar-700",
                bg: "bg-amber-50"
              },
              {
                title: "Reliable & Sustainable",
                desc: "Full turnkey installation, DISCO net-metering commissioning, and proactive after-sales maintenance.",
                icon: Award,
                color: "text-blue-600",
                bg: "bg-blue-50"
              }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white border border-surface-border shadow-sm space-y-3">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base">{card.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* International Supply Partner Architecture & Landmark Project */}
      <section className="bg-navy-950 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle Backdrop Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-energy/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-solar/15 border border-solar/30 text-solar text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>Partnership: Alp Solar South Punjab &amp; The LEGO Group</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Alp Solar South Punjab &amp; The LEGO Group Alliance
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              J.I ENERGIES bridges international engineering benchmarks and Pakistan&apos;s clean energy demands. Through our alliance with <strong>Alp Solar South Punjab</strong> and benchmark global installations like the <strong>20,000-panel</strong> rooftop array at <strong>The LEGO Group</strong> Jiaxing manufacturing facility, we bring genuine Tier-1 quality to every project.
            </p>
          </div>

          {/* Landmark Project Feature: The LEGO Group Jiaxing Factory */}
          <div className="bg-navy-900/90 rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-solar uppercase tracking-wider">
                  <Factory className="w-4 h-4" />
                  <span>Landmark International Mega-Industrial Reference</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
                  {PARTNERSHIP_DATA.legoProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Client: <strong>{PARTNERSHIP_DATA.legoProject.company}</strong> • Location: <strong>{PARTNERSHIP_DATA.legoProject.location}</strong>
                </p>
              </div>

              <a
                href={PARTNERSHIP_DATA.legoProject.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-solar hover:bg-solar-600 text-navy-950 text-xs font-black rounded-xl shadow transition-all self-start lg:self-auto"
              >
                <span>Read Official Press Release</span>
                <ExternalLink className="w-3.5 h-3.5 text-navy-950" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Dual Visuals */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 group">
                  <Image
                    src={PARTNERSHIP_DATA.legoProject.image}
                    alt="The LEGO Group Jiaxing Factory Model"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-white">5+ Football Fields Rooftop Array</span>
                  </div>
                </div>

                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 group">
                  <Image
                    src={PARTNERSHIP_DATA.legoProject.sitePhoto}
                    alt="Solar Panels Array at Factory"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-white">20,000 Photovoltaic Modules</span>
                  </div>
                </div>
              </div>

              {/* Data & Statistics */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PARTNERSHIP_DATA.legoProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                      <div className="text-[10px] text-gray-400 font-semibold uppercase">{m.label}</div>
                      <div className="text-base sm:text-lg font-black text-solar">{m.value}</div>
                      <div className="text-[10px] text-gray-300">{m.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Tim Brooks Quote */}
                <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-solar border-t border-r border-b border-white/10 space-y-1.5">
                  <p className="text-xs italic text-gray-200 leading-relaxed">
                    &ldquo;{PARTNERSHIP_DATA.legoProject.quote.text}&rdquo;
                  </p>
                  <div className="text-[11px] text-solar font-bold">
                    — {PARTNERSHIP_DATA.legoProject.quote.author}, <span className="text-gray-400 font-normal">{PARTNERSHIP_DATA.legoProject.quote.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alps Solar Partnership Card */}
          <div className="bg-navy-900/90 rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
                  <Image
                    src={PARTNERSHIP_DATA.alpsSolar.logo}
                    alt="Alps Solar South Punjab"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {PARTNERSHIP_DATA.alpsSolar.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium">
                    {PARTNERSHIP_DATA.alpsSolar.role}
                  </p>
                </div>
              </div>

              <a
                href={PARTNERSHIP_DATA.alpsSolar.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-all self-start sm:self-auto"
              >
                <span>Visit Alps Solar South Punjab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-navy-950 border border-navy-800 space-y-3">
                <Globe className="w-8 h-8 text-solar" />
                <h4 className="font-bold text-white text-base">Direct Supply Chain</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Factory-to-project sourcing eliminates intermediate trading markups, counterfeit risk, and unverified batch grading.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-navy-950 border border-navy-800 space-y-3">
                <Award className="w-8 h-8 text-energy" />
                <h4 className="font-bold text-white text-base">Verified Certifications</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Modules verified against IEC 61215, IEC 61730, and local NEPRA / AEDB standards for extreme ambient temperatures.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-navy-950 border border-navy-800 space-y-3">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
                <h4 className="font-bold text-white text-base">Local Claim Support</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  JIENERGIES manages all manufacturer warranty claims locally in Pakistan, providing immediate replacement security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multan Headquarters & Engineering Coverage */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-energy-600">Local Multan Presence</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 mt-2">
            Multan Headquarters &amp; Service Network
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Local site survey engineers, rapid mobilization, and direct MEPCO Net Metering liaison across all Multan sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-surface-border space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-navy-900 text-lg">Head Office</h3>
              <p className="text-xs text-navy-900 font-semibold">{SITE_CONFIG.addresses.multan}</p>
              <p className="text-xs text-gray-600 pt-2">
                Corporate engineering office, customer consultation lounge, and equipment demonstration center.
              </p>
            </div>
            <div className="pt-2">
              <a
                href={SITE_CONFIG.maps.multan}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-800 hover:text-solar-700 transition-colors"
              >
                <span>Live Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border space-y-2">
            <h3 className="font-bold text-navy-900 text-lg">Residential Zones</h3>
            <p className="text-xs text-solar-700 font-bold">Model Town • Cantt • Gulgasht</p>
            <p className="text-xs text-gray-600 pt-2">
              Fast 48-hour mobilization for home surveys, roof shadow analysis, and domestic net metering.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border space-y-2">
            <h3 className="font-bold text-navy-900 text-lg">Commercial Hubs</h3>
            <p className="text-xs text-emerald-700 font-bold">MA Jinnah Road • Bosan Road • Abdali Road</p>
            <p className="text-xs text-gray-600 pt-2">
              Plaza rooftops, hospital power backups, private colleges, and commercial shopping centers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-surface-border space-y-2">
            <h3 className="font-bold text-navy-900 text-lg">Industrial Estate</h3>
            <p className="text-xs text-blue-700 font-bold">Industrial Estate Phase 1 &amp; 2</p>
            <p className="text-xs text-gray-600 pt-2">
              High-voltage synchronization, textile mills, ginning units, cold storage, and tube-well solarization.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 pb-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 text-white text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Speak with an Electrical Engineer Today</h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Get a complimentary analysis of your current electricity tariff, solar suitability, and estimated return on investment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-3.5 bg-solar hover:bg-solar-600 text-navy-950 font-bold rounded-xl transition-all"
            >
              Get Free Solar Proposal
            </Link>
            <Link
              href="/projects"
              className="px-8 py-3.5 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl border border-navy-700 transition-all"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
