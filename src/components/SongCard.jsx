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

const SongCard = ({ id, title }) => {
  const dispatch = useDispatch();

  return (
    <div
      css={{
        backgroundColor: colors.primaryColor,
        color: colors.textColor,
        display: "flex",
        width: "400px",
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: colors.primaryColor,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {title}
      <div css={{ fontSize: "20px", color: colors.textColor, display: "flex" }}>
        <IconButton
          onClick={() => {
            dispatch(setSongToModal({ id, title }));
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
    </div>
  );
};

export const SongCardSkeleton = () => {
  const skeletonLoaderStyles = css`
    display: inline-block;
    height: 60px;
    width: 400px;
    padding: 10px 20px;,
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

export default SongCard;
