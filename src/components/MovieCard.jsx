import React from "react";
import { Link } from "react-router-dom";
import { StarBorder, Star } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/user/userSlice";
import "../styles/components/MovieCard.css";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isFavorite = user?.favorites?.some((fav) => fav.id === movie.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to favorite movies");

    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="movie-card">
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
