import React from 'react';
import '../styles/PreFooter.css'; // Créez un fichier CSS dédié si nécessaire.

const PreFooter = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="pre-footer">
      {items.map((item, index) => (
        <div key={index} className="pre-footer-item">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <img src={item.imageSrc} alt={`Pre Footer ${index}`} />
          </a>
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

// Définir les types de props pour un meilleur typage

export default PreFooter;
