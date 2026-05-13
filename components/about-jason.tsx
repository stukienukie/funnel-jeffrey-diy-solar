export function AboutJason() {
  return (
    <section className="px-4 py-14 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="shrink-0">
            <img
              src="/jeffrey-about.png"
              alt="Jeffrey, owner of DIY Solar Assist"
              className="w-44 h-44 rounded-2xl object-cover object-center shadow-md"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Meet Your Guide</p>
              <h2 className="text-2xl font-extrabold text-foreground">Jeffrey R. Jankiewicz</h2>
              <p className="text-sm text-muted-foreground">Owner · DIY Solar Assist · Rome, NY</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">
              I hold dual NABCEP certifications — in both PV Installation and PV Sales — and I&apos;ve helped homeowners across all 50 states
              design, permit, and install their own solar systems for a fraction of what contractors charge.
              My goal is simple: give you contractor-level expertise so you can do it yourself with total confidence.
            </p>

            <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-3">
              &ldquo;Jeffrey walked me through every step — design, permits, utility hookup. I saved over $18,000 compared to the quotes I got.&rdquo; — M.K., verified customer
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
