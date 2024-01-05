import { call, put, takeLatest } from "redux-saga/effects";
import { setSongs, addSong, addSongtoState } from "../reducers/songsReducer";
import { addSongApi, getSongsApi } from "../../api/songsApi";

function* fetchSongsSaga() {
  console.log("Fetching songs");
  try {
    const songs = yield call(getSongsApi);
    yield put(setSongs(songs));
  } catch (error) {
    throw error;
  }
}

function* addSongSaga(action) {
  console.log("Adding song");

  try {
    const song = yield call(addSongApi, action.payload);
    yield put(addSongtoState(song));
  } catch (error) {
    console.log(error);
  }
}

//function* watchFetchSongs() {
//  yield takeLatest("songs/fetchSongs", fetchSongsSaga);
//}
function* watchAddSong() {
  console.log("addSong watther");
  yield takeLatest("songs/addSong", addSongSaga);
  yield takeLatest("songs/fetchSongs", fetchSongsSaga);
}

export default function* songsSaga() {
  yield watchAddSong();
  //yield watchFetchSongs();
  // Add other watcher sagas here if needed
}
