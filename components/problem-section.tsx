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

        <div className="mt-10 text-center">
          <p className="text-foreground font-medium text-lg">
            There&apos;s a better way — and it doesn&apos;t require hiring a $40,000 contractor.
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            With the right guidance, a DIY solar install is entirely achievable. Jeffrey has helped hundreds of homeowners do exactly that.
          </p>
        </div>
      </div>
    </section>
  )
}
