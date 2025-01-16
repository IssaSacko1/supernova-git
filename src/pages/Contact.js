import React, { useEffect, useState } from 'react';
import '../styles/contact.css';
import PreFooter from '../components/PreFooter';
import { data } from 'jquery';
import axios from 'axios';
import { parse } from 'node-html-parser';
import vimeo from '../styles/icon-vimeo.svg';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg'
import image from '../image/Vignette2.jpg';




function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    preFooter: [],
  });
  useEffect(() => {
    axios.get('http://20.117.242.154/supernova_backend/supernova-backend/serveur/index.php//wp-json/wp/v2/pages/140')
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
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.onload = () => {
      if (window.ElfsightApp) {
        window.ElfsightApp.init();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    
  }, []);


  return (
    <div className='contactPage'>
        <div className='banner'>
        <img src={image} alt="Banner" />
        <div className='title'><h1>CONTACT</h1></div>
      </div>
      <div className='container-contact'>
        <div className='contact-form-part'>
          <form id="contact-form"  method="POST">
              <div className="form-group">
                  <label htmlFor="name"><h3>Name</h3></label>
                  <input type="text" placeholder="Votre Prénom Nom" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1"><h3>Adresse mail</h3></label>
                  <input type="email" placeholder="Votre adresse mail " className="form-control" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                  <label htmlFor="message"><h3>Message</h3></label>
                  <textarea className="form-control" placeholder="Votre message" rows="5"></textarea>
              </div>
              <button type="submit">Envoyer</button>
          </form>
        </div>
        <div className='social-network-part'>
          <div className='social-image'>
          <img src={vimeo}  alt="YouTube" />
        <img src={instagram}  alt="YouTube" />
        <img src={linkedin}  alt="YouTube" />
          </div>
        <div className='footer-social'>
          <h3>SUPERNOVA. Switzerland</h3>
          <h3></h3>
          <h3></h3>
          </div>
        </div>
      </div>
      <div className="elfsight-app-d7cb6062-6988-4e34-9934-d272767d23e1" data-elfsight-app-lazy></div>
    </div>
  );
}

export default Contact;
