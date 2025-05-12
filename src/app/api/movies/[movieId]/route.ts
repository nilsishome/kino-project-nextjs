import { NextRequest, NextResponse } from "next/server";
import { retrieveMovies } from "@/database/collections/movies";
import { Movies } from "@/database/models";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ movieId: string }>;
  }
) {
  const { movieId } = await params;

  await retrieveMovies();
  const movie = await Movies.findById(movieId);

  if (!movie) {
    return NextResponse.json(
      {
        error: "MongoDB collection not found!",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: movie,
    },
    { status: 200 }
  );
}
