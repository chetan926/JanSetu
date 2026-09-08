# SIH 2026 PS-129 — National Interoperability Gateway Platform

**Unified Government Interoperability Platform connecting Fragmented Department Systems for Zero-Document Scheme Application Workflows.**

---

## 🏛️ 12 Connected Government Departments & Services

1. **🌾 Agriculture Department:** PM Kisan & Crop Fertilizer Subsidy Scheme (Farmer schemes, Crop services, Subsidies)
2. **🎓 Higher & Technical Education Department:** Higher Education Scholarship Scheme 2026 (Scholarships, Student services)
3. **🏫 School Education & Sports Department:** Kanya Vidya Dhan & Free Textbook Scheme (School services, Student schemes)
4. **🏥 Public Health Department:** Ayushman Universal Health Protection Grant (Health schemes, Public health services)
5. **👩‍👧 Women & Child Development Department:** Ladki Bahin Women Welfare & Self-Reliance Grant (Women welfare, Child schemes)
6. **🏠 Housing Department:** PMAY Urban & Rural Affordable Housing Grant (Housing schemes, Housing applications)
7. **🌾 Rural Development Department:** MNREGA Village Infrastructure & Job Guarantee (Rural schemes, Village development)
8. **🏙️ Urban Development Department:** PM SVANidhi Street Vendor Subsidy (Urban services, Municipal services)
9. **💼 Labour Department:** Unorganized Workers Pension & Safety Net (Worker services, Employment schemes)
10. **🚗 Transport / Motor Vehicles Department:** Digital Smart Driving License & Vehicle RC Renewal (Driving licence, Vehicle RC)
11. **🍚 Food, Civil Supplies & Consumer Protection:** Smart Antyodaya Ration Card & Grain Allotment (Ration card, Food services)
12. **🌳 Revenue & Forest Department:** 7/12 Land Record Extraction & Income/Caste Certificate (Land records, Certificates, Revenue)

---

## 🏛️ Architecture & End-to-End Core Workflow

```text
Citizen (Ravi Kumar) 
    │
    ▼
React + Vite + TypeScript Glass Interface
    │
    ▼
Consent Manager (Explicit Department Authorization)
    │
    ▼
FastAPI Interoperability Gateway (Orchestrating 12 Department APIs)
    │
    ▼
Schema Transformation Layer ──► Canonical Model v1.0
    │
    ▼
Deterministic Eligibility Engine (Explainable Checks)
    │
    ▼
Application Submission & Idempotency Key Engine
    │
    ▼
PostgreSQL / SQLite Database + Audit Trace System
```

---

## 🛠️ Quick Start Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Run Backend Server
```bash
cd backend
py -m pip install -r requirements.txt
py -m app.core.init_db
py -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
- **API Documentation (Swagger):** `http://127.0.0.1:8000/docs`
- **Health Endpoint:** `http://127.0.0.1:8000/api/health`

### 2. Run Frontend Web Application
```bash
cd frontend
npm install
npm run dev
```
- Open browser at `http://localhost:5173`

---

## 🐳 Docker Deployment
To launch the entire platform with one command:
```bash
docker-compose up --build
```
