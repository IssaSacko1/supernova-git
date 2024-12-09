import React, { useEffect, useState } from 'react';
import imageSrc from '../image/DJI_0154.jpg';
import '../styles/contact.css';
import PreFooter from '../components/PreFooter';
import { data } from 'jquery';
import axios from 'axios';
import { parse } from 'node-html-parser';



function Contact() {
  const [showPopupContact, setshowPopupContact] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    preFooter: [],
  });
  useEffect(() => {
    axios.get('http://localhost/supernova-backend/serveur///wp-json/wp/v2/pages/140')
    .then(response => {
      const htmlContent = response.data.content.rendered;
      const extractedData = extractData(htmlContent);
    })
      .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }, [])

  const extractData = (htmlContent) => {
    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };
  
    const parsedHtml = parse(htmlContent);
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
    }).filter(item => item !== null); 

    return preFooter;

  }


  const { preFooter } = data;

  const [messageSent, setMessageSent] = useState(false); // État pour le message de confirmation


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez effectuer d'autres actions ici, telles que l'envoi des données à un serveur

    setMessageSent(true);

    setFormData({
      name: '',
      email: '',
      project: ''
    });
    
  };

  const togglePopup = () => {
    setshowPopupContact(!showPopupContact);
  };

  return (
    <div className='contactPage'>
      <div className="video-container">
        <div className="overlay"></div>
        <img src={imageSrc} alt="Your image" />
        <div className="contente">
        <h1>CRÉONS ENSEMBLE !</h1>
        {!showPopupContact && (
        <button onClick={togglePopup}>CONTACTEZ NOUS</button>
        )}
        </div>
      </div>
      {showPopupContact && (
        <div className="popupcontact">
  <div className='popupcontact-header'>
    <p className='logoPopUp' style={{ width: '33%' }}>Supernova</p>
    {/* Bouton de fermeture */}
    <button className="close-button" onClick={togglePopup}>×</button>
  </div>
          <form onSubmit={handleSubmit}>
            <div className='popupcontact-content'>
            <label>
              <h4 className='label'>Nom</h4>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              <h4 className='label'>Email</h4>
              <p className='helper'>Assurez vous de l'écrire correctement afin qu'on puisse vous joindre par la suite.
                Merci !</p>        
              <input 
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              <h4 className='label'>Projet</h4>
              <p className='helper'>Décrivez votre projet</p>
              <input 
                type="textarea"
                name="project"
                value={formData.project}
                onChange={handleChange}
              />
            </label>
            <br />
            {/* Ajoutez d'autres champs de formulaire ici */}
            <button type="submit">Envoi</button>
            </div>
          </form>
          {messageSent && (
            <p className='confirmation-message'>Votre message a bien été envoyé !</p>
          )}
        </div>
      )}
        <PreFooter items={preFooter} />
    </div>
  );
}

export default Contact;
