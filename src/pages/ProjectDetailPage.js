import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import '../styles/project-detail.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const VideoComponent = ({ selectedProjectUrl }) => {
  const [data, setData] = useState({
    video: '',
    poster: '',
    title: '',
    reward: '',
    sections: [],
    galleries: []
  });

  useEffect(() => {
    const extractData = (html) => {
    const root = parse(html);

        // Extraction du titre depuis le premier paragraphe trouvé
    const firstParagraph = root.querySelector('p');
    const title = firstParagraph ? firstParagraph.textContent.trim() : '';

      // Extraction de la vidéo
      const video = root.querySelector('figure.wp-block-video video');
      const videoSrc = video ? video.getAttribute('src') : '';
      const videoPoster = video ? video.getAttribute('poster') : '';
      const videoWithQuotes = `'${videoSrc}'`; // Ajoute des guillemets autour de videoSrc

      // Extraction des titres et des listes
      const sections = [];
      const headings = root.querySelectorAll('h2');
      const lists = root.querySelectorAll('ul');

      headings.forEach((heading, index) => {
        const title = heading.textContent.trim();
        const nextList = lists[index];
        
        sections.push({ title, list: nextList ? nextList.querySelectorAll('li').map(li => li.textContent.trim()) : [] });
      });

      // Extraction des images de la galerie
      const galleries = root.querySelectorAll('figure.wp-block-gallery');
      const galleryImages = galleries.map(gallery => {
        return gallery.querySelectorAll('figure.wp-block-image img').map(img => img.getAttribute('src'));
      });

      return {
        video: videoSrc,
        poster: videoPoster,
        title: title, // Titre fixe ou extrait selon votre besoin
        reward: "",
        sections: sections.map(section => ({
          title: section.title,
          items: section.list
        })),
        galleries: galleryImages
      };
    };

    // Fonction pour charger les données
    const loadData = async () => {
      try {
        const storedData = parseInt(localStorage.getItem('pageId'), 10); // Convertir la chaîne en entier
          const response = await axios.get('http://20.117.242.154/supernova_backend/supernova-backend/serveur/index.php//wp-json/wp/v2/pages/'+storedData);
          const htmlContent = response.data.content.rendered; // Assurez-vous que cela correspond à la structure des données de la réponse
          const extractedData = extractData(htmlContent);
          setData(extractedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    loadData();
  }, [selectedProjectUrl]);

  // Fonction pour obtenir la largeur de l'image en fonction de son index
  const getWidthByIndex = (index) => {
    if (index < 3) {
      return index === 0 ? '25%' : index === 1 ? '60%' : '15%';
    } else if (index < 6) {
      return index === 4 ? '15%' : index === 5 ? '25%' : '60%';
    } else if (index < 9) {
      return index === 7 ? '60%' : index === 8 ? '15%' : '25%';
    } else if (index < 12) {
      return index === 10 ? '25%' : index === 11 ? '60%' : '15%';
    } else {
      return '100%'; // Valeur par défaut si l'index ne correspond à aucun cas
    }
  };


  return (
    <div className='project-detail'>
      <a className='back-to-project' href='/projets'>retour aux projets</a>
      <div className="project-detail-container">
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={"valuevalue"}  centered>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Box>
        <h1 className="project-title">{data.title}</h1>
        <p className="project-description">{data.reward}</p>
        <div className='project-detail-item'>
        <p className="project-sous-description">Client <span className='project-client'>{data.title}</span></p>
        <iframe className="project-video" controls src={data.video} onError={(e) => console.error('Erreur lors du chargement de la vidéo', e)}/>
        </div>
        <div className='recompenses'>
          <div className='recompense-image'>
            {data.galleries.length > 0 && data.galleries[0][0] && (
              <div className="add-recompense-image">
                <img src={data.galleries[0][0]} alt={data.title} />
              </div>
            )}
          </div>
          {/* Affichage des sections de récompenses */}
          {data.sections.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
              <div className="content-recompense">
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="additional_images">
        {data.galleries.map((gallery, galleryIndex) => (
          <div key={galleryIndex} className="gallery">
            {gallery.map((imgSrc, imgIndex) => (
              <img
                key={imgIndex}
                src={imgSrc}
                alt={`Gallery Image ${imgIndex + 1}`}
                style={{ width: getWidthByIndex(imgIndex), height: 'auto' }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoComponent;
