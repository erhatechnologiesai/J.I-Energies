import os
from pathlib import Path
from dotenv import load_dotenv

# Load details.txt or .env if present
base_dir = Path(__file__).resolve().parent.parent.parent
env_file = base_dir / "details.txt"
if env_file.exists():
    load_dotenv(env_file)
else:
    load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
DATABASE_URL = os.getenv("DATABASE_URL", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")


# Brand constants
BRAND_NAME = "J.I ENERGIES"
DESCRIPTOR = "Solar Energy & Power Solutions"
TAGLINE = "Clean Energy. Brighter Future."
SUPPORT_PHONE = "+92 302 3333499"
SUPPORT_WHATSAPP = "923023333499"
SUPPORT_EMAIL = "info@jienergies.com"
PRIMARY_COLOR = "#0B2D5B"
SECONDARY_COLOR = "#FFC107"
ACCENT_COLOR = "#22A559"
HEAD_OFFICE_ADDRESS = "MA Jinnah Road, Multan, Pakistan"
GOOGLE_MAPS_URL = "https://www.google.com/maps/place/30%C2%B013'27.3%22N+71%C2%B030'54.5%22E/@30.2248076,71.5088609,16.33z/data=!4m4!3m3!8m2!3d30.2242589!4d71.5151427"

