import { Cloud, FolderOpen, LockKeyhole, Search } from 'lucide-react'

import FeatureCard from '../common/features-card'

const features = [
  {
    icon: FolderOpen,
    iconBackground: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: 'Organization',
    badgeBackground: 'bg-blue-100',
    badgeColor: 'text-blue-700',
    title: 'Easy File Management',
    description:
      'Keep your documents and files organized in a clean workspace with simple folders and intuitive file management.',
    tags: ['Folders', 'File Management', 'Organization'],
  },
  {
    icon: LockKeyhole,
    iconBackground: 'bg-green-100',
    iconColor: 'text-green-600',
    badge: 'Security',
    badgeBackground: 'bg-green-100',
    badgeColor: 'text-green-700',
    title: 'Secure Storage',
    description:
      'Keep your important files protected with authentication and secure access controls.',
    tags: ['Private Files', 'Secure Access', 'Authentication'],
  },
  {
    icon: Search,
    iconBackground: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badge: 'Fast Search',
    badgeBackground: 'bg-amber-100',
    badgeColor: 'text-amber-700',
    title: 'Find Files Quickly',
    description:
      'Search through your stored files quickly so you can spend less time looking and more time getting things done.',
    tags: ['File Search', 'Quick Access', 'Filters'],
  },
  {
    icon: Cloud,
    iconBackground: 'bg-slate-100',
    iconColor: 'text-slate-600',
    badge: 'Anywhere',
    badgeBackground: 'bg-slate-100',
    badgeColor: 'text-slate-700',
    title: 'Access Anywhere',
    description:
      'Access your files from your devices wherever you are, with a workspace designed for a smooth experience.',
    tags: ['Cloud Storage', 'Responsive', 'Anywhere'],
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="
        w-full
        px-4 pt-6 pb-8
        sm:px-6 sm:pt-8 sm:pb-10
        lg:pt-10 lg:pb-14
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="
              inline-flex items-center
              rounded-full bg-primary/10
              px-3 py-1.5
              text-[11px] font-semibold
              uppercase tracking-wide text-primary
            "
          >
            Core Capabilities
          </span>

          <h2
            className="
              mt-5 text-3xl font-bold tracking-tight
              sm:text-4xl lg:text-5xl
            "
          >
            Everything you need to manage your files
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-xl
              text-sm leading-6 text-muted-foreground
              sm:text-base sm:leading-7
            "
          >
            A simple workspace for storing, organizing, finding, and accessing
            your files from anywhere.
          </p>
        </div>

        {/* Feature Grid */}
        <div
          className="
            mt-10 grid gap-4
            sm:mt-12 sm:grid-cols-2
            lg:grid-cols-4 lg:gap-5
          "
        >
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <FeatureCard
                key={feature.title}
                icon={<Icon className="size-5" />}
                iconBackground={feature.iconBackground}
                iconColor={feature.iconColor}
                badge={feature.badge}
                badgeBackground={feature.badgeBackground}
                badgeColor={feature.badgeColor}
                title={feature.title}
                description={feature.description}
                tags={feature.tags}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
