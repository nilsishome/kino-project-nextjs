import { NextResponse } from "next/server";
import { retrieveMovies } from "@/database/collections/movies";

export async function GET() {
  const movies = await retrieveMovies();

  if (movies.length === 0) {
    return NextResponse.json(
      {
        error: "MongoDB collection not found!",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: movies,
    },
    { status: 200 }
  );
}
