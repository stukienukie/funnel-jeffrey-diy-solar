'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How much does an RV solar system cost?',
    answer: 'RV solar systems vary widely based on your power needs, battery capacity, and install complexity. During your free assessment call, Adam will walk you through your specific usage and give you an accurate quote with no surprises.',
  },
  {
    question: 'What brands do you use?',
    answer: 'We use Victron Energy as our primary platform — the gold standard in RV solar. We\'re also authorized dealers for Battle Born / Dragonfly Energy, Expion360, Epoch, Lithionics, and Zamp Solar. You get the best equipment available, properly installed.',
  },
  {
    question: 'How long does installation take?',
    answer: 'Most projects are completed within 2–3 weeks. Larger restorations may take 2–3 months, and custom builds can take up to 6 months. We\'ll give you a clear timeline before we start — no guessing.',
  },
  {
    question: 'Do you only serve the Benicia area?',
    answer: 'We\'re based in Benicia, CA and serve all of Northern California. We\'re the largest RV power system installer in the region. Call us to confirm your area.',
  },
  {
    question: 'Can solar power my RV air conditioner?',
    answer: 'Absolutely — it\'s one of our most common requests. With the right battery bank and inverter, we can design a system that runs your AC off-grid. We\'ll spec it out exactly during your consultation.',
  },
  {
    question: 'What happens during the free assessment call?',
    answer: 'It\'s a relaxed 15–20 minute conversation where Adam learns about your RV, how you camp, and what you want to power. He\'ll answer your questions and walk you through options. No pressure, no hard sell.',
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-heading text-3xl text-center text-foreground mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
