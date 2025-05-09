import axios from "axios";

const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

// Rj4bCj!d7Jw8@eX

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default tmdb;
