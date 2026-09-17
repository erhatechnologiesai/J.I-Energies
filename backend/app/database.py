from supabase import create_client, Client
from backend.app.config import SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY

# Server client with service role key for backend operations
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# Public client
supabase_public: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def get_supabase_admin() -> Client:
    return supabase_admin

def get_supabase_public() -> Client:
    return supabase_public
