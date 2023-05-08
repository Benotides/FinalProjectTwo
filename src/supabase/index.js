import { createClient } from '@supabase/supabase-js'
const baseUrl = 'https://xlugwvyjhuavmdjuxkpc.supabase.co'
const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdWd3dnlqaHVhdm1kanV4a3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MDI2NzksImV4cCI6MTk5NzQ3ODY3OX0.2nLfIBQyYjA811fX2IEuEPxWHpYy8mnLUvcW_6RArMk'
export default createClient(baseUrl, apiKey)
