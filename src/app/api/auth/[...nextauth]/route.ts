import NextAuth from "next-auth";
import User from "@/database/user_model";
import { connectToDatabase } from "@/database/connect";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Typförlängning för NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      firstName?: string;
      lastName?: string;
      image?: string | null;
    };
    maxAge?: number;
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
    remember?: boolean;
    picture?: string | null;
  }
}

// --- Här är authOptions-objektet ---
export const authOptions: NextAuthOptions = {
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
            credentials?.password ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("Ogiltig e-postadress eller lösenord.");
          }
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Spara remember-flaggan vid inloggning
      if (trigger === "signIn" && session?.remember !== undefined) {
        token.remember = session.remember;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          image: token.picture,
        };
        // Sätt sessionstid beroende på remember
       session.maxAge = token.remember ? 60 * 60 * 24 : 60 * 60; // 1 dag eller 1 timme
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// --- Skapa och exportera handler ---
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };