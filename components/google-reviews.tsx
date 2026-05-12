import { Star } from 'lucide-react'

const reviews = [
  {
    initials: 'RH',
    name: 'Rick Higgs',
    date: '7 months ago',
    text: 'Last week had Adam and his team convert my standard battery system over to lithium batteries hooked into my solar on my Class C RV. Adam was awesome to work with and explained everything that was needed for this switch and then the techs did an excellent job doing the work. Adam was excellent in communicating how the work was going and delivered on time. If I could give Avalon RV a 10 star rating they earned it!',
  },
  {
    initials: 'BE',
    name: 'Bob Entwisle',
    date: '8 months ago',
    text: 'I own a 2023 Thor Gemini motorhome. Since purchasing it, I have not been able to spend a night boondocking because the battery didn\'t have enough power even to run the fridge overnight. I contacted Adam about installing Lithium batteries and upgrading my 50-watt solar panel. He came up with a plan, answered dozens of my questions, and in 4 days installed the new setup. I could not be happier with the results and with Adam and his team\'s attention to detail.',
  },
  {
    initials: 'JD',
    name: 'JJ Drinkwater',
    date: '2 years ago',
    text: 'Avalon has worked on my beloved vintage Airstream twice, and they\'ve done expert work both times: solar power, electrical system, plumbing, propane, on-demand hot water... Adam is terrifically knowledgeable, conscientious, thorough, and possessed of a fabulous eye for detail. They are not the cheapest option, but their meticulous way of working and the splendid results are totally worth what they charge.',
  },
]

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export function GoogleReviews() {
  return (
    <section id="google-reviews" className="px-4 py-12 scroll-mt-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-1 mb-8">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-foreground font-semibold">Excellent on Google</p>
          <p className="text-sm text-muted-foreground">4.9 out of 5 based on 100+ reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-medium text-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground truncate">{review.name}</span>
                    <GoogleLogo />
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
