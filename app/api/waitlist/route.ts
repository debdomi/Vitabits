// app/api/waitlist/route.ts
export async function POST(req: Request) {
  const { email, consent } = await req.json();

  if (!consent) return Response.json({ error: "consent_required" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
        "Content-Type": "application/json",
        "revision": "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [{
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: { marketing: { consent: "SUBSCRIBED" } },
                  },
                },
              }],
            },
            historical_import: false,
          },
          relationships: {
            list: { data: { type: "list", id: process.env.KLAVIYO_LIST_ID } },
          },
        },
      }),
    }
  );

  if (!res.ok) return Response.json({ error: "klaviyo_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
