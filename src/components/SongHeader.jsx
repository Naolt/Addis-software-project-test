/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { colors } from "../theme";
import { Button } from "./Button";

const SongHeader = ({ openModal, searchTerm, setSearchTerm }) => {
  return (
    <div
      css={{
        display: "flex",
        gap: "8px",
      }}
    >
      <input
        css={{
          padding: "10px 10px",
          width: "200px",
          borderRadius: "8px",
          outlineColor: colors.primaryColor,
          border: "none",
          "@media (max-width: 500px)": {
            width: "100%",
          },
        }}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button color="primary" onClick={() => openModal()}>
        {"Add" + " "}
        <span
          css={{
            "@media (max-width: 500px)": {
              display: "none",
            },
          }}
        >
          Song
        </span>
      </Button>
    </div>
  );
};

export default SongHeader;
