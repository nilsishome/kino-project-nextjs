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
    };
  }
  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
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
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    const user = await User.findOne({ email: credentials.email }).lean();
                    if (!user) {
                        return null;
                    }
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password, user.password as string
                    );
                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }
                    return user;
                } catch {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    firstName: token.firstName,
                    lastName: token.lastName,
                };
            }
            return session;
        },
    },
});
