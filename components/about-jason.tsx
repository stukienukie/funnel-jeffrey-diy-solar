export function AboutJason() {
  return (
    <section className="px-4 py-14 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="shrink-0">
            <img
              src="/adam-about.jpg"
              alt="Adam Blair, owner of Avalon RV"
              className="w-44 h-44 rounded-2xl object-cover object-center shadow-md"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Meet Your Installer</p>
              <h2 className="text-2xl font-extrabold text-foreground">Adam Blair</h2>
              <p className="text-sm text-muted-foreground">Owner · Avalon RV · Benicia, CA</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">
              I&apos;ve been building and restoring RVs for over 20 years. As a Master Certified RV Technician and
              NABCEP-certified solar installer, I&apos;ve helped 10,000+ customers across Northern California
              get true off-grid power. Every system I build is one I&apos;d trust in my own rig.
            </p>

            <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-3">
              &ldquo;I was patient enough with a novice like me to explain everything he was doing so I could learn from him.&rdquo; — R.T., verified customer
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
