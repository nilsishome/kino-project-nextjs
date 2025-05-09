import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Movies } from "@/models";

export async function GET() {
  const uri =
    "mongodb+srv://nilsnyberg24:yIGZm59YQC0CaqvH@kinocluster.dtam1oe.mongodb.net/Kino?retryWrites=true&w=majority&appName=KinoCluster";

  await mongoose.connect(uri);

  try {
    const movies = await Movies.find();
    return NextResponse.json(
      {
        data: movies,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: "MongoDB collection not found!",
      },
      { status: 500 }
    );
  }
}
