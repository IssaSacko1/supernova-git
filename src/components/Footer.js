import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/footer.css"
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg'
import youtube from "../styles/icon-youtube.svg"
import supernovawhite from '../image/Supernova long texte Final B.png';


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
        const response = await axios.get('https://supernova-creatif-admin.online/wp-json/wp/v2/pages/32');
        
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
            <a href="/"><img id="footer-supernova-white" src={supernovawhite}></img></a>
            <div className='reseaux'>
                <a href={item.youtube} target="_blank" rel="noopener noreferrer"><img src={youtube}  alt="YouTube" /></a>
                <a href={item.instagram} target="_blank" rel="noopener noreferrer"><img src={instagram}  alt="Instagram" /></a>
                <a href={item.linkedin} target="_blank" rel="noopener noreferrer"><img src={linkedin}  alt="linkedin" /></a>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-column">
      {columnsData.column2.map((item, index) => (
        <div key={item.id} className={index === 0 ? "first-line" : "other-line"}>
          <p>{item.title}</p>
        </div>
      ))}
      </div>
      <div className="footer-column">
        {columnsData.column3.map((item,index) => (
        <div key={item.id} className={index === 0 ? "first-line" : "other-line"}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} SUPERNOVA. VB PRODUCTION AGENCY – Vidal BUSO. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
