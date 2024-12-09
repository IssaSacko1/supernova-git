import React, { useRef, useEffect } from 'react';

const PlayVideo = ({ banner }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (banner) {
      videoRef.current.play();
    }
  }, [banner]);

  return (
    <div className="video-container">
      <video ref={videoRef} src={banner.photo_url} loop muted />
      <h2 className="title">{banner.title}</h2>
      <p className="text">{banner.content}</p>
    </div>
  );
};

export default PlayVideo;
