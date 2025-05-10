import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card__link">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-card__poster"
        />
        <div className="movie-card__info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
