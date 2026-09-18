import { Badge } from '@/components/ui/badge'

type FeatureCardProps = {
  icon: React.ReactNode
  iconBackground: string
  iconColor: string
  badge: string
  badgeBackground: string
  badgeColor: string
  title: string
  description: string
  tags: string[]
}

export default function FeatureCard({
  icon,
  iconBackground,
  iconColor,
  badge,
  badgeBackground,
  badgeColor,
  title,
  description,
  tags,
}: FeatureCardProps) {
  return (
    <div
      className="
        flex h-full min-w-0 flex-col
        rounded-2xl border border-border/60
        bg-background p-5
        shadow-sm
        transition-shadow duration-200
        hover:shadow-md
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconBackground} ${iconColor}`}
        >
          {icon}
        </div>

        <Badge
          variant="secondary"
          className={`
            shrink-0 rounded-full
            border-0 px-2.5 py-1
            text-[10px] font-medium
            ${badgeBackground}
            ${badgeColor}
          `}
        >
          {badge}
        </Badge>
      </div>

      <div className="mt-5">
        <h3 className="text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-5">
        <div className="mb-4 h-px w-full bg-border/60" />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-md bg-muted
                px-2 py-1
                text-[10px] font-medium
                text-muted-foreground
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
