"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { validateFullName, validatePhoneNumber, submitLead } from "@/lib/validation";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, Send, HelpCircle, ChevronDown, AlertCircle, ExternalLink, Navigation, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({ ...prev, name: val }));
    if (val.trim()) {
      const res = validateFullName(val);
      setNameError(res.error);
    } else {
      setNameError(null);
    }
  };

  const handlePhoneChange = (val: string) => {
    if (/[a-zA-Z]/.test(val)) {
      setPhoneError("Phone number cannot contain English letters! Please enter numbers only (e.g. 0300 1234567).");
    } else {
      setPhoneError(null);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const nameCheck = validateFullName(formData.name);
    if (!nameCheck.isValid) {
      setNameError(nameCheck.error);
      return;
    }

    const phoneCheck = validatePhoneNumber(formData.phone);
    if (!phoneCheck.isValid) {
      setPhoneError(phoneCheck.error);
      return;
    }

    if (!formData.city.trim()) {
      setApiError("Please enter your city/location.");
      return;
    }

    setLoading(true);

    try {
      const result = await submitLead({
        full_name: formData.name.trim(),
        phone_number: phoneCheck.formatted || formData.phone.trim(),
        city: formData.city,
        monthly_bill: 0,
        recommended_kw: 0,
        solution_type: "General Inquiry",
        notes: formData.message.trim()
      });

      if (!result.success) {
        setApiError(result.error || "Failed to submit inquiry. Please check your information.");
        return;
      }

      if (result.lead?.id) {
        setLeadId(result.lead.id);
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setApiError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const FAQS = [
    {
      q: "How long does WAPDA / MEPCO Net Metering take in Pakistan?",
      a: "Typically 30 to 45 business days from the date of system commissioning to bi-directional green meter activation. JIENERGIES handles the complete liaison with MEPCO for inspection, testing, and bi-directional meter activation across Multan & South Punjab."
    },
    {
      q: "What is the warranty coverage on Alps Solar panels?",
      a: "Alps Solar modules carry a 12-year product materials warranty and a 25-to-30 year linear power performance warranty guaranteeing at least 84.8% power output at year 25."
    },
    {
      q: "Can I run my Air Conditioners on solar during load shedding?",
      a: "Yes, with a JIENERGIES Hybrid solar system paired with high-discharge LiFePO4 Lithium batteries. The hybrid inverter seamlessly switches to battery backup in less than 10 milliseconds during grid power failures."
    },
    {
      q: "Do you offer Islamic Bank Solar Financing?",
      a: "Yes. JIENERGIES assists clients in securing State Bank of Pakistan (SBP) subsidized renewable energy financing through Meezan Bank, Bank Alfalah, and Dubai Islamic Bank with repayment tenures up to 5 years."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-800 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-solar" /> Get In Touch
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
            Contact JIENERGIES Pakistan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Speak directly with our solar engineering consultants, request an on-site structural inspection, or visit our headquarters and regional offices.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Locations */}
      <section className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-surface-border p-8 sm:p-10 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-navy-900">Send an Inquiry</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Our engineering team responds within 2 business hours during working days.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                {apiError && (
                  <div className="p-4 bg-red-50 border-2 border-red-300 rounded-2xl flex items-start gap-3 animate-in fade-in duration-200">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-red-900 uppercase">Submission Error</h4>
                      <p className="text-xs text-red-700 mt-0.5">{apiError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1 flex justify-between">
                      <span>Your Full Name *</span>
                      <span className="text-[11px] font-normal text-gray-400">English letters only</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asim Raza"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-navy-700 outline-none transition-all ${
                        nameError ? "border-red-500 bg-red-50/20 focus:ring-red-500" : "border-surface-border"
                      }`}
                    />
                    {nameError && (
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{nameError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-navy-900 mb-1 flex justify-between">
                      <span>Phone / WhatsApp Number *</span>
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
                      <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneError}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-400 mt-1">
                        Numbers only (e.g. 0302 3333499 or +923023333499)
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your city (e.g. Multan, Lahore, Islamabad)"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-navy-700 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-navy-900 mb-1">
                    How Can We Help You? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your property, current monthly electricity bill, or system requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-surface-border rounded-xl text-sm focus:ring-2 focus:ring-navy-700 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-solar hover:bg-solar-600 text-navy-950 font-black text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Transmitting to Supabase..." : "Send Message to JIENERGIES"}</span>
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-2xl bg-energy-50 border border-energy-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-energy mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-navy-900">Inquiry Received &amp; Saved!</h3>
                  {leadId && (
                    <div className="inline-block px-3 py-1 bg-navy-100 border border-navy-300 rounded-full text-xs font-mono font-bold text-navy-900">
                      CRM Reference: #{leadId.slice(0, 8)}
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been registered in the JIENERGIES CRM. A dedicated solar engineer will contact you via WhatsApp at <strong>{formData.phone}</strong>.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum%20JIENERGIES,%20I%20just%20sent%20an%20inquiry%20(Ref:%20${leadId ? leadId.slice(0, 8) : 'Website'}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-energy-500 text-white text-xs font-bold rounded-xl shadow"
                  >
                    <MessageCircle className="w-4 h-4" /> Message Direct on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Contact Direct & Branches */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 text-white space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Contacts</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 transition-colors"
                >
                  <Phone className="w-5 h-5 text-solar shrink-0" />
                  <div>
                    <div className="text-gray-400 text-[11px]">Direct Support Line</div>
                    <div className="font-bold text-white text-sm">{SITE_CONFIG.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-energy shrink-0" />
                  <div>
                    <div className="text-gray-400 text-[11px]">WhatsApp Solar Desk</div>
                    <div className="font-bold text-white text-sm">{SITE_CONFIG.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-gray-400 text-[11px]">Official Email</div>
                    <div className="font-bold text-white text-sm">{SITE_CONFIG.email}</div>
                  </div>
                </a>

                {/* Social Channels */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-800 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-gray-200 hover:text-white transition-all group border border-navy-750"
                  >
                    <Instagram className="w-4 h-4 text-[#e1306c] group-hover:text-white transition-colors shrink-0" />
                    <span className="text-xs font-semibold">Instagram</span>
                  </a>

                  <a
                    href={SITE_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-800 hover:bg-[#1877F2] text-gray-200 hover:text-white transition-all group border border-navy-750"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white transition-colors shrink-0" />
                    <span className="text-xs font-semibold">Facebook</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-navy-800 text-xs text-gray-400">
                Operating Hours: Monday – Saturday (9:00 AM – 6:00 PM PKT)
              </div>
            </div>

            {/* Offices & Live Map */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-surface-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-navy-900 text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-solar-700 shrink-0" />
                  <span>Multan Head Office &amp; Live Location</span>
                </h4>
                <a
                  href={SITE_CONFIG.maps.multan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-navy-50 hover:bg-navy-100 text-navy-900 text-xs font-bold rounded-lg border border-navy-200 transition-colors shrink-0"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-solar-700" />
                </a>
              </div>

              <ul className="space-y-3 text-xs text-gray-600">
                <li className="bg-navy-50/70 p-3 rounded-xl border border-navy-100">
                  <strong className="text-navy-950 block text-sm font-bold">Main Headquarters:</strong>
                  <span className="text-navy-900 font-semibold">{SITE_CONFIG.addresses.multan}</span>
                  <div className="text-[11px] text-gray-500 mt-1 font-mono">
                    📍 Coordinates: 30°13&apos;27.3&quot;N 71°30&apos;54.5&quot;E
                  </div>
                </li>
                <li>
                  <strong className="text-navy-900 block">Commercial &amp; Industrial Service:</strong>
                  MA Jinnah Road, Bosan Road, Abdali Road, and Multan Industrial Estate Phase 1 &amp; 2
                </li>
                <li>
                  <strong className="text-navy-900 block">Residential Service:</strong>
                  Model Town, Cantt, Gulgasht, Shah Rukn-e-Alam &amp; Wapda Town
                </li>
              </ul>

              {/* Embedded Google Map */}
              <div className="pt-2 space-y-3">
                <div className="rounded-2xl overflow-hidden border border-surface-border shadow-sm">
                  <iframe
                    src={SITE_CONFIG.maps.embedMultan}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="JIENERGIES Head Office - MA Jinnah Road, Multan"
                  />
                </div>
                <a
                  href={SITE_CONFIG.maps.multan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded-xl shadow transition-all"
                >
                  <Navigation className="w-4 h-4 text-solar" />
                  <span>Open Live Location in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-surface-border p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-solar-700">
              Clear Answers
            </span>
            <h3 className="text-2xl font-extrabold text-navy-900">Frequently Asked Questions</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex justify-between items-center text-sm font-bold text-navy-900 gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-solar-700" : "text-gray-400"}`}
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
