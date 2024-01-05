/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../store/reducers/songsReducer";
import { colors } from "../theme";
import AddSong from "./AddSong";
import { Button } from "./Button";

const SongHeader = ({ openModal }) => {
  const dispatch = useDispatch();
  const [newSongTitle, setNewSongTitle] = useState("");

  const handleAddSong = () => {
    console.log("dispatched");

    dispatch(addSong({ title: newSongTitle }));
    setNewSongTitle("");
  };

  return (
    <div
      css={{
        display: "flex",
        gap: "8px",
        width: "100%",
      }}
    >
      <input
        css={{
          padding: "10px 10px",
          width: "80%",
          borderRadius: "8px",
          outlineColor: colors.primaryColor,
          border: "none",
        }}
        type="text"
        placeholder="Enter song title"
        value={newSongTitle}
        onChange={(e) => setNewSongTitle(e.target.value)}
      />
      <Button color="primary" onClick={() => openModal()}>
        Add Song
      </Button>
    </div>
  );
};

export default SongHeader;
