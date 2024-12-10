import React, { useRef, useState } from 'react';

const VideoBanner = ({ banner }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} src={banner.videoSrc} loop muted={isMuted} preload="auto" />
      <div className="title">{banner.title}</div>
      <div className="text">
        <p>{banner.description}</p>
      </div>
      <div className='soundbutton'>
        <button onClick={toggleSound}>
          {isMuted ? 'Activer le son' : 'Couper le son'}
        </button>
      </div>
    </div>
  );
};

export default VideoBanner;
