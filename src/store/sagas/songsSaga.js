import { call, put, takeLatest } from "redux-saga/effects";
import {
  setSongs,
  addSongSuccess,
  deleteSongSuccess,
  updateSongSuccess,
} from "../reducers/songsReducer";
import {
  addSongApi,
  deleteSongApi,
  getSongsApi,
  updateSongApi,
} from "../../api/songsApi";

function* fetchSongsSaga(action) {
  console.log("Fetching songs", action);
  try {
    const songs = yield call(getSongsApi, action.payload);
    yield put(setSongs(songs));
  } catch (error) {
    throw error;
  }
}

function* addSongSaga(action) {
  console.log("Adding song");

  try {
    const song = yield call(addSongApi, action.payload);
    yield put(addSongSuccess(song));
  } catch (error) {
    console.log(error);
  }
}

function* updateSongSaga(action) {
  console.log("Updating song");

  try {
    const song = yield call(updateSongApi, action.payload);
    yield put(updateSongSuccess(song));
  } catch (error) {
    console.log(error);
  }
}

function* deleteSongSaga(action) {
  console.log("Deleting song");

  try {
    const song = yield call(deleteSongApi, action.payload.id);
    yield put(deleteSongSuccess({ id: song.id }));
  } catch (error) {
    console.log(error);
  }
}

function* watchAddSong() {
  console.log("addSong watchers");
  yield takeLatest("songs/addSong", addSongSaga);
  yield takeLatest("songs/fetchSongs", fetchSongsSaga);
  yield takeLatest("songs/deleteSong", deleteSongSaga);
  yield takeLatest("songs/updateSong", updateSongSaga);
}

export default function* songsSaga() {
  yield watchAddSong();
}
