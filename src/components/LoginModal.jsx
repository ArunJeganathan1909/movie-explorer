import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography, Box } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const LoginModal = ({ open, onClose }) => {
  const { setUser } = useContext(MovieContext);
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = () => {
    if (form.username && form.password) {
      // Simulated login
      setUser({ username: form.username });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isSignup ? 'Sign Up' : 'Login'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
