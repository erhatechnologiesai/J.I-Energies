"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { calculateInstantSolar } from "@/lib/calculations";
import { DISCO_LIST, SITE_CONFIG } from "@/lib/constants";
import { validateFullName, validatePhoneNumber, submitLead } from "@/lib/validation";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sun,
  ShieldCheck,
  FileText,
  Download,
  MessageCircle,
  Building2,
  Home,
  Factory,
  Loader2,
  AlertCircle
} from "lucide-react";

function QuoteForm() {
  const searchParams = useSearchParams();

  // Read initial query params from calculator redirect if present
  const initialBill = Number(searchParams.get("bill")) || 75000;
  const initialDisco = searchParams.get("disco") || "MEPCO";
  const initialKw = Number(searchParams.get("kw")) || 10;
  const initialType = searchParams.get("type") || "Residential";

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>("");

  // Validation errors
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    propertyType: initialType,
    monthlyBill: initialBill,
    disco: initialDisco,
    connectionType: "3-Phase",
    solutionType: "On-Grid Net Metering",
    notes: ""
  });

  const selectedDiscoObj = useMemo(() => {
    return DISCO_LIST.find((d) => d.id === formData.disco) || DISCO_LIST[0];
  }, [formData.disco]);

  const estimate = useMemo(() => {
    return calculateInstantSolar(
      formData.monthlyBill,
      selectedDiscoObj.rate,
      formData.solutionType.includes("Hybrid")
    );
  }, [formData.monthlyBill, selectedDiscoObj.rate, formData.solutionType]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({ ...prev, fullName: val }));
    if (val.trim()) {
      const res = validateFullName(val);
      setNameError(res.error);
    } else {
      setNameError(null);
    }
  };

  const handlePhoneChange = (val: string) => {
    // Immediate feedback if letters are typed
    if (/[a-zA-Z]/.test(val)) {
      setPhoneError("Phone number cannot contain English letters! Please enter numeric digits only (e.g. 0300 1234567).");
    } else {
      setPhoneError(null);
    }
    // Limit to max 16 chars to prevent unlimited digits
    const limited = val.slice(0, 16);
    setFormData((prev) => ({ ...prev, phone: limited }));
  };

  const handlePhoneBlur = () => {
    if (formData.phone.trim()) {
      const res = validatePhoneNumber(formData.phone);
      if (!res.isValid) {
        setPhoneError(res.error);
      } else if (res.formatted) {
        setPhoneError(null);
        setFormData((prev) => ({ ...prev, phone: res.formatted! }));
      }
    }
  };

  const handleNextToStep2 = () => {
    setApiError(null);
    const nameCheck = validateFullName(formData.fullName);
    if (!nameCheck.isValid) {
      setNameError(nameCheck.error);
      return;
    }
    setNameError(null);

    const phoneCheck = validatePhoneNumber(formData.phone);
    if (!phoneCheck.isValid) {
      setPhoneError(phoneCheck.error);
      return;
    }
    setPhoneError(null);
    if (phoneCheck.formatted) {
      setFormData((prev) => ({ ...prev, phone: phoneCheck.formatted! }));
    }

    if (!formData.city.trim()) {
      setApiError("Please enter your city / location in Pakistan.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Strict validation check before submitting
    const nameCheck = validateFullName(formData.fullName);
    if (!nameCheck.isValid) {
      setNameError(nameCheck.error);
      setStep(1);
      return;
    }

    const phoneCheck = validatePhoneNumber(formData.phone);
    if (!phoneCheck.isValid) {
      setPhoneError(phoneCheck.error);
      setStep(1);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: formData.fullName.trim(),
        phone_number: phoneCheck.formatted || formData.phone.trim(),
        city: formData.city,
        monthly_bill: formData.monthlyBill,
        recommended_kw: estimate.recommendedKw,
        solution_type: `${formData.propertyType} - ${formData.solutionType}`,
        notes: `DISCO: ${formData.disco}, Connection: ${formData.connectionType}. ${formData.notes}`.trim()
      };

      const result = await submitLead(payload);

      if (!result.success) {
        setApiError(result.error || "Failed to register lead in database. Please check your inputs.");
        return;
      }

      if (result.lead?.id) {
        setLeadId(result.lead.id);
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting lead to Supabase:", err);
      setApiError(err?.message || "An unexpected error occurred while communicating with Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl && typeof window !== "undefined" && window.location.hostname !== "localhost") {
        window.print();
        return;
      }
      const res = await fetch(`${backendUrl || "http://localhost:8000"}/api/proposals/generate-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.fullName || "Valued Customer",
          phone: formData.phone || "N/A",
          city: formData.city,
          monthly_bill: formData.monthlyBill,
          disco: formData.disco,
          recommended_kw: estimate.recommendedKw,
          panel_count: estimate.panelCount,
          panel_wattage: 585,
          estimated_monthly_units: estimate.monthlyUnits,
          estimated_monthly_savings_pkr: estimate.monthlySavingsPkr,
          estimated_annual_savings_pkr: estimate.annualSavingsPkr,
          estimated_system_cost_pkr: estimate.estimatedCostPkr,
          payback_years: estimate.paybackYears
        })
      });

      if (!res.ok) throw new Error("Backend PDF unavailable");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `JIENERGIES_Proposal_${(formData.fullName || "Solar").replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      // Fallback: trigger browser print
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {!submitted ? (
        <div className="bg-white rounded-3xl border border-surface-border shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 sm:p-8 text-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-solar uppercase tracking-wider">
                Step {step} of 3
              </span>
              <span className="text-xs text-gray-300">Free Engineering Feasibility</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Get Your Custom Solar Proposal
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Provide your details below to generate an itemized system proposal tailored to your electricity tariff.
            </p>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className={`h-1.5 rounded-full ${step >= 1 ? "bg-solar" : "bg-navy-700"}`} />
              <div className={`h-1.5 rounded-full ${step >= 2 ? "bg-solar" : "bg-navy-700"}`} />
              <div className={`h-1.5 rounded-full ${step >= 3 ? "bg-solar" : "bg-navy-700"}`} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            {/* STEP 1: Contact Information */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="text-lg font-bold text-navy-900 border-b border-gray-100 pb-2">
                  1. Contact &amp; Location Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5 flex justify-between">
                      <span>Full Name *</span>
                      <span className="text-[11px] font-normal text-gray-400">English letters only</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Usman"
                      value={formData.fullName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-navy-700 outline-none transition-all ${
                        nameError ? "border-red-500 bg-red-50/20 focus:ring-red-500" : "border-surface-border"
                      }`}
                    />
                    {nameError && (
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in duration-200">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{nameError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5 flex justify-between">
                      <span>WhatsApp / Phone *</span>
                      <span className="text-[11px] font-normal text-gray-400">03xx (11 digits)</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={16}
                      placeholder="0302 3333499"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={handlePhoneBlur}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-navy-700 outline-none font-medium transition-all ${
                        phoneError ? "border-red-500 bg-red-50/20 focus:ring-red-500 text-red-900" : "border-surface-border"
                      }`}
                    />
                    {phoneError ? (
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1 animate-in fade-in duration-200">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneError}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-400 mt-1">
                        Pakistani mobile numbers only (e.g. 0302 3333499 or +923023333499)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5">
                    City / Location in Pakistan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your city (e.g. Multan, Lahore, Islamabad)"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy-700 outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextToStep2}
                    className="px-8 py-3 bg-solar hover:bg-solar-600 text-navy-950 font-bold text-sm rounded-xl shadow transition-all flex items-center gap-2"
                  >
                    <span>Next: Energy Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Energy & Grid Connection */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="text-lg font-bold text-navy-900 border-b border-gray-100 pb-2">
                  2. Electricity Bill &amp; Grid Connection
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5">
                      Average Monthly Bill (PKR) *
                    </label>
                    <input
                      type="number"
                      required
                      min={10000}
                      step={1000}
                      value={formData.monthlyBill}
                      onChange={(e) => handleInputChange("monthlyBill", Number(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm font-bold text-navy-900 focus:ring-2 focus:ring-navy-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5">
                      Electricity Provider (DISCO) *
                    </label>
                    <select
                      value={formData.disco}
                      onChange={(e) => handleInputChange("disco", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy-700 outline-none"
                    >
                      {DISCO_LIST.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5">
                      Property Category
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange("propertyType", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy-700 outline-none"
                    >
                      <option value="Residential">Residential (Home / Villa)</option>
                      <option value="Commercial">Commercial (Office / Plaza / School)</option>
                      <option value="Industrial">Industrial (Factory / Mill)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5">
                      Meter Connection Type
                    </label>
                    <select
                      value={formData.connectionType}
                      onChange={(e) => handleInputChange("connectionType", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy-700 outline-none"
                    >
                      <option value="3-Phase">Three-Phase (Required for Net Metering)</option>
                      <option value="Single Phase">Single Phase (Eligible for conversion)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-navy-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3 bg-solar hover:bg-solar-600 text-navy-950 font-bold text-sm rounded-xl shadow transition-all flex items-center gap-2"
                  >
                    <span>Next: Solution Preference</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Solution Type & Review */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h2 className="text-lg font-bold text-navy-900 border-b border-gray-100 pb-2">
                  3. System Preference &amp; Preliminary Specs
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => handleInputChange("solutionType", "On-Grid Net Metering")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.solutionType === "On-Grid Net Metering"
                        ? "border-navy-800 bg-navy-50/60"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-bold text-navy-900 text-sm">On-Grid Net Metering</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Highest ROI. Exports excess daytime power to grid. Lowest capital investment.
                    </p>
                  </div>

                  <div
                    onClick={() => handleInputChange("solutionType", "Hybrid with Lithium Storage")}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.solutionType === "Hybrid with Lithium Storage"
                        ? "border-navy-800 bg-navy-50/60"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-bold text-navy-900 text-sm">Hybrid + Battery Storage</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Provides backup during load shedding plus net metering export during daytime.
                    </p>
                  </div>
                </div>

                {/* Instant Calculation Preview Card */}
                <div className="p-4 rounded-2xl bg-navy-900 text-white space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-300">
                    <span>Target System Capacity</span>
                    <span className="text-solar font-bold">{estimate.recommendedKw} kW Three-Phase</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 bg-navy-800 rounded-lg">
                      <div className="font-black text-white">{estimate.panelCount}x</div>
                      <div className="text-[10px] text-gray-400">Alps Solar 585W</div>
                    </div>
                    <div className="p-2 bg-navy-800 rounded-lg">
                      <div className="font-black text-energy">~Rs. {(estimate.monthlySavingsPkr / 1000).toFixed(0)}k</div>
                      <div className="text-[10px] text-gray-400">Monthly Savings</div>
                    </div>
                    <div className="p-2 bg-navy-800 rounded-lg">
                      <div className="font-black text-solar">~{estimate.paybackYears} Yrs</div>
                      <div className="text-[10px] text-gray-400">Est. Payback</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-900 mb-1.5">
                    Additional Notes / Roof Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. RCC flat concrete roof, 1 Kanal house, want elevated structure..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-surface-border rounded-xl text-sm focus:ring-2 focus:ring-navy-700 outline-none"
                  />
                </div>

                {apiError && (
                  <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex items-start gap-3 animate-in fade-in duration-200">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-red-900 uppercase">Validation Error</h4>
                      <p className="text-xs text-red-700 mt-0.5">{apiError}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-navy-900 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-solar hover:bg-solar-600 text-navy-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Official Proposal</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        /* OFFICIAL SOLAR PROPOSAL VIEW (PDF Page 16 Blueprint) */
        <div className="bg-white rounded-3xl border border-surface-border shadow-2xl p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
          {/* Top Success Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-energy-700 bg-energy-50 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> Lead Registered in Supabase CRM
                </span>
                {leadId && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-navy-100 text-navy-900 px-2.5 py-1 rounded-full border border-navy-200">
                    Lead ID: #{leadId.slice(0, 8)}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
                Official Solar System Proposal
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Prepared by JIENERGIES Engineering Team • Clean Energy. Brighter Future.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-solar" />
                <span>Download PDF Proposal</span>
              </button>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum%20JIENERGIES,%20I%20have%20generated%20a%20${estimate.recommendedKw}kW%20solar%20proposal%20for%20${encodeURIComponent(formData.fullName)}%20in%20${encodeURIComponent(formData.city)}%20(Bill:%20Rs.%20${formData.monthlyBill}).%20Please%20assign%20an%20engineer%20for%20site%20survey.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-energy-500 hover:bg-energy-600 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Proposal Section 1: Customer Profile */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">
              1. Customer Profile &amp; Energy Usage
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-surface-light border border-surface-border text-xs">
              <div>
                <span className="text-gray-400 block">Customer Name:</span>
                <strong className="text-navy-900 text-sm">{formData.fullName}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Contact Phone:</span>
                <strong className="text-navy-900 text-sm">{formData.phone}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">City &amp; DISCO:</span>
                <strong className="text-navy-900 text-sm">{formData.city} • {formData.disco}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Monthly Bill:</span>
                <strong className="text-navy-900 text-sm">Rs. {formData.monthlyBill.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Proposal Section 2: Hardware Sizing */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">
              2. Proposed System Design &amp; Hardware
            </h2>
            <div className="border border-surface-border rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="p-3">Component</th>
                    <th className="p-3">Specification / Brand</th>
                    <th className="p-3">Quantity / Capacity</th>
                    <th className="p-3">Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-navy-900">Solar Panels</td>
                    <td className="p-3">Alps Solar N-Type TOPCon 585W Bifacial</td>
                    <td className="p-3">{estimate.panelCount} Panels ({estimate.actualDcKw} kW DC)</td>
                    <td className="p-3 text-energy-700 font-semibold">12-Yr Product / 25-Yr Performance</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-3 font-bold text-navy-900">Inverter</td>
                    <td className="p-3">Three-Phase Smart Inverter with App</td>
                    <td className="p-3">{estimate.recommendedKw} kW AC Rating</td>
                    <td className="p-3 font-semibold">5-Year Standard</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-bold text-navy-900">Mounting Structure</td>
                    <td className="p-3">Galvanized Steel Frame (L2 Custom)</td>
                    <td className="p-3">Complete for {estimate.panelCount} Modules</td>
                    <td className="p-3 font-semibold">10-Year Structural</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-3 font-bold text-navy-900">Net Metering Scope</td>
                    <td className="p-3">WAPDA / {formData.disco} Bi-Directional Meter</td>
                    <td className="p-3">Turnkey Approval Filing</td>
                    <td className="p-3 text-energy-700 font-semibold">Guaranteed Clearance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Proposal Section 3: Financial & Generation Metrics */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-900">
              3. Generation Projections &amp; Estimated Savings
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-navy-50 border border-navy-100">
                <span className="text-xs text-gray-500 font-medium">Est. Monthly Gen.</span>
                <div className="text-xl font-black text-navy-900 mt-1">
                  {estimate.monthlyUnits.toLocaleString()} <span className="text-xs">kWh</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-energy-50 border border-energy-100">
                <span className="text-xs text-gray-500 font-medium">Est. Monthly Savings</span>
                <div className="text-xl font-black text-energy-700 mt-1">
                  Rs. {estimate.monthlySavingsPkr.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <span className="text-xs text-gray-500 font-medium">Est. System Cost</span>
                <div className="text-xl font-black text-navy-900 mt-1">
                  Rs. {(estimate.estimatedCostPkr / 100000).toFixed(1)} Lakhs
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <span className="text-xs text-gray-500 font-medium">Est. Payback</span>
                <div className="text-xl font-black text-blue-700 mt-1">
                  {estimate.paybackYears} Years
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Our regional sales engineer in <strong>{formData.city}</strong> will contact you via WhatsApp shortly to schedule the free 3D roof survey.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="text-xs font-bold text-navy-800 hover:text-solar-600 underline"
            >
              Submit Another Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading Proposal System...</div>}>
      <QuoteForm />
    </Suspense>
  );
}
