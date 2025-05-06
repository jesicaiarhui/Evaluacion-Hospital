// Importamos Supabase desde la librería
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Conexión a Supabase
const supabaseUrl = 'https://inchfdbvmyqotjqxfdux.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluY2hmZGJ2bXlxb3RqcXhmZHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTQ1OTUsImV4cCI6MjA2MTA3MDU5NX0.-UqT5w90WlXR_C6VDCUQaTmhm-upbK-FyqJVrB47xaE'; // Reemplaza con tu clave pública de anon de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Exportamos el cliente de Supabase para que se pueda usar en otros archivos
export { supabase };
