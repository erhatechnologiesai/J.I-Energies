from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import BRAND_NAME, DESCRIPTOR, TAGLINE
from backend.app.routes import calculator, leads, proposals, products, projects, chat

app = FastAPI(
    title=f"{BRAND_NAME} API",
    description=f"{DESCRIPTOR} — {TAGLINE}. Production API for Solar Sizing, CRM, Proposals, and Product Catalog.",
    version="1.0.0"
)

# Enable CORS for frontend client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(calculator.router)
app.include_router(leads.router)
app.include_router(proposals.router)
app.include_router(products.router)
app.include_router(projects.router)
app.include_router(chat.router)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": f"Welcome to {BRAND_NAME} API ({DESCRIPTOR})",
        "tagline": TAGLINE,
        "status": "online",
        "docs_url": "/docs",
        "health_check": "/api/health",
        "frontend_url": "http://localhost:3000"
    }

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "brand": BRAND_NAME,
        "descriptor": DESCRIPTOR,
        "tagline": TAGLINE,
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
