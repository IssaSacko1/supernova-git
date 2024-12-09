import "../styles/SliderShow.css";
import { useState } from "react";
import Slider from "react-slick";
import astronaut from "../image/astronaut.png";
import celebrating from "../image/celebrating.png";
import education from "../image/education.png";
import taken from "../image/taken.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const images = [astronaut, celebrating, education, taken];

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
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3, // Always one slide visible with transformations
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <div className="SliderShow">
      <Slider {...settings}>
        {images.map((img, idx) => {
          // Dynamically assign classes based on index
          let className = "slide";
          if (idx === imageIndex) {
            className = "slide activeSlide";
          } else if (
            idx === (imageIndex - 1 + images.length) % images.length
          ) {
            className = "slide leftSlide";
          } else if (
            idx === (imageIndex + 1) % images.length
          ) {
            className = "slide rightSlide";
          }
          return (
            <div className={className} key={idx}>
              <img src={img} alt={`Slide ${idx}`} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SliderShow;
