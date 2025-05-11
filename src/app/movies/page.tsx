type Movie = {
  _id: string;
  title: string;
  coverImage: string;
};

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
            <img src={movie.coverImage} />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
