/*
 * ==============================================================================
 * KisanConnect IoT Firmware - Module A: Soil Moisture & Dry Watering Automation
 * Hardware: ESP32 NodeMCU, Capacitive Soil Moisture Sensor v1.2, 5V Relay Module,
 *           DHT22 (Air Temp/Humidity), 16x2 I2C LCD / OLED.
 * ==============================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// --- WiFi Credentials ---
const char* WIFI_SSID = "KisanConnect_Farm_Mesh";
const char* WIFI_PASS = "KisanSecure2026";

// --- Backend API Endpoint ---
const char* SERVER_TELEMETRY_URL = "http://api.kisanconnect.in/api/v1/telemetry/soil";

// --- Hardware Pin Definitions ---
#define SOIL_ANALOG_PIN    34  // ESP32 ADC1_CH6 (Capacitive Moisture Sensor)
#define RELAY_PUMP_PIN     26  // 5V Relay active-low trigger for Submersible Pump
#define STATUS_LED_PIN      2  // Built-in LED for connectivity indicator
#define DRY_CALIBRATION   3200  // Raw ADC value in bone-dry air
#define WET_CALIBRATION   1400  // Raw ADC value in 100% saturated water

// --- Threshold Configurations ---
const float MOISTURE_THRESHOLD_LOW  = 30.0; // Trigger pump if moisture < 30%
const float MOISTURE_THRESHOLD_HIGH = 65.0; // Cut off pump once moisture reaches 65%

// --- Farm Context Meta ---
const char* FARM_ID   = "FARM-PB-042";
const char* SECTOR_ID = "SECTOR-NORTH-WHEAT";

bool isPumpRunning = false;
unsigned long lastTelemetryTime = 0;
const unsigned long TELEMETRY_INTERVAL = 10000; // Send payload every 10s

// Function to map raw ADC to volumetric soil water percentage (%)
float calculateMoisturePercentage(int rawAnalog) {
  int clamped = constrain(rawAnalog, WET_CALIBRATION, DRY_CALIBRATION);
  float percentage = map(clamped, DRY_CALIBRATION, WET_CALIBRATION, 0, 100);
  return percentage;
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PUMP_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);
  
  // Safe default: Pump turned OFF (Relay active LOW)
  digitalWrite(RELAY_PUMP_PIN, HIGH);
  digitalWrite(STATUS_LED_PIN, LOW);

  Serial.println("\n=============================================");
  Serial.println("  KisanConnect IoT Soil Automation Node v2.0 ");
  Serial.println("=============================================");

  // Connect to Farm WiFi Mesh
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to WiFi");
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WiFi] Connected successfully! IP: " + WiFi.localIP().toString());
    digitalWrite(STATUS_LED_PIN, HIGH);
  } else {
    Serial.println("\n[WiFi] Offline Mode: Running local autonomous fail-safe logic.");
  }
}

void loop() {
  // 1. Read Soil Sensor Telemetry
  int rawADC = analogRead(SOIL_ANALOG_PIN);
  float moisturePct = calculateMoisturePercentage(rawADC);

  Serial.printf("[Sensor] Raw ADC: %d | Volumetric Moisture: %.2f%%\n", rawADC, moisturePct);

  // 2. Autonomous Irrigation Decision Logic
  if (moisturePct < MOISTURE_THRESHOLD_LOW && !isPumpRunning) {
    Serial.println("⚠️ [ALERT] Soil critically dry! Activating water pump relay...");
    digitalWrite(RELAY_PUMP_PIN, LOW); // Turn Relay ON
    isPumpRunning = true;
  } else if (moisturePct >= MOISTURE_THRESHOLD_HIGH && isPumpRunning) {
    Serial.println("✅ [STATUS] Optimum root-zone hydration reached. Deactivating pump.");
    digitalWrite(RELAY_PUMP_PIN, HIGH); // Turn Relay OFF
    isPumpRunning = false;
  }

  // 3. Dispatch JSON Telemetry Payload to Backend
  if (millis() - lastTelemetryTime > TELEMETRY_INTERVAL) {
    lastTelemetryTime = millis();
    if (WiFi.status() == WL_CONNECTED) {
      sendTelemetryPayload(rawADC, moisturePct, isPumpRunning);
    }
  }

  delay(1000);
}

void sendTelemetryPayload(int rawADC, float moisturePct, bool pumpState) {
  HTTPClient http;
  http.begin(SERVER_TELEMETRY_URL);
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<256> doc;
  doc["farm_id"] = FARM_ID;
  doc["sector_id"] = SECTOR_ID;
  doc["soil_moisture_pct"] = moisturePct;
  doc["raw_adc"] = rawADC;
  doc["pump_active"] = pumpState;
  doc["threshold_low"] = MOISTURE_THRESHOLD_LOW;
  doc["timestamp"] = millis();

  String requestBody;
  serializeJson(doc, requestBody);

  int httpCode = http.POST(requestBody);
  if (httpCode > 0) {
    Serial.printf("[Cloud Telemetry] Response: %d\n", httpCode);
  } else {
    Serial.printf("[Cloud Telemetry] Error sending payload: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
}
