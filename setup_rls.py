import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL", "")

try:
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cur = conn.cursor()
    
    print("Connected to PostgreSQL database successfully!")
    
    # Drop existing policies if any
    cur.execute("""
        DROP POLICY IF EXISTS "Enable insert for all users" ON leads;
        DROP POLICY IF EXISTS "Enable select for all users" ON leads;
        DROP POLICY IF EXISTS "Enable update for all users" ON leads;
        DROP POLICY IF EXISTS "Allow public insert on leads" ON leads;
        DROP POLICY IF EXISTS "Allow public select on leads" ON leads;
    """)
    
    # Enable RLS and create public policies for leads
    cur.execute("""
        ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable insert for all users" ON leads FOR INSERT WITH CHECK (true);
        CREATE POLICY "Enable select for all users" ON leads FOR SELECT USING (true);
        CREATE POLICY "Enable update for all users" ON leads FOR UPDATE USING (true);
    """)
    print("Created RLS policies on 'leads' table successfully!")
    
    # Verify policy
    cur.execute("""
        SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
        FROM pg_policies WHERE tablename = 'leads';
    """)
    rows = cur.fetchall()
    print("Active policies on leads:")
    for r in rows:
        print(" ", r)
        
    cur.close()
    conn.close()
except Exception as e:
    print("PostgreSQL error:", e)
