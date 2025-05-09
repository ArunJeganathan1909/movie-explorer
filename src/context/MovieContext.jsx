import React, { createContext, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <MovieContext.Provider
      value={{ movies, setMovies, favorites, setFavorites }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
