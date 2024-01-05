import { combineReducers } from "redux";
import songsReducer from "./songsReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  songs: songsReducer,
  editModal: modalReducer,
});

export default rootReducer;
