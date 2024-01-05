import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Actions
    addSong: (state, action) => {
      return { ...state, loading: true };
    },
    updateSong: (state, action) => {
      return { ...state, loading: true };
    },
    deleteSong: (state, action) => {
      return { ...state, loading: true };
    },
    fetchSongs: (state, action) => {
      return { ...state, loading: true };
    },

    // Reducers
    setSongs: (state, action) => {
      console.log(action.payload);
      return { ...state, data: [...action.payload], loading: false };
    },
    addSongSuccess: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
      loading: false,
    }),
    updateSongSuccess: (state, action) => {
      return {
        ...state,
        data: state.data.map((song) => {
          if (song.id === action.payload.id) {
            return action.payload;
          }
          return song;
        }),
        loading: false,
      };
    },
    deleteSongSuccess: (state, action) => {
      return {
        ...state,
        data: state.data.filter((song) => song.id !== action.payload.id),
        loading: false,
      };
    },
  },
});

export const {
  addSong,
  updateSong,
  deleteSong,
  setSongs,
  fetchSongs,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
} = songsSlice.actions;

export default songsSlice.reducer;
