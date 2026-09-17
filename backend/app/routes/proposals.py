from fastapi import APIRouter, Response
from pydantic import BaseModel
from typing import Optional
from backend.app.services.pdf_generator import generate_solar_proposal_pdf

router = APIRouter(prefix="/api/proposals", tags=["Proposals"])

class ProposalRequest(BaseModel):
    customer_name: str
    phone: str
    city: str
    monthly_bill: float
    disco: Optional[str] = "MEPCO"
    recommended_kw: float
    panel_count: int
    panel_wattage: Optional[int] = 585
    estimated_monthly_units: float
    estimated_monthly_savings_pkr: float
    estimated_annual_savings_pkr: float
    estimated_system_cost_pkr: float
    payback_years: float

@router.post("/generate-pdf")
def generate_proposal_pdf(data: ProposalRequest):
    pdf_bytes = generate_solar_proposal_pdf(data.model_dump())
    filename = f"JIENERGIES_Proposal_{data.customer_name.replace(' ', '_')}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )
