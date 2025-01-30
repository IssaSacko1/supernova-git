import React, { useEffect, useState } from 'react';
import '../styles/contact.css';
import axios from 'axios';
import { parse } from 'node-html-parser';
import vimeo from '../styles/icon-vimeo.svg';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg';
import image from '../image/IMG_9043.jpg';
import ImageBanner from '../components/ImageBanner';
import ElfsightWidget from '../components/ElfsightWidget'; // Import du nouveau composant

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    preFooter: [],
  });

  useEffect(() => {
    axios
      .get('http://idevtes.cluster029.hosting.ovh.net/wp-json/wp/v2/pages/140')
      .then((response) => {
        const htmlContent = response.data.content.rendered;
        const extractedData = extractData(htmlContent);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données', error);
      });
  }, []);

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
    const preFooterSections = parsedHtml.querySelectorAll(
      'div.wp-block-group.has-global-padding.is-layout-constrained'
    );
    const preFooter = Array.from(preFooterSections)
      .map((section) => {
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
      })
      .filter((item) => item !== null);

    return preFooter;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      project: '',
    });
  };

  return (
    <div className="contactPage">
      <ImageBanner imageSrc={image} title="CONTACT" />
      <div className="container-contact">
        <div className="contact-form-part">
          <form id="contact-form" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <h4>Name</h4>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre Prénom Nom"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <h4>Adresse mail</h4>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre adresse mail"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <h4>Message</h4>
              </label>
              <textarea
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="Votre message"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        </div>
        <div className="social-network-part">
          <div className="social-image">
            <img src={vimeo} alt="Vimeo" />
            <img src={instagram} alt="Instagram" />
            <img src={linkedin} alt="LinkedIn" />
          </div>
          <div className="footer-social">
            <p>SUPERNOVA. Switzerland</p>
            <p>Route du Simplon 28B</p>
            <p>1907 SAXON</p>
            <p>SUISSE</p>
            <p>+41 (0)79 192 96 23</p>
            <p>info@supernova-creatif.com</p>
          </div>
        </div>
      </div>
      {/* Utilisation du composant ElfsightWidget */}
      <ElfsightWidget widgetId="d7cb6062-6988-4e34-9934-d272767d23e1" />
    </div>
  );
}

export default Contact;
