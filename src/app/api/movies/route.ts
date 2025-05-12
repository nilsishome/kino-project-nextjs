import { NextResponse } from "next/server";
import { retrieveMovies } from "@/database/collections/movies";
import { Movies } from "@/database/models";

export async function GET() {
  await retrieveMovies();
  const movies = await Movies.find();

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
