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
        width: "100%",
      }}
    >
      <input
        css={{
          padding: "10px 10px",
          width: "80%",
          borderRadius: "8px",
          outlineColor: colors.primaryColor,
          border: "none",
        }}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button color="primary" onClick={() => openModal()}>
        Add Song
      </Button>
    </div>
  );
};

export default SongHeader;
