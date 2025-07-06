import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/projet.css';
import { useHistory } from 'react-router-dom';
import { parse } from 'node-html-parser'; // Assurez-vous que cette dépendance est bien installée

function VideoWithHover({ src, title, description, thumbnail, pageId }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        videoRef.current.playbackRate = 1;
      }).catch((error) => {
        console.warn("La vidéo n’a pas pu être lue :", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const handleClick = (pageId) => {
    localStorage.setItem('pageId', pageId);
    history.push('/project-detail/');
  };

  return (

    //Video vitesse normal
    <div className="video-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleClick(pageId)}>
      <video ref={videoRef} src={src} muted playsInline className={isHovered ? 'video-visible' : 'video-hidden'} loop />
      <img src={thumbnail} alt="Thumbnail" className={isHovered ? 'img-hidden' : 'img-visible'} />
      <h1 className={isHovered ? 'video-visible' : 'video-hidden'}>{title}</h1>
      <p className={isHovered ? 'video-visible' : 'video-hidden'}>{description}</p>
    </div>
  );
}

function Projets() {
  const [extractedData, setExtractedData] = useState([]);

  useEffect(() => {
    const processHTML = (html) => {
      const root = parse(html);
      const projectBlocks = root.querySelectorAll('.wp-block-group');

      const projects = projectBlocks.map(block => {
        const title = block.querySelector('h2')?.text || "";
        const description = block.querySelectorAll('p')[0]?.text || "";
        const projectUrl = block.querySelector('figure.wp-block-video > video')?.getAttribute('src') || "";
        const projectDetailUrl = block.querySelectorAll('p')[1]?.text || "";
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
    };

    const cachedHTML = sessionStorage.getItem('projets-data');

    if (cachedHTML) {
      processHTML(cachedHTML);
    } else {
      axios.get('https://idev-test.xyz/wp-json/wp/v2/pages/131')
        .then((res) => {
          const html = res.data.content.rendered;
          sessionStorage.setItem('projets-data', html);
          processHTML(html);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données", error);
        });
    }
  }, []);

  return (
    <div className="projet">
      <div className="main">
        <div className="main-container">
          {extractedData.map((projet, index) => (
            <VideoWithHover
              key={projet.pageId || index}
              src={projet.projectUrl}
              description={projet.description}
              title={projet.title}
              thumbnail={projet.thumbnail}
              pageId={projet.pageId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projets;
