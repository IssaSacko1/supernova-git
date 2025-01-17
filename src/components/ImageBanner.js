import React from 'react';
import '../styles/ImageBanner.css'; // Ajoutez les styles pour le composant si nécessaire

function ImageBanner({ imageSrc, title }) {
  return (
    <div className="banner">
      <img src={imageSrc} alt="Banner" />
      <div className="title">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default ImageBanner;
