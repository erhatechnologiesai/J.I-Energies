from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from backend.app.schemas.lead import LeadCreate, LeadUpdate, LeadResponse
from backend.app.database import get_supabase_admin

router = APIRouter(prefix="/api/leads", tags=["Leads & CRM"])

@router.post("", response_model=LeadResponse)
def create_lead(lead: LeadCreate):
    client = get_supabase_admin()
    data = {
        "full_name": lead.full_name,
        "phone_number": lead.phone_number,
        "city": lead.city,
        "monthly_bill": lead.monthly_bill,
        "recommended_kw": lead.recommended_kw,
        "solution_type": lead.solution_type,
        "status": "New",
        "notes": lead.notes
    }
    res = client.table("leads").insert(data).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to insert lead into Supabase")
    return res.data[0]

@router.get("", response_model=List[LeadResponse])
def get_leads(status: Optional[str] = Query(None, description="Filter by status")):
    client = get_supabase_admin()
    query = client.table("leads").select("*").order("created_at", desc=True)
    if status:
        query = query.eq("status", status)
    res = query.execute()
    return res.data or []

@router.patch("/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: str, payload: LeadUpdate):
    client = get_supabase_admin()
    update_data = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update fields provided")
    res = client.table("leads").update(update_data).eq("id", lead_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Lead not found")
    return res.data[0]
