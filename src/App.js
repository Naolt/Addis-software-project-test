/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import SongList from "./components/SongList";
import SongHeader from "./components/SongHeader";
import { colors } from "./theme";
import AddSong from "./components/AddSong";
import { useDispatch, useSelector } from "react-redux";
import { EditSong } from "./components/EditSong";
import { fetchSongs } from "./store/reducers/songsReducer";

function App() {
  const editModalOpen = useSelector((state) => state.editModal.open);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.data);
  const loading = useSelector((state) => state.songs.loading);

  useEffect(() => {
    console.log("fetching songs");
    dispatch(fetchSongs(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <div
      css={{
        width: "100%",
        height: "100vh",
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "10%",
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
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1>My Music App</h1>
        <SongHeader
          openModal={() => setAddModalOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <SongList songs={songs} />
        {addModalOpen && <AddSong closeModal={() => setAddModalOpen(false)} />}
        {editModalOpen && <EditSong />}
      </div>
    </div>
  );
}

export default App;
