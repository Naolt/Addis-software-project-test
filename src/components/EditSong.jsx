/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, updateSong } from "../store/reducers/songsReducer";
import { colors } from "../theme";
import { Button } from "./Button";
import { closeEditModal } from "../store/reducers/modalReducer";
import { IconButton } from "./IconButton";
import { MdDelete } from "react-icons/md";

export const EditSong = () => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.editModal.song);
  const [songDetail, setSongDetail] = useState({
    title: song.title,
    artist: song.artist,
    file: null,
    image: null,
  });

  const [fileUrl, setFileUrl] = useState(song.song_url);
  const [imageUrl, setImageUrl] = useState(song.image_url);

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

  const handleUpdateSong = () => {
    if (
      songDetail.title &&
      songDetail.artist &&
      (songDetail.file || fileUrl) &&
      (songDetail.image || imageUrl)
    ) {
      //dispatch(updateSong({ id: song.id, title: newSongTitle }));
      const newSongDetail = { ...songDetail };
      if (fileUrl) {
        delete newSongDetail["file"];
      }
      if (imageUrl) {
        delete newSongDetail["image"];
      }
      dispatch(updateSong({ ...newSongDetail, id: song.id }));
      setSongDetail({ title: "", artist: "", file: null, image: null });
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
        background: "rgba(255, 255, 255, 0.4)", // Darkened background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        css={{
          backgroundColor: colors.backgroundColor,
          border: `0.5px solid #`,
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
        <h2>Edit Song</h2>
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

          {fileUrl ? (
            <div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: "8px",
              }}
            >
              <audio
                controls
                src={fileUrl}
                css={{
                  width: "100%",
                }}
              />
              <IconButton
                onClick={() => {
                  setFileUrl(null);
                }}
              >
                <MdDelete />
              </IconButton>
            </div>
          ) : (
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
          )}
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
          {imageUrl ? (
            <div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: "8px",
              }}
            >
              <img
                css={{
                  width: "80px",
                  borderRadius: "50%",
                }}
                src={imageUrl}
                alt="Song Cover"
              />
              <IconButton
                onClick={() => {
                  setImageUrl(null);
                }}
              >
                <MdDelete />
              </IconButton>
            </div>
          ) : (
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
          )}
        </div>

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
