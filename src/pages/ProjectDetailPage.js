import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/project-detail.css';
import ImageBanner from '../components/ImageBanner';
import ElfsightWidget from '../components/ElfsightWidget'; // Import du nouveau composant



const VideoComponent = ({ selectedProjectUrl }) => {
  const [data, setData] = useState({

  });

  const [activeTab, setActiveTab] = useState('credits'); // Onglet par défaut

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  useEffect(() => {
    const extractData = (html) => {
      const doc = parse(html);
    
      // Extract the title
      const title = doc.querySelector('#ValueProjectTitle')?.textContent.trim() || '';
    
      // Extract the keyimgbanniere
      const keyImgBanniere = doc.querySelector('#ValueImgBanniere img')?.getAttribute('src') || '';
    
      // Extract the keyvidbanniere
      const keyVidBanniere = doc.querySelector('video')?.getAttribute('src') || '';
    
      // Extract the keyProjectDescribe
      const KeyProjectDescription = doc.querySelector('#ValueProjectDescription')?.textContent.trim() || '';
      
      const KeyProjectObject = doc.querySelector('#ValueProjectObject')?.textContent.trim() || '';

      // Extract the keyOngletManagement
      const keyOngletManagementRaw = doc.querySelector('#ValueOngletManagement')?.textContent.trim() || '';
      const keyOngletManagement = keyOngletManagementRaw
      ? JSON.parse(keyOngletManagementRaw.replace(/« /g, '"').replace(/ »/g, '"'))
      : [];
      // Extract the keyOngletVideo
      const keyOngletVideo = Array.from(doc.querySelectorAll('iframe')
      ).map(iframe => iframe.getAttribute('src'));    
      // Extract the keyOngletPhoto
      const keyOngletPhoto = Array.from(
        doc.querySelectorAll('#ValueOngletPhoto img')
      ).map(img => img.getAttribute('src'));
      const keyOngletBts = Array.from(
        doc.querySelectorAll('#ValueOngletBts img')
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
        KeyProjectDescription,
        keyOngletManagement,
        keyOngletVideo,
        KeyProjectObject,
        keyOngletPhoto,
        keyOngletBts,
        keyOngletSocialNetwork,
        keyOngletCredits
      };      
    };

    const loadData = async () => {
      try {
        const storedData = parseInt(localStorage.getItem('pageId'), 10);
        const response = await axios.get(`https://idev-test.xyz/wp-json/wp/v2/pages/${storedData}`);
        const htmlContent = response.data.content.rendered;
        const extractedData = extractData(htmlContent);
        setData(extractedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    loadData();
  }, [selectedProjectUrl]);

  const { keyOngletManagement = [], keyOngletPhoto = [], keyOngletBts = [], keyImgBanniere="",title="", keyOngletSocialNetwork="", keyOngletVideo="", KeyProjectDescription="", KeyProjectObject="" } = data;

  return (
    <div className='project-detail'>
      <ImageBanner imageSrc={keyImgBanniere} title={title} object={KeyProjectObject}/> {/* Utilisation du composant ImageBanner */}
      
      <div className="container">
      <h1 className='title-description'>Description du projet</h1>
      <p className='description'>{KeyProjectDescription}</p>
        <ul className="nav nav-tabs" id="myTab">
        {keyOngletManagement
          .filter((tab) => tab.visibility === 'true') // Filtrer les onglets visibles
          .map((tab) => (
              <li className="nav-item" key={tab.key}>
              <a
                className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                id={`${tab.key}-tab`}
                href={`/#/project-detail/${tab.key}`}
                onClick={() => handleTabClick(tab.key)}
              ><h3>
                {tab.key.charAt(0).toUpperCase() + tab.key.slice(1)}
                </h3></a>
            </li>
          ))}
        </ul>
        <div className="tab-content">

        {activeTab === 'video' && (
        <div className="tab-pane active video-gallery">
          {keyOngletVideo.map((videoSrc, index) => (
            <div key={index} className="video-wrapper">
              <iframe
                src={videoSrc}
                title={`video-${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
        {activeTab === 'photo' && (
            <div className="tab-pane active">
              <div className="photo-gallery">
                {keyOngletPhoto.map((img, index) => {
                  // Créer des groupes de 3 images
                  if (index % 3 === 0) {
                    const rowImages = keyOngletPhoto.slice(index, index + 3); // Groupe de 3 images
                    return (
                      <div key={`row-${index}`} className="photo-row">
                        {rowImages.map((img, i) => (
                          <img
                            key={`img-${index}-${i}`}
                            src={img}
                            alt={`Gallery ${index}-${i}`}
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


          {activeTab === 'social network' && (
            <div className="tab-pane active">
              <p>{keyOngletSocialNetwork/* Ajoutez du contenu spécifique pour l'onglet Social */}</p>
              <ElfsightWidget widgetId={keyOngletSocialNetwork} />
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
                          <div className='title'><td><strong><p>{credit.title}</p></strong></td></div>
                          <td className='description'><p>{credit.description}</p></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

    {activeTab === 'bts' && (
            <div className="tab-pane active">
              <div className="photo-gallery">
                {keyOngletBts.map((img, index) => {
                  // Créer des groupes de 3 images
                  if (index % 3 === 0) {
                    const rowImages = keyOngletBts.slice(index, index + 3); // Groupe de 3 images
                    return (
                      <div key={`row-${index}`} className="photo-row">
                        {rowImages.map((img, i) => (
                          <img
                            key={`img-${index}-${i}`}
                            src={img}
                            alt={`Gallery ${index}-${i}`}
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

        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
