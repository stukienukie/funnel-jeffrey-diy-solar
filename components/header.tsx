import Image from 'next/image'

export function Header() {
  return (
    <header className="relative w-full overflow-hidden">
      <div className="relative w-full h-[460px] md:h-[620px]">
        <Image
          src="/jeffrey-hero-roof.webp"
          alt="DIY solar panels installed on residential home"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />

        <div className="absolute top-6 md:top-8 left-0 right-0 flex justify-center">
          <Image
            src="/jeffrey-logo.png"
            alt="DIY Solar Assist"
            width={320}
            height={80}
            priority
            className="h-12 md:h-16 w-auto drop-shadow-lg"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-center px-5 pb-8 md:pb-10">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4 backdrop-blur-sm">
            DIY Home Solar · Rome, NY · Serving All 50 States
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4 text-balance drop-shadow-sm">
            Go Solar for 60% Less —{' '}
            <span className="text-primary">Without Hiring a Contractor.</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto text-pretty leading-snug">
            NABCEP-certified expert guidance. Custom system design, permits handled, and full installation support — so you can do it yourself with confidence.
          </p>
        </div>
      </div>
    </header>
  )
}
