import Counter from "./Counter.tsx";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "./types";
import "./index.css";


const startMovies: Movie[] = [
  {
    id: 1,
    title: "Avatar",
    year: 2009,
    watched: true,
    rating: 8,
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    watched: false,
    rating: 9,
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    watched: true,
    rating: 9,
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500",
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    watched: false,
    rating: 8,
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
  },
  {
    id: 5,
    title: "Dune",
    year: 2021,
    watched: false,
    rating: 8,
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500",
  },
];

function Header() {
  return (
    <header className="header">
      <Counter />
      <h1>My Movie Watchlist</h1>
      <p>Add movies, track what you watched, and enjoy!</p>
    </header>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const savedMovies = localStorage.getItem("my-watchlist");

      if (savedMovies) {
        return JSON.parse(savedMovies) as Movie[];
      }
    } catch {
      // Use the starting movies if saved data cannot be read.
    }

    return startMovies;
  });

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("2024");
  const [rating, setRating] = useState("8");
  const [image, setImage] = useState("");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-watchlist", JSON.stringify(movies));
  }, [movies]);

  function addMovie() {
    const cleanTitle = title.trim();
    const movieYear = Number(year);
    const movieRating = Number(rating);

    if (!cleanTitle) {
      alert("Please enter a movie title.");
      return;
    }

    if (
      !Number.isInteger(movieYear) ||
      movieYear < 1888 ||
      movieYear > new Date().getFullYear()
    ) {
      alert("Please enter a valid movie year.");
      return;
    }

    if (
      !Number.isFinite(movieRating) ||
      movieRating < 0 ||
      movieRating > 10
    ) {
      alert("Rating must be between 0 and 10.");
      return;
    }

    const alreadyExists = movies.some(
      (movie) =>
        movie.title.toLowerCase() === cleanTitle.toLowerCase()
    );

    if (alreadyExists) {
      alert("This movie is already in your watchlist.");
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title: cleanTitle,
      year: movieYear,
      watched: false,
      rating: movieRating,
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
    };

    setMovies((currentMovies) => [...currentMovies, newMovie]);

    setTitle("");
    setYear("2024");
    setRating("8");
    setImage("");
  }

  function toggleWatched(id: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  }

  function deleteMovie(id: number) {
    const shouldDelete = window.confirm(
      "Do you want to delete this movie?"
    );

    if (!shouldDelete) {
      return;
    }

    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const toWatchMovies = filteredMovies.filter(
    (movie) => !movie.watched
  );

  const watchedMovies = filteredMovies.filter(
    (movie) => movie.watched
  );

  const watchedCount = movies.filter(
    (movie) => movie.watched
  ).length;

  return (
    <main className={dark ? "app dark" : "app"}>
      <Header />

      <div className="summary">
        <p>
          <strong>{movies.length}</strong> movies,{" "}
          <strong>{watchedCount}</strong> watched
        </p>

        <button onClick={() => setDark((current) => !current)}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <section className="form-section">
        <h2>Add a Movie</h2>

        <div className="movie-form">
          <input
            type="text"
            placeholder="Movie title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Rating out of 10"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />

          <input
            type="url"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />

          <button onClick={addMovie}>Add Movie ➕</button>
        </div>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <p>
          You typed: {search} ({search.length} letters)
        </p>

        <button onClick={() => setSearch("")}>Clear Search</button>
      </section>

      <Section title="To Watch">
        {toWatchMovies.length === 0 ? (
          <p>No movies to watch.</p>
        ) : (
          <div className="movie-grid">
            {toWatchMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggle={toggleWatched}
                onDelete={deleteMovie}
              />
            ))}
          </div>
        )}
      </Section>

      <Section title="Watched">
        {watchedMovies.length === 0 ? (
          <p>No watched movies yet.</p>
        ) : (
          <div className="movie-grid">
            {watchedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggle={toggleWatched}
                onDelete={deleteMovie}
              />
            ))}
          </div>
        )}
      </Section>

      {filteredMovies.length === 0 && (
        <p className="empty-message">
          No movies found. Try another search.
        </p>
      )}

      <footer>
        <p>My Watchlist · Built with React and TypeScript</p>
      </footer>
    </main>
  );
}

export default App;