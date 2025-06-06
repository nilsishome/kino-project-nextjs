import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connect";
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

  try {
    await connectToDatabase();
    const movie = await Movies.findById(movieId);

    let totalRating: number = 0;

    if (movie) {
      if (movie.reviews.length > 0) {
        movie?.reviews.forEach((review) => {
          totalRating = totalRating + review.rating;
        });

        totalRating = totalRating / movie.reviews.length;
      }
    }

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
        rating: totalRating,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
