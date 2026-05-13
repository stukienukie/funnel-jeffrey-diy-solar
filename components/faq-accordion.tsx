'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How much can I actually save by going DIY?',
    answer: 'Most homeowners save 50–65% compared to contractor quotes. A system a contractor quotes at $30,000 typically costs $12,000–$15,000 in equipment when you install it yourself — and Jeffrey gets you access to contractor-level pricing on top of that. The savings are real.',
  },
  {
    question: 'Do I need any prior electrical experience?',
    answer: "No. Jeffrey's clients range from complete beginners to experienced tradespeople. He'll design your system to match your skill level and walk you through every step. Most clients say the process was far more straightforward than they expected.",
  },
  {
    question: 'What does Jeffrey actually do for me?',
    answer: "Jeffrey handles the parts that trip most DIYers up: custom system design sized to your exact energy usage, a complete permit package with engineer-stamped drawings, utility interconnection guidance, and live support during your install. You do the physical work — he makes sure it's done right.",
  },
  {
    question: 'Will my county accept a DIY permit package?',
    answer: "Yes. Jeffrey's permit packages are NEC-compliant and include all the documentation inspectors require. The vast majority of his clients pass inspection on the first try. He's familiar with the quirks of different county AHJs and preps you accordingly.",
  },
  {
    question: 'Does this work for my state / utility?',
    answer: "Jeffrey serves all 50 states remotely. Utility interconnection requirements vary, which is exactly why having a NABCEP-certified professional in your corner matters — he knows the process and will guide you through your specific utility's requirements.",
  },
  {
    question: 'What happens on the free consultation call?',
    answer: "It's a relaxed 20–30 minute call where Jeffrey reviews your energy usage, sizes your system, and explains what the process looks like for your specific home and county. He'll answer every question you have. No pressure, no pitch.",
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
