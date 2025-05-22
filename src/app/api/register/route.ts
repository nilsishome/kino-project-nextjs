import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connect';
import User from '@/database/user_model';

export async function POST(request: Request) {
  const { firstName, lastName, email, password, confirmPassword } = await request.json();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);  
  }
  if(!firstName || !lastName || !email || !password || !confirmPassword) {
    return NextResponse.json({ error: "Alla fält är obligatoriska." }, { status: 400 });
  }

    if(!isValidEmail(email)) {
        return NextResponse.json({ error: "Ogiltig e-postadress." }, { status: 400 });
    }

    if(password !== confirmPassword) {
        return NextResponse.json({ error: "Lösenorden matchar inte." }, { status: 400 });
    }

    if(password.length < 6) {
        return NextResponse.json({ error: "Lösenordet måste vara minst 6 tecken långt." }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "E-postadressen är redan registrerad." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return NextResponse.json({ message: "Registrering lyckades!" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Ett fel inträffade vid registreringen." }, { status: 500 });
    }
}