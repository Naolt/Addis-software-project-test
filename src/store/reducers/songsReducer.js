import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: [],
  reducers: {
    addSong: (state, action) => state,
    setSongs: (state, action) => action.payload,

    updateSong: (state, action) => {
      // To be implemented
      //const newState = state.map((song) => {
      //  if (song.id === action.payload.id) {
      //    return action.payload;
      //  }
      //  return song;
      //});
      //return newState;
    },
    deleteSong: (state, action) => {
      // To be implemented
      //const newState = state.filter((song) => song.id !== action.payload);
      //return newState;
    },
    addSongtoState: (state, action) => [...state, action.payload],
    fetchSongs: (state, action) => action.payload,
  },
});

export const {
  setSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchSongs,
  addSongtoState,
} = songsSlice.actions;

export default songsSlice.reducer;
