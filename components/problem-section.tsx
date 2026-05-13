const pains = [
  {
    emoji: '💸',
    headline: "Contractors quoted you $25,000–$40,000.",
    body: "And that's before incentives that may or may not apply to you. You know solar makes sense — you just can't justify paying someone else's markup.",
  },
  {
    emoji: '😵',
    headline: "You don't know where to start.",
    body: "System sizing, inverters, panels, permits, utility interconnection — it's a lot. One wrong decision and you've wasted thousands.",
  },
  {
    emoji: '🏛️',
    headline: "Permits and utilities feel like a maze.",
    body: "Every county is different. Utilities push back. Inspectors want specific drawings. Most DIYers get stuck here and give up.",
  },
  {
    emoji: '🤝',
    headline: "Sales reps don't actually help you.",
    body: "They'll sell you a system. They won't teach you the process. You're left holding a manual and a pile of equipment with no real support.",
  },
]

export function ProblemSection() {
  return (
    <section className="px-4 py-14 bg-muted/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            Sound Familiar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            If you&apos;ve looked into solar and walked away frustrated, you&apos;re not alone. Here&apos;s what most homeowners run into.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pains.map((pain) => (
            <div
              key={pain.headline}
              className="bg-background rounded-xl border border-border p-6"
            >
              <div className="text-3xl mb-3">{pain.emoji}</div>
              <h3 className="font-semibold text-foreground mb-2">{pain.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pain.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-center text-foreground font-medium text-lg mb-6">
            Here&apos;s what the numbers actually look like on a 10kW system over 25 years:
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {[
              { label: 'Grid Utility', cost: '$1.00+', unit: '/kWh', sub: 'And rising every year', highlight: false, bad: true },
              { label: 'Contractor Solar', cost: '$0.15', unit: '/kWh', sub: '$35,000+ installed', highlight: false, bad: false },
              { label: 'DIY Solar Assist', cost: '$0.041', unit: '/kWh', sub: '$12,900 in equipment', highlight: true, bad: false },
            ].map((item) => (
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
