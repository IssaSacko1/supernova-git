import React, { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "../styles/VideoBanner.css";

function VideoBanner({ banner, isLoading }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Essaie de jouer la vidéo dès que le composant est monté
  useEffect(() => {
    if (!isLoading && banner && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Lecture automatique bloquée, attente d'une interaction...");
        }
      };

      playVideo();
    }
  }, [isLoading, banner]);

  // ✅ Force la lecture après une interaction utilisateur
  const handleUserInteraction = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // ✅ Active/Désactive le son
  const toggleSound = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  // Si la bannière n'est pas chargée, affiche un loader
  if (!banner) {
    return null;
  }

  return (
    <div className="video-container" onClick={handleUserInteraction}>
      <video
        ref={videoRef}
        src={banner.videoSrc}
        loop
        muted={isMuted} // Gestion dynamique du son
        autoPlay
        playsInline
        preload="auto"
      />
      <div className="title">
        <h1>{banner.title}</h1>
      </div>
      <div className="soundbutton">
        <button onClick={toggleSound}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
}

export default VideoBanner;
