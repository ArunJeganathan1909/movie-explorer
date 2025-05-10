import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import tmdb from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTrendingMovies = async (page) => {
    const response = await tmdb.get(`/trending/movie/day`, { params: { page } });
    return response.data.results;
  };

  const fetchSearchResults = async (term, page) => {
    const response = await tmdb.get(`/search/movie`, {
      params: { query: term, page },
    });
    return response.data.results;
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setPage(1);
    setHasMore(true);
    if (term === "") {
      const trending = await fetchTrendingMovies(1);
      setMovies(trending);
    } else {
      const searched = await fetchSearchResults(term, 1);
      setMovies(searched);
    }
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  const fetchMoreMovies = async () => {
    const nextPage = page + 1;
    let newMovies = [];
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
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="movie-grid">
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
