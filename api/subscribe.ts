import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const kitRes = await fetch(
    `https://api.kit.com/v4/forms/${formId}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email_address: email }),
    }
  );

  if (!kitRes.ok) {
    const body = await kitRes.text();
    console.error("Kit API error:", kitRes.status, body);
    return res.status(502).json({ error: "Subscription failed" });
  }

  return res.status(200).json({ success: true });
}
