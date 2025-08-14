import "../styles/SliderShow.css";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import Slider from "react-slick";
import { FaArrowUp, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import React from 'react'; 

function SliderShow({ images }) {
  const history = useHistory();
  const [imageIndex, setImageIndex] = useState(0);

  const handleClick = (pageId) => {
    localStorage.setItem('pageId', pageId);
    history.push('/project-detail');
  };

  // Flèches personnalisées
  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "30%",
    centerMode: true,
    dots: true,
    variableWidth: false,
    beforeChange: (current, next) => setImageIndex(next),
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20%",
          centerMode: true,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20%",
          dots: true
        }
      }
    ]
  };

  return (
    <div className="SliderShow">
      <Slider {...settings}>
        {images.map((img, idx) => {
          let className = "slide";
          if (idx === imageIndex) className = "slide activeSlide";
          else if (idx === (imageIndex - 1 + images.length) % images.length) className = "slide leftSlide";
          else if (idx === (imageIndex + 1) % images.length) className = "slide rightSlide";
          else if (idx === (imageIndex - 2 + images.length) % images.length) className = "slide leftSlide2";
          else if (idx === (imageIndex + 2) % images.length) className = "slide rightSlide2";

          return (
            <div className={className} key={idx}>
              <img src={img.src} alt={`Slide ${idx}`} />
              <div className="slide-info">
                <h3>{img.figcaption.titre}</h3>
                <p>{img.figcaption.description}</p>
                <button className="slider-show-button" onClick={() => handleClick(img.figcaption.page_id)}>
                  <FaArrowUp /> View project
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SliderShow;
