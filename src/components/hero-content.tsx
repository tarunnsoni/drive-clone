import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Cloud, LockKeyhole } from 'lucide-react'

export default function HeroContent() {
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        <Badge
          variant="secondary"
          className="
            rounded-full
            border border-blue-200
            bg-blue-100
            px-3 py-1.5
            text-blue-700
            hover:bg-blue-100
          "
        >
          <Cloud className="size-3.5" />
          Free & Simple
        </Badge>

        <Badge
          variant="secondary"
          className="
            rounded-full
            border border-green-200
            bg-green-100
            px-3 py-1.5
            text-green-700
            hover:bg-green-100
          "
        >
          <LockKeyhole className="size-3.5" />
          End-to-End Encrypted
        </Badge>
      </div>

      <h1
        className="
          max-w-3xl
          text-4xl font-bold tracking-tight
          text-foreground
          sm:text-5xl
          lg:text-6xl
          xl:text-7xl
        "
      >
        Secure cloud storage for all your files & memories.
      </h1>

      <p
        className="
          mt-5
          max-w-2xl
          text-base leading-7
          text-muted-foreground
          sm:mt-6
          sm:text-lg
          sm:leading-8
        "
      >
        Store, organize, and access your files from anywhere. Keep your
        documents, images, and important files organized in one secure and
        easy-to-use workspace.
      </p>

      <div
        className="
          mt-7
          flex flex-col gap-3
          sm:mt-8
          sm:flex-row
        "
      >
        <Button
          size="lg"
          className="
            h-12
            rounded-full
            px-7
            text-base
            shadow-md
            sm:h-13
          "
        >
          Get Started Free
          <ArrowRight className="size-4" />
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="
            h-12
            rounded-full
            px-7
            text-base
            sm:h-13
          "
        >
          Sign In to Drive
        </Button>
      </div>
    </div>
  )
}
