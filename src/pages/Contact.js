import React, { useEffect, useState } from 'react';
import '../styles/contact.css';
import axios from 'axios';
import { parse } from 'node-html-parser';
import instagram from '../styles/icon-instagram.svg';
import linkedin from '../styles/icon-linkedin.svg';
import image from '../image/IMG_9043.jpg';
import ImageBanner from '../components/ImageBanner';
import youtube from "../styles/icon-youtube.svg"


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    preFooter: [],
  });

  useEffect(() => {
    axios
      .get('https://idev-test.xyz/wp-json/wp/v2/pages/140')
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
                <h3>Name</h3>
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
                <h3>Adresse mail</h3>
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
                <h3>Message</h3>
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
            <a href='https://www.youtube.com/@supernova.creatif' target="_blank" rel="noopener noreferrer"><img src={youtube} alt="Youtube" /></a>
            <a href='https://www.instagram.com/supernova.creatif/reels/?locale=fr_CA&hl=en' target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
            <a href='https://www.linkedin.com/company/supernova-creatif/?viewAsMember=true' target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
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
    </div>
  );
}

export default Contact;
