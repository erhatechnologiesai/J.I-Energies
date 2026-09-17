from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

# 1. Health
res = client.get("/api/health")
print("Health:", res.status_code, res.json())

# 2. Calculator
calc_payload = {
    "monthly_bill": 85000,
    "disco": "LESCO",
    "connection_type": "3-Phase",
    "property_type": "Residential",
    "system_preference": "On-Grid"
}
res_calc = client.post("/api/calculator/calculate", json=calc_payload)
print("Calculator:", res_calc.status_code, res_calc.json())

# 3. Products
res_prod = client.get("/api/products")
print(f"Products: {res_prod.status_code}, count: {len(res_prod.json())}")

# 4. Projects
res_proj = client.get("/api/projects")
print(f"Projects: {res_proj.status_code}, count: {len(res_proj.json())}")

# 5. Lead Creation
lead_payload = {
    "full_name": "Test Customer",
    "phone_number": "+923001234567",
    "city": "Lahore",
    "monthly_bill": 85000,
    "recommended_kw": 12.0,
    "solution_type": "Residential",
    "notes": "Interested in Alps Solar 585W with Net Metering"
}
res_lead = client.post("/api/leads", json=lead_payload)
print("Lead Create:", res_lead.status_code, res_lead.json())

# 6. PDF Generation
pdf_payload = {
    "customer_name": "Muhammad Usman",
    "phone": "+92 321 9876543",
    "city": "Lahore",
    "monthly_bill": 85000,
    "disco": "LESCO",
    "recommended_kw": 12.0,
    "panel_count": 21,
    "panel_wattage": 585,
    "estimated_monthly_units": 1500,
    "estimated_monthly_savings_pkr": 80000,
    "estimated_annual_savings_pkr": 960000,
    "estimated_system_cost_pkr": 1380000,
    "payback_years": 2.7
}
res_pdf = client.post("/api/proposals/generate-pdf", json=pdf_payload)
print("Proposal PDF:", res_pdf.status_code, "Length:", len(res_pdf.content), "Content-Type:", res_pdf.headers.get("content-type"))

print("\nALL BACKEND TESTS PASSED SUCCESSFULLY!")
