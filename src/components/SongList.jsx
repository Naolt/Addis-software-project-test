/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useSelector } from "react-redux";
import SongCard from "./SongCard";
import SquareSongCard, { SongCardSkeleton } from "./SquareSongCard";

const SongList = ({ songs }) => {
  const loading = useSelector((state) => state.songs.loading);

  return (
    <div
      css={{
        width: "100%",
      }}
    >
      <ul
        css={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {loading
          ? [1, 2, 3, 4].map((_) => <SongCardSkeleton />)
          : songs?.map((song) => (
              <SquareSongCard
                title={song.title}
                song_url={song.song_url}
                image_url={song.image_url}
                artist={song.artist}
                id={song.id}
              />
            ))}
      </ul>
    </div>
  );
};

export default SongList;
