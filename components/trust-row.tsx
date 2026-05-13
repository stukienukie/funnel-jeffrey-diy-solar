import { Award, MapPin, Phone } from 'lucide-react'

const trustItems = [
  { icon: Award, text: 'NABCEP Certified — Installation & Sales' },
  { icon: MapPin, text: 'Rome, NY · Serving All 50 States' },
  { icon: Phone, text: 'Free System Design Consultation' },
]

export function TrustRow() {
  return (
    <section className="px-4 py-6">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {trustItems.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
            <item.icon className="w-4 h-4 text-secondary" />
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
