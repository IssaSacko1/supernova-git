import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import '../styles/project-detail.css';
import image from '../image/Vignette2.jpg';


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
  const [activeTab, setActiveTab] = useState('photo'); // Default active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='project-detail'>
      <div className='banner'>
        <img src={image}/>
        <div className='title'><h1>{data.title}</h1></div>
      </div>
      <div className='container'>
      <ul className="nav nav-tabs" id="myTab">
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === 'photo' ? 'active' : ''}`}
          id="photo-tab"
          href="#photo"
          onClick={() => handleTabClick('photo')}
        >
          Photo
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === 'video' ? 'active' : ''}`}
          id="video-tab"
          href="#video"
          onClick={() => handleTabClick('video')}
        >
          Video
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === 'social' ? 'active' : ''}`}
          id="social-tab"
          href="#social"
          onClick={() => handleTabClick('social')}
        >
          Social Network
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === 'credits' ? 'active' : ''}`}
          id="credits-tab"
          href="#credits"
          onClick={() => handleTabClick('credits')}
        >
          Credits
        </a>
      </li>
    </ul>
      </div>
    </div>
  );
};

export default VideoComponent;
