import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/database/user_model";
import { connectToDatabase } from "@/database/connect";
import { sendResetMail } from "@/utils/sendMail";
// Skapa en separat sendMail-funktion senare

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Ingen användare med denna e-post." }, { status: 404 });
  }

  // Skapa token
  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 timme

  await user.save();
  await sendResetMail(email, token);
  

  // Skicka mail (implementera sendMail separat)
  // await sendMail(email, token);

  return NextResponse.json({ message: "Återställningsmail skickat om e-post finns registrerad." });
}