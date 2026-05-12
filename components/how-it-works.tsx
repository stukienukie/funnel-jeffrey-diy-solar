const steps = [
  {
    number: '01',
    emoji: '⚡',
    title: 'Take the 60-Second Quiz',
    description: "Tell us about your RV, how you use it, and what you want to power. We'll match you to the right system instantly.",
  },
  {
    number: '02',
    emoji: '📞',
    title: 'Free Consultation Call',
    description: "Adam calls you personally to understand your rig and goals. A quick shop visit in Benicia lets us design exactly the right system for you.",
  },
  {
    number: '03',
    emoji: '🔧',
    title: 'Professional Installation',
    description: "Our Master Certified team handles everything. Most builds are done in 2–3 weeks — you'll know the full timeline before we get started.",
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
            From curious to fully off-grid in 3 simple steps
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
