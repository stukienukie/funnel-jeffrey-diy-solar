'use client'

import { Zap } from 'lucide-react'

interface CTAButtonProps {
  onClick: () => void
}

export function CTAButton({ onClick }: CTAButtonProps) {
  return (
    <section className="px-4 py-6 text-center">
      <button
        onClick={onClick}
        className="w-full max-w-[440px] mx-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-bold py-5 px-8 rounded-2xl transition-all text-lg cursor-pointer shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 ring-2 ring-primary/20"
      >
        <Zap className="w-5 h-5 fill-current" />
        Find My Perfect Solar Package →
      </button>
      <p className="text-sm text-muted-foreground mt-3">
        60-second quiz · Free · No commitment
      </p>
    </section>
  )
}
