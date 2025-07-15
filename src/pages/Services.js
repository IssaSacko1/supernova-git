import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser'; // Import from node-html-parser
import VideoBanner from '../components/VideoBanner';
import ServiceItem from '../components/ServiceItem';
import '../styles/services.css';


const Services = () => {
  const [jsonData, setJsonData] = useState(null);
  const [serviceSections, setServiceSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    // Effectuer la requête GET à l'API WordPress  
    axios.get('https://supernova-creatif-admin.online/wp-json/wp/v2/pages/28')
      .then(response => {
        const htmlContent = response.data.content.rendered;
        const extractedData = extractData(htmlContent);
        setJsonData(extractedData);
        setIsLoading(false); // Une fois les données récupérées, on désactive le chargement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
        setIsLoading(false); // Même en cas d'erreur, arrêter le chargement
      });
  }, []);

  // Fonction pour extraire les données du contenu HTML
  const extractData = (htmlContent) => {
    const parsedHtml = parse(htmlContent); // Parse le HTML

    const jsonData = {};

    // Extraire la vidéo de bannière
    const videoElement = parsedHtml.querySelector('figure.wp-block-video video');
    const videoSrc = videoElement?.getAttribute('src') || '';
    const videoPoster = videoElement?.getAttribute('poster') || '';

    // Extraire le titre principal et la description
    const mainServiceTitle = parsedHtml.querySelector('h2.wp-block-heading');
    const mainServiceDescription = parsedHtml.querySelector('p');

    jsonData.banner = {
      videoSrc,
      videoPoster,
      title: mainServiceTitle?.text || '',
      description: mainServiceDescription?.text || ''
    };

    // Extraire les sections de service
    const serviceSectionsData = []; // Initialise un tableau vide pour les services

    // Sélectionner tous les groupes contenant des services
    const serviceGroups = parsedHtml.querySelectorAll('div.wp-block-group.is-layout-flex');

    serviceGroups.forEach((group) => {
      const titleElement = group.querySelector('h2.wp-block-heading');
      const contentElements = group.querySelectorAll('p');
      const imageElement = group.querySelector('figure.wp-block-image img');

      // Récupérer le texte des paragraphes
      const contentText = Array.from(contentElements).map(el => el.text).join(' ');

      serviceSectionsData.push({
        title: titleElement?.text || '',
        content: contentText || '',
        imageSrc: imageElement?.getAttribute('src') || '',
        imageAlt: imageElement?.getAttribute('alt') || ''
      });
    });

    // Mettre à jour les sections de service et de bannière
    setServiceSections(serviceSectionsData);

    return jsonData;
  };

  if (isLoading) {
    return <p>Chargement des données...</p>; // Affiche un message de chargement
  }

  return (
    <div className='services'>
      <VideoBanner banner={jsonData.banner} />
      <div className='services-content'>
        {serviceSections.map((service, index) => (
          <ServiceItem key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;
