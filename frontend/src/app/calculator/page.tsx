import React from "react";
import { SolarCalculator } from "@/components/calculator/SolarCalculator";
import { Zap, HelpCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Solar ROI & Savings Calculator • Pakistan | JIENERGIES",
  description: "Calculate your recommended solar kW system size, monthly bill savings in PKR, payback period, and net metering units for MEPCO (Multan & South Punjab).",
};

export default function CalculatorPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-16">
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-solar" /> Precision Sizing Algorithm
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Pakistan Solar ROI Calculator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Move the slider to your average monthly electricity bill to instantly see recommended system capacity, required roof area, monthly bill savings, and payback period.
          </p>
        </div>

        <SolarCalculator />
      </section>

      {/* Sizing & Calculation Assumptions FAQ */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-10 space-y-6">
          <h3 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-solar-700" />
            How JIENERGIES Calculates Your Solar Generation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-600">
            <div className="space-y-2">
              <h4 className="font-bold text-navy-900">Solar Insolation in Pakistan:</h4>
              <p className="leading-relaxed">
                Pakistan receives an average of 5.0 to 5.5 peak sun hours daily. Each 1 kW of installed solar capacity generates approximately 120 to 135 units (kWh) per month, or ~1,500 units annually under standard rooftop tilt (25°–30° South-facing).
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-navy-900">Blended Tariff Calculations:</h4>
              <p className="leading-relaxed">
                Calculations use current DISCO tariff tables (including Fuel Price Adjustments (FPA), Financing Cost Surcharges, and general sales taxes) which push effective high-slab electricity costs between Rs. 56 and Rs. 65 per unit.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-navy-900">Roof Area Required:</h4>
              <p className="leading-relaxed">
                Using our high-efficiency Alps Solar 585W TOPCon modules, approximately 70 sq. ft of shadow-free rooftop space is needed per 1 kW of system capacity.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-navy-900">25-Year Financial Projection:</h4>
              <p className="leading-relaxed">
                Lifetime savings reflect a conservative 5% annual grid tariff increase and a minimal 0.5% annual linear degradation guarantee from Alps Solar N-Type cells.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
