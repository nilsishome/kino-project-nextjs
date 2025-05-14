import Link from "next/link";
import { Movie } from "@/types";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/movies");

  if (!response.ok) {
    throw new Error("Failed to retrieve data!");
  }

  const payload = await response.json();
  const movies: Movie[] = payload.data;

  return (
    <>
      <h1>Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link href={`/movies/${movie._id}`}>
              <img src={movie.coverImage} />
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
