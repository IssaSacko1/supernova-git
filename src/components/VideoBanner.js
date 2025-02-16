import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import '../styles/VideoBanner.css';


function VideoBanner({ banner, isLoading }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!isLoading && banner) {
      videoRef.current.play();
    }
  }, [isLoading, banner]);

    // Si la bannière n'est pas encore chargée, retournez null ou un indicateur de chargement.
    if (!banner) {
      return null; // ou retournez un indicateur de chargement comme un spinner.
    }

    const toggleSound = () => {
      if (videoRef.current) {
        const newMutedState = !isMuted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
      }
    };

  return (
    <div className="video-container">
      <video ref={videoRef} src={banner.videoSrc} loop muted autoPlay playsInline preload="auto" />
      <div className="title"><h1>{banner.title}</h1></div>
      <div className='soundbutton'>
        <button onClick={toggleSound}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>
    </div>
  );
}

export default VideoBanner;
