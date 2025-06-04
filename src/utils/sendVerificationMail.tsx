import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationMail(email: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;
  try {
    const result = await resend.emails.send({
      from: "noreply@baldheads.se",
      to: email,
      subject: "Bekräfta din e-postadress",
      html: `
        <p>Välkommen! Klicka på knappen nedan för att bekräfta din e-postadress:</p>
        <a href="${verifyUrl}"
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
          Bekräfta e-post
        </a>
        <p style="margin-top:16px;">Om knappen inte fungerar, kopiera och klistra in denna länk i din webbläsare:<br>${verifyUrl}</p>
      `,
    });
    console.log("Resend result:", result);
  } catch (err) {
    console.error("Resend error:", err);
  }
}