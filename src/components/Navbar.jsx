import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import StarIcon from "@mui/icons-material/Star"; // Import the star icon
import MenuIcon from "@mui/icons-material/Menu";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { Link } from "react-router-dom";
import "../styles/components/Navbar.css";

const Navbar = ({ onSearch }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <div className="nav-desktop">
        <AppBar position="static" className="navbar-desktop">
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

              <IconButton
                className="navbar__icon"
                onClick={() => dispatch(toggleTheme())}
              >
                <Brightness4Icon />
              </IconButton>

              {/* Account Icon or Username */}
              {user ? (
                <Typography className="navbar__username">
                  {user.username}
                </Typography>
              ) : (
                <IconButton
                  className="navbar__icon"
                  onClick={() => setOpenLogin(true)}
                >
                  <AccountCircle />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </div>

      <div className="nav-mobile">
        <AppBar position="static" className="navbar-mobile">
          <Toolbar className="navbar__toolbar">
            {/* Mobile Menu Icon + Logo */}
            <Box className="navbar__mobile">
              <IconButton className="navbar__icon" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Link to="/" className="navbar__logo">
                <Typography variant="h6">Movie Explorer</Typography>
              </Link>
            </Box>
          </Toolbar>
          <Box className="navbar__search-row">
            <SearchBar onSearch={onSearch} />
          </Box>
        </AppBar>
      </div>

      {/* Slide-out Drawer Menu (Mobile Only) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem button component={Link} to="/trending">
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText primary="Trending" />
            </ListItem>

            <ListItem button component={Link} to="/favorites">
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>

            <ListItem button onClick={() => dispatch(toggleTheme())}>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
              <ListItemText
                primary={`Theme: ${theme === "light" ? "Light" : "Dark"}`}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                if (!user) setOpenLogin(true);
              }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={user ? user.username : "Login"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
};

export default Navbar;
