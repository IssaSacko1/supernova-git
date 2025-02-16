import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Menu.css';
import youtube from '../styles/icon-youtube.svg';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg'
import SupernovaLogo from './SupernovaLogo';


function Menu() {
  const [showPopup, setShowPopup] = useState(false);
  const [positionsData, setpositionsData] = useState({
    position1: [],
    position2: [],
    position3: []
  });
    const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://idev-test.xyz/wp-json/wp/v2/pages/129');
        
        // Accéder à la propriété `rendered` et la nettoyer
        let MenuItemsString = response.data.content.rendered;
        MenuItemsString = MenuItemsString.slice(4,-5)
        // Nettoyage de la chaîne JSON
        MenuItemsString = MenuItemsString
          .replace(/«|»/g, '"') // Remplace les guillemets typographiques
          .replace(/&Prime;/g, '"') // Remplace les guillemets droits non valides
          .replace(/&rsquo;/g, "'") // Remplace les apostrophes
          .replace(/&lsquo;/g, "'") // Remplace les apostrophes ouvertes
          .replace(/&rdquo;/g, '"') // Remplace les guillemets fermants
          .replace(/&ldquo;/g, '"') // Remplace les guillemets ouvrants
          .replace(/&amp;/g, '&') // Remplace les & par &
          .replace(/[\u00A0]+/g, '') // Remplace les espaces insécables par des espaces normaux
          .replace(/(\r\n|\n|\r)/gm, "") // Enlève les nouvelles lignes
          .trim();

        const MenuItems = JSON.parse(MenuItemsString);
        // Fonction pour séparer les éléments en fonction de la colonne
        const groupedData = {
          position1: [],
          position2: [],
          position3: []
        };


        // Remplissage des colonnes
        MenuItems.forEach(item => {
          if (item.attributes.position === "content") {
            groupedData.position1.push(item);
          } else if (item.attributes.position === "footerL") {
            groupedData.position2.push(item);
          } else if (item.attributes.position === "footerR") {
            groupedData.position3.push(item);
          }
        });
        setpositionsData(groupedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, []);

  
    return (
      <nav>
      <div className="header" >
        <div className='logophoto'>
          <a href="/">
          <SupernovaLogo width="150px" height="auto" />
                    </a>
        </div>
        <div className="burger-menu" onClick={togglePopup}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
      </div>
      {showPopup && (
      <div className={`popup ${showPopup ? 'slide-in' : 'slide-out'}`}>
       <div className='contentPopup'>
       <div className='reseaux'>
                <a href={positionsData.position3[0].attributes.url}target="_blank" rel="noopener noreferrer"><img src={youtube}  alt="YouTube" /></a>
                <a href={positionsData.position3[1].attributes.url} target="_blank" rel="noopener noreferrer"><img src={instagram}  alt="Instagram" /></a>
                <a href={positionsData.position3[2].attributes.url} target="_blank" rel="noopener noreferrer"><img src={linkedin}  alt="linkedin" /></a>
            </div>
        <div className='menu-item'>
       <ul>
            {positionsData.position1.map((item, index) => (
              <li key={item.id}>
                <h1><a
                  href={item.attributes.url} onClick={togglePopup}
                >
                  {item.attributes.title}
                </a></h1>
              </li>
            ))}
            
            </ul>
        </div>
            <div className='contact'>
            {positionsData.position2.map((item, index) => (
              <ul>
                <li key={item.id}>
                    <p>{item.attributes.mail}</p>
                    <p>{item.attributes.telephone}</p>
                </li>
              </ul>
            ))}
            </div>
          </div>
        </div>
      )}
    </nav>
    );
}

export default Menu;
