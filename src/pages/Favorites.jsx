import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import "../styles/pages/Favorites.css";

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const favorites = useSelector((state) => state.user.user?.favorites || []);

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };

  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div style={{ padding: "20px" }}>
        <h2>My Favorite Movies</h2>
        {filteredFavorites.length === 0 ? (
          <p>No favorites found</p>
        ) : (
          <div className="favorites-grid">
            {filteredFavorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
