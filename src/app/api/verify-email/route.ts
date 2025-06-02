import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connect";
import User from "@/database/user_model";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  await connectToDatabase();

  if (!token) {
    return NextResponse.json({ message: "Ogiltig verifieringslänk." }, { status: 400 });
  }

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return NextResponse.json({ message: "Ogiltig eller förbrukad verifieringslänk." }, { status: 400 });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  return NextResponse.json({ message: "Verifiering lyckades!" }, { status: 200 });
}