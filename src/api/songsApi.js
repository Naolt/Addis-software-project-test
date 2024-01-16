import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  or,
  where,
  orderBy,
  and,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

// Get a list of songs from the database
export async function getSongsApi(searchTerm) {
  try {
    console.log("in saga", searchTerm);
    const songsRef = collection(db, "songs");

    const q = query(
      songsRef,
      songsRef,
      where("title", ">=", searchTerm),
      where("title", "<=", searchTerm + "\uf8ff")
    );

    const songsSnapshot = await getDocs(q);
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
  console.log("song before upload", song);
  const file = song.file;
  const image = song.image;
  const uniqueId = uuidv4();

  delete song["file"];
  delete song["image"];

  const fileExtention = file.name.split(".").pop();
  const imgExtention = image.name.split(".").pop();

  try {
    const fileStorageRef = ref(storage, `songs/${uniqueId}.${fileExtention}`);
    const imgStorageRef = ref(storage, `images/${uniqueId}.${imgExtention}`);

    const fileSnapshot = await uploadBytes(fileStorageRef, file);
    const imgSnapshot = await uploadBytes(imgStorageRef, image);

    song["song_url"] = await getDownloadURL(fileSnapshot.ref);
    song["image_url"] = await getDownloadURL(imgSnapshot.ref);
    song["file_id"] = `${uniqueId}.${fileExtention}`;
    song["image_id"] = `${uniqueId}.${imgExtention}`;

    const songsCollection = collection(db, "songs");
    const docRef = await addDoc(songsCollection, song);
    const addedSong = { id: docRef.id, ...song, song_url: docRef.song_url };
    console.log("Added song ", addedSong);

    return addedSong;
  } catch (error) {
    console.log("Error adding song", error);
  }
}

// Update a song on the database
export async function updateSongApi(song) {
  console.log("song before update", song);
  const id = song.id;
  delete song["id"];
  const uniqueId = uuidv4();
  try {
    const docRef = doc(db, "songs", id);
    const songData = await getDoc(docRef);

    song["song_url"] = songData.data().song_url;
    song["image_url"] = songData.data().image_url;
    song["file_id"] = songData.data().file_id;
    song["image_id"] = songData.data().image_id;

    if (song.hasOwnProperty("file")) {
      const file = song.file;
      if (file) {
        const fileRef = ref(storage, `songs/${songData.data().file_id}`);
        await deleteObject(fileRef);

        delete song["file"];

        const fileExtention = file.name.split(".").pop();
        const fileStorageRef = ref(
          storage,
          `songs/${uniqueId}.${fileExtention}`
        );
        const fileSnapshot = await uploadBytes(fileStorageRef, file);
        song["song_url"] = await getDownloadURL(fileSnapshot.ref);
        song["file_id"] = `${uniqueId}.${fileExtention}`;
      }
    }

    if (song.hasOwnProperty("image")) {
      const image = song.image;
      if (image) {
        const imgRef = ref(storage, `images/${songData.data().image_id}`);
        await deleteObject(imgRef);
        delete song["image"];
        const imgExtention = image.name.split(".").pop();
        const imgStorageRef = ref(
          storage,
          `images/${uniqueId}.${imgExtention}`
        );
        const imgSnapshot = await uploadBytes(imgStorageRef, image);
        song["image_url"] = await getDownloadURL(imgSnapshot.ref);
        song["image_id"] = `${uniqueId}.${imgExtention}`;
      }
    }

    const updatedRef = await setDoc(docRef, song);
    console.log("The document has been updated successfully.");
    return { ...song, id };
  } catch (error) {
    console.log("Error deleting song", error);
  }
}

// Delete a song from the database
export async function deleteSongApi(songId) {
  try {
    const docRef = doc(db, "songs", songId);
    const song = await getDoc(docRef);

    const fileRef = ref(storage, `songs/${song.data().file_id}`);
    const imgRef = ref(storage, `images/${song.data().image_id}`);

    await deleteDoc(docRef);
    if (fileRef) await deleteObject(fileRef);
    if (imgRef) await deleteObject(imgRef);

    console.log("Entire Document has been deleted successfully.");

    return { id: songId };
  } catch (error) {
    console.log("Error deleting song", error);
  } finally {
    console.log("Finally");
  }
}
