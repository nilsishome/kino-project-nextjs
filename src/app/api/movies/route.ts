import { NextResponse } from "next/server";
import { retrieveMovies } from "@/database/collections/movies";
import { Movies } from "@/database/models";

export async function GET() {
  try {
    await retrieveMovies();
    const movies = await Movies.find();

    if (movies.length === 0) {
      return NextResponse.json(
        {
          error: "Movies not found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: movies,
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
