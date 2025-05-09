import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default App;
