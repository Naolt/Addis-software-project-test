import { combineReducers } from "redux";
import songsReducer from "./songsReducer";
import modalReducer from "./modalReducer";
import audioPlayerReducer from "./audioPlayerReducer";

const rootReducer = combineReducers({
  songs: songsReducer,
  editModal: modalReducer,
  audioPlayer: audioPlayerReducer,
});

export default rootReducer;
