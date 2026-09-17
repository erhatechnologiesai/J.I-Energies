"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SolarCalculator } from "@/components/calculator/SolarCalculator";
import { SITE_CONFIG, PARTNERSHIP_DATA } from "@/lib/constants";
import {
  Sun,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Building2,
  Home,
  Factory,
  ChevronRight,
  MapPin,
  ExternalLink,
  Globe,
  Leaf,
  Quote
} from "lucide-react";

export default function HomePage() {
  const featuredProjects = [
    {
      id: "residential",
      title: "Residential Project",
      location: "Lahore",
      capacity: "15 kW On-Grid",
      image: "/images/projects/residential.jpg",
      savings: "Rs. 95,000/mo",
      link: "/projects"
    },
    {
      id: "commercial",
      title: "Commercial Project",
      location: "Karachi",
      capacity: "60 kW Commercial",
      image: "/images/projects/commercial.jpg",
      savings: "Rs. 380,000/mo",
      link: "/projects"
    },
    {
      id: "industrial",
      title: "Industrial Project",
      location: "Faisalabad",
      capacity: "250 kW Industrial",
      image: "/images/projects/industrial.jpg",
      savings: "Rs. 1.6M/mo",
      link: "/projects"
    },
    {
      id: "solar-farm",
      title: "Solar Farm",
      location: "Bahawalpur",
      capacity: "500 kW Ground Mount",
      image: "/images/projects/solar_farm.jpg",
      savings: "Rs. 3.2M/mo",
      link: "/projects"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION (Matching User Mockup Reference) */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center overflow-hidden bg-navy-950">
        {/* Background Panoramic Solar Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_solar_bg.jpg"
            alt="JIENERGIES Solar Installations in Pakistan"
            fill
            priority
            className="object-cover object-right sm:object-center brightness-[0.88]"
          />
          {/* Subtle directional gradient overlay for high contrast on left without blocking the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071E3D]/95 via-[#071E3D]/65 sm:via-[#071E3D]/40 to-transparent lg:w-[58%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-navy-950/20" />
        </div>

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl space-y-5">
            {/* Tag / Micro Badge */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/95">
              <span className="w-6 h-[2px] bg-solar rounded-full inline-block" />
              <span>PAKISTAN&apos;S TRUSTED SOLAR PARTNER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-energy-400 inline-block" />
            </div>

            {/* H1 Heading matching mockup */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Powering Pakistan&apos;s<br className="hidden sm:inline" />{" "}
              <span className="text-solar">Clean Energy</span> Future
            </h1>

            {/* Subtitle matching mockup */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-medium max-w-xl">
              Reliable Solar Solutions for Homes,<br className="hidden sm:inline" />{" "}
              Businesses &amp; Industry
            </p>

            {/* CTA Buttons matching mockup */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/quote"
                className="px-8 py-3.5 sm:py-4 bg-solar hover:bg-solar-600 text-navy-950 font-black text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get a Free Solar Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#projects"
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-navy-900/40 hover:bg-navy-900/70 text-white border border-white/40 hover:border-white font-bold text-sm sm:text-base rounded-full backdrop-blur-sm transition-all flex items-center justify-center"
              >
                <span>View Our Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GLOBAL STRATEGIC PARTNERSHIP & LANDMARK INDUSTRIAL PROJECT */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#071E3D] via-[#0B2D5B] to-[#082245] text-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-navy-800 shadow-2xl space-y-10 relative overflow-hidden">
          {/* Subtle Ambient Backdrop Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-solar/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-energy/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 border-b border-white/10 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-solar/15 border border-solar/30 text-solar text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Partnership: Alp Solar South Punjab &amp; The LEGO Group</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Backed by Alp Solar South Punjab &amp; The LEGO Group Solar Alliance
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                J.I ENERGIES operates under the strategic partnership of <strong>Alp Solar South Punjab</strong> and <strong>The LEGO Group</strong> (showcasing the benchmark <strong>20,000-panel</strong> rooftop solar project at LEGO&apos;s Jiaxing manufacturing facility)—bringing world-class engineering and supply-chain integrity to Pakistan.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={PARTNERSHIP_DATA.alpsSolar.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/15 backdrop-blur-sm transition-all"
              >
                <span>Alp Solar South Punjab Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-solar" />
              </a>
              <a
                href={PARTNERSHIP_DATA.legoProject.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-solar hover:bg-solar-600 text-navy-950 text-xs font-black rounded-xl shadow-md transition-all"
              >
                <span>The LEGO Group Solar Project</span>
                <ExternalLink className="w-3.5 h-3.5 text-navy-950" />
              </a>
            </div>
          </div>

          {/* Dual Grid: LEGO Project Showcase & Alps Solar Technology */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left: The LEGO Group Jiaxing Factory Landmark Project (7 cols) */}
            <div className="lg:col-span-7 bg-navy-900/90 rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-solar uppercase tracking-wide">
                    <Factory className="w-4 h-4 text-solar" />
                    <span>International Industrial Benchmark</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                    Operational Reference
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {PARTNERSHIP_DATA.legoProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Location: <strong>{PARTNERSHIP_DATA.legoProject.location}</strong> • Client: <strong>{PARTNERSHIP_DATA.legoProject.company}</strong>
                  </p>
                </div>

                {/* 2-Image Comparison Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10 bg-navy-950 group">
                    <Image
                      src={PARTNERSHIP_DATA.legoProject.image}
                      alt="The LEGO Group Jiaxing Factory Solar Rooftop Model"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                      <span className="text-[11px] font-bold text-white leading-tight">
                        Factory Rooftop Layout (5+ Football Fields)
                      </span>
                    </div>
                  </div>

                  <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10 bg-navy-950 group">
                    <Image
                      src={PARTNERSHIP_DATA.legoProject.sitePhoto}
                      alt="LEGO Solar Panels Installation on Factory Roof"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                      <span className="text-[11px] font-bold text-white leading-tight">
                        20,000 Photovoltaic Modules Array
                      </span>
                    </div>
                  </div>
                </div>

                {/* Solar Data Statistics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {PARTNERSHIP_DATA.legoProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                      <div className="text-[10px] font-semibold text-gray-400 uppercase">{m.label}</div>
                      <div className="text-base sm:text-lg font-black text-solar">{m.value}</div>
                      <div className="text-[10px] text-gray-300">{m.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Official Quote */}
                <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-solar border-t border-r border-b border-white/10 space-y-2">
                  <p className="text-xs italic text-gray-200 leading-relaxed">
                    &ldquo;{PARTNERSHIP_DATA.legoProject.quote.text}&rdquo;
                  </p>
                  <div className="text-[11px] text-solar font-bold">
                    — {PARTNERSHIP_DATA.legoProject.quote.author}, <span className="text-gray-400 font-normal">{PARTNERSHIP_DATA.legoProject.quote.role}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-gray-400">
                <span>Source: Official LEGO® Group Press Release</span>
                <a
                  href={PARTNERSHIP_DATA.legoProject.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-solar hover:underline inline-flex items-center gap-1 font-bold"
                >
                  <span>Read Full Article</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: Alps Solar Strategic Partnership (5 cols) */}
            <div className="lg:col-span-5 bg-navy-900/90 rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-energy-400 uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-energy-400" />
                    <span>Technology &amp; Equipment Partner</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-solar/20 text-solar border border-solar/30 text-[11px] font-bold">
                    Tier-1 Hardware
                  </span>
                </div>

                {/* Partner Header with Logo */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="relative w-28 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
                    <Image
                      src={PARTNERSHIP_DATA.alpsSolar.logo}
                      alt="Alps Solar South Punjab"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-tight">
                      {PARTNERSHIP_DATA.alpsSolar.name}
                    </h3>
                    <p className="text-[11px] text-gray-300 font-medium mt-0.5">
                      {PARTNERSHIP_DATA.alpsSolar.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {PARTNERSHIP_DATA.alpsSolar.description}
                </p>

                {/* Hardware Visual */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10 group">
                  <Image
                    src={PARTNERSHIP_DATA.alpsSolar.image}
                    alt="Alps Solar Hybrid Energy Storage System"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3">
                    <span className="text-xs font-bold text-white">Alps Solar Smart Hybrid Storage (10kW – 25kW)</span>
                    <span className="text-[10px] text-solar">Sub-10ms UPS grade backup with high-discharge LiFePO4 cells</span>
                  </div>
                </div>

                {/* Certified Features Checklist */}
                <div className="space-y-2 pt-1">
                  {PARTNERSHIP_DATA.alpsSolar.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={PARTNERSHIP_DATA.alpsSolar.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Explore Alps Solar South Punjab Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PROJECTS SECTION (Matching User Mockup Image 2) */}
      <section id="projects" className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Our Projects
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Real Solutions. Real Impact.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-800 hover:text-solar-600 transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Row matching Image 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="bg-white rounded-2xl border border-surface-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={`${project.title} in ${project.location}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-navy-950/80 backdrop-blur-sm text-white text-[11px] font-bold">
                  {project.capacity}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-navy-900 text-base group-hover:text-navy-700 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-solar shrink-0" />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Monthly Savings:</span>
                  <span className="font-bold text-emerald-600">{project.savings}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SOLAR CALCULATOR */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <SolarCalculator />
      </section>

      {/* 4. TURNKEY SOLUTIONS */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-solar-700">
            Engineered for Pakistan&apos;s Climate &amp; High Electricity Tariffs
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900">
            Tailored Solar Engineering
          </h2>
          <p className="text-sm text-gray-600">
            From 5kW domestic residences to megawatt industrial facilities across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Residential */}
          <div className="rounded-3xl bg-white border border-surface-border p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-solar/15 flex items-center justify-center text-navy-900">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Residential Solar</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Zero your domestic electricity bills. 5kW to 20kW on-grid and hybrid lithium systems for homes across Pakistan.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Green Meter Net Metering
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 24/7 AC &amp; load shedding backup
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/solutions#residential" className="text-xs font-bold text-navy-900 hover:text-solar-600 flex items-center gap-1">
                Learn More &rarr;
              </Link>
            </div>
          </div>

          {/* Commercial */}
          <div className="rounded-3xl bg-white border border-surface-border p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Commercial Solar</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Protect business margins against peak commercial tariffs. 20kW to 100kW rooftop arrays for plazas, hospitals, schools, and corporate offices.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Payback under 2.8 years
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tax depreciation benefits
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/solutions#commercial" className="text-xs font-bold text-navy-900 hover:text-solar-600 flex items-center gap-1">
                Learn More &rarr;
              </Link>
            </div>
          </div>

          {/* Industrial */}
          <div className="rounded-3xl bg-white border border-surface-border p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-navy-100 text-navy-900 flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Industrial Solar</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Megawatt-scale rooftop and ground installations for textile mills, factories, cold storage units, and manufacturing plants.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100 kW to 2 MW+ High Voltage EPC
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Low-Rate Solar Financing
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/solutions#industrial" className="text-xs font-bold text-navy-900 hover:text-solar-600 flex items-center gap-1">
                Learn More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HARDWARE PARTNERSHIP: ALPS SOLAR (PDF Page 11) */}
      <section className="bg-[#071E3D] text-white py-16 sm:py-20">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-solar">
                Certified Technology Partnership
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Alp Solar South Punjab N-Type TOPCon 585W
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                J.I ENERGIES is an official partner with <strong>Alp Solar South Punjab</strong> &amp; <strong>The LEGO Group</strong> solar benchmark, bringing factory-certified Tier-1 modules built for Pakistan&apos;s extreme summer temperatures.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-navy-900 border border-navy-700">
                  <div className="text-2xl font-black text-solar">22.8%</div>
                  <div className="text-xs text-gray-400 mt-0.5">Cell Efficiency</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-900 border border-navy-700">
                  <div className="text-2xl font-black text-emerald-400">30 Years</div>
                  <div className="text-xs text-gray-400 mt-0.5">Linear Power Warranty</div>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-600 text-navy-950 font-bold text-xs rounded-full transition-all"
                >
                  <span>Explore Hardware Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-navy-900/90 border border-navy-700 p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-white text-base">Key Technical Advantages</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center justify-between py-1 border-b border-navy-800">
                    <span className="text-gray-400">Cell Architecture:</span>
                    <span className="font-semibold text-white">N-Type TOPCon 16BB</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-navy-800">
                    <span className="text-gray-400">Temperature Coefficient:</span>
                    <span className="font-semibold text-white">-0.30%/°C (High Heat Resilient)</span>
                  </li>
                  <li className="flex items-center justify-between py-1 border-b border-navy-800">
                    <span className="text-gray-400">Degradation:</span>
                    <span className="font-semibold text-white">&lt; 1% Year 1, 0.4% Annually</span>
                  </li>
                  <li className="flex items-center justify-between py-1">
                    <span className="text-gray-400">Central Warehouse:</span>
                    <span className="font-semibold text-solar">Ready Stock Available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FIVE-STEP WORKFLOW */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-solar-700">
            Professional Turnkey Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900">
            How It Works
          </h2>
          <p className="text-sm text-gray-600">
            Transparent 5-step engineering from your bill to green meter energization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            { step: "01", title: "Free Audit", desc: "Instant online quote or WhatsApp bill assessment." },
            { step: "02", title: "Site Survey", desc: "3D roof azimuth and electrical structure inspection." },
            { step: "03", title: "Proposal", desc: "Itemized design with Alps Solar modules, pricing, and payback." },
            { step: "04", title: "Installation", desc: "High-grade structural assembly and electrical testing." },
            { step: "05", title: "DISCO Meter", desc: "Complete liaison for bi-directional green meter activation." }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-surface-border space-y-2 hover:border-solar transition-colors"
            >
              <div className="text-2xl font-black text-solar">{item.step}</div>
              <h3 className="font-bold text-navy-900 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA BANNER (Matching User Mockup Image 3) */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-3xl relative overflow-hidden shadow-2xl min-h-[220px] sm:min-h-[260px] flex items-center p-8 sm:p-12 lg:p-14">
          {/* Background Solar Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/cta_solar_bg.jpg"
              alt="Get Your Free Solar Quote Today"
              fill
              className="object-cover object-center"
            />
            {/* Blue Tint Overlay matching Image 3 */}
            <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Get Your Free Solar Quote Today
              </h2>
              <p className="text-sm sm:text-base text-gray-200 font-normal">
                Let&apos;s build a cleaner, greener Pakistan together.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/quote"
                className="px-7 py-3.5 bg-solar hover:bg-solar-600 text-navy-950 font-black text-xs sm:text-sm rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum%20JIENERGIES,%20I%20want%20a%20free%20solar%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
