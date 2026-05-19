import { NextResponse } from 'next/server'

const BREVO_API = 'https://api.brevo.com/v3/contacts'

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName } = await request.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    const listIdRaw = process.env.BREVO_NEWSLETTER_LIST_ID
    if (!apiKey || !listIdRaw) {
      return NextResponse.json({ error: 'Newsletter not configured' }, { status: 500 })
    }
    const listId = Number(listIdRaw)
    if (!Number.isFinite(listId)) {
      return NextResponse.json({ error: 'Invalid list configuration' }, { status: 500 })
    }

    const payload = {
      email: email.trim().toLowerCase(),
      listIds: [listId],
      updateEnabled: true,
      attributes: {
        ...(firstName ? { FIRSTNAME: String(firstName).trim() } : {}),
        ...(lastName ? { LASTNAME: String(lastName).trim() } : {}),
        OPT_IN: true,
        SOURCE: 'ibtu.la newsletter signup',
      },
    }

    const res = await fetch(BREVO_API, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ ok: true, status: 'subscribed' })
    }

    // Brevo returns 400 with code "duplicate_parameter" when contact already exists
    // and updateEnabled handled it — treat 200 as ok too.
    if (res.ok) {
      return NextResponse.json({ ok: true, status: 'updated' })
    }

    const body = await res.json().catch(() => ({}))
    if (body?.code === 'duplicate_parameter') {
      return NextResponse.json({ ok: true, status: 'already_subscribed' })
    }

    console.error('Brevo subscribe failed', res.status, body)
    return NextResponse.json(
      { error: body?.message || 'Subscription failed' },
      { status: 502 },
    )
  } catch (err) {
    console.error('Newsletter route error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
