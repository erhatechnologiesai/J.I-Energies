import os
from supabase import create_client

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) if SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY else None

products_data = [
    {
        "name": "Alps Solar TOPCon 585W Bifacial Module",
        "category": "Solar Panels",
        "brand": "Alps Solar",
        "capacity_rating": "585W (22.6% Efficiency)",
        "warranty_years": 25,
        "datasheet_url": "/datasheets/alps-solar-585w.pdf",
        "image_url": "/images/products/alps-solar-585w.png"
    },
    {
        "name": "Alps Solar N-Type Mono 610W Ultra",
        "category": "Solar Panels",
        "brand": "Alps Solar",
        "capacity_rating": "610W (22.8% Efficiency)",
        "warranty_years": 30,
        "datasheet_url": "/datasheets/alps-solar-610w.pdf",
        "image_url": "/images/products/alps-solar-610w.png"
    },
    {
        "name": "Tier-1 10kW Three-Phase Hybrid Inverter",
        "category": "Inverters",
        "brand": "Tier-1 Partner",
        "capacity_rating": "10kW Dual MPPT 48V/HV",
        "warranty_years": 5,
        "datasheet_url": "/datasheets/inverter-10kw.pdf",
        "image_url": "/images/products/inverter-10kw.png"
    },
    {
        "name": "Tier-1 50kW Commercial On-Grid Inverter",
        "category": "Inverters",
        "brand": "Tier-1 Partner",
        "capacity_rating": "50kW Quad MPPT 98.8% Efficiency",
        "warranty_years": 10,
        "datasheet_url": "/datasheets/inverter-50kw.pdf",
        "image_url": "/images/products/inverter-50kw.png"
    },
    {
        "name": "JIENERGIES LiFePO4 Energy Wall 10kWh",
        "category": "Batteries",
        "brand": "JIENERGIES Power",
        "capacity_rating": "10.24 kWh / 200Ah 51.2V",
        "warranty_years": 10,
        "datasheet_url": "/datasheets/lifepo4-10kwh.pdf",
        "image_url": "/images/products/battery-10kwh.png"
    },
    {
        "name": "Elevated Galvanized Steel Mounting Frame (L2/L3)",
        "category": "Mounting & Structure",
        "brand": "JIENERGIES Engineered",
        "capacity_rating": "Wind Load 150 km/h Certified",
        "warranty_years": 15,
        "datasheet_url": "/datasheets/structure-spec.pdf",
        "image_url": "/images/products/mounting-structure.png"
    }
]

projects_data = [
    {
        "title": "15kW Residential On-Grid & Net Metering",
        "category": "Residential",
        "capacity_kw": 15.0,
        "location": "DHA Phase 6, Lahore",
        "image_url": "/images/projects/project-15kw-dha.png",
        "completion_date": "2024-03-15",
        "featured": True
    },
    {
        "title": "15kW On-Grid Residential Solar Villa",
        "category": "Residential",
        "capacity_kw": 15.0,
        "location": "DHA Multan, Multan",
        "image_url": "/images/projects/project-10kw-bahria.png",
        "completion_date": "2024-05-20",
        "featured": True
    },
    {
        "title": "60kW Commercial Rooftop Solar Plant",
        "category": "Commercial",
        "capacity_kw": 60.0,
        "location": "Civil Lines, Khanewal",
        "image_url": "/images/projects/project-60kw-gulberg.png",
        "completion_date": "2024-02-10",
        "featured": True
    },
    {
        "title": "250kW Industrial Solar Plant (Textile Unit)",
        "category": "Industrial",
        "capacity_kw": 250.0,
        "location": "Industrial Area, Vehari",
        "image_url": "/images/projects/project-250kw-karachi.png",
        "completion_date": "2024-06-01",
        "featured": True
    },
    {
        "title": "35kW Educational Campus Solar System",
        "category": "Commercial",
        "capacity_kw": 35.0,
        "location": "Bahawalpur Cantt, Bahawalpur",
        "image_url": "/images/projects/project-35kw-faisalabad.png",
        "completion_date": "2024-04-12",
        "featured": False
    },
    {
        "title": "500kW Agricultural & Cold Storage Solar Facility",
        "category": "Industrial",
        "capacity_kw": 500.0,
        "location": "Multan Industrial Estate",
        "image_url": "/images/projects/project-500kw-multan.png",
        "completion_date": "2024-01-25",
        "featured": False
    }
]

print("Updating products in Supabase...")
client.table("products").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
p_res = client.table("products").insert(products_data).execute()
print(f"Updated {len(p_res.data)} products.")

print("Updating projects in Supabase...")
client.table("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
pr_res = client.table("projects").insert(projects_data).execute()
print(f"Updated {len(pr_res.data)} projects.")

print("Database update complete!")
