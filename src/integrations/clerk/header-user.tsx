import { Show, SignInButton, UserButton } from '@clerk/tanstack-react-start'
import { Button } from '@/components/ui/button'

export default function HeaderUser() {
  return (
    <>
      <Show when="signed-in">
        <UserButton />
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal" forceRedirectUrl={'/drive'}>
          <Button
            variant="ghost"
            className="h-8 shrink-0 px-2 text-xs font-medium sm:h-10 sm:px-5 sm:text-sm"
          >
            Sign In
          </Button>
        </SignInButton>
      </Show>
    </>
  )
}
