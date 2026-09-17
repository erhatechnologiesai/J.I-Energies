import math
from typing import Dict, Any

# Pakistan DISCO average effective blended tariffs per unit (PKR/kWh) including FPA, FC surcharges, taxes
DISCO_TARIFFS = {
    "MEPCO": {"residential": 58.0, "commercial": 66.0, "industrial": 62.0},
    "Other": {"residential": 58.0, "commercial": 66.0, "industrial": 62.0}
}

STANDARD_CAPACITIES = [3.0, 5.0, 6.0, 8.0, 10.0, 12.0, 15.0, 20.0, 25.0, 30.0, 40.0, 50.0, 60.0, 80.0, 100.0, 150.0, 250.0, 500.0]
PANEL_WATTAGE = 585  # Alps Solar TOPCon 585W high-efficiency module
AREA_PER_KW_SQFT = 70.0  # Approx. 70 sq. ft per kW
MONTHLY_UNITS_PER_KW = 125.0  # Conservative average in Pakistan (1,500 units/kW/year)

def calculate_solar_system(
    monthly_bill: float = None,
    monthly_units: float = None,
    disco: str = "MEPCO",
    connection_type: str = "3-Phase",
    property_type: str = "Residential",
    system_preference: str = "On-Grid"
) -> Dict[str, Any]:
    # Determine effective tariff
    disco_data = DISCO_TARIFFS.get(disco, DISCO_TARIFFS["Other"])
    prop_key = property_type.lower()
    if "commercial" in prop_key:
        rate = disco_data["commercial"]
    elif "industrial" in prop_key:
        rate = disco_data["industrial"]
    else:
        rate = disco_data["residential"]

    # Calculate consumed units if not provided
    if monthly_units and monthly_units > 0:
        units = monthly_units
        bill = units * rate
    elif monthly_bill and monthly_bill > 0:
        bill = monthly_bill
        units = bill / rate
    else:
        # Default baseline: 75,000 PKR monthly bill
        bill = 75000.0
        units = bill / rate

    # Raw required kW capacity
    raw_kw = units / MONTHLY_UNITS_PER_KW

    # Snap to standard inverter capacity
    recommended_kw = STANDARD_CAPACITIES[0]
    for cap in STANDARD_CAPACITIES:
        if cap >= raw_kw * 0.95:
            recommended_kw = cap
            break
        recommended_kw = cap

    # If exceeding highest standard, round up to nearest 25kW
    if raw_kw > STANDARD_CAPACITIES[-1]:
        recommended_kw = math.ceil(raw_kw / 25.0) * 25.0

    # Panel count (585W Alps Solar modules)
    total_watts = recommended_kw * 1000
    panel_count = math.ceil(total_watts / PANEL_WATTAGE)
    actual_dc_kw = round((panel_count * PANEL_WATTAGE) / 1000, 2)

    # Required roof area
    required_area = int(round(recommended_kw * AREA_PER_KW_SQFT))

    # Energy generation estimates
    est_monthly_units = round(recommended_kw * MONTHLY_UNITS_PER_KW, 1)
    est_annual_units = round(est_monthly_units * 12, 1)

    # Financial savings
    est_monthly_savings = min(bill, round(est_monthly_units * rate, 2))
    est_annual_savings = round(est_monthly_savings * 12, 2)
    # 25-year lifetime savings considering 5% tariff escalation and 0.5% annual degradation
    lifetime_savings = 0.0
    current_annual_rate = rate
    annual_gen = est_annual_units
    for year in range(1, 26):
        lifetime_savings += annual_gen * current_annual_rate
        current_annual_rate *= 1.05  # 5% tariff inflation
        annual_gen *= 0.995  # 0.5% panel degradation

    # Estimated capital cost per kW in Pakistan
    cost_per_kw = 115000.0 if system_preference == "On-Grid" else 155000.0
    est_system_cost = round(recommended_kw * cost_per_kw, 2)

    # Payback period
    payback_years = round(est_system_cost / est_annual_savings, 1) if est_annual_savings > 0 else 3.0

    # Environmental CO2 impact (0.82 kg CO2 per kWh)
    co2_offset = round((est_annual_units * 0.82) / 1000.0, 2)  # Metric tonnes
    trees = int(round(co2_offset * 1000 / 21.77))  # 1 tree absorbs ~21.77 kg/year

    # Net metering eligibility in Pakistan (3-phase connection required, min 3.3kW or 5kW depending on DISCO)
    net_metering_eligible = (connection_type == "3-Phase" or recommended_kw >= 5.0)

    return {
        "recommended_kw": float(recommended_kw),
        "actual_dc_kw": actual_dc_kw,
        "panel_count": panel_count,
        "panel_wattage": PANEL_WATTAGE,
        "required_area_sqft": required_area,
        "estimated_monthly_units": est_monthly_units,
        "estimated_annual_units": est_annual_units,
        "estimated_monthly_savings_pkr": est_monthly_savings,
        "estimated_annual_savings_pkr": est_annual_savings,
        "estimated_lifetime_savings_pkr": round(lifetime_savings, 2),
        "estimated_system_cost_pkr": est_system_cost,
        "payback_years": payback_years,
        "co2_offset_tonnes_annual": co2_offset,
        "trees_planted_equivalent": trees,
        "net_metering_eligible": net_metering_eligible,
        "disco": disco,
        "tariff_avg_rate_pkr": rate
    }
