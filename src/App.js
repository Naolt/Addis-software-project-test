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
import MyListPage from "./components/MyListPage";
import ExplorePage from "./components/ExplorePage";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [tab, setTab] = useState("mylist");
  const open = useSelector((state) => state.audioPlayer.open);

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
        paddingTop: "30px",
        gap: "20px",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      <div
        css={{
          display: "flex",
          padding: "10px",
          gap: "15px",
          fontSize: "24px",
          fontWeight: "400",
        }}
      >
        <nav
          css={{
            cursor: "pointer",
            borderBottom:
              tab === "explore" ? `2px solid ${colors.primaryColor}` : "none",
            color: tab === "explore" ? colors.primaryColor : colors.textColor,
          }}
          onClick={() => setTab("explore")}
        >
          Explore
        </nav>
        <nav
          css={{
            cursor: "pointer",
            borderBottom:
              tab === "mylist" ? `2px solid ${colors.primaryColor}` : "none",
            color: tab === "mylist" ? colors.primaryColor : colors.textColor,
          }}
          onClick={() => setTab("mylist")}
        >
          {" "}
          My List
        </nav>
      </div>
      {tab === "explore" ? <ExplorePage /> : <MyListPage />}

      {open && <AudioPlayer />}
    </div>
  );
}

export default App;
