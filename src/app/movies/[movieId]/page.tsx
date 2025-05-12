import { Movie } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const response = await fetch(`http://localhost:3000/api/movies/${movieId}`);

  if (!response.ok) {
    throw new Error("Failed to retrieve data!");
  }

  const payload = await response.json();
  const movie: Movie = payload.data;

  return (
    <>
      <img src={movie.coverImage} />
      <h2>
        {movie.title} <small>({movie.release})</small>
      </h2>
      <p>
        <small>{movie.genre}</small>
      </p>
      <p>{movie.story}</p>
    </>
  );
}
