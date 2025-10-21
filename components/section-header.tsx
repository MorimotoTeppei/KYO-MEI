import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  description?: string
  accentColor?: string
}

export function SectionHeader({ icon: Icon, title, description, accentColor = "#F4C300" }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="w-6 h-6" style={{ color: accentColor }} />}
        <h2 className="text-2xl font-black text-black">{title}</h2>
      </div>
      <div className="h-1 w-16 rounded-full" style={{ backgroundColor: accentColor }} />
      {description && <p className="text-sm text-gray-600 mt-2">{description}</p>}
    </div>
  )
}
