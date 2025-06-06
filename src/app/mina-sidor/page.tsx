import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import MinaSidorClient from "./MinaSidorClient";

export default async function MinaSidorPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <MinaSidorClient session={session} />
    </>
  );
}
