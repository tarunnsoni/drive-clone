import { FolderOpen, HardDriveUpload, MousePointerClick } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import FeatureCard from '#/components/common/features-card'

const steps = [
  {
    icon: HardDriveUpload,
    iconBackground: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: '01',
    badgeBackground: 'bg-blue-100',
    badgeColor: 'text-blue-700',
    eyebrow: 'Step 01 • Upload',
    title: 'Add your files',
    description:
      'Upload your documents, images, and other important files directly to your CloudVault workspace.',
    tags: ['File Upload', 'Multiple Files', 'Cloud Storage'],
  },
  {
    icon: FolderOpen,
    iconBackground: 'bg-green-100',
    iconColor: 'text-green-600',
    badge: '02',
    badgeBackground: 'bg-green-100',
    badgeColor: 'text-green-700',
    eyebrow: 'Step 02 • Organize',
    title: 'Keep everything organized',
    description:
      'Create folders and arrange your files into a structure that makes everything easier to find.',
    tags: ['Folders', 'File Management', 'Organization'],
  },
  {
    icon: MousePointerClick,
    iconBackground: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badge: '03',
    badgeBackground: 'bg-amber-100',
    badgeColor: 'text-amber-700',
    eyebrow: 'Step 03 • Access',
    title: 'Manage your files',
    description:
      'Open, download, rename, or remove your files whenever you need to manage your workspace.',
    tags: ['Quick Access', 'Download', 'File Actions'],
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="
        w-full
        px-4 py-10
        sm:px-6 sm:py-12
        lg:py-14
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="
              rounded-full border-0
              bg-primary/10
              px-3 py-1.5
              text-[10px] font-semibold
              uppercase tracking-wide text-primary
            "
          >
            How It Works
          </Badge>

          <h2
            className="
              mt-4 text-3xl font-bold tracking-tight
              sm:text-4xl lg:text-5xl
            "
          >
            Simple from upload to access
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-sm leading-6 text-muted-foreground
              sm:text-base sm:leading-7
            "
          >
            Store your files, keep them organized, and access everything from
            one simple workspace.
          </p>
        </div>

        {/* Steps */}
        <div
          className="
            mt-8 grid gap-4
            sm:mt-10 sm:grid-cols-2
            lg:grid-cols-3 lg:gap-5
          "
        >
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <FeatureCard
                key={step.badge}
                icon={<Icon className="size-5" />}
                iconBackground={step.iconBackground}
                iconColor={step.iconColor}
                badge={step.badge}
                badgeBackground={step.badgeBackground}
                badgeColor={step.badgeColor}
                eyebrow={step.eyebrow}
                title={step.title}
                description={step.description}
                tags={step.tags}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
