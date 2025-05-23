import NextAuth from "next-auth";
import User from "@/database/user_model";
import { connectToDatabase } from "@/database/connect";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth types to include firstName and lastName
import type { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      firstName?: string;
      lastName?: string;
      image?: string | null;
    };
  }
  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }
}

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email });

                    if (!user) {
                        throw new Error("Ogiltig e-postadress eller lösenord.");
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    );
                    if (!isValidPassword) {
                        throw new Error("Ogiltig e-postadress eller lösenord.");
                    }
                    return user;
                }
                catch {
                    return null;
                }
            }
                
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.firstName = user.firstName;
                token.picture = user.image;
            }
            return token;
        },
        async session ({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    firstName: token.firstName,
                    image: token.picture,
                };
            };
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});


export {handler as GET, handler as POST};