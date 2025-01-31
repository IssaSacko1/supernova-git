import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntroComponent from '../components/IntroComponent';
import LogoComponent from '../components/LogoComponent';
import "../styles/home.css";
import SliderShow from '../components/SliderShow';

function Home() {
  const [Section1Titre, setContent1Title] = useState(null);
  const [Section1Button, setContent1Button] = useState(null);
  const [Section2Titre, setContent2Title] = useState(null);
  const [Section2Contenu, setContent2Contenu] = useState(null);
  const [Section2Bouton, setContent2Button] = useState(null);
  const [Section3Titre, setContent3Titre] = useState(null);
  const [logos, setLogos] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true); // État de chargement pour les images

  useEffect(() => {
    async function fetchHomePageContent() {
      try {
        const response = await axios.get('https://idev-test.xyz/wp-json/wp/v2/pages/73');
        const data = parseWordpressContent(response.data.content.rendered);

        const IntroComponentContent = filterByFigcaption(data, 'IntroComponent');
        const SliderComponentContent = filterByFigcaption(data, 'SliderComponent');
        const LogoComponentContent = filterByFigcaption(data, 'LogoComponent');

        setContent1Title(data[8].content.slice(3, -5));
        setContent1Button(data[14].content.slice(3, -4));
        setContent2Title(data[15].content.slice(3, -4));
        setContent2Contenu(data[16].content.slice(3, -4));
        setContent2Button(data[17].content.slice(3, -4));
        setContent3Titre(data[18].content.slice(3, -4));
        setImages(IntroComponentContent);
        setLogos(LogoComponentContent);
        setVideos(SliderComponentContent);
        localStorage.setItem('IntroComponent', JSON.stringify(IntroComponentContent));
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données de la page d\'accueil:', error);
      } finally {
        setIsLoadingImages(false); // Indiquer que le chargement des images est terminé
      }
    }

    fetchHomePageContent();
  }, []);

  function parseWordpressContent(data) {
    const contentArray = data.split("\n\n\n\n");

    return contentArray.map((element, index) => {
      const srcMatch = element.match(/src="([^"]+)"/);
      const captionMatch = element.match(/<figcaption[^>]*>([^<]*)<\/figcaption>/);

      const srcValue = srcMatch ? srcMatch[1] : null;
      const captionText = captionMatch ? captionMatch[1].trim() : null;
      let jsonArray = null;

      if (captionText) {
        try {
          let correctedString = cleanAndFormatString(captionText);
          jsonArray = JSON.parse(correctedString);
          jsonArray = Object.assign({}, ...jsonArray);
        } catch (error) {
          console.error('Erreur lors de la conversion en JSON :', error.message);
        }
      }

      return {
        id: index + 1,
        content: element.trim(),
        src: srcValue,
        figcaption: jsonArray
      };
    });
  }

  function cleanAndFormatString(str) {
    return str
      .replace(/ /g, '') // Supprimer les espaces insécables
      .replace(/&Prime;/g, '"')
      .replace(/&rsquo;/g, "'")
      .replace(/&lsquo;/g, "'")
      .replace(/&rdquo;/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/[\u00A0]+/g, ' ')
      .replace(/(")\s*:/g, '":')
      .replace(/\s*(")\s*:/g, '":')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .replace(/«|»/g, '"')
      .replace(/(\r\n|\n|\r)/gm, "")
      .trim()
      .replace(/(\s*:\s*")(\s*)/g, ': "')
      .replace(/(\s*"\s*,\s*")(\s*)/g, '", "')
      .replace(/(\s*"\s*}\s*)/g, '"}');
  }

  function filterByFigcaption(jsonData, targetCaption) {
    if (!Array.isArray(jsonData)) {
      throw new Error('Le JSON fourni n\'est pas un tableau.');
    }

    return jsonData.filter(item => 
      item.figcaption && item.figcaption.component === targetCaption
    );
  }

  return (
    <div className="home-page">
      <div className="scroller">
        {/* Afficher un message de chargement pendant que les images sont en train d'être récupérées */}
        {isLoadingImages ? (
          <p>Chargement des images...</p>
        ) : (
          <IntroComponent images={images} />
        )}
        <div id="section-1" className="section-1">
          <h3>{Section1Titre}</h3>
          <SliderShow images={videos} />
          <div className='homeButton'>
            <a href="/#projets" className="view-all-link">{Section1Button}</a>
          </div>
        </div>
        <div className='section-2'>
          <h3>{Section2Titre?.replace('&rsquo;', '’')}</h3>
          <p><div dangerouslySetInnerHTML={{ __html: Section2Contenu }}></div></p>
          <a href="/#contact" className="contact-link">{Section2Bouton}</a>
        </div>
        <div className='client'>
          <h3>{Section3Titre}</h3>
          <LogoComponent logos={logos} />
        </div>
      </div>
    </div>
  );
}

export default Home;
