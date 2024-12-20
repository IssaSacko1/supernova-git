import "../styles/SliderShow.css";
import { useState } from "react";
import Slider from "react-slick";
import astronaut from "../image/ARTYA_16x9.png";
import celebrating from "../image/GOWAKESURF_16x9.png";
import education from "../image/GROUPEGRISONI_16x9.png";
import taken from "../image/VERTIGO_VERTIGE_16x9.png";
import edutionbis from "../image/education.png";
import { FaArrowRight, FaArrowLeft, FaArrowUp } from "react-icons/fa";
import React from 'react'; 
const images = [
  {
    src: astronaut,
    title: "Astronaut",
    description: "An astronaut floating in space, exploring the cosmos.",
  },
  {
    src: taken,
    title: "edutionbis",
    description: "An edutionbis floating in space, exploring the cosmos.",
  },
  {
    src: celebrating,
    title: "Celebration",
    description: "A group of people celebrating a great achievement.",
  },
  {
    src: education,
    title: "Education",
    description: "A classroom filled with eager students learning new concepts.",
  },
  {
    src: taken,
    title: "Taken",
    description: "A beautiful landscape captured at golden hour.",
  },
];

function SliderShow() {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: "10%", 
    centerMode: true,
    variableWisth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
    autoplay:true,
    autoplaySpeed :3500,
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20%", // Montre 50% des slides aux extrémités
          centerMode: true,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (
    <div className="SliderShow">
      <Slider {...settings}>
      {images.map((img, idx) => {
          // Calculer les indices des éléments à gauche, au centre et à droite
          let className = "slide";
          if (idx === imageIndex) {
            className = "slide activeSlide"; // Slide active
          } else if (
            idx === (imageIndex - 1 + images.length) % images.length
          ) {
            className = "slide leftSlide"; // Slide à gauche
          } else if (
            idx === (imageIndex + 1) % images.length
          ) {
            className = "slide rightSlide"; // Slide à droite
          } else if (idx === (imageIndex - 2 + images.length) % images.length) {
            className = "slide leftSlide2"; // Slide à gauche de plus
          } else if (idx === (imageIndex + 2) % images.length) {
            className = "slide rightSlide2"; // Slide à droite de plus
          }
          return (
            <div className={className} key={idx}>
              <img src={img.src} alt={`Slide ${idx}`} />
              <div className="slide-info">
                <h3>{img.title}</h3>
                <p>{img.description}</p>
                <a className="slider-show-button" href='/projets'><FaArrowUp/> View project</a>
            </div>
            </div>
          );
        }
        )}
      </Slider>
    </div>
  );
}

export default SliderShow;
