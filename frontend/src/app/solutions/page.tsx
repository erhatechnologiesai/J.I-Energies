import React from "react";
import Link from "next/link";
import { Home, Building2, Factory, Zap, ShieldCheck, CheckCircle2, ArrowRight, Sun, Layers, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Solar Solutions • Residential, Commercial & Industrial | JIENERGIES",
  description: "Turnkey solar power solutions in Pakistan. Explore residential 3-15kW, commercial 20-100kW, megawatt industrial plants, and our complete WAPDA Net Metering guide.",
};

export default function SolutionsPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-solar" /> Turnkey Solar Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Engineered Solar Solutions
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            From modern urban homes to high-demand industrial manufacturing facilities, JIENERGIES engineers robust solar power systems designed for Pakistan&apos;s climate and tariff realities.
          </p>
        </div>
      </section>

      {/* 1. Residential Solar */}
      <section id="residential" className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-navy-50 text-navy-800 text-xs font-bold uppercase">
                <Home className="w-4 h-4" /> 3 kW to 15 kW Systems
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Residential Solar Power &amp; Net Metering
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Take full control of your household electricity expenses. With peak summer tariffs exceeding Rs. 65 per unit in Pakistan, our on-grid and hybrid systems cut monthly bills by up to 90% while providing round-the-clock power security.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "On-Grid Net Metering: Export daytime surplus to WAPDA",
                  "Hybrid Storage: Uninterrupted power for ACs, fans & lights",
                  "Alps Solar 585W TOPCon modules with 25-yr warranty",
                  "Smart Wi-Fi mobile monitoring app for real-time tracking"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-energy shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/calculator"
                  className="px-6 py-3 bg-solar hover:bg-solar-600 text-navy-950 font-bold text-sm rounded-xl transition-all"
                >
                  Size Your Home System
                </Link>
                <Link
                  href="/quote"
                  className="px-6 py-3 bg-navy-50 hover:bg-navy-100 text-navy-800 font-bold text-sm rounded-xl transition-all"
                >
                  Request Home Proposal
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy-900 text-white rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-base text-solar uppercase tracking-wider">
                Popular Residential Capacities
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-navy-800 border border-navy-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm">5 kW System</div>
                    <div className="text-xs text-gray-400">Suitable for 1-1.5 Ton AC + House Load</div>
                  </div>
                  <span className="text-xs font-bold text-energy">~600-650 Units/mo</span>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-800 border border-navy-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm">10 kW System (Most Popular)</div>
                    <div className="text-xs text-gray-400">Suitable for 1 Kanal Home with 3 ACs</div>
                  </div>
                  <span className="text-xs font-bold text-energy">~1,250 Units/mo</span>
                </div>
                <div className="p-3.5 rounded-xl bg-navy-800 border border-navy-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm">15 kW System</div>
                    <div className="text-xs text-gray-400">Suitable for Multi-Family 1-2 Kanal Home</div>
                  </div>
                  <span className="text-xs font-bold text-energy">~1,850 Units/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Commercial Solar */}
      <section id="commercial" className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-energy-50 text-energy-700 text-xs font-bold uppercase">
                <Building2 className="w-4 h-4" /> 20 kW to 100 kW Systems
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Commercial Solar Power Solutions
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Commercial buildings face the steepest commercial tariffs in Pakistan. Converting daytime operations—offices, plazas, hospitals, schools, and retail centers—to solar delivers an immediate reduction in monthly operational expenditures with a rapid payback under 2.5 years.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Offset expensive daytime peak commercial rates",
                  "Zero generator fuel burn during sunny hours",
                  "Heavy-duty three-phase string inverters",
                  "Corporate ESG & carbon reduction compliance"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-energy shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/quote?type=Commercial"
                  className="px-6 py-3 bg-solar hover:bg-solar-600 text-navy-950 font-bold text-sm rounded-xl transition-all"
                >
                  Request Commercial Feasibility
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy-900 text-white rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-base text-solar uppercase tracking-wider">
                Commercial System Advantages
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="p-3.5 rounded-xl bg-navy-800 border border-navy-700">
                  <strong className="text-white block mb-1">Peak Shaving:</strong>
                  Drastically reduces expensive peak-hour kilowatt draw and sanctioned load penalties.
                </div>
                <div className="p-3.5 rounded-xl bg-navy-800 border border-navy-700">
                  <strong className="text-white block mb-1">Tax Depreciation Benefits:</strong>
                  Accelerated depreciation allowances available for green energy capital assets.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Industrial Solar */}
      <section id="industrial" className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-navy-100 text-navy-900 text-xs font-bold uppercase">
                <Factory className="w-4 h-4" /> 100 kW to 2 MW+ Scale
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Industrial Megawatt-Scale Plants
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Industrial manufacturers in Pakistan need reliable, low-cost power to remain globally competitive. JIENERGIES delivers comprehensive EPC engineering for textile mills, pharmaceuticals, chemical factories, cold storage, and agro-industrial setups.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "High-voltage HT/LT transformer integration",
                  "Galvanized industrial truss and shed rooftop mounting",
                  "Assistance with SBP Low-Rate Solar Financing (3-6%)",
                  "Scada monitoring with power factor correction"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-energy shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/quote?type=Industrial"
                  className="px-6 py-3 bg-solar hover:bg-solar-600 text-navy-950 font-bold text-sm rounded-xl transition-all inline-block"
                >
                  Consult Industrial Engineering Team
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy-950 text-white rounded-2xl p-6 space-y-4 border border-navy-800">
              <h3 className="font-bold text-base text-solar uppercase tracking-wider">
                Industrial EPC Capabilities
              </h3>
              <ul className="space-y-2.5 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar" /> Structural load and wind-tunnel simulations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar" /> Class 0.2s bi-directional net metering CT/PT meters
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar" /> Zero export devices for generator sync
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-solar" /> Operations &amp; Maintenance (O&amp;M) contracts
                </li>
              </ul>

              <div className="p-3.5 rounded-xl bg-navy-900 border border-solar/30 space-y-1 mt-2">
                <div className="text-[11px] font-bold text-solar uppercase">
                  Proven Mega-Scale Industrial Pedigree
                </div>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Backed by international reference installations including <strong>20,000 solar panels (6 GWh/year)</strong> at The LEGO Group Jiaxing manufacturing facility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Step-by-Step Net Metering Guide */}
      <section id="net-metering" className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 scroll-mt-24">
        <div className="rounded-3xl bg-navy-900 text-white p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-solar">
              NEPRA / WAPDA Regulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pakistan Net Metering Process Explained
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Net Metering allows you to export excess solar energy generated during sunny hours back into the national grid. At month-end, your exported units are deducted from your consumed units on your bill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "Phase 1",
                title: "Application & Feasibility",
                desc: "JIENERGIES prepares the standard application with single-line diagrams, sanctioned load checks, and DISCO filing."
              },
              {
                step: "Phase 2",
                title: "Inspection & NOC",
                desc: "DISCO engineers inspect the installed hardware, earthing pit resistance, and anti-islanding inverter protections."
              },
              {
                step: "Phase 3",
                title: "License Issuance",
                desc: "NEPRA generation license is granted under SRO regulations for a 3-year term (renewable automatically)."
              },
              {
                step: "Phase 4",
                title: "Green Meter Commissioning",
                desc: "Official bi-directional green meter is installed and your tariff is converted to net billing mode."
              }
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-navy-800/90 border border-navy-700 space-y-2">
                <span className="text-xs font-bold text-solar uppercase">{st.step}</span>
                <h3 className="font-bold text-white text-base">{st.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-navy-800 border border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-gray-300">
              <strong className="text-white">Note:</strong> A 3-phase electricity connection is required for Net Metering in Pakistan. JIENERGIES handles Phase conversion applications on your behalf if you currently have a single-phase meter.
            </div>
            <Link
              href="/quote"
              className="px-5 py-2.5 bg-solar text-navy-950 font-bold rounded-lg shrink-0 hover:bg-solar-600 transition-colors"
            >
              Start Net Metering Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
