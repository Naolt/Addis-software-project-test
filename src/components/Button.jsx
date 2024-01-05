/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import { colors } from "../theme";

export function Button({ children, onClick, disabled, color }) {
  const colorStyle =
    color === "primary"
      ? { backgroundColor: colors.secondaryColor, color: colors.textColor }
      : { backgroundColor: colors.textColor, color: colors.backgroundColor };

  return (
    <button
      css={{
        border: "none",
        padding: "10px 10px",
        width: "100px",
        borderRadius: "8px",
        ...colorStyle,
        cursor: disabled ? "not-allowed" : "pointer",

        ":hover": {
          filter: "contrast(0.9)",
          transition: "transform 0.3s ease",
        },
      }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
