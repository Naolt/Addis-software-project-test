import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: [],
  reducers: {
    setSongs: (state, action) => action.payload,
    addSong: (state, action) => [...state, action.payload],
    updateSong: (state, action) => {
      // Implement logic to update a song in the state
    },
    deleteSong: (state, action) => {
      // Implement logic to delete a song from the state
    },
  },
});

export const { setSongs, addSong, updateSong, deleteSong } = songsSlice.actions;

export default songsSlice.reducer;
