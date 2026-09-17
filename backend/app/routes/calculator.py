from fastapi import APIRouter
from backend.app.schemas.calculator import CalculatorRequest, CalculatorResponse
from backend.app.services.solar_engine import calculate_solar_system

router = APIRouter(prefix="/api/calculator", tags=["Calculator"])

@router.post("/calculate", response_model=CalculatorResponse)
def calculate_system(payload: CalculatorRequest):
    result = calculate_solar_system(
        monthly_bill=payload.monthly_bill,
        monthly_units=payload.monthly_units,
        disco=payload.disco,
        connection_type=payload.connection_type,
        property_type=payload.property_type,
        system_preference=payload.system_preference
    )
    return result
