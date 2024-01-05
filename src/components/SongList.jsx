/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../store/reducers/songsReducer";
import SongCard, { SongCardSkeleton } from "./SongCard";
import { colors } from "../theme";

const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.data);
  const loading = useSelector((state) => state.songs.loading);
  console.log(songs, loading);
  useEffect(() => {
    console.log("dispatched");
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <ul
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {loading
          ? [1, 2, 3, 4].map((_) => <SongCardSkeleton />)
          : songs?.map((song) => <SongCard title={song.title} id={song.id} />)}
      </ul>
    </div>
  );
};

export default SongList;
