/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../theme";
import { useSelector } from "react-redux";
import { FaPlayCircle } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaFastForward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FiVolume1 } from "react-icons/fi";
import { FaPauseCircle } from "react-icons/fa";
import { BsVolumeMute } from "react-icons/bs";

const AudioPlayer = () => {
  const open = useSelector((state) => state.audioPlayer.open);
  const song = useSelector((state) => state.audioPlayer.song);

  const playerRef = useRef(null);
  const progressRef = useRef(null);
  const animationRef = useRef(null);
  const volumeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const seconds = Math.floor(playerRef?.current.duration);
    console.log(playerRef?.current.duration);
    setDuration(playerRef?.current.duration);
    progressRef.current.max = seconds;
  }, [playerRef?.current?.loadedmetadata, playerRef?.current?.readyState]);

  const playMusic = () => {
    playerRef.current.play();
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };
  const pauseMusic = () => {
    playerRef.current.pause();
    setIsPlaying(false);
    cancelAnimationFrame(animationRef.current);
  };

  const calculateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const sec = secs < 10 ? `0${secs}` : secs;
    return `${minutes}:${sec}`;
  };

  const whilePlaying = () => {
    progressRef.current.value = playerRef?.current.currentTime;
    progressRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressRef.current.value / duration) * 100}%`
    );
    setCurrentTime(progressRef.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    playerRef.current.currentTime = progressRef.current.value;
    progressRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressRef.current.value / duration) * 100}%`
    );
    setCurrentTime(progressRef.current.value);
  };

  const backThirty = () => {
    progressRef.current.value = Number(progressRef.current.value - 30);
    changeRange();
  };
  const forwardThirty = () => {
    progressRef.current.value = Number(progressRef.current.value + 1);
    changeRange();
    console.log(progressRef.current.value, duration);
  };

  const changeVolume = () => {
    playerRef.current.volume = volumeRef.current.value / 100;
    setVolume(playerRef.current.volume);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    playerRef.current.muted = !isMuted;
  };

  return (
    <div
      css={{
        position: "sticky",
        backgroundColor: colors.backgroundColor,
        bottom: "30px",
        width: "80%",
        borderRadius: "8px",
        //overflow: "hidden",
        display: open ? "flex" : "none",
      }}
    >
      <div
        css={{
          //  height: "60px",
          padding: "20px 20px",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
          width: "100%",
          borderRadius: "8px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* Song Detail */}
        <div
          css={{
            display: "flex",
            gap: "20px",
            flex: 1,
            flexShrink: 1,
          }}
        >
          <img
            css={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            src={song.image_url}
            alt="Song Cover"
          />
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <span css={{ color: colors.textColor, fontWeight: "500" }}>
              {song.title}
            </span>
            <span css={{ color: colors.disabledColor, fontStyle: "italic" }}>
              {song.artist}
            </span>
          </div>
        </div>
        {/* Audio Player */}

        <audio
          controls
          src={song.song_url}
          css={{
            width: "100%",
            display: "none",
          }}
          ref={playerRef}
        />

        <div
          css={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexGrow: 2,
          }}
        >
          <div
            css={{
              display: "flex",
              gap: "20px",
              fontSize: "32px",
              alignItems: "center",
            }}
          >
            <FaBackward onClick={backThirty} />
            {isPlaying ? (
              <FaPauseCircle
                css={{ color: colors.primaryColor }}
                onClick={pauseMusic}
              />
            ) : (
              <FaPlayCircle
                css={{ color: colors.primaryColor }}
                onClick={playMusic}
              />
            )}
            <FaForward onClick={forwardThirty} />
          </div>
          {/* Range to show music progress */}
          <div css={{ width: "100%", display: "flex", gap: "5px" }}>
            {calculateTime(currentTime)}
            <input
              type="range"
              css={{
                flex: 1,
                color: "red",
                "--seek-before-width": 0,
              }}
              defaultValue={"0"}
              ref={progressRef}
              onChange={changeRange}
            />
            {calculateTime(duration)}
          </div>
        </div>
        {/* Volume Control */}
        <div
          css={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            paddingTop: "50px",
            flexShrink: 2,
          }}
        >
          {isMuted ? (
            <BsVolumeMute
              css={{ fontSize: "24px", color: colors.disabledColor }}
              onClick={handleMute}
            />
          ) : (
            <FiVolume1
              css={{ fontSize: "24px", color: colors.disabledColor }}
              onClick={handleMute}
            />
          )}
          <input
            type="range"
            defaultValue={"50"}
            ref={volumeRef}
            max={"100"}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
