import type { NextApiRequest, NextApiResponse } from 'next';

/** Upstream contact endpoint (server-side only; avoids CORS and keeps URL off the client). */
const UPSTREAM_URL = process.env.CONTACT_API_URL ?? 'https://example.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({ ok: false, error: 'Expected JSON object body' });
    }

    try {
        const upstream = await fetch(UPSTREAM_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const raw = await upstream.text();
        const ct = upstream.headers.get('content-type') ?? '';

        if (ct.includes('application/json')) {
            try {
                return res.status(upstream.status).json(JSON.parse(raw || '{}'));
            } catch {
                return res.status(upstream.status).send(raw);
            }
        }

        return res.status(upstream.status).send(raw);
    } catch {
        return res.status(502).json({ ok: false, error: 'Could not reach contact service' });
    }
}
