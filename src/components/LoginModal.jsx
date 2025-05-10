// src/components/LoginModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../redux/user/userSlice";
import sampleUsers from "../data/sampleUsers";

const LoginModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const foundUser = sampleUsers.find(
      (user) =>
        user.username === form.username && user.password === form.password
    );

    if (foundUser) {
      dispatch(login({ username: foundUser.username }));
      setError("");
      onClose();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignup ? "Sign Up" : "Login"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
