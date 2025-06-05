import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connect";
import { Booking, Movies } from "@/database/models";

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

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ movieId: string }>;
  }
) {
  try {
    await connectToDatabase();

    let body = await req.json();

    const data = body.data;

    /* if (body.sendingData._id) {
      await Booking.insertOne(body.sendingData);
    } */

    //   sendingData: {
    //   selectedSeats: [ 3, 11, 19 ],
    //   totalTickets: 2,
    //   screeningData: {
    //     title: 'E.T.',
    //     time: '20',
    //     date: '2025-06-08T18:00:40.310Z',
    //     saloon: 'Serif',
    //     id: '683dea10513b456d30aed98a',
    //     image: 'https://m.media-amazon.com/images/M/MV5BYTNhNmY0YWMtMTczYi00MTA0LThhMmUtMTIxYzE0Y2QwMzRlXkEyXkFqcGc@._V1_SX300.jpg'
    //   }
    // }

    console.log(data);

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
