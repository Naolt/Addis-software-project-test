/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../store/reducers/songsReducer";
import { colors } from "../theme";
import { Button } from "./Button";

const AddSong = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [songDetail, setSongDetail] = useState({
    title: "",
    artist: "",
    file: null,
    image: null,
  });
  console.log("songDetail", songDetail);
  const handleAddSong = () => {
    if (songDetail.title && songDetail.file) {
      dispatch(addSong({ ...songDetail }));
      setSongDetail({ title: "", artist: "", file: null, image: null });
      closeModal();
    }
  };

  const handleTitleChange = (e) => {
    setSongDetail({ ...songDetail, title: e.target.value });
  };
  const handleArtistChange = (e) => {
    setSongDetail({ ...songDetail, artist: e.target.value });
  };
  const handleFileChange = (e) => {
    setSongDetail({ ...songDetail, file: e.target.files[0] });
  };
  const handleImageChange = (e) => {
    setSongDetail({ ...songDetail, image: e.target.files[0] });
  };
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.4)", // Darkened background
        // Darkened background
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
          width: "400px",
          borderRadius: "8px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>New Song</h2>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <label
            htmlFor="title"
            css={{
              color: colors.textColor,
              fontSize: "14px",
            }}
          >
            Title
          </label>
          <input
            css={{
              padding: "10px 10px",
              width: "100%",
              borderRadius: "8px",
              outlineColor: colors.primaryColor,
              border: "none",
            }}
            name="title"
            type="text"
            placeholder="Song title"
            value={songDetail.title}
            onChange={handleTitleChange}
          />
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <label
            htmlFor="artist"
            css={{
              color: colors.textColor,
              fontSize: "14px",
            }}
          >
            Artist
          </label>
          <input
            css={{
              padding: "10px 10px",
              width: "100%",
              borderRadius: "8px",
              outlineColor: colors.primaryColor,
              border: "none",
            }}
            name="artist"
            type="text"
            placeholder="Song Artist"
            value={songDetail.artist}
            onChange={handleArtistChange}
          />
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <label
            htmlFor="title"
            css={{
              color: colors.textColor,
              fontSize: "14px",
            }}
          >
            Song
          </label>

          <input
            css={{
              padding: "10px 10px",
              width: "100%",
              borderRadius: "8px",
              outlineColor: colors.primaryColor,
              border: "none",
            }}
            type="file"
            placeholder="Upload the song..."
            onChange={handleFileChange}
          />
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <label
            htmlFor="title"
            css={{
              color: colors.textColor,
              fontSize: "14px",
            }}
          >
            Image
          </label>
          <input
            css={{
              padding: "10px 10px",
              width: "100%",
              borderRadius: "8px",
              outlineColor: colors.primaryColor,
              border: "none",
            }}
            type="file"
            placeholder="Upload song cover..."
            onChange={handleImageChange}
          />
        </div>

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
