import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LoginModal from './LoginModal';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#333' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Movie Explorer</Typography>

          <SearchBar />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
              <Brightness4Icon />
            </IconButton>

            {user ? (
              <Typography>{user.username}</Typography>
            ) : (
              <IconButton color="inherit" onClick={() => setOpenLogin(true)}>
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
