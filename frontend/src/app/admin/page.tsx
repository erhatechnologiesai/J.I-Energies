"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Phone, MapPin, CheckCircle2, Clock, Filter, MessageCircle, RefreshCw } from "lucide-react";

interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: string;
  city: string;
  monthly_bill: number;
  recommended_kw: number;
  solution_type: string;
  status: string;
  notes: string;
}

const STATUS_OPTIONS = ["All", "New", "Contacted", "Survey Scheduled", "Proposal Sent", "Won", "Lost"];

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = filterStatus !== "All" ? `/api/leads?status=${encodeURIComponent(filterStatus)}` : "/api/leads";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-surface-border shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-50 text-navy-800 text-xs font-bold uppercase mb-1">
            <Users className="w-3.5 h-3.5 text-solar" /> JIENERGIES Sales Funnel CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
            Incoming Solar Leads Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Realtime database sync with Supabase • PDF Blueprint Page 15 Funnel
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="px-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2 self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === status
                ? "bg-navy-800 text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-surface-border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Leads Table / Cards */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Fetching leads from Supabase database...
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No leads found for status &quot;{filterStatus}&quot;.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-navy-950 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone / City</th>
                  <th className="p-4">Bill &amp; System</th>
                  <th className="p-4">Solution Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => {
                  const rawPhone = (lead.phone_number || "").replace(/\D/g, "");
                  const waNumber = rawPhone.startsWith("92")
                    ? rawPhone
                    : rawPhone.startsWith("0")
                    ? "92" + rawPhone.slice(1)
                    : rawPhone;

                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-bold text-navy-900">
                        {lead.full_name}
                        <div className="text-[11px] text-gray-400 font-normal">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "Recent"}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{lead.phone_number}</div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-solar-700" /> {lead.city}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-navy-900">
                          Rs. {(lead.monthly_bill || 0).toLocaleString()}
                        </div>
                        <div className="text-[11px] text-energy-700 font-semibold">
                          {lead.recommended_kw} kW System
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-navy-50 text-navy-800 text-[11px] font-semibold">
                          {lead.solution_type}
                        </span>
                        {lead.notes && (
                          <div className="text-[10px] text-gray-400 mt-1 max-w-xs truncate" title={lead.notes}>
                            {lead.notes}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <select
                          value={lead.status || "New"}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="px-2.5 py-1 bg-gray-50 border border-surface-border rounded-lg text-xs font-bold text-navy-900 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Survey Scheduled">Survey Scheduled</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      <td className="p-4">
                        <a
                          href={`https://wa.me/${waNumber}?text=Assalam-o-Alaikum%20${encodeURIComponent(lead.full_name)},%20this%20is%20JIENERGIES%20Solar.%20We%20received%20your%20quote%20request%20for%20a%20${lead.recommended_kw}kW%20solar%20system%20in%20${encodeURIComponent(lead.city)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-energy-500 hover:bg-energy-600 text-white rounded-lg text-xs font-bold shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Lead</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
