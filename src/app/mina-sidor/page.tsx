import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";
import React from "react";
import MinaSidorClient from "../../../components/mina-sidor/MinaSidorClient";

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
