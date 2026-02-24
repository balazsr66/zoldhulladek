import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, phone, email, area, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await resend.emails.send({
      from: "GreenMach <onboarding@resend.dev>", // később saját domain
      to: "balazsr66@gmail.com",
      subject: "Új ajánlatkérés érkezett 🚜",
      html: `
        <h2>Új ajánlatkérés</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Terület:</strong> ${area || "-"}</p>
        <p><strong>Leírás:</strong><br/>${message || "-"}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Email küldési hiba" });
  }
}