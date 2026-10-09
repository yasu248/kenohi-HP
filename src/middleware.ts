import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { kv } from '@vercel/kv';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // Only apply this middleware to the calendar edit page
  if (!req.nextUrl.pathname.startsWith('/kenocha/calendar')) {
    return NextResponse.next();
  }

  // Basic IP-based rate limiting key
  // For local dev and some hosting platforms, fallback to x-forwarded-for or "local"
  const ip = req.headers.get('x-forwarded-for') || 'local';
  const rateLimitKey = `rate_limit_auth_${ip}`;

  // 1. Check if the IP is currently locked out
  try {
    const attempts = await kv.get<number>(rateLimitKey) || 0;
    // 5 attempts limit
    if (attempts >= 5) {
      return new NextResponse('Too many failed attempts. Please try again after 30 minutes.', {
        status: 429, // Too Many Requests
        headers: { 'Retry-After': '1800' }, // Suggest retry after 30 mins
      });
    }
  } catch (error) {
    // If KV fails (e.g. KV not setup yet locally), we allow the request to proceed to password check
    console.error('KV get error in middleware:', error);
  }

  // 2. Process Basic Authentication
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Base64 decode the auth string
    const [user, pwd] = atob(authValue).split(':');

    // Password validation. Uses env var, with fallback to the previously hardcoded one.
    // In Vercel, you should add ADMIN_PASSWORD to environment variables.
    const validPassword = process.env.ADMIN_PASSWORD || 'kenohi2033f';

    if (pwd === validPassword) {
      // If password is correct, clear the failed attempts counter for this IP
      try {
        await kv.del(rateLimitKey);
      } catch (error) {
        console.error('KV del error in middleware:', error);
      }
      return NextResponse.next();
    } else {
      // If password is wrong, increment the failed attempts counter
      try {
        const attempts = await kv.incr(rateLimitKey);
        // If it's the first failed attempt, set the expiration to 30 minutes (1800 seconds)
        if (attempts === 1) {
          await kv.expire(rateLimitKey, 1800);
        }

        // Notify if attempts >= 2
        if (attempts >= 2) {
          const webhookUrl = process.env.ALERT_WEBHOOK_URL;
          if (webhookUrl) {
            event.waitUntil(
              fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Simple JSON format compatible with Slack and Discord incoming webhooks
                body: JSON.stringify({
                  content: `⚠️ 管理画面への不正アクセス（パスワード間違い）を検知しました。\nIPアドレス: ${ip}\n失敗回数: ${attempts}回`, // For Discord
                  text: `⚠️ 管理画面への不正アクセス（パスワード間違い）を検知しました。\nIPアドレス: ${ip}\n失敗回数: ${attempts}回`, // For Slack
                }),
              }).catch(err => console.error('Webhook notification error:', err))
            );
          }
        }
      } catch (error) {
        console.error('KV incr error in middleware:', error);
      }
    }
  }

  // 3. Ask the browser to show the Basic Auth popup
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// Config to run this middleware only on specific paths
export const config = {
  matcher: ['/kenocha/calendar/:path*'],
};
