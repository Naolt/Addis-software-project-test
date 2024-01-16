import { createSlice } from "@reduxjs/toolkit";

const editModalSlice = createSlice({
  name: "editModal",
  initialState: {
    open: false,
    song: {},
  },
  reducers: {
    openEditModal: (state, action) => {
      return { ...state, open: true };
    },
    closeEditModal: (state, action) => {
      return { ...state, open: false };
    },
    setSongToModal: (state, action) => {
      return { ...state, song: action.payload };
    },
  },
});

export const { openEditModal, closeEditModal, setSongToModal } =
  editModalSlice.actions;

export default editModalSlice.reducer;
