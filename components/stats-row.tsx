'use client'

const stats = [
  { number: '10,000+', label: 'Happy Customers', isReview: false },
  { number: '4.9★', label: '100+ Google Reviews', isReview: true },
  { number: '20+', label: 'Years in Business', isReview: false },
  { number: '#1', label: 'In Northern California', isReview: false },
]

export function StatsRow() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 border border-border rounded-xl overflow-hidden">
        {stats.map((stat, index) => {
          const isLeftCol = index % 2 === 0
          const isTopRow = index < 2
          const isLastDesktop = index === stats.length - 1

          const cls = [
            'flex flex-col items-center justify-center p-5 md:p-6',
            isLeftCol ? 'border-r border-border' : '',
            isTopRow ? 'border-b md:border-b-0 border-border' : '',
            !isLastDesktop ? 'md:border-r border-border' : '',
          ].join(' ')

          const inner = (
            <>
              <span className="font-heading text-3xl md:text-4xl text-primary">
                {stat.number}
              </span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground mt-1 text-center leading-tight">
                {stat.label}
              </span>
            </>
          )

          return stat.isReview ? (
            <a
              key={stat.label}
              href="#google-reviews"
              className={`${cls} cursor-pointer hover:bg-muted/40 transition-colors`}
            >
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
