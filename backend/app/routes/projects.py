from fastapi import APIRouter, Query
from typing import List, Optional
from pydantic import BaseModel
from backend.app.database import get_supabase_admin

router = APIRouter(prefix="/api/projects", tags=["Projects"])

class ProjectSchema(BaseModel):
    id: str
    created_at: Optional[str] = None
    title: str
    category: str
    capacity_kw: float
    location: str
    image_url: Optional[str] = None
    completion_date: Optional[str] = None
    featured: Optional[bool] = False

@router.get("", response_model=List[ProjectSchema])
def get_projects(category: Optional[str] = Query(None), featured: Optional[bool] = Query(None)):
    client = get_supabase_admin()
    query = client.table("projects").select("*")
    if category:
        query = query.ilike("category", f"%{category}%")
    if featured is not None:
        query = query.eq("featured", featured)
    res = query.order("capacity_kw", desc=True).execute()
    return res.data or []
