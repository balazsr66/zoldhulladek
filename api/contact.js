import { Resend } from "resend"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeBody = (body) => {
  if (!body) return {}
  if (typeof body !== "string") return body

  try {
    return JSON.parse(body)
  } catch {
    return {}
  }
}

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const valueOrFallback = (value, fallback = "Nincs megadva") => {
  const normalized = String(value ?? "").trim()
  return normalized || fallback
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ ok: false, error: "Method not allowed" })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return res.status(500).json({ ok: false, error: "Hiányzó email konfiguráció a szerveren." })
  }

  const body = normalizeBody(req.body)
  const name = String(body.name ?? "").trim()
  const phoneInput = String(body.phone ?? "").trim()
  const email = String(body.email ?? "").trim()
  const message = String(body.message ?? "").trim()
  const phone = valueOrFallback(phoneInput)
  const location = valueOrFallback(body.location)
  const lotSize = valueOrFallback(body.lotSize ?? body.area)
  const service = valueOrFallback(body.service)

  if (!name || !phoneInput || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "A név, telefonszám, email cím és üzenet megadása kötelező.",
    })
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ ok: false, error: "Érvénytelen email cím." })
  }

  const resend = new Resend(RESEND_API_KEY)
  const subject = `Új ajánlatkérés – ${name}`

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safeLocation = escapeHtml(location)
  const safeLotSize = escapeHtml(lotSize)
  const safeService = escapeHtml(service)
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")

  try {
    await resend.emails.send({
      from: `Ökorendszer <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject,
      html: `
        <h2>Új ajánlatkérés érkezett</h2>
        <p><strong>Név:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Telefonszám:</strong> ${safePhone}</p>
        <p><strong>Helyszín:</strong> ${safeLocation}</p>
        <p><strong>Telekméret:</strong> ${safeLotSize}</p>
        <p><strong>Szolgáltatás:</strong> ${safeService}</p>
        <p><strong>Üzenet:</strong><br />${safeMessage}</p>
      `,
      text: [
        "Új ajánlatkérés érkezett",
        `Név: ${name}`,
        `Email: ${email}`,
        `Telefonszám: ${phone}`,
        `Helyszín: ${location}`,
        `Telekméret: ${lotSize}`,
        `Szolgáltatás: ${service}`,
        `Üzenet: ${message}`,
      ].join("\n"),
    })

    return res.status(200).json({ ok: true, message: "Ajánlatkérés elküldve." })
  } catch (error) {
    console.error("Resend send failed:", error)
    return res.status(500).json({ ok: false, error: "Nem sikerült elküldeni az ajánlatkérést." })
  }
}
