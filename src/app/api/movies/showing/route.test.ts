import { describe, test } from "@jest/globals";

import * as db from "@/tests/db";
import { Movie, MovieScreening } from "@/types";

import { Movies } from "@/database/models";
import { GET, getHomePageScreenings } from "./route";

jest.mock("@/database/connect");

describe("GET /api/movies/showing", () => {
  let movieLength: number;
  let numberOfScreenings: number;

  beforeEach(() => {
    movieLength = 16;
    numberOfScreenings = 10;
  });

  beforeAll(async () => db.connect());

  afterEach(async () => db.clearDatabase());

  afterAll(async () => db.closeDatabase());

  test("retrieval of 1 movie screening from database", async () => {
    await insertMovies(movieLength);
    numberOfScreenings = 1;
    const screenings: MovieScreening[] = await getHomePageScreenings(
      numberOfScreenings
    );
    const parsedScreenings = JSON.parse(JSON.stringify(screenings));

    const res = await GET();
    const payload = await res.json();

    const data: MovieScreening[] | undefined =
      payload.data === undefined ? undefined : payload.data;
    const parsedData = JSON.parse(JSON.stringify(data)) || undefined;

    expect(parsedData).not.toStrictEqual(parsedScreenings);
    expect(parsedData).not.toHaveLength(parsedScreenings.length);
  });

  test("retrieval of 10 movie screenings from database", async () => {
    await insertMovies(movieLength);
    const screenings: MovieScreening[] = await getHomePageScreenings(
      numberOfScreenings
    );
    const parsedScreenings = JSON.parse(JSON.stringify(screenings));

    const res = await GET();
    const payload = await res.json();
    const data: MovieScreening[] | undefined =
      payload.data === undefined ? undefined : payload.data;
    const parsedData = JSON.parse(JSON.stringify(data)) || undefined;

    expect(parsedData).toStrictEqual(parsedScreenings);
    expect(parsedData).toHaveLength(parsedScreenings.length);
  });

  test("retrieval of 11 movie screenings from database", async () => {
    await insertMovies(movieLength);
    numberOfScreenings = 11;
    const screenings: MovieScreening[] = await getHomePageScreenings(
      numberOfScreenings
    );
    const parsedScreenings = JSON.parse(JSON.stringify(screenings));

    const res = await GET();
    const payload = await res.json();
    const data: MovieScreening[] | undefined =
      payload.data === undefined ? undefined : payload.data;
    const parsedData = JSON.parse(JSON.stringify(data)) || undefined;

    expect(parsedData).not.toStrictEqual(parsedScreenings);
    expect(parsedData).not.toHaveLength(parsedScreenings.length);
  });

  test("insufficient number of screenings", async () => {
    movieLength = 1;
    await insertMovies(movieLength);
    const screenings: MovieScreening[] = await getHomePageScreenings(
      numberOfScreenings
    );
    const parsedScreenings = JSON.parse(JSON.stringify(screenings));

    const res = await GET();
    const payload = await res.json();
    const data: MovieScreening[] | undefined =
      payload.data === undefined ? undefined : payload.data;

    expect(data).not.toStrictEqual(parsedScreenings);
    expect(data).toBeUndefined();
  });
});

const insertMovies = async (moviesLength: number) => {
  const movieArray = [];

  for (let i = 0; i < moviesLength; i++) {
    movieArray.push(fakeMovieData);
  }

  await Movies.insertMany(movieArray);
};

const fakeMovieData: Movie = {
  title: "HEY",
  story: "string",
  genre: "string",
  hour: 5,
  minute: 5,
  coverImage: "string",
  sliderImage: "string",
  reviews: [],
  color: true,
  decade: "string",
  upcoming: false,
  ageLimit: 15,
  release: 2001,
  screenings: [
    {
      time: "String",
      date: new Date(Date.now() + 60 * 60 * 1000),
      saloon: "String",
    },
  ],
};
