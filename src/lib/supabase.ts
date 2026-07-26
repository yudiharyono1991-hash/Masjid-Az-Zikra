import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(url?: string, anonKey?: string): SupabaseClient | null {
  const finalUrl = url || import.meta.env.VITE_SUPABASE_URL;
  const finalKey = anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!finalUrl || !finalKey || finalUrl === 'MY_SUPABASE_URL') {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(finalUrl, finalKey);
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      return null;
    }
  }

  return supabaseInstance;
}

export function isSupabaseConfigured(url?: string, anonKey?: string): boolean {
  const finalUrl = url || import.meta.env.VITE_SUPABASE_URL;
  const finalKey = anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;
  return Boolean(finalUrl && finalKey && finalUrl !== 'MY_SUPABASE_URL');
}
