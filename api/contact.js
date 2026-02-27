import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, phone, email, area, message } = req.body;

  if (!name || !phone) return res.status(400).json({ error: "Name and phone are required" });

  try {
    await resend.emails.send({
      from: "info@greenmachpro.hu",
      to: "balazsr66@gmail.com", // ide érkezzen a lead
      subject: `Új ajánlatkérés: ${name}`,
      html: `
        <h2>Új ajánlatkérés</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Telefonszám:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "Nincs megadva"}</p>
        <p><strong>Terület:</strong> ${area || "Nincs megadva"}</p>
        <p><strong>Üzenet:</strong><br/>${message || "Nincs"}</p>
      `,
    });

    res.status(200).json({ message: "Email elküldve!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt az email küldése közben." });
  }
}