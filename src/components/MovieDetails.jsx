import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  return <h2>Movie Details for ID: {id}</h2>;
};

export default MovieDetails;
