import axios from "axios";

const API_KEY = "8d32be72566de655ec75947734aac260";
const BASE_URL = "https://api.themoviedb.org/3";

// Rj4bCj!d7Jw8@eX

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default tmdb;
