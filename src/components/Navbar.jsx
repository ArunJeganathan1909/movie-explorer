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
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
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
import { logout } from "../redux/user/userSlice";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/components/Navbar.css";

const Navbar = ({ onSearch }) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleFavoritesClick = () => {
    if (user) {
      navigate("/favorites");
    } else {
      setLoginPromptOpen(true);
    }
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
              <RouterLink
                to="/trending"
                className={`navbar__link ${
                  location.pathname === "/trending" ? "active-link" : ""
                }`}
              >
                <Typography variant="subtitle1">Trending</Typography>
              </RouterLink>
            </Box>

            <Box className="navbar__search">
              <SearchBar onSearch={onSearch} />
            </Box>

            <Box className="navbar__right">
              <IconButton
                className={`navbar__icon ${
                  location.pathname === "/favorites" ? "active-link" : ""
                }`}
                onClick={handleFavoritesClick}
              >
                <StarIcon />
              </IconButton>

              <IconButton
                className="navbar__icon"
                onClick={() => dispatch(toggleTheme())}
              >
                <Brightness4Icon
                  style={{ color: theme === "dark" ? "#ff6347" : "inherit" }}
                />
              </IconButton>

              {user ? (
                <Typography
                  className="navbar__username"
                  onClick={() => dispatch(logout())}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  title="Click to logout"
                >
                  <span>{user.username} </span>
                  <span>( logout )</span>
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
                className={
                  location.pathname === "/trending" ? "active-link" : ""
                }
              />
            </ListItem>

            <ListItem
              button
              onClick={handleFavoritesClick}
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
                className={
                  location.pathname === "/favorites" ? "active-link" : ""
                }
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
                  sx={{
                    color:
                      theme === "dark"
                        ? "#ff6347"
                        : theme === "light"
                        ? "black"
                        : "inherit",
                  }}
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
                if (user) {
                  dispatch(logout());
                } else {
                  setOpenLogin(true);
                }
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
                primary={user ? `${user.username} (Logout)` : "Login"}
                sx={{ color: theme === "light" ? "black" : "white" }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Login Prompt Dialog */}
      <Dialog
        open={loginPromptOpen}
        onClose={() => setLoginPromptOpen(false)}
        className="login-prompt-dialog"
      >
        <DialogTitle>You need to log in to access Favorites</DialogTitle>
        <DialogActions>
          <Button onClick={() => setLoginPromptOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setLoginPromptOpen(false);
              setOpenLogin(true);
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
};

export default Navbar;
