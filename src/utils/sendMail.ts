import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetMail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  try {
const result = await resend.emails.send({
  from: "noreply@baldheads.se",
  to: email,
  subject: "Återställ ditt lösenord",
  html: `
    <p>Klicka på knappen nedan för att återställa ditt lösenord:</p>
    <a href="${resetUrl}"
      style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #22c55e;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 12px;
      "
    >
      Återställ lösenord
    </a>
    <p style="margin-top:16px;">Om knappen inte fungerar, kopiera och klistra in denna länk i din webbläsare:<br>${resetUrl}</p>
  `,
});
console.log("Resend result:", result);
  } catch (err) {
    console.error("Resend error:", err);
  }
}