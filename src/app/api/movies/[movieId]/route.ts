import { NextRequest, NextResponse } from "next/server";
import { retrieveMovies } from "@/database/collections/movies";
import { Movies } from "@/database/models";
import { resetScreenings } from "@/database/collections/screenings";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ movieId: string }>;
  }
) {
  const { movieId } = await params;

  // ONLY ACTIVE WHEN RESETTING DATABASE FOR SCREENINGS (TEMPORARY)
  //
  // resetScreenings();
  //
  // DON'T TOUCH

  try {
    await retrieveMovies();
    const movie = await Movies.findById(movieId);

    if (!movie) {
      return NextResponse.json(
        {
          error: "Movie not found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: movie,
        rating: 3.5,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
