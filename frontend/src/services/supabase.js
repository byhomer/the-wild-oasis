import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://affejlibtxiccjhrqlak.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZmVqbGlidHhpY2NqaHJxbGFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzU3ODMsImV4cCI6MjAxNjYxMTc4M30.6jyL01A13cKjB70utoOP6lXA5zggFX4ZO1tBfN_u4N8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
