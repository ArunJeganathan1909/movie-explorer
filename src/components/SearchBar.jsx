import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#555', borderRadius: 1, px: 1 }}>
      <SearchIcon />
      <InputBase
        placeholder="Search…"
        sx={{ color: 'white', ml: 1 }}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default SearchBar;
