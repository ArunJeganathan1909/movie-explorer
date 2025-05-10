import React, { useEffect, useState } from "react";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import "../styles/pages/Trending.css";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";

const ITEMS_PER_PAGE = 10;

const Trending = () => {
  const [allMovies, setAllMovies] = useState([]); // full fetched list
  const [filteredMovies, setFilteredMovies] = useState([]); // filtered full list
  const [visibleMovies, setVisibleMovies] = useState([]); // currently visible
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchTrendingMovies = async () => {
    try {
      const response = await tmdb.get(`/trending/movie/week`);
      const sorted = response.data.results
        .filter((movie) => movie.release_date)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      setAllMovies(sorted);
      setFilteredMovies(sorted);
      setVisibleMovies(sorted.slice(0, ITEMS_PER_PAGE));
      setHasMore(sorted.length > ITEMS_PER_PAGE);
    } catch (err) {
      setError("Failed to fetch trending movies.");
      console.error(err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = term === ""
      ? allMovies
      : allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase()) ||
          movie.overview.toLowerCase().includes(term.toLowerCase())
        );

    setFilteredMovies(filtered);
    setVisibleMovies(filtered.slice(0, ITEMS_PER_PAGE));
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  };

  const fetchMoreMovies = () => {
    const currentLength = visibleMovies.length;
    const nextMovies = filteredMovies.slice(currentLength, currentLength + ITEMS_PER_PAGE);
    setVisibleMovies((prev) => [...prev, ...nextMovies]);
    if (currentLength + ITEMS_PER_PAGE >= filteredMovies.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="trending-container">
        <h2>Trending Movies</h2>
        {error && <p className="error">{error}</p>}
        <InfiniteScroll
          dataLength={visibleMovies.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading more movies...</h4>}
          className="movie-grid"
        >
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Trending;
