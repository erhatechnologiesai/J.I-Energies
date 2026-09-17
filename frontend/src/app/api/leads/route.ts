import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Server-side Supabase client with admin privileges
const supabaseAdmin = (supabaseUrl && serviceRoleKey)
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { full_name, phone_number, city, monthly_bill, recommended_kw, solution_type, notes } = body;

    // 1. Full Name Validation
    if (!full_name || typeof full_name !== "string") {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }
    full_name = full_name.trim();
    if (full_name.length < 3) {
      return NextResponse.json(
        { error: "Full Name must be at least 3 characters long." },
        { status: 400 }
      );
    }
    if (!/^[A-Za-z\s.\-']+$/.test(full_name)) {
      return NextResponse.json(
        { error: "Full Name must contain English letters and spaces only (no digits or symbols)." },
        { status: 400 }
      );
    }

    // 2. Phone Number Strict Validation
    if (!phone_number || typeof phone_number !== "string") {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }
    phone_number = phone_number.trim();

    // Check for letters
    if (/[a-zA-Z]/.test(phone_number)) {
      return NextResponse.json(
        { error: "Phone number cannot contain English letters! Please enter numbers only (e.g. 0300 1234567 or +923001234567)." },
        { status: 400 }
      );
    }

    // Clean formatting
    const cleaned = phone_number.replace(/[\s\-()]/g, "");
    if (!/^\+?[0-9]+$/.test(cleaned)) {
      return NextResponse.json(
        { error: "Phone number contains invalid characters. Numbers only." },
        { status: 400 }
      );
    }

    const digitsOnly = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;

    if (digitsOnly.startsWith("03")) {
      if (digitsOnly.length !== 11) {
        return NextResponse.json(
          { error: `Pakistani mobile numbers starting with 03 must be exactly 11 digits. You entered ${digitsOnly.length} digits.` },
          { status: 400 }
        );
      }
      phone_number = `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`;
    } else if (digitsOnly.startsWith("923")) {
      if (digitsOnly.length !== 12) {
        return NextResponse.json(
          { error: `Pakistani international mobile numbers starting with +92 must be 12 digits (e.g. +923001234567). You entered ${digitsOnly.length} digits.` },
          { status: 400 }
        );
      }
      phone_number = `+92 ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5)}`;
    } else if (digitsOnly.length === 10 && digitsOnly.startsWith("3")) {
      const normalized = "0" + digitsOnly;
      phone_number = `${normalized.slice(0, 4)} ${normalized.slice(4)}`;
    } else {
      if (digitsOnly.length < 10 || digitsOnly.length > 13) {
        return NextResponse.json(
          { error: `Invalid phone number length (${digitsOnly.length} digits). Pakistani numbers must be 10 to 12 digits (e.g. 0300 1234567).` },
          { status: 400 }
        );
      }
      phone_number = cleaned;
    }

    // 3. Insert into Supabase using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.from("leads").insert([
      {
        full_name,
        phone_number,
        city: city || "Lahore",
        monthly_bill: Number(monthly_bill) || 0,
        recommended_kw: Number(recommended_kw) || 0,
        solution_type: solution_type || "Residential",
        status: "New",
        notes: notes || ""
      }
    ]).select();

    if (error) {
      console.error("Supabase admin insert error:", error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, lead: data[0] },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = supabaseAdmin.from("leads").select("*").order("created_at", { ascending: false });
    if (status && status !== "All") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const { data, error } = await supabaseAdmin
      .from("leads")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data?.[0] }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

