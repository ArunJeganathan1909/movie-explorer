import React, { createContext, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  
  return (
    <MovieContext.Provider
      value={{ movies, setMovies, favorites, setFavorites, user, setUser }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
