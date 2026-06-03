import type { NextApiRequest, NextApiResponse } from 'next';
import { isIPv4 } from 'net';
import requestIp from 'request-ip';
import iplocation from 'iplocation';

export function getClientIp(req: NextApiRequest): string | null {
    return requestIp.getClientIp(req);
}

/** Localhost – iplocation only accepts IPv4 and ::1 is not valid for it. */
function shouldSkipGeoLookup(ip: string | null): boolean {
    if (!ip) return true;
    const lower = ip.toLowerCase().trim();
    if (lower === '::1' || lower === '127.0.0.1') return true;
    if (lower.startsWith('::ffff:127.')) return true;
    return false;
}

/** Strip IPv4-mapped IPv6 so iplocation / is-ip v4 accepts it. */
function toIpv4(ip: string): string | null {
    let candidate = ip.trim();
    const lower = candidate.toLowerCase();
    if (lower.startsWith('::ffff:')) {
        candidate = candidate.slice(7);
    }
    return isIPv4(candidate) ? candidate : null;
}

function jsonFromIplocation(loc: Awaited<ReturnType<typeof iplocation>>, ip: string) {
    if ('reserved' in loc && !('latitude' in loc)) {
        return null;
    }
    const data = loc as {
        city?: string;
        country?: { name?: string; postalCode?: string };
    };
    return {
        zipcode: data.country?.postalCode || null,
        city: data.city ?? null,
        country: data.country?.name ?? null,
        ip,
    };
}

async function jsonFromIpwho(clientIp: string, ip: string) {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(clientIp)}/`);
    if (!response.ok) return null;
    const payload = await response.json();
    return {
        zipcode: payload.postal ?? null,
        city: payload.city ?? null,
        country: payload.country ?? payload.country_name ?? null,
        ip,
    };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = getClientIp(req);

    if (shouldSkipGeoLookup(ip)) {
        return res.status(200).json({ zipcode: null, ip: ip ?? null });
    }

    const clientIp = ip as string;
    const ipv4 = toIpv4(clientIp);

    try {
        if (ipv4) {
            const loc = await iplocation(ipv4);
            const fromIp = jsonFromIplocation(loc, clientIp);
            if (fromIp?.zipcode || fromIp?.city) {
                return res.status(200).json(fromIp);
            }
        }
        const fromWho = await jsonFromIpwho(clientIp, clientIp);
        if (fromWho) {
            return res.status(200).json(fromWho);
        }
        return res.status(200).json({ zipcode: null, ip: clientIp });
    } catch {
        try {
            const fromWho = await jsonFromIpwho(clientIp, clientIp);
            if (fromWho) {
                return res.status(200).json(fromWho);
            }
        } catch {
            /* ignore */
        }
        return res.status(200).json({ zipcode: null, ip: clientIp });
    }
}
