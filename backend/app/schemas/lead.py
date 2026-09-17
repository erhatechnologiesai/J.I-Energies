import re
from pydantic import BaseModel, Field, field_validator
from typing import Optional

class LeadCreate(BaseModel):
    full_name: str = Field(..., description="Customer full name")
    phone_number: str = Field(..., description="Pakistani phone number (e.g. 03001234567 or +923001234567)")
    city: str = Field(..., description="City in Pakistan")
    monthly_bill: float = Field(0.0, description="Monthly bill in PKR", ge=0, le=20000000)
    recommended_kw: float = Field(0.0, description="Recommended kW capacity", ge=0.0, le=5000.0)
    solution_type: str = Field("Residential", max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)

    @field_validator("full_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 3:
            raise ValueError("Full Name must be at least 3 characters long.")
        if len(v) > 60:
            raise ValueError("Full Name cannot exceed 60 characters.")
        # Reject numbers and symbols (allow only letters, spaces, dots, hyphens)
        if not re.match(r"^[A-Za-z\s.\-']+$", v):
            raise ValueError("Full Name must contain only English letters and spaces (no digits or symbols).")
        return v.title()

    @field_validator("phone_number")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = v.strip()
        # Check for any English or foreign letters
        if re.search(r"[a-zA-Z]", v):
            raise ValueError("Phone number cannot contain English letters or alphabets. Please enter numbers only (e.g. 0300 1234567).")

        # Strip common formatting characters
        cleaned = re.sub(r"[\s\-\(\)]", "", v)

        # Ensure only digits and optional leading +
        if not re.match(r"^\+?[0-9]+$", cleaned):
            raise ValueError("Phone number must contain only numeric digits (and optional leading +).")

        # Normalize to digits
        has_plus = cleaned.startswith("+")
        digits_only = cleaned[1:] if has_plus else cleaned

        # Validate Pakistan mobile & landline length and prefixes
        # 1. Starts with 03 (e.g. 0300 1234567 -> 11 digits)
        # 2. Starts with 923 (e.g. 92300 1234567 -> 12 digits)
        # 3. Starts with +923 (e.g. +92300 1234567 -> 12 digits excluding +)
        if digits_only.startswith("03"):
            if len(digits_only) != 11:
                raise ValueError(f"Standard Pakistan mobile numbers starting with 03 must be exactly 11 digits. You entered {len(digits_only)} digits.")
            # Format nicely as 03XX XXXXXXX
            return f"{digits_only[:4]} {digits_only[4:]}"

        elif digits_only.startswith("923"):
            if len(digits_only) != 12:
                raise ValueError(f"Pakistan international mobile numbers starting with +92 must be 12 digits (e.g. +923001234567). You entered {len(digits_only)} digits.")
            return f"+{digits_only[:2]} {digits_only[2:5]} {digits_only[5:]}"

        elif len(digits_only) == 10 and digits_only.startswith("3"):
            # Missing leading 0 (e.g. 3001234567)
            digits_only = "0" + digits_only
            return f"{digits_only[:4]} {digits_only[4:]}"

        else:
            # Check for standard Pakistan phone length
            if len(digits_only) < 10 or len(digits_only) > 13:
                raise ValueError(f"Invalid phone number length ({len(digits_only)} digits). Pakistani numbers must be 10 to 12 digits (e.g. 0300 1234567).")
            return cleaned

    @field_validator("city")
    @classmethod
    def validate_city(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2 or len(v) > 50:
            raise ValueError("Please provide a valid city name.")
        return v.title()

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class LeadResponse(BaseModel):
    id: str
    created_at: Optional[str] = None
    full_name: str
    phone_number: str
    city: str
    monthly_bill: Optional[float] = 0.0
    recommended_kw: Optional[float] = 0.0
    solution_type: Optional[str] = "Residential"
    status: Optional[str] = "New"
    notes: Optional[str] = None
