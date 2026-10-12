import {contactConfig} from "@/lib/contact-config";
import {enquiryTopics} from "@/lib/contact-topics";
import {platforms} from "@/lib/site-content";

export const runtime = "nodejs";
const reply = (status: number, message: string) => Response.json({message}, {status, headers: {"Cache-Control": "no-store"}});
const singleLine = (value: unknown, max: number) => typeof value === "string" && value.trim().length <= max && !/[\r\n\x00-\x1f]/.test(value);

export async function POST(request: Request) {
  const config = contactConfig();
  if (!config.ready) return reply(503, "Online enquiries are not available yet. Please use the contact options on this page.");
  const origin = request.headers.get("origin");
  if (!origin || !config.origins.includes(origin)) return reply(403, "Please submit your enquiry through the Flurzi website.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "Please submit the enquiry form.");
  // Limit the actual stream as well as Content-Length; do not trust client headers.
  const reader = request.body?.getReader();
  if (!reader) return reply(400, "Your enquiry was empty.");
  let raw = "", bytes = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 24000) { await reader.cancel(); return reply(413, "Your enquiry is too long."); }
      raw += decoder.decode(chunk.value, {stream: true});
    }
    raw += decoder.decode();
  } catch { return reply(400, "We could not read the enquiry. Please try again."); }
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); } catch { return reply(400, "Please check your enquiry and try again."); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return reply(400, "Invalid enquiry.");
  const {name, email, organisation = "", topic, message, token, requestId, website = ""} = data;
  const allowedTopics = [...Object.values(enquiryTopics), ...platforms.map(p => p.enquiry)];
  if (!singleLine(name, 120) || !(name as string).trim() || !singleLine(email, 200) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string)
    || !singleLine(organisation, 160) || typeof topic !== "string" || !allowedTopics.includes(topic)
    || typeof message !== "string" || !message.trim() || message.length > 5000 || message.includes("\0")
    || typeof token !== "string" || !token || token.length > 2048 || typeof requestId !== "string" || !/^[\da-f-]{36}$/i.test(requestId)
    || website !== "") return reply(400, "Please check the fields and complete the security check.");
  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", body: new URLSearchParams({secret: config.secret, response: token}), signal: AbortSignal.timeout(8000),
    });
    if (!verification.ok) return reply(502, "The security check is unavailable. Please try again shortly.");
    const result = await verification.json();
    if (!result.success || result.action !== "contact" || result.hostname !== new URL(origin).hostname) return reply(400, "The security check expired or failed. Please try it again.");
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: {Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact-${requestId}`},
      body: JSON.stringify({from: config.from, to: [config.to], reply_to: (email as string).trim(), subject: `Flurzi website: ${topic}`,
        text: `Name: ${(name as string).trim()}\nReply email: ${(email as string).trim()}\nOrganisation: ${(organisation as string).trim() || "Not supplied"}\nTopic: ${topic}\n\n${message.trim()}`}),
      signal: AbortSignal.timeout(10000),
    });
    if (!delivery.ok) return reply(502, "We could not submit your enquiry. Your text is still here; please try again shortly.");
    const accepted = await delivery.json();
    if (!accepted.id) return reply(502, "Delivery could not be confirmed. Please try again shortly.");
    return reply(200, "Your enquiry has been accepted for email delivery to Flurzi. Thank you for getting in touch.");
  } catch { return reply(502, "Delivery could not be confirmed. Your text is still here; please try again shortly."); }
}
