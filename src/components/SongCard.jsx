/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import { colors } from "../theme";
import { MdDelete, MdEdit } from "react-icons/md";
import { IconButton } from "./IconButton";

const SongCard = ({ title }) => {
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
        <IconButton onClick={() => {}}>
          <MdEdit />
        </IconButton>
        <IconButton onClick={() => {}}>
          <MdDelete />
        </IconButton>
      </div>
    </div>
  );
};

export default SongCard;
