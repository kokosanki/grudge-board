import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_DOMAIN}.supabase.co`,
  String(import.meta.env.VITE_SUPABASE_KEY),
);