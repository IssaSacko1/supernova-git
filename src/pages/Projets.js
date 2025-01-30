import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/projet.css';
import { useHistory } from 'react-router-dom';
import { parse } from 'node-html-parser'; // Assurez-vous d'installer cette dépendance pour parser le HTML


function VideoWithHover({ src, title, description, thumbnail, pageId }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.playbackRate = 1.5; // Définir le taux de lecture à 1.5x
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleClick = (pageId) => {
    localStorage.setItem('pageId', pageId); // Stocke l'URL dans le local storage
    history.push('/project-detail'); // Navigue vers /project-detail
  };

  return (
    <div className="video-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleClick( pageId )}>
      <video ref={videoRef} src={src} muted className={isHovered ? 'video-visible' : 'video-hidden'} />
      <img src={thumbnail} alt="Thumbnail" className={isHovered ? 'img-hidden' : 'img-visible'} />
      <h1 className={isHovered ? 'video-visible' : 'video-hidden'} >
        {title}
      </h1>
      <p className={isHovered ? 'video-visible' : 'video-hidden'}>{description}</p>
      </div>
  );
}

function Projets() {
  const [extractedData, setExtractedData] = useState([]);

  useEffect(() => {
    // Récupération des données via l'API
    axios
      .get("https://idev-test.xyz/wp-json/wp/v2/pages/131")
      .then((response) => {
        const data = response.data.content.rendered;
        // Parsing du HTML pour extraire les données
        const root = parse(data);
        
        const projectBlocks = root.querySelectorAll('.wp-block-group'); // Sélectionne tous les blocs de projets
        const projects = projectBlocks.map(block => {
          const title = block.querySelector('h2')?.text || "";
          const description = block.querySelectorAll('p')[0]?.text || ""; // Assurez-vous que c'est le bon <p> pour la description
          const projectUrl = block.querySelector('figure.wp-block-video > video')?.getAttribute('src') || "";
          const projectDetailUrl = block.querySelectorAll('p')[1]?.text || ""; // Assurez-vous que c'est le bon <p> pour l'URL
          const pageId = parseInt(projectDetailUrl.match(/(\d{3})$/)?.[0] || "", 10);
          const thumbnail = block.querySelector('figure.wp-block-image > img')?.getAttribute('src') || "";

          return {
            title,
            description,
            projectUrl,
            thumbnail,
            pageId,
            projectDetailUrl
          };
        });
        setExtractedData(projects);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données", error);
      });
  }, []);

  return (
    <div className="projet">
      <div className="main">
        <div className="main-container">
          {extractedData.map((projet, index) => (
            <VideoWithHover
              src={projet.projectUrl}
              description={projet.description}
              title={projet.title}
              thumbnail={projet.thumbnail} // Ajoutez l'image miniature ici
              url={projet.projectDetailUrl}
              pageId={projet.pageId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projets;
