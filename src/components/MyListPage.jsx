/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import SongHeader from "./SongHeader";
import SongList from "./SongList";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../store/reducers/songsReducer";
import AddSong from "./AddSong";
import { EditSong } from "./EditSong";

const MyListPage = () => {
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
        padding: "0 100px",
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "40px",
        "@media (max-width: 800px)": {
          padding: "0 20px",
        },
      }}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          "@media (max-width: 800px)": {
            padding: "0 20px",
            flexDirection: "column",
            gap: "60px",
          },
        }}
      >
        <h1>My List</h1>
        <SongHeader
          openModal={() => setAddModalOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <SongList songs={songs} />
      {addModalOpen && <AddSong closeModal={() => setAddModalOpen(false)} />}
      {editModalOpen && <EditSong />}
    </div>
  );
};

export default MyListPage;
