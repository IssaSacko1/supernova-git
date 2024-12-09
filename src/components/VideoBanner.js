import React, { useEffect, useRef } from 'react';

function VideoBanner({ banner, isLoading }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isLoading && banner) {
      videoRef.current.play();
    }
  }, [isLoading, banner]);

    // Si la bannière n'est pas encore chargée, retournez null ou un indicateur de chargement.
    if (!banner) {
      return null; // ou retournez un indicateur de chargement comme un spinner.
    }

  return (
    <div className="video-container">
      <video ref={videoRef} src={banner.videoSrc} loop muted preload="auto" />
      <div className="title">{banner.title}</div>
      <div className="text">
        <p>{banner.description}</p>
      </div>
    </div>
  );
}

export default VideoBanner;
