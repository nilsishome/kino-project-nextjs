import { NextResponse } from "next/server";

import { connectToDatabase } from "@/database/connect";
import { Movies } from "@/database/models";
import { MovieScreening } from "@/types";

export async function GET() {
  try {
    await connectToDatabase();
    const currentScreenings: MovieScreening[] = await Movies.aggregate([
      { $unwind: "$screenings" },
      {
        $match: {
          "screenings.date": {
            $gt: new Date(),
            $lte: new Date(new Date().getTime() + 120 * 60 * 60 * 1000),
            // 120: hours, 60: minutes, 60: seconds, 1000: milliseconds
          },
        },
      },
      { $sort: { "screenings.date": 1 } },
      { $limit: 10 },
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

    if (currentScreenings.length === 0) {
      return NextResponse.json(
        {
          error: "No current screenings!",
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
