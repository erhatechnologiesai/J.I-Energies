/**
 * Validation and lead submission utility for JIENERGIES forms
 * Enforces strict production rules for Pakistani mobile numbers and customer names.
 */

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  formatted?: string;
}

/**
 * Validates full name:
 * - 3 to 60 characters
 * - English alphabetic letters and spaces only
 * - Rejects digits, symbols, and empty input
 */
export function validateFullName(name: string): ValidationResult {
  const trimmed = (name || "").trim();
  if (!trimmed) {
    return { isValid: false, error: "Full Name is required." };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: "Full Name must be at least 3 characters long." };
  }
  if (trimmed.length > 60) {
    return { isValid: false, error: "Full Name cannot exceed 60 characters." };
  }
  if (!/^[A-Za-z\s.\-']+$/.test(trimmed)) {
    return {
      isValid: false,
      error: "Full Name must contain English letters and spaces only (no numbers or symbols)."
    };
  }
  return { isValid: true, error: null };
}

/**
 * Validates Pakistani phone numbers:
 * - Disallows English letters or foreign alphabets
 * - Enforces valid numeric length (11 digits for 03xx, 12 for +923xx)
 * - Returns clean formatted string
 */
export function validatePhoneNumber(phone: string): ValidationResult {
  const raw = (phone || "").trim();
  if (!raw) {
    return { isValid: false, error: "Phone number is required." };
  }

  // 1. Strict check for English letters / alphabetic characters
  if (/[a-zA-Z]/.test(raw)) {
    return {
      isValid: false,
      error: "Phone number cannot contain English letters! Please enter numbers only (e.g. 0300 1234567)."
    };
  }

  // 2. Strip formatting
  const cleaned = raw.replace(/[\s\-\(\)]/g, "");

  // 3. Ensure numeric characters (with optional leading +)
  if (!/^\+?[0-9]+$/.test(cleaned)) {
    return {
      isValid: false,
      error: "Invalid phone characters. Only numbers and optional leading '+' are allowed."
    };
  }

  const digitsOnly = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;

  // 4. Pakistani mobile formats
  if (digitsOnly.startsWith("03")) {
    if (digitsOnly.length !== 11) {
      return {
        isValid: false,
        error: `Pakistani mobile numbers (03xx) must be exactly 11 digits. You entered ${digitsOnly.length} digits.`
      };
    }
    const formatted = `${digitsOnly.slice(0, 4)} ${digitsOnly.slice(4)}`;
    return { isValid: true, error: null, formatted };
  }

  if (digitsOnly.startsWith("923")) {
    if (digitsOnly.length !== 12) {
      return {
        isValid: false,
        error: `Pakistani international mobile numbers (+923xx) must be 12 digits. You entered ${digitsOnly.length} digits.`
      };
    }
    const formatted = `+92 ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5)}`;
    return { isValid: true, error: null, formatted };
  }

  if (digitsOnly.length === 10 && digitsOnly.startsWith("3")) {
    const normalized = "0" + digitsOnly;
    const formatted = `${normalized.slice(0, 4)} ${normalized.slice(4)}`;
    return { isValid: true, error: null, formatted };
  }

  // General bounds
  if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    return {
      isValid: false,
      error: `Invalid phone length (${digitsOnly.length} digits). Pakistani phone numbers must be 10 to 12 digits (e.g. 0300 1234567).`
    };
  }

  return { isValid: true, error: null, formatted: cleaned };
}

/**
 * Submits lead to Next.js API or FastAPI backend with fallback
 */
export async function submitLead(payload: {
  full_name: string;
  phone_number: string;
  city: string;
  monthly_bill?: number;
  recommended_kw?: number;
  solution_type?: string;
  notes?: string;
}): Promise<{ success: boolean; lead?: any; error?: string }> {
  // Try Next.js API endpoint first
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, lead: data.lead || data };
    }

    const errorData = await res.json().catch(() => null);
    if (res.status === 400 || res.status === 422) {
      return {
        success: false,
        error: errorData?.error || errorData?.detail?.[0]?.msg || "Validation failed."
      };
    }
  } catch (err) {
    console.warn("Next.js API route failed, attempting direct backend connection...", err);
  }

  // Fallback to FastAPI backend on port 8000
  try {
    const fallbackRes = await fetch("http://localhost:8000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (fallbackRes.ok) {
      const lead = await fallbackRes.json();
      return { success: true, lead };
    }

    const errJson = await fallbackRes.json().catch(() => null);
    const detailMsg = errJson?.detail?.[0]?.msg?.replace("Value error, ", "") || errJson?.detail || "Could not save lead.";
    return { success: false, error: detailMsg };
  } catch (backendErr: any) {
    return {
      success: false,
      error: backendErr?.message || "Could not connect to lead server. Please try again."
    };
  }
}
