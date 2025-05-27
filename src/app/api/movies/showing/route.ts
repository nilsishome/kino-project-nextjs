import { NextResponse } from "next/server";

import { connectToDatabase } from "@/database/connect";
import { Movies } from "@/database/models";
import { MovieScreening } from "@/types";

export async function GET() {
  try {
    await connectToDatabase();
    const limit = 10;
    const currentScreenings: MovieScreening[] = await getHomePageScreenings(
      limit
    );

    if (currentScreenings.length !== 10) {
      return NextResponse.json(
        {
          error: "Too many or too few screenings retrieved!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: currentScreenings,
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

export async function getHomePageScreenings(limit: number) {
  return Movies.aggregate([
    { $unwind: "$screenings" },
    {
      $match: {
        "screenings.date": {
          $gt: new Date(),
          $lte: new Date(Date.now() + 120 * 60 * 60 * 1000),
          // 120: hours, 60: minutes, 60: seconds, 1000: milliseconds
        },
      },
    },
    { $sort: { "screenings.date": 1 } },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        title: 1,
        coverImage: 1,
        date: "$screenings.date",
        time: "$screenings.time",
      },
    },
  ]);
}
