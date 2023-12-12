import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ahxbeptbanffufjjzigr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoeGJlcHRiYW5mZnVmamp6aWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNzM1NDMsImV4cCI6MjAxNzk0OTU0M30.QeFD3W5TTbuagAS5dyMSI7uJIUa5l7QaJ32oJF7jHQ0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
