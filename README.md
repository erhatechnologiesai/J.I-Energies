# JIENERGIES • Solar Energy & Power Solutions (Pakistan)

> **Clean Energy. Brighter Future.**  
> Official production-grade solar energy platform engineered in accordance with the **JIENERGIES Full Branding & Digital Identity Report** (19 pages) and live Supabase PostgreSQL infrastructure.

---

## 1. System Architecture

The project is architected into two decoupled production-grade tiers:

### Frontend (Next.js 14 + TypeScript + Tailwind CSS)
- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Design System**: Exact brand colors (`#0B2D5B` Navy, `#FFC107` Solar Yellow, `#22A559` Energy Green, `#F5F7FA` Off-White)
- **Typography**: Montserrat (Headings) + Inter (Data & Body)
- **Components**:
  - `SolarCalculator.tsx`: Real-time interactive DISCO bill & system sizer (LESCO, IESCO, K-Electric, FESCO, MEPCO, GEPCO, PESCO)
  - `Logo.tsx`: Custom vector SVG logo supporting Horizontal, Dark, Light, Icon, and Monochrome modes
  - `Navbar.tsx` & `Footer.tsx`: Corporate header with emergency numbers, top micro-bar, branch locations, and WAPDA trust indicators
  - `MobileBottomBar.tsx` & `WhatsAppFloatingButton.tsx`: Thumb-friendly mobile navigation and pulsing WhatsApp lead trigger
- **Core Pages**:
  - `/` — Homepage Blueprint with live calculator, trust pillars, services grid, and verified before/after bill stories
  - `/solutions` — Residential (3-15kW), Commercial (20-100kW), Industrial (100kW-1MW+), and Net Metering Guide
  - `/products` — Alps Solar TOPCon 585W/610W modules, inverters, LiFePO4 batteries, and mounting structures
  - `/projects` — Real installation portfolio across Lahore, Karachi, Islamabad, and Faisalabad
  - `/calculator` — Standalone full-screen solar ROI calculation tool
  - `/quote` — 4-Step conversion funnel with live Supabase lead capture, on-screen proposal preview, and PDF export
  - `/blog` — 5 Brand content pillars (Education, Savings, Projects, Products, Trust)
  - `/contact` — Office branch cards, inquiry form, and FAQ accordion
  - `/admin` — Lead CRM pipeline (New, Contacted, Survey Scheduled, Proposal Sent, Won) with one-click WhatsApp contact

### Backend (Python 3.11 Virtual Environment + FastAPI)
- **Runtime**: Dedicated `.venv` virtual environment
- **Framework**: FastAPI + Uvicorn ASGI server
- **Modules**:
  - `solar_engine.py`: Pakistan DISCO tariff modeling, solar irradiance math, kW sizing, payback calculations
  - `pdf_generator.py`: ReportLab proposal PDF generator matching Page 16 of the Branding Report
  - `leads.py`: Lead ingestion, status updates, and Supabase database synchronization
  - `products.py` & `projects.py`: Dynamic database catalog endpoints

---

## 2. Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm

### One-Click Startup (PowerShell)
```powershell
.\run_dev.ps1
```

### Manual Startup

#### 1. Backend Service
```powershell
# Activate Virtual Environment
.\.venv\Scripts\Activate.ps1

# Start FastAPI server
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
- API Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)
- Swagger Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

#### 2. Frontend Web Application
```powershell
cd frontend
npm run dev
```
- Web Application: [http://localhost:3000](http://localhost:3000)
- Production Build: `npm run build`

---

## 3. Database Credentials & Supabase
Credentials configured from `details.txt`:
- Supabase REST URL: `https://mxjnmzqlvddwvcxgxvdf.supabase.co`
- Tables seeded: `leads`, `products`, `projects`
- Seed Script: `python seed_database.py`
