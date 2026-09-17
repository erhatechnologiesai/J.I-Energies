"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PARTNERSHIP_DATA } from "@/lib/constants";
import { MapPin, Zap, Calendar, ArrowRight, ShieldCheck, CheckCircle2, ExternalLink, Globe, Factory } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  capacity_kw: number;
  location: string;
  image_url: string;
  completion_date: string;
  featured: boolean;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Residential Project (15kW On-Grid)",
    category: "Residential",
    capacity_kw: 15.0,
    location: "Lahore",
    image_url: "/images/projects/residential.jpg",
    completion_date: "2024-03-15",
    featured: true
  },
  {
    id: "2",
    title: "Commercial Project (60kW Rooftop)",
    category: "Commercial",
    capacity_kw: 60.0,
    location: "Karachi",
    image_url: "/images/projects/commercial.jpg",
    completion_date: "2024-02-10",
    featured: true
  },
  {
    id: "3",
    title: "Industrial Project (250kW Factory)",
    category: "Industrial",
    capacity_kw: 250.0,
    location: "Faisalabad",
    image_url: "/images/projects/industrial.jpg",
    completion_date: "2024-06-01",
    featured: true
  },
  {
    id: "4",
    title: "Solar Farm (500kW Facility)",
    category: "Industrial",
    capacity_kw: 500.0,
    location: "Bahawalpur",
    image_url: "/images/projects/solar_farm.jpg",
    completion_date: "2024-01-25",
    featured: true
  },
  {
    id: "5",
    title: "10kW Hybrid Residential Villa",
    category: "Residential",
    capacity_kw: 10.0,
    location: "Multan",
    image_url: "/images/projects/residential.jpg",
    completion_date: "2024-05-20",
    featured: false
  },
  {
    id: "6",
    title: "35kW Commercial Plaza Solar",
    category: "Commercial",
    capacity_kw: 35.0,
    location: "Islamabad",
    image_url: "/images/projects/commercial.jpg",
    completion_date: "2024-04-12",
    featured: false
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data, error } = await supabase.from("projects").select("*").order("capacity_kw", { ascending: false });
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error loading projects from Supabase:", err);
      }
    }
    loadProjects();
  }, []);

  const categories = ["All", "Residential", "Commercial", "Industrial"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-solar" /> Authentic Installation Portfolio
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Our Projects Across Pakistan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Real installations across Lahore, Karachi, Islamabad, Multan, and Faisalabad with certified Net Metering approval.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === cat
                  ? "bg-navy-800 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-surface-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-white border border-surface-border overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-56 w-full bg-navy-900 overflow-hidden">
                <img
                  src={proj.image_url}
                  alt={proj.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/projects/project-15kw-dha.png";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-bold border border-navy-700">
                  {proj.category}
                </div>
                <div className="absolute top-3 right-3 bg-solar text-navy-950 px-3 py-1 rounded-lg text-xs font-black">
                  {proj.capacity_kw} kW System
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-solar" />
                    <span>{proj.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-navy-700 transition-colors">
                    {proj.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Completed {proj.completion_date}</span>
                  </span>
                  <Link
                    href={`/quote?system=${proj.capacity_kw}kW`}
                    className="font-bold text-navy-800 hover:text-solar-600 flex items-center gap-1 transition-colors"
                  >
                    Build Similar &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Landmark International Industrial Reference */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="rounded-3xl bg-gradient-to-br from-[#071E3D] via-[#0B2D5B] to-[#0A264A] text-white p-8 sm:p-12 border border-navy-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar/15 border border-solar/30 text-solar text-xs font-bold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Global Landmark Benchmark</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                {PARTNERSHIP_DATA.legoProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Official Industrial Installation Reference • {PARTNERSHIP_DATA.legoProject.location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PARTNERSHIP_DATA.legoProject.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-solar hover:bg-solar-600 text-navy-950 text-xs font-black rounded-xl shadow transition-all"
              >
                <span>LEGO® Official Newsroom</span>
                <ExternalLink className="w-3.5 h-3.5 text-navy-950" />
              </a>
              <a
                href={PARTNERSHIP_DATA.alpsSolar.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/15 transition-all"
              >
                <span>Alps Solar Partner Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-solar" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 bg-navy-950 group">
                <img
                  src={PARTNERSHIP_DATA.legoProject.image}
                  alt="LEGO Jiaxing Factory Solar Model"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">Rooftop Area &gt; 5 Football Fields</span>
                </div>
              </div>
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 bg-navy-950 group">
                <img
                  src={PARTNERSHIP_DATA.legoProject.sitePhoto}
                  alt="LEGO Factory Solar Panels Array"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white">20,000 High-Yield Solar Panels</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PARTNERSHIP_DATA.legoProject.metrics.map((metric, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-0.5">
                    <div className="text-[10px] uppercase font-semibold text-gray-400">{metric.label}</div>
                    <div className="text-lg font-black text-solar">{metric.value}</div>
                    <div className="text-[10px] text-gray-300">{metric.detail}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border-l-4 border-solar border-t border-r border-b border-white/10 space-y-1">
                <p className="text-xs italic text-gray-200">
                  &ldquo;{PARTNERSHIP_DATA.legoProject.quote.text}&rdquo;
                </p>
                <div className="text-[11px] text-solar font-bold pt-1">
                  — {PARTNERSHIP_DATA.legoProject.quote.author} ({PARTNERSHIP_DATA.legoProject.quote.role})
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="p-8 rounded-3xl bg-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">Want to inspect a live installation near you?</h3>
            <p className="text-xs sm:text-sm text-gray-300">
              We arrange customer site visits in DHA Lahore, Bahria Islamabad, and Karachi for prospective buyers.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-solar text-navy-950 font-bold text-sm rounded-xl hover:bg-solar-600 transition-all shrink-0"
          >
            Schedule Site Visit
          </Link>
        </div>
      </section>
    </div>
  );
}
