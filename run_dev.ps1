# JIENERGIES - Run Development Servers (Backend & Frontend)
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Starting JIENERGIES Production Solar Energy Platform" -ForegroundColor Yellow
Write-Host " Clean Energy. Brighter Future." -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

# Check Python Virtual Environment
if (-not (Test-Path ".venv\Scripts\python.exe")) {
    Write-Host "Creating Python .venv..." -ForegroundColor Yellow
    python -m venv .venv
    .\.venv\Scripts\pip install -r backend/requirements.txt
}

# Start Backend API in background process
Write-Host "`n[1/2] Starting FastAPI Backend on http://localhost:8000..." -ForegroundColor Green
Start-Process -FilePath ".\.venv\Scripts\python.exe" -ArgumentList "-m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload"

# Start Next.js Frontend
Write-Host "[2/2] Starting Next.js Frontend on http://localhost:3000..." -ForegroundColor Green
Set-Location frontend
npm run dev
