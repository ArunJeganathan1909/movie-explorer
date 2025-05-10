import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import StarIcon from '@mui/icons-material/Star';  // Import the star icon
import LoginModal from './LoginModal';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { Link } from 'react-router-dom';
import '../styles/components/Navbar.css'; 

const Navbar = ({ onSearch }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          {/* Logo and Links */}
          <Box className="navbar__left">
            <Link to="/" className="navbar__logo">
              <Typography variant="h6">Movie Explorer</Typography>
            </Link>
            <Link to="/trending" className="navbar__link">
              <Typography variant="subtitle1">Trending</Typography>
            </Link>
          </Box>

          {/* Search Bar */}
          <Box className="navbar__search">
            <SearchBar onSearch={onSearch} />
          </Box>

          {/* Star Icon (Favorites) and Theme Toggle */}
          <Box className="navbar__right">
            <Link to="/favorites" className="navbar__favorites">
              <IconButton className="navbar__icon">
                <StarIcon />
              </IconButton>
            </Link>

            <IconButton className="navbar__icon" onClick={() => dispatch(toggleTheme())}>
              <Brightness4Icon />
            </IconButton>

            {/* Account Icon or Username */}
            {user ? (
              <Typography className="navbar__username">{user.username}</Typography>
            ) : (
              <IconButton className="navbar__icon" onClick={() => setOpenLogin(true)}>
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
};

export default Navbar;
