import React from 'react';
import '../styles/ImageBanner.css'; // Ajoutez les styles pour le composant si nécessaire

function ImageBanner({ imageSrc, title, object }) {
  return (
    <div className="banner">
      <img src={imageSrc} alt="Banner" />
      <div className="title">
        <h1>{title}</h1>
        <h3>{object}</h3>
      </div>
    </div>
  );
}

export default ImageBanner;
