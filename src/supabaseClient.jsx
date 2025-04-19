import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://brvouavlowngywzprdiv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydm91YXZsb3duZ3l3enByZGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzU1NDYsImV4cCI6MjA2MDYxMTU0Nn0.aUsJTYMDZzNv3_dPP1CREtUDtcxHZJPDKVLRq2R62Aw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);