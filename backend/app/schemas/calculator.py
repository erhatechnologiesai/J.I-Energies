from pydantic import BaseModel, Field
from typing import Optional

class CalculatorRequest(BaseModel):
    monthly_bill: Optional[float] = Field(None, description="Monthly electricity bill in PKR", ge=0)
    monthly_units: Optional[float] = Field(None, description="Monthly consumed units (kWh)", ge=0)
    disco: str = Field("MEPCO", description="Distribution company (MEPCO)")
    connection_type: str = Field("3-Phase", description="Single Phase or 3-Phase")
    property_type: str = Field("Residential", description="Residential, Commercial, Industrial")
    system_preference: str = Field("On-Grid", description="On-Grid, Hybrid, Off-Grid")

class CalculatorResponse(BaseModel):
    recommended_kw: float
    panel_count: int
    panel_wattage: int
    required_area_sqft: int
    estimated_monthly_units: float
    estimated_annual_units: float
    estimated_monthly_savings_pkr: float
    estimated_annual_savings_pkr: float
    estimated_lifetime_savings_pkr: float
    estimated_system_cost_pkr: float
    payback_years: float
    co2_offset_tonnes_annual: float
    trees_planted_equivalent: int
    net_metering_eligible: bool
    disco: str
    tariff_avg_rate_pkr: float
