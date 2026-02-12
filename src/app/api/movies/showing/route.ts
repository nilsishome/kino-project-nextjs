import { NextResponse } from "next/server";

import { connectToDatabase } from "@/database/connect";
import { resetScreenings } from "@/database/collections/screenings";
import { Movies } from "@/database/models";
import { MovieScreening } from "@/types";

export async function GET() {
  try {
    await connectToDatabase();
    const limit = 10;
    let currentScreenings: MovieScreening[] =
      await getHomePageScreenings(limit);

    if (currentScreenings.length < 10) {
      try {
        resetScreenings(); // Resets and updates all screenings in our database
        currentScreenings = await getHomePageScreenings(limit);
      } catch (error) {
        return NextResponse.json(
          {
            error: `Too many or too few screenings retrieved! ${error}`,
          },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      {
        data: currentScreenings,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 },
    );
  }
}

async function getHomePageScreenings(limit: number) {
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
        _id: 1,
        screeningId: "$screenings._id",
        title: 1,
        coverImage: 1,
        date: "$screenings.date",
        time: "$screenings.time",
      },
    },
  ]);
}
