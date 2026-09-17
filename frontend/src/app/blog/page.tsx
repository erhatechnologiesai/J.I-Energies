import React from "react";
import Link from "next/link";
import { BookOpen, TrendingUp, Award, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Solar Guides & Energy Education • Pakistan | JIENERGIES",
  description: "Expert solar guides, electricity bill savings breakdowns, net metering tutorials, and hardware comparison for Pakistani homes and businesses.",
};

const ARTICLES = [
  {
    id: "1",
    pillar: "Educational",
    title: "5 Things to Check Before Buying Solar Panels in Pakistan",
    snippet: "From genuine flash test reports to temperature coefficients: ensure you are not buying downgraded B-grade panels or unsupported warranty promises.",
    readTime: "4 min read",
    icon: BookOpen,
    date: "May 2024"
  },
  {
    id: "2",
    pillar: "Savings & ROI",
    title: "Your Electricity Bill is Rs. 80,000 — What Size Solar System Eliminates It?",
    snippet: "A detailed breakdown of monthly units, MEPCO tariff tiers, peak versus off-peak units, and how an engineered 10kW system pays for itself in under 3 years.",
    readTime: "5 min read",
    icon: TrendingUp,
    date: "April 2024"
  },
  {
    id: "3",
    pillar: "Project Story",
    title: "JIENERGIES 10kW Residential Installation — DHA Lahore Project Story",
    snippet: "Step-by-step walkthrough of a 1 Kanal residential installation: civil roof structure, Alps Solar 585W TOPCon modules, three-phase inverter, and green meter activation.",
    readTime: "6 min read",
    icon: Zap,
    date: "June 2024"
  },
  {
    id: "4",
    pillar: "Product & Technology",
    title: "Why Solar Panel Efficiency Matters When Roof Space is Limited",
    snippet: "Comparing conventional 20% P-Type Mono-PERC with modern 22.8% N-Type TOPCon modules. How to extract 25% more kilowatt-hours from the same roof footprint.",
    readTime: "4 min read",
    icon: Award,
    date: "May 2024"
  },
  {
    id: "5",
    pillar: "Trust & Quality",
    title: "What is Included in a Turnkey JIENERGIES Solar Installation?",
    snippet: "We demystify the EPC scope: why DC cable gauge, pure copper earthing bores, SPD surge arrestors, and NEPRA paperwork liaison make or break system reliability.",
    readTime: "5 min read",
    icon: ShieldCheck,
    date: "March 2024"
  }
];

export default function BlogPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-solar" /> Knowledge &amp; Energy Intelligence
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Solar Guides &amp; Insights
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Transparent solar education designed to help Pakistani homeowners and commercial facility managers make informed, engineering-backed power decisions.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((art) => {
            const Icon = art.icon;
            return (
              <article
                key={art.id}
                className="bg-white rounded-3xl border border-surface-border p-7 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-energy-700 bg-energy-50 px-2.5 py-1 rounded-md">
                      {art.pillar}
                    </span>
                    <span className="text-gray-400">{art.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-navy-900 group-hover:text-navy-700 transition-colors leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400">{art.date}</span>
                  <Link
                    href="/quote"
                    className="font-bold text-navy-800 group-hover:text-solar-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-navy-900 text-white text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Have a question about your specific electricity bill?</h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Our engineers provide free bill audits and solar viability assessments with zero sales pressure.
          </p>
          <div className="pt-2">
            <Link
              href="/calculator"
              className="px-6 py-3 bg-solar text-navy-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-solar-600 transition-all inline-block"
            >
              Run Instant Bill Sizing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
