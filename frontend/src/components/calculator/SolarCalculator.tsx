"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateInstantSolar } from "@/lib/calculations";
import { DISCO_LIST } from "@/lib/constants";
import { Zap, Sun, ShieldCheck, ArrowRight, CheckCircle2, Leaf, TrendingUp, HelpCircle } from "lucide-react";

interface SolarCalculatorProps {
  compact?: boolean;
}

export function SolarCalculator({ compact = false }: SolarCalculatorProps) {
  const [bill, setBill] = useState<number>(75000);
  const [selectedDisco, setSelectedDisco] = useState<string>("MEPCO");
  const [isHybrid, setIsHybrid] = useState<boolean>(false);

  const discoInfo = useMemo(() => {
    return DISCO_LIST.find((d) => d.id === selectedDisco) || DISCO_LIST[0];
  }, [selectedDisco]);

  const estimate = useMemo(() => {
    return calculateInstantSolar(bill, discoInfo.rate, isHybrid);
  }, [bill, discoInfo.rate, isHybrid]);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-surface-border overflow-hidden transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solar/20 text-solar text-xs font-bold uppercase tracking-wider mb-2">
              <Sun className="w-3.5 h-3.5" /> Pakistan Solar Savings Engine
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Instant Solar ROI &amp; System Sizer
            </h3>
            <p className="text-gray-300 text-sm mt-1">
              Calculated for MEPCO (Multan &amp; South Punjab) tariffs.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs text-gray-300">Rate:</span>
            <span className="px-3 py-1 rounded-lg bg-navy-700/80 font-bold text-solar text-sm">
              Rs. {discoInfo.rate}/unit
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-8">
        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Bill Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-navy-900 flex items-center gap-1.5">
                Average Monthly Electricity Bill
                <span className="text-xs font-normal text-gray-500">(WAPDA / MEPCO)</span>
              </label>
              <div className="text-lg font-black text-navy-900 bg-navy-50 px-3 py-1 rounded-lg border border-navy-100">
                Rs. {bill.toLocaleString()}
              </div>
            </div>

            <input
              type="range"
              min={15000}
              max={350000}
              step={5000}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-solar-500"
            />

            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span>Rs. 15,000</span>
              <span>Rs. 150,000</span>
              <span>Rs. 350,000+</span>
            </div>

            {/* Quick Bill Preset Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[30000, 50000, 80000, 120000, 200000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBill(preset)}
                  className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                    bill === preset
                      ? "bg-navy-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Rs. {preset / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* DISCO and System Type Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DISCO Selector */}
            <div>
              <label className="text-sm font-bold text-navy-900 block mb-2">
                Electricity Provider (DISCO)
              </label>
              <select
                value={selectedDisco}
                onChange={(e) => setSelectedDisco(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-surface-border rounded-xl text-sm font-medium text-gray-800 focus:ring-2 focus:ring-navy-700 outline-none"
              >
                {DISCO_LIST.map((disco) => (
                  <option key={disco.id} value={disco.id}>
                    {disco.name}
                  </option>
                ))}
              </select>
            </div>

            {/* System Type: On-grid vs Hybrid */}
            <div>
              <label className="text-sm font-bold text-navy-900 block mb-2">
                System Solution Type
              </label>
              <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsHybrid(false)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    !isHybrid ? "bg-white text-navy-900 shadow-sm" : "text-gray-600 hover:text-navy-900"
                  }`}
                >
                  On-Grid
                </button>
                <button
                  type="button"
                  onClick={() => setIsHybrid(true)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    isHybrid ? "bg-white text-navy-900 shadow-sm" : "text-gray-600 hover:text-navy-900"
                  }`}
                >
                  Hybrid (Battery)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: System Sizing */}
          <div className="p-5 rounded-2xl bg-navy-50/70 border border-navy-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-700">Recommended Size</span>
              <div className="text-3xl font-black text-navy-900 mt-2">
                {estimate.recommendedKw} <span className="text-lg font-bold text-navy-600">kW</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {estimate.panelCount}x Alps Solar 585W Modules
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-100/60 text-xs text-navy-800 font-medium flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-solar" /> ~{estimate.requiredAreaSqft} sq.ft roof space
            </div>
          </div>

          {/* Card 2: Monthly Generation */}
          <div className="p-5 rounded-2xl bg-energy-50/60 border border-energy-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-energy-700">Est. Generation</span>
              <div className="text-3xl font-black text-navy-900 mt-2">
                {estimate.monthlyUnits.toLocaleString()}{" "}
                <span className="text-lg font-bold text-energy-600">Units</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Annual: {estimate.annualUnits.toLocaleString()} kWh
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-energy-100/60 text-xs text-energy-700 font-medium flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-energy" /> Net Metering Export Ready
            </div>
          </div>

          {/* Card 3: Monthly Bill Savings */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Monthly Bill Savings</span>
              <div className="text-3xl font-black text-navy-900 mt-2">
                Rs. {(estimate.monthlySavingsPkr / 1000).toFixed(0)}k
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Annual: Rs. {(estimate.annualSavingsPkr / 100000).toFixed(1)} Lakhs
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-100/60 text-xs text-amber-800 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-solar-600" /> ~{estimate.paybackYears} Yrs Estimated Payback
            </div>
          </div>

          {/* Card 4: Environmental Impact */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Clean Energy Impact</span>
              <div className="text-3xl font-black text-navy-900 mt-2">
                {estimate.co2OffsetTonnes}{" "}
                <span className="text-lg font-bold text-emerald-600">Tons</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">CO₂ avoided per year</p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100/60 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" /> Equivalent to {estimate.treesPlanted} trees planted
            </div>
          </div>
        </div>

        {/* 25-Year Lifetime Wealth Projection Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-solar font-bold uppercase tracking-wider">
              25-Year Projected Financial Benefit
            </span>
            <div className="text-2xl sm:text-3xl font-black">
              Rs. {(estimate.lifetimeSavingsPkr / 10000000).toFixed(2)} Crore
            </div>
            <p className="text-xs text-gray-400">
              Accounts for annual tariff escalation and Alps Solar 25-year linear performance warranty.
            </p>
          </div>

          <Link
            href={`/quote?bill=${bill}&disco=${selectedDisco}&kw=${estimate.recommendedKw}&type=${isHybrid ? "Hybrid" : "On-Grid"}`}
            className="w-full sm:w-auto px-6 py-3.5 bg-solar hover:bg-solar-600 text-navy-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group shrink-0"
          >
            <span>Lock In This Proposal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
