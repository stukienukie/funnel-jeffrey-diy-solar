import { TrendingUp, Compass, ScrollText, UserX } from 'lucide-react'

const pains = [
  {
    Icon: TrendingUp,
    headline: '$25,000–$40,000 just for a quote.',
    body: 'Before any incentives that may or may not apply to you.',
  },
  {
    Icon: Compass,
    headline: "You don't know where to begin.",
    body: 'Sizing, inverters, wiring — one wrong call costs thousands.',
  },
  {
    Icon: ScrollText,
    headline: 'Permits and utilities fight back.',
    body: 'Every county is different. Most DIYers quit right here.',
  },
  {
    Icon: UserX,
    headline: "Sales reps sell. They don't teach.",
    body: 'You get a manual and a pile of gear. No real support.',
  },
]

const costComparison = [
  { label: 'Grid Utility',     cost: '$0.18+', unit: '/kWh', sub: 'And rising every year',  highlight: false, bad: true  },
  { label: 'Contractor Solar', cost: '$0.10',  unit: '/kWh', sub: '$35,000+ installed',      highlight: false, bad: false },
  { label: 'DIY Solar Assist', cost: '$0.041', unit: '/kWh', sub: '$12,900 in equipment',    highlight: true,  bad: false },
]

export function ProblemSection() {
  return (
    <section className="px-4 py-14 bg-muted/40">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-6">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
            Sound Familiar?
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Most homeowners hit the same four walls before giving up.
          </p>
        </div>

        <div className="bg-background rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {pains.map(({ Icon, headline, body }) => (
            <div key={headline} className="flex items-center gap-4 px-5 py-5">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm md:text-base leading-snug mb-0.5">
                  {headline}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-center text-foreground font-medium text-lg mb-6">
            Here&apos;s what the numbers actually look like on a 10kW system over 25 years:
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {costComparison.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border p-2 md:p-4 text-center ${item.highlight ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}
              >
                <p className={`text-[10px] md:text-xs font-semibold uppercase tracking-tight md:tracking-wider mb-1 md:mb-2 leading-tight ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </p>
                <p className={`font-heading text-2xl md:text-4xl ${item.bad ? 'text-destructive' : item.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {item.cost}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground">{item.unit} lifetime</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1 leading-tight">{item.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-4">
            Based on 14,143 kWh/yr production, 0.5% annual degradation, 25-year system life.
          </p>
        </div>

      </div>
    </section>
  )
}
