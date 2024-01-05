/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, updateSong } from "../store/reducers/songsReducer";
import { colors } from "../theme";
import { Button } from "./Button";
import { closeEditModal } from "../store/reducers/modalReducer";

export const EditSong = () => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.editModal.song);
  const [newSongTitle, setNewSongTitle] = useState(song.title);

  const handleUpdateSong = () => {
    if (newSongTitle) {
      dispatch(updateSong({ id: song.id, title: newSongTitle }));
      setNewSongTitle("");
      dispatch(closeEditModal());
    }
  };

  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.9)", // Darkened background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        css={{
          backgroundColor: colors.backgroundColor,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "",
          borderRadius: "8px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Edit Song</h2>
        <input
          css={{
            padding: "10px 10px",
            width: "100%",
            borderRadius: "8px",
            outlineColor: colors.primaryColor,
            border: "none",
          }}
          type="text"
          placeholder="Song title"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
        />

        <div
          css={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Button onClick={() => dispatch(closeEditModal())}>Cancel</Button>
          <Button color="primary" onClick={handleUpdateSong}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
