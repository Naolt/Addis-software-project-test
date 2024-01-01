import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../store/reducers/songsReducer";

const SongForm = () => {
  const dispatch = useDispatch();
  const [newSongTitle, setNewSongTitle] = useState("");

  const handleAddSong = () => {
    dispatch(addSong({ title: newSongTitle }));
    setNewSongTitle("");
  };

  return (
    <div>
      <h2>Add New Song</h2>
      <input
        type="text"
        placeholder="Enter song title"
        value={newSongTitle}
        onChange={(e) => setNewSongTitle(e.target.value)}
      />
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
};

export default SongForm;
