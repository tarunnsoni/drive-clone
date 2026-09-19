import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { auth } from '@clerk/tanstack-react-start/server'

export async function createClient() {
  const { getToken } = await auth()

  return createSupabaseClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_KEY!,
    {
      accessToken: async () => {
        return await getToken()
      },
    },
  )
}
