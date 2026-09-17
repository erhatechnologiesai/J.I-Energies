from fastapi import APIRouter, Query
from typing import List, Optional
from pydantic import BaseModel
from backend.app.database import get_supabase_admin

router = APIRouter(prefix="/api/products", tags=["Products"])

class ProductSchema(BaseModel):
    id: str
    name: str
    category: str
    brand: str
    capacity_rating: Optional[str] = None
    warranty_years: Optional[int] = None
    datasheet_url: Optional[str] = None
    image_url: Optional[str] = None

@router.get("", response_model=List[ProductSchema])
def get_products(category: Optional[str] = Query(None)):
    client = get_supabase_admin()
    query = client.table("products").select("*")
    if category:
        query = query.ilike("category", f"%{category}%")
    res = query.execute()
    return res.data or []
