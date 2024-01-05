import { collection, getDocs, addDoc } from "firebase/firestore";
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
