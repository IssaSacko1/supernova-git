import React from 'react';
import { FaCameraRetro } from "react-icons/fa";

const VideoList = ({ video, handleClick }) => (
  <div onClick={() => handleClick(video)} className="video-item">
    <img src={video.image} alt="Aperçu de la vidéo" />
    <div className="video-overlay">
      <FaCameraRetro />
    </div>
  </div>
);

export default VideoList;
