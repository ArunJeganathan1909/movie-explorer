// redux/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { username, favorites: [] }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = { ...action.payload, favorites: [] };
    },
    logout(state) {
      state.user = null;
    },
    addFavorite(state, action) {
      if (state.user && !state.user.favorites.find(m => m.id === action.payload.id)) {
        state.user.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      if (state.user) {
        state.user.favorites = state.user.favorites.filter(
          (movie) => movie.id !== action.payload.id
        );
      }
    },
  },
});

export const { login, logout, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
