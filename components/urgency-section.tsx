import { Clock, CalendarX, Zap } from 'lucide-react'

const signals = [
  {
    icon: Clock,
    headline: "Jeffrey's consultation slots fill up fast.",
    body: "He works with a limited number of clients at a time so every homeowner gets real attention. Spots go to whoever books first.",
  },
  {
    icon: CalendarX,
    headline: 'Permits take time — start now.',
    body: "Most counties take 4–8 weeks to approve a solar permit. Every month you wait is another month of full electricity bills.",
  },
  {
    icon: Zap,
    headline: 'The 30% federal tax credit has a deadline.',
    body: "The ITC is available now, but you need to have your system installed and operational within the tax year to claim it. Don't leave thousands on the table.",
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
            Every Month You Wait Is Money Lost
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The longer you stay on the grid, the more you pay. Your system starts paying you back the day it turns on.
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
