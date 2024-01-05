import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
// Get a list of songs from the database
export async function getSongsApi() {
  try {
    const songsCollection = collection(db, "songs");
    const songsSnapshot = await getDocs(songsCollection);
    const songsList = songsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return songsList;
  } catch (error) {
    console.log("Error fetching songs", error.message);
    throw error;
  }
}

// Add a song to the database
export async function addSongApi(song) {
  try {
    const songsCollection = collection(db, "songs");
    const docRef = await addDoc(songsCollection, song);
    const addedSong = { id: docRef.id, ...song };
    console.log("Added song ", addedSong);

    return addedSong;
  } catch (error) {
    console.log("Error adding song", error);
  }
}

// Update a song on the database
export async function updateSongApi(song) {
  const newSong = { ...song };
  delete newSong.id;
  try {
    const docRef = doc(db, "songs", song.id);
    const updatedRef = await setDoc(docRef, newSong);
    console.log("The document has been updated successfully.");
    return { ...song };
  } catch (error) {
    console.log("Error deleting song", error);
  }
}

// Delete a song from the database
export async function deleteSongApi(songId) {
  try {
    const docRef = doc(db, "songs", songId);
    await deleteDoc(docRef);
    console.log("Entire Document has been deleted successfully.");
    return { id: songId };
  } catch (error) {
    console.log("Error deleting song", error);
  }
}
