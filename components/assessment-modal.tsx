'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { X, ChevronLeft, Zap } from 'lucide-react'

const GHL_WEBHOOK_URL = '/api/submit'
const BOOKING_URL = 'https://links.monox.ai/widget/booking/O0rYpSBuz3AfOutCT5IG'

type Step = 'contact' | 'state' | 'bill' | 'ownership' | 'roofType' | 'goal' | 'result'
type BillKey = 'under-100' | '100-149' | '150-199' | '200-299' | '300-plus'

interface SavingsTier {
  systemSize: number
  diyCost: number
  contractorCost: number
  monthlySavings: number
  paybackYears: number
}

const SAVINGS: Record<BillKey, SavingsTier> = {
  'under-100': { systemSize: 4,  diyCost: 5200,  contractorCost: 12000, monthlySavings: 80,  paybackYears: 5.4 },
  '100-149':   { systemSize: 7,  diyCost: 9000,  contractorCost: 21000, monthlySavings: 120, paybackYears: 6.3 },
  '150-199':   { systemSize: 9,  diyCost: 11600, contractorCost: 27000, monthlySavings: 155, paybackYears: 6.2 },
  '200-299':   { systemSize: 11, diyCost: 14200, contractorCost: 33000, monthlySavings: 210, paybackYears: 5.6 },
  '300-plus':  { systemSize: 15, diyCost: 19350, contractorCost: 45000, monthlySavings: 280, paybackYears: 5.8 },
}

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming','District of Columbia',
]

const BILL_OPTIONS: { key: BillKey; label: string; sub: string }[] = [
  { key: 'under-100', label: 'Under $100', sub: '~4 kW system' },
  { key: '100-149',   label: '$100–$149',  sub: '~7 kW system' },
  { key: '150-199',   label: '$150–$199',  sub: '~9 kW system' },
  { key: '200-299',   label: '$200–$299',  sub: '~11 kW system' },
  { key: '300-plus',  label: '$300+',      sub: '~15 kW system' },
]

const ROOF_OPTIONS = [
  { value: 'shingle', label: 'Shingle',  emoji: '🏠' },
  { value: 'metal',   label: 'Metal',    emoji: '🏗️' },
  { value: 'tile',    label: 'Tile',     emoji: '🏡' },
  { value: 'flat',    label: 'Flat',     emoji: '🏢' },
  { value: 'unsure',  label: 'Not sure', emoji: '❓' },
]

const GOAL_OPTIONS = [
  { value: 'cut-bill',     label: 'Cut my electric bill',         sub: 'Save 60%+ on monthly utility costs',        emoji: '💸' },
  { value: 'independence', label: 'Energy independence',          sub: 'Battery backup, self-reliance, no outages', emoji: '🔋' },
  { value: 'rate-lock',    label: 'Protect against rising rates', sub: 'Lock in your energy cost for 25+ years',    emoji: '📈' },
  { value: 'home-value',   label: 'Add home value',               sub: 'Solar increases resale value significantly', emoji: '🏡' },
]

const QUIZ_STEPS: Step[] = ['state', 'bill', 'ownership', 'roofType', 'goal']
const ALL_STEPS: Step[] = ['contact', ...QUIZ_STEPS, 'result']

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    fbq: (...args: unknown[]) => void
  }
}

interface AssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AssessmentModal({ isOpen, onClose, onSuccess }: AssessmentModalProps) {
  const [step, setStep] = useState<Step>('contact')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [stateValue, setStateValue] = useState('')
  const [billAmount, setBillAmount] = useState<BillKey | ''>('')
  const [ownsHome, setOwnsHome] = useState('')
  const [roofType, setRoofType] = useState('')
  const [goal, setGoal] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const quizIndex = QUIZ_STEPS.indexOf(step)
  const showProgress = quizIndex !== -1
  const canGoBack = step !== 'contact' && step !== 'result'

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setStep('contact')
      setFirstName('')
      setLastName('')
      setPhone('')
      setEmail('')
      setStateValue('')
      setBillAmount('')
      setOwnsHome('')
      setRoofType('')
      setGoal('')
      setErrors({})
    }
  }, [isOpen])

  const goBack = () => {
    const idx = ALL_STEPS.indexOf(step)
    if (idx > 0) setStep(ALL_STEPS[idx - 1])
  }

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 10)
    if (digits.length < 4) return digits
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const savings = billAmount ? SAVINGS[billAmount] : null
  const vsContractor = savings ? savings.contractorCost - savings.diyCost : 0
  const savingsPct = savings ? Math.round((1 - savings.diyCost / savings.contractorCost) * 100) : 0

  // Fires on contact submit — captures lead immediately then lets them through the quiz
  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!firstName.trim()) newErrors.firstName = 'required'
    if (phone.replace(/\D/g, '').length !== 10) newErrors.phone = 'required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }

    setIsSubmitting(true)
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone,
          email,
          step: 'contact-captured',
          tags: 'diy-solar-funnel,quiz-started',
          source: 'DIY Solar Assist Funnel',
        }),
      })
    } catch {
      // Non-blocking — advance regardless
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'contact_captured' })

    setIsSubmitting(false)
    setStep('state')
  }

  // Fires when the last quiz step (goal) is completed
  const handleQuizComplete = async (goalValue: string) => {
    setGoal(goalValue)
    setStep('result')

    const goalLabel = GOAL_OPTIONS.find(o => o.value === goalValue)?.label ?? goalValue
    const roofLabel = ROOF_OPTIONS.find(o => o.value === roofType)?.label ?? roofType
    const billLabel = BILL_OPTIONS.find(o => o.key === billAmount)?.label ?? billAmount

    const notes = [
      `=== DIY Solar Assist Funnel — Quiz Results ===`,
      `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} (CST)`,
      ``,
      `State: ${stateValue}`,
      `Monthly bill: ${billLabel}`,
      `Owns home: ${ownsHome === 'yes' ? 'Yes' : 'Not yet'}`,
      `Roof type: ${roofLabel}`,
      `#1 Goal: ${goalLabel}`,
      ``,
      `Estimated system size: ${savings?.systemSize} kW`,
      `DIY equipment cost: $${savings?.diyCost.toLocaleString()}`,
      `Contractor equivalent: $${savings?.contractorCost.toLocaleString()}`,
      `Monthly savings estimate: $${savings?.monthlySavings}`,
      `Payback period: ${savings?.paybackYears} years`,
      `Savings vs. contractor: $${vsContractor.toLocaleString()} (~${savingsPct}%)`,
    ].join('\n')

    try {
      fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone,
          email,
          state: stateValue,
          monthly_bill: billLabel,
          owns_home: ownsHome === 'yes' ? 'Yes' : 'Not yet',
          roof_type: roofLabel,
          goal: goalLabel,
          system_size_kw: savings?.systemSize,
          diy_equipment_cost: savings?.diyCost,
          contractor_equivalent: savings?.contractorCost,
          monthly_savings_estimate: savings?.monthlySavings,
          payback_years: savings?.paybackYears,
          savings_vs_contractor: vsContractor,
          savings_pct: savingsPct,
          step: 'quiz-complete',
          notes,
          tags: 'diy-solar-funnel,quiz-complete',
          source: 'DIY Solar Assist Funnel',
        }),
      })
    } catch {
      // Non-blocking
    }

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'quiz_complete',
      state: stateValue,
      monthly_bill: billAmount,
      owns_home: ownsHome,
      roof_type: roofType,
      goal: goalValue,
      savings_vs_contractor: vsContractor,
      savings_pct: savingsPct,
    })

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-background rounded-t-2xl md:rounded-2xl w-full max-w-[500px] max-h-[92vh] flex flex-col animate-slide-up md:animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 bg-background rounded-t-2xl md:rounded-t-2xl z-10 px-6 pt-5 pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            {canGoBack ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {showProgress && (
            <div>
              <div className="flex gap-1.5">
                {QUIZ_STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= quizIndex ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Step {quizIndex + 1} of {QUIZ_STEPS.length}
              </p>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6">

          {/* ── CONTACT (first — incentivised) ────────────────────── */}
          {step === 'contact' && (
            <div>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <img
                    src="/jeffrey-about.png"
                    alt="Jeffrey"
                    className="w-20 h-20 rounded-full object-cover object-center shadow-md border-2 border-primary/30"
                    loading="eager"
                    decoding="async"
                  />
                  <span className="absolute -bottom-1 -right-1 text-lg">☀️</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <Zap className="w-3 h-3 fill-current" />
                  Free DIY Solar Savings Estimate
                </div>
                <h2 className="font-heading text-2xl text-foreground mb-2 leading-tight">
                  See how much you'd save going solar the DIY way
                </h2>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Answer 5 quick questions and we'll calculate your personalized savings estimate with Jeffrey's guidance.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className={`space-y-3 ${isShaking ? 'animate-shake' : ''}`}>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    id="firstName"
                    name="fname"
                    autoComplete="given-name"
                    placeholder="First Name *"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.firstName ? 'border-destructive' : 'border-input'}`}
                  />
                  <input
                    type="text"
                    id="lastName"
                    name="lname"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  placeholder="(555) 867-5309 *"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${errors.phone ? 'border-destructive' : 'border-input'}`}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-bold py-4 px-8 rounded-2xl transition-all text-lg cursor-pointer mt-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'One moment...' : 'See How Much I Can Save Going DIY →'}
                </button>
                <p className="text-xs text-center text-muted-foreground">
                  Free · No commitment · Your info is never shared
                </p>
              </form>
            </div>
          )}

          {/* ── STEP 1: STATE ─────────────────────────────────────── */}
          {step === 'state' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🗺️</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  Where is the property located?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Jeffrey designs systems for all 50 states — 100% remotely
                </p>
              </div>

              <select
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
              >
                <option value="">Select your state...</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <button
                onClick={() => stateValue && setStep('bill')}
                className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all ${
                  stateValue
                    ? 'bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground cursor-pointer shadow-lg shadow-primary/30 hover:-translate-y-0.5'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2: MONTHLY BILL ──────────────────────────────── */}
          {step === 'bill' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">⚡</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  {"What's your average monthly electric bill?"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  This determines your system size and savings estimate
                </p>
              </div>

              <div className="space-y-2">
                {BILL_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setBillAmount(opt.key); setStep('ownership') }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-input hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-left"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.sub}</div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: OWNERSHIP ─────────────────────────────────── */}
          {step === 'ownership' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🏡</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  Do you own the property?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Solar is most beneficial for homeowners
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'yes', label: 'Yes, I own it',  sub: "Great — you're a perfect candidate", emoji: '✅' },
                  { value: 'no',  label: 'Not yet',        sub: 'We may still be able to help',       emoji: '🤔' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setOwnsHome(opt.value); setStep('roofType') }}
                    className="w-full flex items-center gap-4 p-5 rounded-xl border border-input hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-left"
                  >
                    <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 4: ROOF TYPE ─────────────────────────────────── */}
          {step === 'roofType' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🏠</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  What type of roof do you have?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Affects the mounting hardware and installation approach
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {ROOF_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setRoofType(opt.value); setStep('goal') }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-input hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 5: GOAL ──────────────────────────────────────── */}
          {step === 'goal' && (
            <div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎯</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  {"What's your #1 goal with solar?"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Pick the one that matters most to you right now
                </p>
              </div>

              <div className="space-y-2">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleQuizComplete(opt.value)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-input hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-left"
                  >
                    <span className="text-2xl w-8 text-center flex-shrink-0">{opt.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── RESULT: PERSONALIZED SAVINGS CARD ─────────────────── */}
          {step === 'result' && savings && (
            <div>
              <div className="text-center mb-5">
                <div className="text-4xl mb-2">🎉</div>
                <h2 className="font-heading text-2xl text-foreground mb-1">
                  {`Here's your estimate, ${firstName}!`}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Based on a {savings.systemSize} kW system in {stateValue}
                </p>
              </div>

              {/* Big savings vs contractor */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center mb-4">
                <p className="text-sm text-muted-foreground font-medium mb-1">Estimated savings vs. hiring a contractor</p>
                <p className="font-heading text-5xl text-primary mb-1">
                  ${vsContractor.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">~{savingsPct}% less than a contractor — by going DIY with Jeffrey</p>
                <p className="text-[10px] text-muted-foreground mt-2 italic">* Approximate estimate based on typical system costs</p>
              </div>

              {/* 6-cell breakdown with ✓/✗ marks */}
              <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-3">
                {[
                  { label: 'System Size',           value: `${savings.systemSize} kW`,                   mark: null },
                  { label: 'Your DIY Cost',          value: `$${savings.diyCost.toLocaleString()}`,       mark: 'check' },
                  { label: 'Contractor Cost',        value: `$${savings.contractorCost.toLocaleString()}`, mark: 'x' },
                  { label: 'Monthly Savings Est.',   value: `$${savings.monthlySavings}/mo`,              mark: 'check' },
                  { label: 'Payback Period',         value: `${savings.paybackYears} yrs`,                mark: 'check' },
                  { label: 'You Save',               value: `~${savingsPct}%`,                            mark: 'check' },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className={`relative bg-card rounded-xl border p-3 text-center ${
                      cell.mark === 'x' ? 'border-destructive/30' : cell.mark === 'check' ? 'border-primary/25' : 'border-border'
                    }`}
                  >
                    {cell.mark && (
                      <span className={`absolute top-2 right-2.5 text-xs font-bold leading-none ${cell.mark === 'check' ? 'text-primary' : 'text-destructive'}`}>
                        {cell.mark === 'check' ? '✓' : '✗'}
                      </span>
                    )}
                    <p className={`font-heading text-xl ${cell.mark === 'x' ? 'text-destructive' : 'text-foreground'}`}>{cell.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight mt-0.5">{cell.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-xl p-4 border border-border mb-5 text-sm text-muted-foreground text-center leading-relaxed">
                These are approximate figures. Jeffrey will review your specific home and give you exact numbers on the call.
              </div>

              <button
                onClick={onSuccess}
                className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground font-bold py-5 px-8 rounded-2xl transition-all text-lg cursor-pointer shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Book My Free Call with Jeffrey →
              </button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Free · 15–20 minutes · No pressure
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
