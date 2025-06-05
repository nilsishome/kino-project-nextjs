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
