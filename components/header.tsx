import Image from 'next/image'

export function Header() {
  return (
    <header className="relative w-full overflow-hidden">
      <div className="relative w-full h-[460px] md:h-[620px]">
        <Image
          src="/adam-hero-main.png"
          alt="Avalon RV solar installation"
          fill
          priority
          className="object-cover object-left-top md:object-[20%_15%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />

        <div className="absolute top-6 md:top-8 left-0 right-0 flex justify-center">
          <Image
            src="/avalon-logo.webp"
            alt="Avalon RV"
            width={320}
            height={96}
            priority
            className="h-14 md:h-20 w-auto drop-shadow-lg"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-center px-5 pb-8 md:pb-10">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-3 md:mb-4 backdrop-blur-sm">
            RV Solar Installations · Benicia, CA
          </div>

          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 md:mb-4 text-balance drop-shadow-sm">
            The Last Power System Your{' '}
            <span className="text-primary">RV Will Ever Need.</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto text-pretty leading-snug">
            SF Bay Area&apos;s trusted RV solar installer. Certified Victron Energy Professional, 18 years experience.
            Endless off-grid power — professionally installed.
          </p>
        </div>
      </div>
    </header>
  )
}
