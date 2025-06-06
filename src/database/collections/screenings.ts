import mongoose from "mongoose";
import { Movies } from "../models";

export function createScreenings() {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const currentMovieScreening = [];

  for (
    let currentScreeningIndex = 0;
    currentScreeningIndex < 10;
    currentScreeningIndex++
  ) {
    const date = new Date();

    const daysLeft = monthDays[date.getMonth()] - date.getDate();

    const saloons = ["Metropol", "Saga", "Serif"];

    const times = [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ];

    const calculatedDays =
      date.getDate() + Math.floor(Math.random() * daysLeft);
    const calculatedTime = times[Math.floor(Math.random() * times.length)];

    date.setDate(calculatedDays);
    date.setHours(Number(calculatedTime.substring(0, 2)));
    date.setMinutes(0);

    const newScreening = {
      time: date.getHours(),
      date,
      saloon: saloons[Math.floor(Math.random() * saloons.length)],
    };

    currentMovieScreening.push(newScreening);
  }

  currentMovieScreening.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return currentMovieScreening;
}

export async function resetScreenings() {
  const USERNAME = process.env.MONGO_USER;
  const PASSWORD = process.env.MONGO_PASS;

  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@kinocluster.dtam1oe.mongodb.net/Kino?retryWrites=true&w=majority&appName=KinoCluster`;

  await mongoose.connect(uri);

  const movies = await Movies.find();

  for (let currentIndex = 0; currentIndex < movies.length; currentIndex++) {
    const currentMovie = movies[currentIndex];
    const movieScreenings = createScreenings();

    currentMovie.screenings.push(movieScreenings);

    await Movies.updateOne(
      { title: currentMovie.title },
      { $set: { screenings: movieScreenings } }
    );
  }
}
