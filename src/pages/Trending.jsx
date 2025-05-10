import React, { useEffect, useState, useCallback } from "react";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import "../styles/pages/Trending.css";
import Navbar from "../components/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingMovies = async (page) => {
    const response = await tmdb.get(`/trending/movie/week`, {
      params: { page },
    });
    return response.data.results;
  };

  const fetchSearchResults = async (term, page) => {
    const response = await tmdb.get(`/search/movie`, {
      params: { query: term, page },
    });
    return response.data.results;
  };

  const handleSearch = useCallback(async (term) => {
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);
    try {
      if (term === "") {
        const trending = await fetchTrendingMovies(1);
        setMovies(trending);
      } else {
        const searched = await fetchSearchResults(term, 1);
        setMovies(searched);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
      console.error(err);
    }
  }, []);

  const fetchMoreMovies = async () => {
    const nextPage = page + 1;
    let newMovies = [];
    try {
      if (searchTerm === "") {
        newMovies = await fetchTrendingMovies(nextPage);
      } else {
        newMovies = await fetchSearchResults(searchTerm, nextPage);
      }

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
        setPage(nextPage);
      }
    } catch (err) {
      setError("Failed to load more movies.");
      setHasMore(false);
    }
  };

  useEffect(() => {
    handleSearch("");
  }, [handleSearch]);

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="trending-container">
        <h2>Trending Movies</h2>
        {error && <p className="error">{error}</p>}
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading more movies...</h4>}
          className="movie-grid"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Trending;
