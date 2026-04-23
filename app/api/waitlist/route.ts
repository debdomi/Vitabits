import { NextResponse } from "next/server";
import { waitlistSchema, DISPOSABLE_DOMAINS } from "@/lib/waitlist-schema";

export const runtime = "nodejs";

// Simple in-memory rate limiter (per-process). For production, swap to
// Upstash / Redis. The brief asks for 5 req/min/IP.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const bucket = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = bucket.get(ip);
  if (!entry || now > entry.reset) {
    bucket.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = waitlistSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { email, website, source, consentVersion } = parsed.data;

  // Honeypot — silently accept to avoid leaking the trap
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return NextResponse.json(
      { ok: false, error: "disposable_email" },
      { status: 400 }
    );
  }

  // TODO wire up Mailchimp / Resend / Supabase before launch.
  // For now, log the signup with consent metadata so it's captured
  // even in preview deployments. Replace this with a real store.
  const record = {
    email,
    source,
    consentVersion,
    consentGivenAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent") ?? "",
    list: "waitlist_prelaunch_2026",
  };
  // eslint-disable-next-line no-console
  console.log("[waitlist] signup", record);

  return NextResponse.json({ ok: true });
}
