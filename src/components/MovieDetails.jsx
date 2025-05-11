import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StarBorder, Star } from "@mui/icons-material";
import { addFavorite, removeFavorite } from "../redux/user/userSlice";
import tmdb from "../api/tmdb";
import Navbar from "./Navbar";
import "../styles/components/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate(); // Add the useNavigate hook

  // Function to handle search and redirect
  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      navigate("/"); // Redirect to home page on search
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdb.get(
          `/movie/${id}?append_to_response=videos`
        );
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

  const isFavorite = user?.favorites?.some((fav) => fav.id === movie?.id);

  const toggleFavorite = () => {
    if (!user) return alert("Please login to favorite movies");

    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const trailerKey =
    movie?.videos?.results?.find((v) => v.type === "Trailer")?.key || null;

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="movie-details">
        <div className="movie-details__image-wrapper">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-details__poster"
          />
          <div className="movie-details__star" onClick={toggleFavorite}>
            {isFavorite ? <Star /> : <StarBorder />}
          </div>
        </div>

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
          <p>Cast information will be displayed here</p>

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
    </>
  );
};

export default MovieDetails;
