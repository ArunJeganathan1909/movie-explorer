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
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LoginModal from "./LoginModal";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { Link as RouterLink } from "react-router-dom";
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
      {/* Desktop Navbar */}
      <div className="nav-desktop">
        <AppBar position="static" className="navbar-desktop">
          <Toolbar>
            <Box className="navbar__left">
              <RouterLink to="/" className="navbar__logo">
                <Typography variant="h6">Movie Explorer</Typography>
              </RouterLink>
              <RouterLink to="/trending" className="navbar__link">
                <Typography variant="subtitle1">Trending</Typography>
              </RouterLink>
            </Box>

            <Box className="navbar__search">
              <SearchBar onSearch={onSearch} />
            </Box>

            <Box className="navbar__right">
              <RouterLink to="/favorites" className="navbar__favorites">
                <IconButton className="navbar__icon">
                  <StarIcon />
                </IconButton>
              </RouterLink>

              <IconButton
                className="navbar__icon"
                onClick={() => dispatch(toggleTheme())}
              >
                <Brightness4Icon />
              </IconButton>

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

      {/* Mobile Navbar */}
      <div className="nav-mobile">
        <AppBar position="static" className="navbar-mobile">
          <Toolbar className="navbar__toolbar">
            <Box className="navbar__mobile">
              <IconButton className="navbar__icon" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <RouterLink to="/" className="navbar__logo">
                <Typography variant="h6">Movie Explorer</Typography>
              </RouterLink>
            </Box>
          </Toolbar>
          <Box className="navbar__search-row">
            <SearchBar onSearch={onSearch} />
          </Box>
        </AppBar>
      </div>

      {/* Drawer Menu for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem
              button
              component={RouterLink}
              to="/trending"
              sx={{
                color: theme === "light" ? "black" : "white",
              }}
            >
              <ListItemIcon>
                <WhatshotIcon
                  sx={{ color: theme === "light" ? "black" : "white" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Trending"
                sx={{ color: theme === "light" ? "black" : "white" }}
              />
            </ListItem>

            <ListItem
              button
              component={RouterLink}
              to="/favorites"
              sx={{
                color: theme === "light" ? "black" : "white",
              }}
            >
              <ListItemIcon>
                <StarIcon
                  sx={{ color: theme === "light" ? "black" : "white" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Favorites"
                sx={{ color: theme === "light" ? "black" : "white" }}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => dispatch(toggleTheme())}
              sx={{
                color: theme === "light" ? "black" : "white",
              }}
            >
              <ListItemIcon>
                <Brightness4Icon
                  sx={{ color: theme === "light" ? "black" : "white" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={`Theme: ${theme === "light" ? "Light" : "Dark"}`}
                sx={{
                  color: theme === "light" ? "black" : "white",
                  cursor: "pointer",
                }}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                if (!user) setOpenLogin(true);
              }}
              sx={{
                color: theme === "light" ? "black" : "white",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <AccountCircle
                  sx={{ color: theme === "light" ? "black" : "white" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={user ? user.username : "Login"}
                sx={{ color: theme === "light" ? "black" : "white" }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
};

export default Navbar;
