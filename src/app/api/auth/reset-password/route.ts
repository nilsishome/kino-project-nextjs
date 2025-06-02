import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/database/user_model";
import { connectToDatabase } from "@/database/connect";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) {
    return NextResponse.json({ message: "Ogiltig eller utgången länk." }, { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return NextResponse.json({ message: "Lösenordet är nu återställt." });
}