import { NextRequest, NextResponse } from 'next/server'

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/0doBnPUsR4RzdMukk4Vu/webhook-trigger/11259214-7d0b-4cc7-94f9-c4b975f1f66b'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 })
}
