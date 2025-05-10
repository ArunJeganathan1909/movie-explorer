import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import "../styles/components/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdb.get(`/movie/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movie details.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check if videos data exists and then get the trailer key
  const trailerKey = movie?.videos?.results?.[0]?.key || null;

  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-details__poster"
      />
      <div className="movie-details__info">
        <h1>{movie.title}</h1>
        <p>{movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <ul>
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <h3>Cast</h3>
        {/* You can fetch the cast separately using the `credits` endpoint */}
        <p>Cast information will be displayed here</p>

        {/* Only show trailer link if a trailer key exists */}
        {trailerKey ? (
          <a
            href={`https://www.youtube.com/watch?v=${trailerKey}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Trailer
          </a>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
