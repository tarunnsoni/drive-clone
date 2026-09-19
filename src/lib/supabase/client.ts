import { createClient } from '@supabase/supabase-js'

export function createBrowserSupabaseClient(
  getToken: () => Promise<string | null>,
) {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
    {
      accessToken: getToken,
    },
  )
}
