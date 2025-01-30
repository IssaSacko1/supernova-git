import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { parse } from 'node-html-parser';
import VideoBanner from '../components/VideoBanner';
import Employee from '../components/Employee';
import '../styles/Employee.css';
import '../styles/about_us.css';
import ElfsightWidget from '../components/ElfsightWidget'; // Import du nouveau composant


const Apropos = () => {
  const [teams, setTeams] = useState([]);
  const [data, setData] = useState({
    banner: null,
    description: '',
    team: [],
  });

  useEffect(() => {
    axios.get('https://idev-test.xyz/wp-json/wp/v2/pages/140')
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
    const videoSrc = parsedHtml.querySelector('video')?.getAttribute('src') || '';
    const title = parsedHtml?.querySelector('#ValueTitle')?.textContent || '';

    const banner = {
      title,
      videoSrc
    };

    // Partie 3: Description
    const descriptionSectionTitle =parsedHtml?.querySelector('#KeyDescription')?.textContent || '';
    const descriptionSectionValue =parsedHtml?.querySelector('#ValueDescription')?.textContent || '';

    const description = {
      descriptionSectionTitle,
      descriptionSectionValue
    }
    console.log(description)

    // Partie 3: Notre équipe
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
    
    return { banner,description, team };
  };

  const { banner } = data;
  console.log(data)
  const {description } = data; 
  console.log(description)
  return (
    <div className="aboutUsPage">
      {/* Partie 1: Bannière */}
      <VideoBanner banner={banner} />
      <h1 className='aboutustitre'>{data.description.descriptionSectionTitle}</h1>
      <p className='aboutusdescription'>{data.description.descriptionSectionValue}</p>
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
      <ElfsightWidget widgetId="d7cb6062-6988-4e34-9934-d272767d23e1" />
    </div>
  );
};

export default Apropos;
