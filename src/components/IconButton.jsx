/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";

export function IconButton({ children, onClick }) {
  return (
    <div
      onClick={() => onClick()}
      css={{
        padding: "5px",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ":hover": {
          backgroundColor: "rgba(0,0,0,0.2)",
          transition: "all 0.2s ease-in-out",
        },
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}
