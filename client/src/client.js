import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    'https://lvysncbtfhncihdgxlvc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2eXNuY2J0ZmhuY2loZGd4bHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1OTMzNzksImV4cCI6MjA1NDE2OTM3OX0.bM2hXeHcXJ30faFeqMSRVOxvP7B1sqrC352CHa7kLoI'
);

export default supabase;
