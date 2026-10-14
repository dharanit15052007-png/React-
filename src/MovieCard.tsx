import type { Movie } from "./types";

interface MovieCardProps {
  movie: Movie;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function MovieCard({
  movie,
  onToggle,
  onDelete,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <img
        className="movie-image"
        src={movie.image}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>Year: {movie.year}</p>
        <p>Rating: {movie.rating}/10</p>

        <p>
          {movie.year > 2015 ? "New" : "Classic"}
        </p>

        {movie.watched && (
          <p className="watched-label">✔ Watched</p>
        )}

        <div className="movie-actions">
          <button onClick={() => onToggle(movie.id)}>
            {movie.watched ? "Mark To Watch" : "Mark Watched"}
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(movie.id)}
          >
            Delete ✕
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;