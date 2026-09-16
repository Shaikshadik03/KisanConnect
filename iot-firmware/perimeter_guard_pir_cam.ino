/*
 * ==============================================================================
 * KisanConnect IoT Firmware - Module B: Crop Protection & Intrusion Guard
 * Hardware: ESP32-CAM (OV2640), HC-SR501 PIR Motion Sensor, High-Decibel Buzzer,
 *           Ultra-Bright Deterrent Strobe LED, LoRa/WiFi Transceiver.
 * ==============================================================================
 */

#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>

// --- WiFi Configuration ---
const char* WIFI_SSID = "KisanConnect_Farm_Mesh";
const char* WIFI_PASS = "KisanSecure2026";

// --- Cloud Alert Webhook ---
const char* INTRUSION_WEBHOOK_URL = "http://api.kisanconnect.in/api/v1/security/intrusion";

// --- Hardware Pin Mappings ---
#define PIR_SENSOR_PIN     13  // Motion input from HC-SR501 PIR Sensor
#define BUZZER_ALARM_PIN   14  // Transistor-driven 12V siren/buzzer
#define STROBE_LIGHT_PIN   15  // High-intensity white LED flash
#define CAMERA_FLASH_PIN    4  // Built-in ESP32-CAM flash LED

// --- Camera Model: AI THINKER ESP32-CAM Pinout ---
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const char* PERIMETER_ZONE = "ZONE-EAST-ORCHARD";

void initCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_VGA; // 640x480
  config.jpeg_quality = 12;
  config.fb_count = 1;

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("❌ Camera init failed with error 0x%x\n", err);
  } else {
    Serial.println("📷 ESP32-CAM initialized successfully!");
  }
}

void triggerDeterrent() {
  Serial.println("🚨 [INTRUDER DETECTED] Triggering audio siren & deterrent strobe light!");
  // Flashing strobe & sound alarm for 3 seconds
  for (int i = 0; i < 6; i++) {
    digitalWrite(STROBE_LIGHT_PIN, HIGH);
    digitalWrite(BUZZER_ALARM_PIN, HIGH);
    delay(250);
    digitalWrite(STROBE_LIGHT_PIN, LOW);
    digitalWrite(BUZZER_ALARM_PIN, LOW);
    delay(250);
  }
}

void captureAndDispatchAlert() {
  camera_fb_t* fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("❌ Camera capture failed");
    return;
  }

  Serial.printf("📸 Image captured: %d bytes. Uploading alert to cloud...\n", fb->len);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(INTRUSION_WEBHOOK_URL);
    http.addHeader("Content-Type", "image/jpeg");
    http.addHeader("X-Zone-Id", PERIMETER_ZONE);

    int httpCode = http.POST(fb->buf, fb->len);
    if (httpCode > 0) {
      Serial.printf("✅ Security Webhook Response: %d\n", httpCode);
    } else {
      Serial.printf("❌ Error dispatching webhook: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  }

  esp_camera_fb_return(fb);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIR_SENSOR_PIN, INPUT);
  pinMode(BUZZER_ALARM_PIN, OUTPUT);
  pinMode(STROBE_LIGHT_PIN, OUTPUT);
  pinMode(CAMERA_FLASH_PIN, OUTPUT);

  digitalWrite(BUZZER_ALARM_PIN, LOW);
  digitalWrite(STROBE_LIGHT_PIN, LOW);

  Serial.println("\n================================================");
  Serial.println("  KisanConnect Farm Perimeter Guard Node v2.0  ");
  Serial.println("================================================");

  initCamera();

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to Security Network");
  while (WiFi.status() != WL_CONNECTED) {
    delay(400);
    Serial.print(".");
  }
  Serial.println("\n[Network] Perimeter Guard Connected! IP: " + WiFi.localIP().toString());
}

void loop() {
  int pirState = digitalRead(PIR_SENSOR_PIN);

  if (pirState == HIGH) {
    Serial.println("\n⚠️ Motion detected on perimeter fence line!");
    triggerDeterrent();
    captureAndDispatchAlert();
    delay(5000); // Debounce cooldown
  }

  delay(200);
}
