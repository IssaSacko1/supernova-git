import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Menu.css';
import supernova from "../image/Languette.png"; // Import de l'image
import vimeo from '../styles/icon-vimeo.svg';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg'



function Menu() {
  const [menuItems, setMenuItems] = useState([]);
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
        const response = await axios.get('http://20.117.242.154/supernova_backend/supernova-backend/serveur/index.php/wp-json/wp/v2/pages/129');
        
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
        console.log(groupedData)
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
            <img src={supernova} alt="Supernova" />
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
        <div className='menu-item'>
       <ul>
            {positionsData.position1.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.attributes.url}
                >
                  {item.attributes.title}
                </a>
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
            <div className='reseaux'>
                <a href={positionsData.position3[0].url}><img src={vimeo}  alt="YouTube" /></a>
                <a href={positionsData.position3[1].url}><img src={instagram}  alt="Instagram" /></a>
                <a href={positionsData.position3[2].url}><img src={linkedin}  alt="linkedin" /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
    );
}

export default Menu;
