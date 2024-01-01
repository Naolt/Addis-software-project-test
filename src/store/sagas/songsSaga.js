import { call, put, takeLatest } from "redux-saga/effects";
import {
  setSongs,
  addSong,
  updateSong,
  deleteSong,
} from "../reducers/songsReducer";

const fetchSongsApi = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => data.slice(0, 5));
};

function* fetchSongs() {
  try {
    const songs = yield call(fetchSongsApi);
    yield put(setSongs(songs));
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchSongs() {
  yield takeLatest("songs/fetchSongs", fetchSongs);
}

export default function* songsSaga() {
  yield watchFetchSongs();
  // Add other watcher sagas here if needed
}
