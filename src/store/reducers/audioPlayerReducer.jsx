import { createSlice } from "@reduxjs/toolkit";

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState: {
    open: false,
    song: {},
  },
  reducers: {
    openPlayer: (state, action) => {
      return { ...state, open: true };
    },
    closePlayer: (state, action) => {
      return { ...state, open: false };
    },
    setSongToPlayer: (state, action) => {
      return { ...state, song: action.payload };
    },
  },
});

export const { openPlayer, closePlayer, setSongToPlayer } =
  audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
