import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { parse } from 'node-html-parser';
import VideoBanner from '../components/VideoBanner';
import Employee from '../components/Employee';
import '../styles/Employee.css';
import '../styles/about_us.css'
import PreFooter from '../components/PreFooter';

const Apropos = () => {
  const [teams, setTeams] = useState([]);
  const [data, setData] = useState({
    banner: null,
    team: [],
    preFooter: [],
  });

  useEffect(() => {
    axios.get('http://20.117.242.154/supernova_backend/supernova-backend/serveur/index.php//wp-json/wp/v2/pages/140')
      .then(response => {
        const htmlContent = response.data.content.rendered;
        const extractedData = extractData(htmlContent);
        setData(extractedData);
        setTeams(extractedData.team); // Mettez à jour les équipes ici
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }, []);

  const extractData = (htmlContent) => {
    const parsedHtml = parse(htmlContent);

    // Partie 1: Bannière vidéo et section "À propos de nous"
    const bannerVideo = parsedHtml.querySelector('div.wp-block-group.has-global-padding.is-layout-constrained');
    const videoElement = bannerVideo?.querySelector('figure.wp-block-video video');
    const videoSrc = videoElement?.getAttribute('src') || '';
    const videoPoster = videoElement?.getAttribute('poster') || '';
    const titleAboutUs = bannerVideo?.querySelector('h2.wp-block-heading')?.textContent || '';
    const descriptionAboutUs = bannerVideo?.querySelector('p')?.textContent || '';
    const imageAboutUs = bannerVideo?.querySelector('figure.wp-block-image img');
    const imageSrcAboutUs = imageAboutUs?.getAttribute('src') || '';

    const banner = {
      videoSrc,
      videoPoster,
      title: titleAboutUs,
      description: descriptionAboutUs,
      imageSrc: imageSrcAboutUs,
    };

    // Partie 2: Notre équipe
    const teamSections = parsedHtml.querySelectorAll('div.wp-block-group.is-vertical.is-layout-flex');
    const team = Array.from(teamSections).map(section => {
      const title = section.querySelector('h2.wp-block-heading a')?.textContent || '';
      const description = section.querySelector('p')?.textContent || '';
      const image = section.querySelector('figure.wp-block-image img');
      const imageSrc = image?.getAttribute('src') || '';
      return {
        title,
        description,
        imageSrc,
      };
    });
    // Partie 3: Pré-footer
    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };

    const preFooterSections = parsedHtml.querySelectorAll('div.wp-block-group.has-global-padding.is-layout-constrained');
    const preFooter = Array.from(preFooterSections).map(section => {
      const image = section.querySelector('figure.wp-block-image img');
      const imageSrc = image?.getAttribute('src') || '';
      const url = section.querySelector('p')?.textContent || '';
      const name = section.querySelector('h2.wp-block-heading')?.textContent || '';
      if (imageSrc && isValidUrl(url)) {
        return {
          imageSrc,
          url,
          name,
        };
      }
    
      // Retourner null si imageSrc est vide pour pouvoir filtrer ensuite
      return null;
    }).filter(item => item !== null); // Filtrer les éléments nulls
    
    return { banner, team, preFooter };
  };

  const { banner, preFooter } = data;

  return (
    <div className="services-header">
      {/* Partie 1: Bannière */}
      <div className='about-us-header'>
      <VideoBanner banner={banner} />
      </div>
      <h1>La genèse de SUPERNOVA.</h1>
      <p>{banner.description}</p>
      {/* Partie 2: Équipe */}
      <div className='about_us_content'>
        <h1>Notre équipe</h1>
        <div className="employees-list">
          {teams.map((allteam) => (
            <Employee employee={allteam} />
          ))}
        </div>
      </div>
      {/* Partie 3: Pré-footer */}
      <PreFooter items={preFooter} /> {/* Utilisation du composant */}
    </div>
  );
};

export default Apropos;
