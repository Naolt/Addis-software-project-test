/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useSelector } from "react-redux";
import SongCard, { SongCardSkeleton } from "./SongCard";

const SongList = ({ songs }) => {
  const loading = useSelector((state) => state.songs.loading);

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
          : songs?.map((song) => (
              <SongCard
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
