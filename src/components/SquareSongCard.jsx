/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import { colors } from "../theme";
import { MdDelete, MdEdit } from "react-icons/md";
import { IconButton } from "./IconButton";
import { deleteSong } from "../store/reducers/songsReducer";
import { useDispatch } from "react-redux";
import { openEditModal, setSongToModal } from "../store/reducers/modalReducer";
import {
  closePlayer,
  openPlayer,
  setSongToPlayer,
} from "../store/reducers/audioPlayerReducer";

const SquareSongCard = ({ id, title, song_url, image_url, artist }) => {
  const dispatch = useDispatch();

  const playSong = () => {
    dispatch(closePlayer());
    dispatch(openPlayer());
    dispatch(setSongToPlayer({ id, title, song_url, image_url, artist }));
  };

  return (
    <div
      css={{
        color: colors.textColor,
        display: "flex",
        flexDirection: "column",
        width: "287px",
        height: "287px",
        borderRadius: "8px",
        gap: "15px",
        overflow: "hidden",
        position: "relative",
      }}
      onClick={playSong}
    >
      <img
        css={{
          width: "100%",
          height: "200px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
        src={image_url}
        alt="Song Cover"
      />
      <div
        css={{
          fontSize: "20px",
          color: colors.textColor,
          display: "flex",
          position: "absolute",
          right: "10px",
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(
              setSongToModal({ id, title, song_url, image_url, artist })
            );
            dispatch(openEditModal());
          }}
        >
          <MdEdit />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(deleteSong({ id }));
          }}
        >
          <MdDelete />
        </IconButton>
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span css={{ color: colors.textColor, fontWeight: "500" }}>
          {title}
        </span>
        <span css={{ color: colors.disabledColor, fontStyle: "italic" }}>
          {artist}
        </span>
      </div>
    </div>
  );
};

export const SongCardSkeleton = () => {
  const skeletonLoaderStyles = css`
    display: inline-block;
    height: 287px;
    width: 287px;
    border: 1px solid;
    border-radius: 8px;
    background: linear-gradient(90deg, #777 25%, #999 50%, #777 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;

    @keyframes loading {
      to {
        background-position: -200% 0;
      }
    }
  `;
  return <div css={skeletonLoaderStyles}></div>;
};

export default SquareSongCard;
