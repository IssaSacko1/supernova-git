import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/footer.css"
import vimeo from '../styles/icon-vimeo.svg';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg'

const Footer = () => {
  const [columnsData, setColumnsData] = useState({
    column1: [],
    column2: [],
    column3: [],
    column4: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://20.117.242.154/supernova_backend/supernova-backend/serveur/index.php/wp-json/wp/v2/pages/155');
        
        // Accéder à la propriété `rendered` et la nettoyer
        let footerItemsString = response.data.content.rendered;
        footerItemsString = footerItemsString.slice(4,-5)
        // Nettoyage de la chaîne JSON
        footerItemsString = footerItemsString
          .replace(/«|»/g, '"') // Remplace les guillemets typographiques
          .replace(/&Prime;/g, '"') // Remplace les guillemets droits non valides
          .replace(/&rsquo;/g, "'") // Remplace les apostrophes
          .replace(/&lsquo;/g, "'") // Remplace les apostrophes ouvertes
          .replace(/&rdquo;/g, '"') // Remplace les guillemets fermants
          .replace(/&ldquo;/g, '"') // Remplace les guillemets ouvrants
          .replace(/&amp;/g, '&') // Remplace les & par &
          .replace(/[\u00A0]+/g, '') // Remplace les espaces insécables par des espaces normaux
          .replace(/(\r\n|\n|\r)/gm, "") // Enlève les nouvelles lignes
          .replace("&#8211;", "–")
          .trim();

        const footerItems = JSON.parse(footerItemsString);

        // Fonction pour séparer les éléments en fonction de la colonne
        const groupedData = {
          column1: [],
          column2: [],
          column3: [],
          column4: []
        };

        // Remplissage des colonnes
        footerItems.forEach(item => {
          if (item.column === 1) {
            groupedData.column1.push(item);
          } else if (item.column === 2) {
            groupedData.column2.push(item);
          } else if (item.column === 3) {
            groupedData.column3.push(item);
          } else if (item.column === 4) {
            groupedData.column4.push(item);
          }
        });
        setColumnsData(groupedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <footer>
      <div className='footer-content'>
      <div className="footer-column">
        {columnsData.column1.map(item => (
          <div key={item.id}>
            <p className='supernova'>{item.title}</p>
            <div className='reseaux'>
                <a href={item.vimeo}><img src={vimeo}  alt="YouTube" /></a>
                <a href={item.instagram}><img src={instagram}  alt="Instagram" /></a>
                <a href={item.linkedin}><img src={linkedin}  alt="linkedin" /></a>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-column">
        {columnsData.column2.map(item => (
          <div key={item.id}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="footer-column">
        {columnsData.column3.map(item => (
          <div key={item.id}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {/* <div className="footer-column">
        {columnsData.column4.map(item => (
          <div key={item.id} className='column-4'>
            <a href={item.url}>{item.title}</a>
          </div>
        ))}
      </div> */}
      </div>
    </footer>
  );
};

export default Footer;
