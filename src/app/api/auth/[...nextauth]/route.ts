import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth";
// --- Skapa och exportera handler ---
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
