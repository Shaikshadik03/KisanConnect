-- ==============================================================================
-- KisanConnect Comprehensive Relational Database Schema
-- Compatible with PostgreSQL 15+ & Supabase
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Farmers, Consumers, Bulk Buyers, Ag-Advisors)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE,
    user_role VARCHAR(30) CHECK (user_role IN ('FARMER', 'BUYER', 'COMMUNITY_ADMIN', 'AGRI_EXPERT')) DEFAULT 'BUYER',
    preferred_language VARCHAR(10) DEFAULT 'en',
    state VARCHAR(80),
    district VARCHAR(80),
    village VARCHAR(120),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. FARMS & SECTORS TABLE
CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(150) NOT NULL,
    total_acreage NUMERIC(8, 2) NOT NULL,
    primary_crop VARCHAR(100),
    soil_type VARCHAR(60) CHECK (soil_type IN ('ALLUVIAL', 'BLACK_REGUR', 'RED_LATERITE', 'CLAY_LOAM', 'SANDY_LOAM')),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    organic_certified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MODULE A: IoT SOIL TELEMETRY & IRRIGATION LOGS
CREATE TABLE IF NOT EXISTS iot_soil_telemetry (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    sector_id VARCHAR(50) NOT NULL,
    soil_moisture_percentage NUMERIC(5, 2) NOT NULL,
    raw_adc_value INTEGER,
    ambient_temperature_c NUMERIC(5, 2),
    relative_humidity_pct NUMERIC(5, 2),
    pump_relay_active BOOLEAN NOT NULL DEFAULT FALSE,
    water_flow_liters NUMERIC(8, 2) DEFAULT 0.0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_telemetry_farm_time ON iot_soil_telemetry(farm_id, recorded_at DESC);

-- 4. MODULE B: CROP PROTECTION & PERIMETER INTRUSION LOGS
CREATE TABLE IF NOT EXISTS security_intrusion_logs (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    perimeter_zone VARCHAR(60) NOT NULL,
    sensor_trigger_type VARCHAR(40) CHECK (sensor_trigger_type IN ('PIR_MOTION', 'CAMERA_VISION', 'VIBRATION_WIRE', 'ULTRASONIC')),
    threat_classification VARCHAR(50) CHECK (threat_classification IN ('HUMAN_INTRUDER', 'WILD_BOAR', 'STRAY_CATTLE', 'MONKEY_TROOP', 'FALSE_ALARM')) DEFAULT 'HUMAN_INTRUDER',
    snapshot_image_url TEXT,
    strobe_deterrent_fired BOOLEAN DEFAULT TRUE,
    siren_alarm_fired BOOLEAN DEFAULT TRUE,
    alert_sms_dispatched BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MODULE C: AI CROP PATHOLOGY & AUTO-FERTILIZATION LOGS
CREATE TABLE IF NOT EXISTS ai_disease_diagnostics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    leaf_image_url TEXT NOT NULL,
    predicted_pathology VARCHAR(120) NOT NULL,
    confidence_score NUMERIC(5, 2) NOT NULL,
    severity_level VARCHAR(30) CHECK (severity_level IN ('NORMAL', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL')),
    prescribed_organic_remedy TEXT,
    prescribed_chemical_remedy TEXT,
    drone_dispersion_dispatched BOOLEAN DEFAULT FALSE,
    drone_spray_volume_liters NUMERIC(6, 2) DEFAULT 0.0,
    diagnosed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MODULE D: DIRECT-TO-CONSUMER (D2C) MARKETPLACE LISTINGS
CREATE TABLE IF NOT EXISTS crop_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    crop_title VARCHAR(150) NOT NULL,
    category VARCHAR(60) CHECK (category IN ('Grains', 'Vegetables', 'Pulses', 'Spices', 'Fruits', 'Oils', 'Dairy', 'Herbs')) NOT NULL,
    produce_image_url TEXT,
    quantity_available NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    direct_price_per_unit NUMERIC(10, 2) NOT NULL,
    mandi_benchmark_rate NUMERIC(10, 2),
    supermarket_retail_rate NUMERIC(10, 2),
    harvest_date DATE NOT NULL,
    is_organic BOOLEAN DEFAULT FALSE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MARKETPLACE D2C ORDERS & ESCROW TRANSACTIONS
CREATE TABLE IF NOT EXISTS marketplace_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES crop_listings(id) ON DELETE RESTRICT,
    buyer_id UUID REFERENCES users(id) ON DELETE RESTRICT,
    quantity_ordered NUMERIC(10, 2) NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    order_status VARCHAR(40) CHECK (order_status IN ('PENDING', 'CONFIRMED', 'DISPATCHED_FROM_FARM', 'DELIVERED', 'CANCELLED')) DEFAULT 'PENDING',
    payment_mode VARCHAR(30) CHECK (payment_mode IN ('UPI', 'DIRECT_BANK_TRANSFER', 'CASH_ON_FARM_PICKUP', 'ESCROW_WALLET')),
    delivery_type VARCHAR(30) CHECK (delivery_type IN ('FARM_GATE_PICKUP', 'COMMUNITY_BULK_DELIVERY', 'DIRECT_COURIER')),
    delivery_destination_city VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. NEIGHBORHOOD GROUP BUYING POOLS
CREATE TABLE IF NOT EXISTS group_buying_pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID REFERENCES crop_listings(id) ON DELETE CASCADE,
    society_hub_name VARCHAR(150) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    target_weight_kg NUMERIC(10, 2) NOT NULL,
    pledged_weight_kg NUMERIC(10, 2) DEFAULT 0.0,
    bulk_discount_percentage NUMERIC(5, 2) DEFAULT 15.0,
    pool_status VARCHAR(30) CHECK (pool_status IN ('OPEN', 'TARGET_REACHED', 'DISPATCHED', 'CLOSED')) DEFAULT 'OPEN',
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);
