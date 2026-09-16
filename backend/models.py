"""
Pydantic Schema Models for KisanConnect REST API
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime


# --- Module A: IoT Telemetry ---
class SoilTelemetryInput(BaseModel):
    farm_id: str = Field(..., example="FARM-PB-042")
    sector_id: str = Field(..., example="SECTOR-NORTH-WHEAT")
    soil_moisture_pct: float = Field(..., ge=0.0, le=100.0, example=24.5)
    raw_adc: Optional[int] = Field(None, example=2850)
    ambient_temp_c: Optional[float] = Field(None, example=28.4)
    humidity_pct: Optional[float] = Field(None, example=62.0)
    pump_active: bool = Field(..., example=True)


class SoilTelemetryResponse(BaseModel):
    status: str
    action_taken: str
    pump_command: str
    target_sector: str
    logged_at: datetime


# --- Module B: Security Intrusion ---
class IntrusionAlertInput(BaseModel):
    farm_id: str = Field(..., example="FARM-PB-042")
    perimeter_zone: str = Field(..., example="ZONE-EAST-ORCHARD")
    sensor_trigger: str = Field("PIR_MOTION", example="PIR_MOTION")
    threat_type: str = Field("WILD_ANIMAL", example="WILD_BOAR")
    snapshot_url: Optional[str] = None


# --- Module C: AI Pathology ---
class PathologyDiagnosisRequest(BaseModel):
    crop_name: str = Field(..., example="Tomato")
    leaf_image_base64: Optional[str] = None
    sample_image_url: Optional[str] = None


# --- Module D: D2C Marketplace ---
class ProduceListingCreate(BaseModel):
    farmer_name: str
    crop_title: str
    category: str
    quantity: float
    unit: str = "kg"
    direct_price: float
    mandi_price: float
    retail_price: float
    location: str
    phone: str
    is_organic: bool = True
    description: Optional[str] = None


class MarketplaceOrderCreate(BaseModel):
    listing_id: str
    buyer_name: str
    buyer_phone: str
    quantity_ordered: float
    delivery_destination: str
    payment_method: str = "UPI"
