import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import '../styles/project-detail.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const VideoComponent = ({ selectedProjectUrl }) => {
  const [data, setData] = useState({

  });

  const [activeTab, setActiveTab] = useState('credits'); // Onglet par défaut

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  useEffect(() => {
    const extractData = (html) => {
      console.log(html)
      const doc = parse(html);
    
      // Extract the title
      const title = doc.querySelector('p')?.textContent.trim() || '';
    
      // Extract the keyimgbanniere
      const keyImgBanniere = doc.querySelector('#ValueImgBanniere img')?.getAttribute('src') || '';
    
      // Extract the keyvidbanniere
      const keyVidBanniere = doc.querySelector('video')?.getAttribute('src') || '';
    
      // Extract the keyOngletManagement
      const keyOngletManagementRaw = doc.querySelector('#ValueOngletManagement')?.textContent.trim() || '';
      console.log(keyOngletManagementRaw)
      const keyOngletManagement = keyOngletManagementRaw
      ? JSON.parse(keyOngletManagementRaw.replace(/« /g, '"').replace(/ »/g, '"'))
      : [];
      // Extract the keyOngletVideo
      const keyOngletVideo = doc.querySelector('iframe')?.getAttribute('src') || '';
    
      // Extract the keyOngletPhoto
      const keyOngletPhoto = Array.from(
        doc.querySelectorAll('#ValueOngletPhoto img')
      ).map(img => img.getAttribute('src'));
    
      // Extract the keyOngletSocialNetwork
      const keyOngletSocialNetwork = doc.querySelector('#ValueOngletSocialNetwork')?.textContent.trim() || '';
    
      // Extract the keyOngletCredits
      const keyOngletCreditsRaw = doc.querySelector('#ValueOngletCredits')?.textContent.trim() || '';
      const keyOngletCredits = keyOngletCreditsRaw
        ? JSON.parse(keyOngletCreditsRaw.replace(/« /g, '"').replace(/ »/g, '"'))
        : [];
    
      // Construct the final JSON object
      return {
        title,
        keyImgBanniere,
        keyVidBanniere,
        keyOngletManagement,
        keyOngletVideo,
        keyOngletPhoto,
        keyOngletSocialNetwork,
        keyOngletCredits
      };      
    };

    const loadData = async () => {
      try {
        const storedData = parseInt(localStorage.getItem('pageId'), 10);
        const response = await axios.get(`http://localhost/supernova-backend/serveur//wp-json/wp/v2/pages/${storedData}`);
        const htmlContent = response.data.content.rendered;
        // console.log(htmlContent)
        const extractedData = extractData(htmlContent);
        console.log(extractedData)
        setData(extractedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    loadData();
  }, [selectedProjectUrl]);

  const { keyOngletManagement = [], keyOngletPhoto = [], keyImgBanniere="",title="", keyOngletSocialNetwork="", keyOngletVideo="" } = data;

  return (
    <div className='project-detail'>
      <div className='banner'>
        <img src={keyImgBanniere} alt="Banner" />
        <div className='title'><h1>{title}</h1></div>
      </div>
      <div className="container">
        <ul className="nav nav-tabs" id="myTab">
        {keyOngletManagement
          .filter((tab) => tab.visibility === 'true') // Filtrer les onglets visibles
          .map((tab) => (
              <li className="nav-item" key={tab.key}>
              <a
                className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                id={`${tab.key}-tab`}
                href={`#${tab.key}`}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {activeTab === 'photo' && (
            <div className="tab-pane active">
              <div className="photo-gallery">
                {keyOngletPhoto.map((image, index) => {
                  // Créer des groupes de 3 images
                  if (index % 3 === 0) {
                    const rowImages = keyOngletPhoto.slice(index, index + 3); // Groupe de 3 images
                    return (
                      <div key={`row-${index}`} className="photo-row photo-row-3">
                        {rowImages.map((img, i) => (
                          <img
                            key={`img-${index}-${i}`}
                            src={img}
                            alt={`Gallery Image ${index}-${i}`}
                          />
                        ))}
                      </div>
                    );
                  }
                  return null; // Ne rien afficher si ce n'est pas une position de ligne de 3
                })}
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="tab-pane active">
              <iframe width="700" height="400" src={keyOngletVideo}
                title="ArtyA Watches - Vidéo promotionnelle, TINY PURITY TOURBILLON CHAMELEON 1/1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>
              <iframe width="478" height="849" src="https://www.youtube.com/embed/AtaqZLl9w8s"
               title="Il me dépasse #shortvideo #short" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin" 
               allowfullScreen></iframe>

            </div>
          )}

          {activeTab === 'social network' && (
            <div className="tab-pane active">
              <p>Content for Social Network</p>
              {keyOngletSocialNetwork/* Ajoutez du contenu spécifique pour l'onglet Social */}
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="tab-pane active">
              <div className="credit">
                <div className="credit-description">
                </div>
                <div className="credit-people">
                  <table>
                    <tbody>
                      {data.keyOngletCredits && data.keyOngletCredits.map((credit, index) => (
                        <tr key={index}>
                          <td>{credit.title}</td>
                          <td>{credit.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
