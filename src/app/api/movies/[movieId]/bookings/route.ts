import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/database/connect";
import { Booking } from "@/database/models";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  {}: {
    params: Promise<{ movieId: string }>;
  }
) {
  try {
    await connectToDatabase();

    const { searchParams } = req.nextUrl;
    const screeningId = searchParams.get("id");
    const movieTitle = searchParams.get("movie");

    const booking = await Booking.find({ title: movieTitle });

    const objectId = new mongoose.Types.ObjectId(screeningId!);
    const screening = booking[0].screenings.find((element) =>
      element._id.equals(objectId)
    );

    return NextResponse.json(
      {
        seats: screening?.seats,
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

export async function POST(
  req: NextRequest,
  {}: {
    params: Promise<{ movieId: string }>;
  }
) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const data = body.data;

    const booking = await Booking.find({ title: data.screeningData.title });

    if (booking.length > 0) {
      const screeningFound = booking[0].screenings.find((element) => {
        return (
          JSON.stringify(element.date) ==
          JSON.stringify(data.screeningData.date)
        );
      });

      if (screeningFound) {
        data.selectedSeats.map(async (seat: number) => {
          await Booking.updateOne(
            { _id: booking[0]._id, "screenings._id": screeningFound?._id },
            { $push: { "screenings.$.seats": seat } }
          );
        });
      } else {
        await Booking.updateOne(
          { _id: booking[0]._id },
          {
            $push: {
              screenings: {
                date: data.screeningData.date,
                saloon: data.screeningData.saloon,
                seats: data.selectedSeats,
                time: data.screeningData.time,
                _id: data.screeningData._id,
              },
            },
          }
        );
      }
    } else {
      await Booking.insertOne({
        title: data.screeningData.title,
        screenings: {
          date: data.screeningData.date,
          saloon: data.screeningData.saloon,
          seats: data.selectedSeats,
          time: data.screeningData.time,
          _id: data.screeningData._id,
        },
      });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
