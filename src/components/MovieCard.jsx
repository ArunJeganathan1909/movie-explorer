import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StarBorder, Star } from "@mui/icons-material"; // Import icons
import "../styles/components/MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigating when clicking the star
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="movie-card">
      {/* Star Icon */}
      <div className="movie-card__star" onClick={toggleFavorite}>
        {isFavorite ? <Star /> : <StarBorder />}
      </div>

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
