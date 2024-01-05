/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../store/reducers/songsReducer";
import { colors } from "../theme";
import { Button } from "./Button";

const AddSong = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [newSongTitle, setNewSongTitle] = useState("");

  const handleAddSong = () => {
    if (newSongTitle) {
      dispatch(addSong({ title: newSongTitle }));
      setNewSongTitle("");
      closeModal();
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
        <h2>New Song</h2>
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
        <input
          css={{
            padding: "10px 10px",
            width: "100%",

            borderRadius: "8px",
            outlineColor: colors.primaryColor,
            border: "none",
          }}
          type="text"
          placeholder="Artist name"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
        />
        <div
          css={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Button onClick={closeModal}>Cancel</Button>
          <Button color="primary" onClick={handleAddSong}>
            Add Song
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSong;
