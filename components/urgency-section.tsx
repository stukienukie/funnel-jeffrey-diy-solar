import { Clock, CalendarX, Zap } from 'lucide-react'

const signals = [
  {
    icon: Clock,
    headline: "Avalon RV's calendar books out fast.",
    body: "We typically schedule 2–3 weeks out. The sooner you get on the calendar, the sooner you're running on clean solar power.",
  },
  {
    icon: CalendarX,
    headline: 'Limited install slots each week.',
    body: "Every job gets our full focused attention. That means limited spots — and they go to whoever books first.",
  },
  {
    icon: Zap,
    headline: "Summer is peak season.",
    body: "Demand spikes when RV season hits. Don't wait until you need it — book now so your system is ready before your next trip.",
  },
]

export function UrgencySection() {
  return (
    <section className="px-4 py-14">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            ⚠️ Limited Availability
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            Don&apos;t Wait Until Your Next Trip
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every week you wait is another week of generator noise, hookup fees, and missed boondocking spots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {signals.map((signal) => (
            <div
              key={signal.headline}
              className="bg-card rounded-xl border border-border p-6 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <signal.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{signal.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{signal.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
