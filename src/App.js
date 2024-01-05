/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import SongList from "./components/SongList";
import SongHeader from "./components/SongHeader";
import { colors } from "./theme";
import AddSong from "./components/AddSong";

// Import other components as needed

function App() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        css={{
          width: "400px",
          backgroundColor: colors.backgroundColor,
          color: colors.textColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1>My Music App</h1>
        <SongHeader openModal={() => setAddModalOpen(true)} />
        <SongList />
        {addModalOpen && <AddSong closeModal={() => setAddModalOpen(false)} />}
      </div>
      {/* Render other components here */}
    </div>
  );
}

export default App;
