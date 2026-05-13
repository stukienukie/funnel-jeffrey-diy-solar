'use client'

const stats = [
  { number: '60%+', label: 'Avg. Savings vs. Contractors', isReview: false },
  { number: '5.0★', label: '9 Google Reviews', isReview: true },
  { number: 'NABCEP', label: 'Certified Solar Professional', isReview: false },
  { number: 'All 50', label: 'States Served Remotely', isReview: false },
]

export function StatsRow() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const inner = (
            <>
              <span className="font-heading text-4xl md:text-5xl text-primary stat-glow">
                {stat.number}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1 text-center leading-tight">
                {stat.label}
              </span>
            </>
          )

          const cls = 'flex flex-col items-center justify-center py-6 px-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all'

          return stat.isReview ? (
            <a key={stat.label} href="#google-reviews" className={`${cls} cursor-pointer`}>
              {inner}
            </a>
          ) : (
            <div key={stat.label} className={cls}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
