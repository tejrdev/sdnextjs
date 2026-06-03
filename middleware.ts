// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting
// Note: In production, use Redis or similar for distributed systems
const ipRequestCount = new Map<string, { count: number; timestamp: number }>()

export function middleware(request: NextRequest) {
  // console.log(request)
  const userAgent = request.headers.get('user-agent') || ''
  // const ip = request.ip || 'unknown'

  // Rate limiting logic
  // const now = Date.now()
  // const windowMs = 60 * 1000 // 1 minute window
  // const maxRequests = 1000 // max requests per window

  // const currentRequests = ipRequestCount.get(ip)

  // // if (currentRequests) {
  // //   if (now - currentRequests.timestamp > windowMs) {
  // //     // Reset if window has passed
  // //     ipRequestCount.set(ip, { count: 1, timestamp: now })
  // //   } else if (currentRequests.count > maxRequests) {
  // //     // Too many requests
  // //     return new NextResponse(null, {
  // //       status: 429,
  // //       statusText: 'Too Many Requests',
  // //       headers: {
  // //         'Content-Type': 'text/plain',
  // //         'Retry-After': '60'
  // //       }
  // //     })
  // //   } else {
  // //     // Increment request count
  // //     currentRequests.count++
  // //   }
  // // } else {
  // //   // First request from this IP
  // //   ipRequestCount.set(ip, { count: 1, timestamp: now })
  // // }

  // Bot detection
  if (userAgent.includes('Scrapy')) {
    return new NextResponse(null, {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  // Continue with request
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
