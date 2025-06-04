import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connect";
import { Movies } from "@/database/models";

export async function POST(
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

    let movie = await Movies.findById(movieId);

    if (!movie) {
      return NextResponse.json(
        {
          error: "Movie not found!",
        },
        { status: 404 }
      );
    }

    let body = await req.json();

    let newDate = new Date(body.sendingData.date);

    body.sendingData.date = newDate;

    await Movies.updateOne(
      { _id: movieId },
      { $push: { reviews: body.sendingData } }
    );

    movie = await Movies.findById(movieId);

    return NextResponse.json(
      {
        data: movie!.reviews,
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
