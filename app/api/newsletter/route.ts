import { NextResponse } from "next/server";

/**
 * Placeholder for future email-list integration (e.g. Klaviyo, Mailchimp).
 * No email service is connected yet, so no address is stored anywhere —
 * this responds honestly rather than faking a successful signup.
 */
export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  return NextResponse.json({
    message: "Early-access list isn't connected yet — check back soon.",
  });
}
