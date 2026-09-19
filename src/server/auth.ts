import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'

export const getCurrentUserId = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('Unauthenticated')
    }

    return userId
  },
)
