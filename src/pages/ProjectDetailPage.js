import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';
import '../styles/project-detail.css';
import image from '../image/Vignette2.jpg';
import image2 from '../image/ARTYA_16x9.png';
import { Modal, Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const VideoComponent = ({ selectedProjectUrl }) => {
  const [data, setData] = useState({
    video: '',
    poster: '',
    title: '',
    reward: '',
    sections: [],
    galleries: []
  });

  // Liste d'exemple d'images
  const images = [
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
    image2,
  ];

  const [activeTab, setActiveTab] = useState('photo'); // Onglet par défaut
  const [showModal, setShowModal] = useState(false); // Pour afficher la modal
  const [selectedIndex, setSelectedIndex] = useState(0); // Index de l'image sélectionnée pour le carousel

  const tabsConfig = [
    { key: 'photo', visibility: 'true' },
    { key: 'video', visibility: 'true' },
    { key: 'social network', visibility: 'false' },
    { key: 'credits', visibility: 'true' },
  ];

  const visibleTabs = tabsConfig.filter(tab => tab.visibility === 'true');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index); // Sélectionne l'image cliquée pour le carousel
    setShowModal(true); // Ouvre la modal
  };

  const handleCloseModal = () => setShowModal(false); // Ferme la modal

  useEffect(() => {
    const extractData = (html) => {
      const root = parse(html);

      const firstParagraph = root.querySelector('p');
      const title = firstParagraph ? firstParagraph.textContent.trim() : '';

      const video = root.querySelector('figure.wp-block-video video');
      const videoSrc = video ? video.getAttribute('src') : '';
      const videoPoster = video ? video.getAttribute('poster') : '';

      const sections = [];
      const headings = root.querySelectorAll('h2');
      const lists = root.querySelectorAll('ul');

      headings.forEach((heading, index) => {
        const title = heading.textContent.trim();
        const nextList = lists[index];

        sections.push({ title, list: nextList ? nextList.querySelectorAll('li').map(li => li.textContent.trim()) : [] });
      });

      const galleries = root.querySelectorAll('figure.wp-block-gallery');
      const galleryImages = galleries.map(gallery => {
        return gallery.querySelectorAll('figure.wp-block-image img').map(img => img.getAttribute('src'));
      });

      return {
        video: videoSrc,
        poster: videoPoster,
        title,
        reward: "",
        sections: sections.map(section => ({
          title: section.title,
          items: section.list
        })),
        galleries: galleryImages
      };
    };

    const loadData = async () => {
      try {
        const storedData = parseInt(localStorage.getItem('pageId'), 10);
        const response = await axios.get(`http://20.117.242.154/supernova_backend/supernova-backend/serveur/index.php//wp-json/wp/v2/pages/${storedData}`);
        const htmlContent = response.data.content.rendered;
        const extractedData = extractData(htmlContent);
        setData(extractedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    loadData();
  }, [selectedProjectUrl]);

  return (
    <div className='project-detail'>
      <div className='banner'>
        <img src={image} alt="Banner" />
        <div className='title'><h1>{data.title}</h1></div>
      </div>
      <div className="container">
        <ul className="nav nav-tabs" id="myTab">
          <p>fjdlfhfghghfjgfgfjglghfhglkhgthgthtjhgktjghtkjghrkjghthghlerhjk</p>
          {visibleTabs.map((tab) => (
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
                {images.map((image, index) => {
                  // Créer des groupes de 3 images
                  if (index % 3 === 0) {
                    const rowImages = images.slice(index, index + 3); // Groupe de 3 images
                    return (
                      <div key={`row-${index}`} className="photo-row photo-row-3">
                        {rowImages.map((img, i) => (
                          <img
                            key={`img-${index}-${i}`}
                            src={img}
                            alt={`Gallery Image ${index}-${i}`}
                            onClick={() => handleImageClick(index + i)} // Ouvre le carousel au clic
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
              <iframe width="700" height="400" src={data.video}
                title="ArtyA Watches - Vidéo promotionnelle, TINY PURITY TOURBILLON CHAMELEON 1/1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen></iframe>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="tab-pane active">
              <p>Content for Social Network</p>
              {/* Ajoutez du contenu spécifique pour l'onglet Social */}
            </div>
          )}

          {activeTab === 'credits' && (
            <div className="tab-pane active">
              <div className='credit'>
                <div className='credit-description'></div>
                <div className='credit-people'>
                  <table>
                    <tbody>
                      <tr>
                        <td><strong>Client</strong></td>
                        <td>SWIZA</td>
                      </tr>
                      <tr>
                        <td><strong>Client</strong></td>
                        <td>SWIZA</td>
                      </tr>
                      <tr>
                        <td><strong>Client</strong></td>
                        <td>SWIZA</td>
                      </tr>
                      <tr>
                        <td><strong>Client</strong></td>
                        <td>SWIZA</td>
                      </tr>
                      <tr>
                        <td><strong>Client</strong></td>
                        <td>SWIZA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Ajoutez du contenu spécifique pour l'onglet Credits */}
            </div>
          )}
        </div>
        {/* <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        className="custom-modal"
      > */}
        {/* <Modal.Header closeButton>
          <Modal.Title>Galerie d'images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel activeIndex={currentIndex} onSelect={setCurrentIndex}>
            {images.map((image, index) => (
              <Carousel.Item key={image.id}>
                <img
                  className="d-block w-100"
                  src={image.src}
                  alt={image.alt}
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal> */}
      </div>
    </div>
  );
};

export default VideoComponent;
