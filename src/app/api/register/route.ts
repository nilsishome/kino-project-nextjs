import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connect";
import User from "@/database/user_model";
import { sendVerificationMail } from "@/utils/sendVerificationMail";
import crypto from "crypto";

export async function POST(request: Request) {
  const { firstName, lastName, email, password, confirmPassword } =
    await request.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "Alla fält är obligatoriska." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Ogiltig e-postadress." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Lösenorden matchar inte." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Lösenordet måste vara minst 6 tecken långt." },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "E-postadressen är redan registrerad." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Skapa en verifieringstoken
    const verificationToken = crypto.randomUUID();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false, // verifieringsstatus
    });
    await newUser.save();
    await sendVerificationMail(email, verificationToken);

    return NextResponse.json(
      {
        message:
          "Registrering lyckades! Kontrollera din e-post för verifiering.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Ett fel inträffade vid registreringen. ${error}` },
      { status: 500 }
    );
  }
}
