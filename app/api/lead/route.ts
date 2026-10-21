import { NextResponse } from "next/server";

/**
 * Receives leads from the Planner, Contact, Care Plans and Professionals forms.
 * Currently logs the payload to the server console (visible in Vercel → Logs).
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ ok: false, error: "Empty payload" }, { status: 400 });
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
    ...(payload as Record<string, unknown>),
  };

  console.log("[lead]", JSON.stringify(lead, null, 2));

  // TODO: connect email/CRM here — e.g. send via Resend/Postmark to m.abed@ivorysmarthome.com,
  // and/or create a contact + deal in HubSpot, Zoho or the Dechub CRM. Keep API keys in
  // Vercel environment variables, never in this file.

  return NextResponse.json({ ok: true });
}
