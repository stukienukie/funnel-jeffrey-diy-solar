import { NextRequest, NextResponse } from 'next/server'

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/cUM4hFaPGpd3KwctQFuK/webhook-trigger/1064b7dd-26c1-4f0b-9cbc-951fb1b6d6b5'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 })
}
