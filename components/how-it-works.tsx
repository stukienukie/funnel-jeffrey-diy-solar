const steps = [
  {
    number: '01',
    emoji: '📋',
    title: 'Take the 60-Second Quiz',
    description: "Tell us about your home, your energy goals, and your situation. Jeffrey reviews every submission personally before your call.",
  },
  {
    number: '02',
    emoji: '📞',
    title: 'Free System Design Call',
    description: "Jeffrey calls you to size your system, walk through your permit requirements, and explain exactly what your install will involve — no pressure, no guessing.",
  },
  {
    number: '03',
    emoji: '☀️',
    title: 'Install with Full Support',
    description: "You get a complete permit package, custom system design, procurement guidance, and hands-on installation support from start to utility sign-off.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-4 py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From confused to solar-powered in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-border" style={{ left: '60%', width: '80%' }} />
              )}

              <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mb-4 border border-primary/20">
                {step.emoji}
              </div>

              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                Step {index + 1}
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
